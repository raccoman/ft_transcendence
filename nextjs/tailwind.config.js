module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#4cc38a',
        'primary': {
          600: '#1c1c1c',
          500: '#232323',
          400: '#282828',
        },
        'secondary': '#ededed',
      },
      fontSize: {
        xxs: '.6rem',
      },
    },
  },
  plugins: [],
};
