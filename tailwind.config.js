/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: "#10100f",
        milk: "#f5f1e8",
        acid: "#d5ff3f",
        flame: "#ff5e3a",
        cyan: "#36d7ff",
        plum: "#7a5cff"
      },
      boxShadow: {
        glow: "0 0 60px rgba(213, 255, 63, 0.28)"
      }
    }
  },
  plugins: []
};
