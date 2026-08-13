/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ecomind: {
          bg: '#F2EAFA',
          bgLight: '#F8F3FC',
          card: '#D9CBFF',
          cardLight: '#E8DEFF',
          cardBorder: '#C4B2F7',
          pink: '#FF74B1',
          pinkHover: '#E85B99',
          purpleDark: '#2D1B4E',
          purpleText: '#4A3B69',
          success: '#4ADE80',
          warning: '#FACC15',
          danger: '#F87171',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 8px 30px rgba(177, 156, 217, 0.35)',
        'pink-glow': '0 4px 20px rgba(255, 116, 177, 0.4)',
        'card-soft': '0 4px 20px rgba(74, 59, 105, 0.06)',
      }
    },
  },
  plugins: [],
}
