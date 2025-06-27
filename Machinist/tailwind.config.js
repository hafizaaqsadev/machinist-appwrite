/** @type {import('tailwindcss').Config} */
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #A6B8DD 0%, #2B4593 100%)'
      },
      colors: {
        machinistBlue: "#6082B6",
      },
    },
  },
  plugins: [],
};

