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
        normal: "#949495",
        fighting: "#e09c40",
        flying: "#a2c3e7",
        poison: "#735198",
        ground: "#9c7743",
        rock: "#bfb889",
        bug: "#9fa244",
        ghost: "#684870",
        steel: "#69a9c7",
        fire: "#e56c3e",
        water: "#5185c5",
        grass: "#66a945",
        electric: "#fcd533",
        psychic: "#dd6b7b",
        ice: "#6dc8eb",
        dragon: "#535ca8",
        dark: "#4c4948",
        fairy: "#dab4d4",
        // stellar: "",
        unknown: "#ffffff",
        // shadow: "#000000",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
export default config;
