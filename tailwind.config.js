/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      white: '#FFFFFF',
      'gray-light': '#EDEDED',
      'gray-medium': '#909090',
      'gray-lighter': '#F6F6F6',
      'gray-dark': '#353535',
      'gray-darker': '#2C2C2C',
      'gray-extra-light': '#EAEAEA',
      black: '#000000',
    },
  
      minWidth: {
        '400':'400px',
      },
      backgroundImage: {
        'custom-gradient':'linear-gradient(90deg,#211C24,#211C24)',
      },
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};