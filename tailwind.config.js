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
      'light-blue': '#EBEBEB',
      navy: '#11085A',
      black: '#010101',
      white: '#FFFFFF',
      'dark-gray': '#454943',
      'light-gray': '#A2AAAD',
      'stroke-gray': '#F2F2F2'
    },
    fontFamily: {
      display: ['Trade Gothic', 'sans-serif'],
      sans: ['Open Sans', 'sans-serif'],
      serif: ['Miller Disp Rom']
    },
    fontSize: {
      xxs: '12px',
      xs: '14px',
      sm: '18px',
      base: '20px',
      md: '40px',
      lg: '64px',
      xl: '96px',
      xxl: '168px'
    },
    letterSpacing: {
      normal: '0em',
      tight: '-0.041666666666667em',
      wide: '0.02em'
    },
    lineHeight: {
      negative: '0.84',
      none: '1',
      tight: '1.1',
      normal: '1.5'
    },
    extend: {
      maxWidth: {
        heading: '22rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  purge: {
    options: {
      safelist: [
        /(bg|text)-(pink|salmon|orange|lime|electric-green|blue|navy|black|white)/
      ]
    }
  }
}
