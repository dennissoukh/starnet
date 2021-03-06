module.exports = {
  purge: ['./src/**/*.tsx', './public/index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'Switzer-Variable',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: [
        'SF Mono',
        'Menlo',
        'Monaco',
        'Courier New',
        'monospace',
      ],
    },
    colors: {
      transparent: 'transparent',
      primary: {
        100: 'var(--color-primary-100)',
        200: 'var(--color-primary-200)',
        300: 'var(--color-primary-300)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
        800: 'var(--color-primary-800)',
        900: 'var(--color-primary-900)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        hover: 'var(--color-accent-washed-out)',
        disabled: 'var(--color-accent-disabled)',
      },
      gray: 'var(--color-gray)',
    },
    fontSize: {
      tiny: '0.725rem',
      xs: '.8rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      minWidth: {
        620: '620px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
