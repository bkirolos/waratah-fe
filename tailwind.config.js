module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      pink: '#FF6ED6',
      salmon: '#FF7269',
      orange: '#FE9A33',
      lime: '#D7FB5C',
      'electric-green': '#01ED89',
      blue: '#4669F2',
      navy: '#11085A',
      white: '#FFFFFF',
      black: '#010101',
      'gray-dark': '#454943',
      'gray-light': '#a2aaad',
      'gray-stroke': '#f2f2f2',
      green: '#007940',
      yellow: '#fcdf1b'
    },
    fontFamily: {
      display: ['Trade Gothic', 'sans-serif'],
      sans: ['Open Sans', 'sans-serif']
    },
    fontSize: {
      sm: '14px',
      nav: '18px',
      base: '20px',
      md: '40px',
      lg: '64px',
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
  plugins: [],
  purge: [],
  safelist: [
    'whitelisted',
    {
      pattern: [
        `/bg-(pink|salmon|orange|lime|electric-green|blue|navy|white|black|green|yellow)/`,
        `/text-(pink|salmon|orange|lime|electric-green|blue|navy|white|black|green|yellow)/`
      ]
    }
  ]
}
