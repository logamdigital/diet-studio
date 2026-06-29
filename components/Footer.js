import { Instagram, Facebook, Youtube, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-purple text-white/85 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white leading-none block">Diet Studio</span>
                <span className="text-xs text-white/60 font-light">by Dt. Sushant Thakur</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-5 font-light">
              Personalized diet plans for weight loss, diabetes, PCOD, thyroid, and overall health.
              Real plans. Real food. Real results.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram,      href: '#',                            label: 'Instagram' },
                { Icon: Facebook,       href: '#',                            label: 'Facebook' },
                { Icon: Youtube,        href: '#',                            label: 'YouTube' },
                { Icon: MessageCircle,  href: 'https://wa.me/919999999999',   label: 'WhatsApp' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-brand-teal rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['Why Diet Studio', '#solution'],
                ['Success Stories',  '#testimonials'],
                ['How It Works',     '#how-it-works'],
                ['FAQs',             '#faq'],
                ['Book Consultation','#offer'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/70 hover:text-brand-teal transition-colors font-light">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['Privacy Policy',      '/privacy'],
                ['Terms & Conditions',  '/terms'],
                ['Refund Policy',       '/refund'],
                ['Contact Us',          '/contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/70 hover:text-brand-teal transition-colors font-light">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-6 text-xs text-white/55 leading-relaxed mb-4 font-light">
          <strong className="text-white/70 font-medium">Disclaimer:</strong> Diet Studio provides general nutritional
          guidance and personalized meal planning services. Our plans are not a substitute for
          medical diagnosis or treatment. Always consult your physician or specialist before
          making significant dietary changes, especially if you have a medical condition.
          Individual results may vary.
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/55 border-t border-white/10 pt-4">
          <p>&copy; {new Date().getFullYear()} Diet Studio. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-brand-teal mx-0.5" fill="currentColor" /> for healthier India
          </p>
        </div>
      </div>
    </footer>
  );
}
