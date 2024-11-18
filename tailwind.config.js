/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        title: [
          "2rem",
          {
            fontWeight: 900,
            lineHeight: "2.5rem",
            letterSpacing: "-0.01em"
          }
        ],
        paragraph: [
          "1rem",
          {
            fontWeight: 400,
            lineHeight: "1.5rem",
            letterSpacing: "-0.01em"
          }
        ]
      },
      colors: {
        title: "#FFF",
        paragraph: "#F1F1F1"
      }
    }
  },
  plugins: []
};
