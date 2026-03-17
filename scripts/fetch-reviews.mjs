/**
 * One-time Google Reviews fetcher
 * Usage: npm run fetch-reviews
 */

import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const GOOGLE_SHARE_URL = 'https://share.google/wuHRmKTuVfF9nttIs';
const CHROME_PATH      = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const __dirname        = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH      = join(__dirname, '../data/reviews.js');

const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: false,
  defaultViewport: null,
  args: ['--no-sandbox', '--disable-blink-features=AutomationControlled', '--start-maximized'],
});

const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
});

console.log('Opening Google page...');
try {
  await page.goto(GOOGLE_SHARE_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
} catch {}
await new Promise(r => setTimeout(r, 5000));

const currentURL = page.url();
console.log('Landed on:', currentURL);

// ── Find the "All Google reviews" link on the search page and navigate to it ──
const mapsReviewUrl = await page.evaluate(() => {
  // Look for a link to Maps reviews page — has /maps/ and reviews in the href
  const links = [...document.querySelectorAll('a[href*="maps.google"], a[href*="google.com/maps"]')];
  const reviewLink = links.find(a => /review/i.test(a.href));
  if (reviewLink) return reviewLink.href;

  // Also check for data-url attributes
  const spans = [...document.querySelectorAll('[data-url*="reviews"], [href*="ludocid"]')];
  if (spans.length) return spans[0].href || spans[0].getAttribute('data-url');

  return null;
});
console.log('Found Maps review URL on search page:', mapsReviewUrl);

// Navigate to the Maps reviews page found on search page
if (mapsReviewUrl) {
  console.log('Navigating to Maps reviews page:', mapsReviewUrl);
  try {
    await page.goto(mapsReviewUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch {}
  await new Promise(r => setTimeout(r, 7000));
  console.log('Maps reviews URL:', page.url());
} else {
  // Fallback: compute CID from the known hex and use cid= URL
  const cid = BigInt('0x6719d79d0bfd89cd').toString();
  const cidUrl = `https://www.google.com/maps?cid=${cid}`;
  console.log('Fallback: navigating to CID URL:', cidUrl);
  try {
    await page.goto(cidUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch {}
  await new Promise(r => setTimeout(r, 7000));
  console.log('Maps URL:', page.url());
  // Click Reviews tab
  try {
    await page.evaluate(() => {
      const tabs = [...document.querySelectorAll('button[role="tab"], [role="tab"], button')];
      const reviewTab = tabs.find(b => /^reviews?$/i.test(b.textContent.trim()));
      if (reviewTab) reviewTab.click();
    });
    await new Promise(r => setTimeout(r, 4000));
  } catch {}
}

// Wait extra time for reviews panel to fully initialize
await new Promise(r => setTimeout(r, 4000));

// Find the reviews panel scroll container — walk up from a review block
const scrollPanelPos = await page.evaluate(() => {
  // Walk up from review block to find the scrollable container
  const block = document.querySelector('div[jsaction*="review.in"], div[data-review-id]');
  if (block) {
    let el = block.parentElement;
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 100 && rect.height > 100) {
          return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2), found: el.className };
        }
      }
      el = el.parentElement;
    }
  }
  // Fallback: left panel area (reviews are in left ~450px of Maps)
  return { x: 220, y: 400, found: 'fallback-left-panel' };
});
console.log('Scroll panel position:', scrollPanelPos);

// Move mouse to reviews panel (don't click — clicking on map dismisses the panel)
await page.mouse.move(scrollPanelPos.x, scrollPanelPos.y);
await new Promise(r => setTimeout(r, 300));

// Scroll using mouse wheel on the reviews panel for reliable lazy-loading
let prevCount = 0;
let stableRounds = 0;
for (let i = 0; i < 80; i++) {
  // JS scroll — walk up from review block using computed overflow style
  const scrolled = await page.evaluate(() => {
    const block = document.querySelector('div[jsaction*="review.in"], div[data-review-id]');
    if (block) {
      let el = block.parentElement;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const oy = style.overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) {
          el.scrollTop += 1500;
          return el.className || el.tagName;
        }
        el = el.parentElement;
      }
    }
    // Class-based fallbacks
    const candidates = ['.UL7Qtf', '.m6QErb[tabindex]', '.m6QErb', '[role="feed"]', '.DxyBCb'];
    for (const sel of candidates) {
      const c = document.querySelector(sel);
      if (c && c.scrollHeight > c.clientHeight + 50) { c.scrollTop += 1500; return sel; }
    }
    window.scrollBy(0, 1500);
    return 'window';
  });

  // Mouse wheel over the panel (triggers lazy loading in Maps)
  await page.mouse.wheel({ deltaY: 1500 });
  await new Promise(r => setTimeout(r, 1000));

  const count = await page.evaluate(() =>
    document.querySelectorAll('div[jsaction*="review.in"], div[data-review-id]').length
  );
  if (i % 5 === 0) console.log(`  Scroll ${i + 1}: ${count} reviews (container: ${scrolled})`);

  if (count === prevCount) {
    stableRounds++;
    if (stableRounds >= 6) break;
  } else {
    stableRounds = 0;
  }
  prevCount = count;
}
console.log(`Total reviews loaded: ${prevCount}`);

// ── Expand all truncated reviews ("More" buttons) ──
console.log('Expanding truncated reviews...');
try {
  let moreCount = 0;
  for (let attempt = 0; attempt < 5; attempt++) {
    const clicked = await page.evaluate(() => {
      const buttons = [...document.querySelectorAll('button')];
      const moreButtons = buttons.filter(b => {
        const t = b.textContent.trim().toLowerCase();
        return t === 'more' || t === 'see more';
      });
      moreButtons.forEach(b => b.click());
      return moreButtons.length;
    });
    if (clicked === 0) break;
    moreCount += clicked;
    await new Promise(r => setTimeout(r, 800));
  }
  console.log(`Expanded ${moreCount} truncated reviews`);
} catch {}

// ── Debug: dump first block's structure ──
const debugHtml = await page.evaluate(() => {
  const block = document.querySelector('.jftiEf, .GHT2ce, [data-review-id]');
  return block ? block.innerHTML.substring(0, 3000) : 'NO BLOCK FOUND';
});
console.log('\n--- DEBUG: first review block HTML ---\n', debugHtml.substring(0, 2000), '\n---\n');

console.log('Extracting reviews...');

const reviews = await page.evaluate(() => {
  const results = [];

  // Exact container: one per review, matches the outer div with review.in jsaction
  const blocks = [
    ...document.querySelectorAll('div[jsaction*="review.in"]'),
    ...document.querySelectorAll('div[data-review-id]:not(button)'),
  ];

  // Deduplicate blocks by data-review-id
  const seen = new Set();
  const uniqueBlocks = blocks.filter(b => {
    const id = b.getAttribute('data-review-id') || b.getAttribute('jsaction');
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  uniqueBlocks.forEach(block => {
    // Name — try class selectors, then extract from action button aria-label
    const actionLabel = block.querySelector('[aria-label*="\'s review"], [aria-label*="s review"]')?.getAttribute('aria-label') || '';
    const nameFromLabel = actionLabel.match(/^Actions for (.+?)(?:'s|s) review/i)?.[1];
    const name = (
      block.querySelector('.d4r55')?.textContent ||
      block.querySelector('.x3AX1-LfntMc-header-title-title span')?.textContent ||
      block.querySelector('.fontTitleMedium')?.textContent ||
      nameFromLabel
    )?.trim();

    // Review text — wiI7pd is the known text container; also try DU9Pgb, or any long leaf span
    const text = (
      block.querySelector('.wiI7pd')?.textContent ||
      block.querySelector('.MyEned')?.textContent ||
      block.querySelector('.DU9Pgb')?.textContent ||
      block.querySelector('[class*="review-text"]')?.textContent ||
      [...block.querySelectorAll('span')]
        .filter(s => !s.children.length && s.textContent.trim().length > 30)
        .sort((a, b) => b.textContent.length - a.textContent.length)[0]?.textContent
    )?.trim();

    // Time
    const time = (
      block.querySelector('.rsqaWe')?.textContent ||
      block.querySelector('.dehysf')?.textContent
    )?.trim() || 'recently';

    // Rating from aria-label e.g. "5 stars"
    const label = block.querySelector('[aria-label*="stars"], [aria-label*="star"], [aria-label*="Star"]')?.getAttribute('aria-label') || '';
    const rating = parseInt(label.match(/(\d+)/)?.[1]) || 5;

    // Photo
    const photo = (
      block.querySelector('.NBa7we')?.getAttribute('src') ||
      block.querySelector('img.NBa7we')?.getAttribute('src') ||
      block.querySelector('img[src*="googleusercontent"]')?.getAttribute('src')
    ) || null;

    if (name && text && text.length > 10) {
      results.push({ name, rating, time, text, photo });
    }
  });

  return [...new Map(results.map(r => [r.text, r])).values()]; // deduplicate
});

await browser.close();

if (!reviews.length) {
  console.log('\nCould not extract reviews automatically.');
  console.log('Google\'s page structure varies by region/session.');
  console.log('\nPlease paste your reviews into data/reviews.js manually.\n');
  process.exit(1);
}

const content = `// Auto-fetched from Google Reviews — ${new Date().toLocaleDateString('en-IN')}
// To refresh: npm run fetch-reviews

const reviews = ${JSON.stringify(reviews, null, 2)};

export default reviews;
`;

writeFileSync(OUTPUT_PATH, content, 'utf8');

console.log(`\nSaved ${reviews.length} reviews to data/reviews.js`);
reviews.forEach((r, i) => console.log(`  ${i+1}. ${r.name} (${r.rating}★) — "${r.text.slice(0, 70)}..."`));
