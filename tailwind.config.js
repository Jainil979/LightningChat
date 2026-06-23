/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3bedb2',
        'primary-dark': '#29c091',
        secondary: '#123438',
        'dark-bg': '#0b1524',
        'card-bg': '#141d2b',
        'border-color': '#2e333b',
        'darker-bg': '#0d121f',
        'gray-text': '#9b9c9e',
        'online-green': '#31d6a2',
        'tick-color': '#3bedb2',
        'border-green': '#29c493',
      },
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'gradient': 'gradient 8s ease infinite',
        'wave': 'wave 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'lift': 'lift 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 237, 178, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 237, 178, 0.5)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};