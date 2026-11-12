/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trust: {
          50: '#F4F7F5',
          100: '#E6EFE9',
          200: '#C8DDD0',
          300: '#A4C6B1',
          400: '#75A788',
          500: '#4E8A64',
          600: '#3C6F4F',
          700: '#2E553D',
          800: '#203C2B',
          900: '#14271C',
          forest: '#064E3B',
          emerald: '#047857',
          sage: '#6E8B76',
          'sage-light': '#E9EFEA',
          charcoal: '#1C1917',
          warmbg: '#FCFAF7',
          offwhite: '#F9F8F6'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
