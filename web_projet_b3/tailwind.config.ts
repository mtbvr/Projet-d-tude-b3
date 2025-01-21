import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#000000",
        "custom-orange": "#FFC482",
        "custom-blue": "#7200FF",
        "custom-green": "#02FF1E",
        "button-color": "#611DF7",
        "custom-gray": 'rgba(114, 114, 114, 1)',
        "red-error":"#f53333",

        "component-bg": '#2d1b83',

        "primary-input": "#007FFF",
        "secondary-input": "#6F7E8C",
        "text-input": "#212121",
        "hover-input": "#F5F5F5",
      },
      boxShadow: {
        header: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
