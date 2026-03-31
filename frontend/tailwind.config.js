/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        paper: "#fffdf8",
        accent: "#ff6b00",
        accentDark: "#b53b00",
        slateBlue: "#1f3a5f",
      },
      boxShadow: {
        panel: "0 10px 30px rgba(21, 21, 21, 0.12)",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        body: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        riseIn: "riseIn 500ms ease-out both",
      },
    },
  },
  plugins: [],
};
