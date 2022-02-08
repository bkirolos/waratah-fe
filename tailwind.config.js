module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: '#010101',
      'gray-dark': '#454943',
      'gray-light': '#a2aaad',
      'gray-stroke': '#f2f2f2',
      green: '#007940',
      white: '#ffffff',
      yellow: '#fcdf1b'
    },
    fontFamily: {
      display: ['Antonio', 'sans-serif'],
      sans: ['Open Sans', 'sans-serif']
    },
    fontSize: {
      sm: '14px',
      base: '16px',
      md: '24px',
      lg: '40px',
      xl: '96px',
      xxl: '168px'
    },
    lineHeight: {
      negative: '0.92',
      none: '1',
      normal: '1.5'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
