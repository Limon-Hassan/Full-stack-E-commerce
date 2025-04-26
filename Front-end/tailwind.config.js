const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inter_FONT: ['"Inter", "sans-serif"'],
        Poppipns_FONT: ['"Poppins", "sans-serif"'],
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-thick::-webkit-scrollbar': {
          width: '12px',
          height: '12px',
        },
        '.scrollbar-thick::-webkit-scrollbar-thumb': {
          backgroundColor: '#f00',
          borderRadius: '8px',
        },
        '.scrollbar-thick::-webkit-scrollbar-track': {
          backgroundColor: '#e5e5e5',
          borderRadius:'8px'
        },
      });
    },
  ],
});
