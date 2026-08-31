/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "#F3EFE5",
        toast: "#DED2BE",
        wine: "#452B31",
        petroleum: "#452B31",
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
        luxe: "0 8px 32px rgba(69, 43, 49, 0.05)",
        luxeHover: "0 16px 48px rgba(69, 43, 49, 0.09)",
        luxeInset: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
