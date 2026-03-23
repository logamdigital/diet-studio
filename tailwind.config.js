/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50:  '#FDF8F0',
          100: '#F5E9D3',
          200: '#EDD8B0',
          300: '#E3C48A',
          400: '#D9B06A',
        },
        orange: {
          400: '#F4A261',
          500: '#E07B39',
          600: '#C4611F',
          700: '#A04E18',
        },
        brown: {
          900: '#2C1810',
          800: '#3D2418',
          700: '#5C3D2B',
          600: '#7A5540',
        },
        // Brand palette (logo / PCOD section)
        brand: {
          purple:     '#5E3B87',
          'purple-light': '#EDE5F5',
          teal:       '#00A5B5',
          'teal-light': '#E0F6F8',
          grey:       '#8D8D8D',
          'grey-light': '#F0F0F0',
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
