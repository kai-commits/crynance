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
        offwhite: '#eeeeee',
        lightpink: '#eebbc3',
      },
      animation: {
        slideUp: 'slideUp 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        slideDown:
          'slideDown 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
      },
      keyframes: {
        slideUp: {
          '0%': {
            '-webkit-transform': 'translateY(1000px)',
            transform: 'translateY(1000px)',
            opacity: 0,
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        slideDown: {
          '0%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
            opacity: 1,
          },
          '100%': {
            '-webkit-transform': 'translateY(1000px)',
            transform: 'translateY(1000px)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
