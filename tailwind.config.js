/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        christmas: {
          red: '#dc2626',
          'red-dark': '#b91c1c',
          'red-light': '#ef4444',
          green: '#166534',
          'green-light': '#15803d',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-red': 'glow-red 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-red': {
          '0%': { boxShadow: '0 0 5px #dc2626' },
          '100%': { boxShadow: '0 0 20px #dc2626, 0 0 10px #ef4444' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}