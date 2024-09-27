import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        '600': '37.5rem',
        '66.67': '4.17rem'
      },
      height: {
        '600': '37.5rem',
        '66.67': '4.17rem'
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '0.5': '0.5px',
      }
    },
  },
  plugins: [],
};
export default config;
