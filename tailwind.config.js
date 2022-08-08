/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        'blackeye-blue': '#121629',
        darkblue: '#232946',
        lightblue: '#b8c1ec',
        offwhite: '#fffffe',
        lightpink: '#eebbc3',
      },
    },
  },
  plugins: [],
};
