const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts.jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'logo': ['caveat']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
});

