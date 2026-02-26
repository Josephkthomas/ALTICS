/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F7F3EC',
        surface: {
          DEFAULT: '#FFFFFF',
          tint: '#FDFBF7'
        },
        text: {
          primary: '#1A1612',
          secondary: '#7A7067',
          tertiary: '#B5AFA8'
        },
        accent: {
          orange: '#E8622A',
          'orange-light': '#FDF0EA',
          amber: '#D4A843'
        },
        inversion: {
          bg: '#111008',
          surface: '#1C1B14',
          text: '#F0EDE6'
        },
        border: {
          DEFAULT: 'rgba(26,22,18,0.08)',
          strong: 'rgba(26,22,18,0.16)'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Instrument Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        section: '120px',
        'section-mobile': '80px',
        block: '64px',
        'block-mobile': '40px',
        element: '32px',
        tight: '16px',
        micro: '8px',
      },
      borderRadius: {
        card: '24px',
        button: '8px',
        tag: '100px',
        input: '10px',
        small: '12px'
      },
      boxShadow: {
        'orange-glow': '0 8px 32px rgba(232,98,42,0.15)',
      }
    },
  },
  plugins: [],
}
