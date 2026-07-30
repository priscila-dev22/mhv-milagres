/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F5F0E1",
        petroleum: "#17343A",
        sepia: "#8D7A5D",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        luxe: "1.75rem",
      },
      transitionDuration: {
        luxe: "500ms",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        luxe: "0 8px 32px rgba(23, 52, 58, 0.05)",
        luxeHover: "0 16px 48px rgba(23, 52, 58, 0.09)",
        luxeInset: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
