import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        // Base colors
        primary: '#02B9B0',
        secondary: '#F3F4F6',
        background: '#F9FCFC',
        backgroundHover: '#F2F5F5',
        
        // Text colors using semantic naming
        text: {
          active: '#1A1A1A',
          inactive: '#1A1A1AB2',
          primary: '#1F2937',
          secondary: '#7A8484',
        },
        
        // Other UI colors
        border: '#1A1A1A1F',
        borderActive: '#B3BEBE',
        accent: '#3B82F6',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    }
  },

  plugins: [daisyui]
} satisfies Config;
