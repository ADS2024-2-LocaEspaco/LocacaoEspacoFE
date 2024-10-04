import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "banner-black-gradient": "linear-gradient(to top, #3D3D43 100%, #3D3D43 52%, #C9C9CF 46%, #F1F1F3 0%)",
      },
      colors: {
        white: '#F1F1F3',
        black: {
          100: '#3D3D43',
          200: '#2E2E34',
          300: '#1E1E1E',
        },

        blue: {
          100: '#C8DDFE',
          200: '#649EFC',
          300: '#1E88EB',
          400: '#1270B0',
          500: '#034DC3',
          600: '#01255F',
        },

        orange: {
          100: '#FFD7B8',
          200: '#FF9A4D',
          300: '#FF6F00',
          400: '#E66A05',
        },

        gray: {
          100: '#C9C9CF',
          200: '#A1A1AA',
          300: '#797986',
          400: '#3D3D43',
        },

        red: {
          100: '#FCC0C0',
          200: '#F76E6E',
          300: '#EA2E2E',
          400: '#BA1212',
          500: '#750B0B',
        },

        yellow: {
          100: '#FEF2C3',
          200: '#FCDC5F',
          300: '#FACC15',
          400: '#D7AD05',
          500: '#A48404',
        }
      },
      fontFamily: {
        title: 'var(--font-title)',
        body: 'var(--font-body)'
      },
      fontSize: {
        '5xl': '42px'
      },
      screens: {
        'sm400': '400px',
        'custom': '900px',
      },

    },
  },
  plugins: [],
};
export default config;
