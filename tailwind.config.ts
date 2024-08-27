import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		black: {
			100: '#3D3D43',
			200: '#2E2E34',
			300: '#1E1E1E',
		},
	
		blue: {
			200: '#1E88EB',
		},
	
		orange: {
			100: '#FFD7B8',
			200: '#FF6F00'
		}
    },
  },
  plugins: [],
};
export default config;
