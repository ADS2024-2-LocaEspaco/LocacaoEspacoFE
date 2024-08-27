import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      opacity: {
        '80': '.8',
      },
      blur: {
        'sm': '0.5rem',
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
