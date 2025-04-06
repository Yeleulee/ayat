/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in-out': 'fadeInOut 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        dark: {
          DEFAULT: '#0A0A0A',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'ultra-wide': '21/9',
        'golden': '1.618/1',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      borderRadius: {
        'large': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      width: {
        'touch': '44px',
      },
      height: {
        'touch': '44px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            fontSize: '1rem',
          }
        }
      },
      listStyleType: {
        square: 'square',
        circle: 'circle',
      },
    },
  },
  plugins: [],
  corePlugins: {
    aspectRatio: false,
  },
};