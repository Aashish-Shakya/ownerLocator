/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Define the custom font
      },
    colors: {
      'custom-start': '#5c6bc0',
      'custom-end': '#512da8',
    },
    keyframes: {
      shake: {
        '0%, 100%': { transform: 'translateX(0)' },
        '25%': { transform: 'translateX(-2px)' },
        '50%': { transform: 'translateX(2px)' },
        '75%': { transform: 'translateX(-2px)' },
      },
     'marquee-ping-pong': {
          '0%, 100%': { transform: 'translateX(40%)' },  // Start and End
          '50%': { transform: 'translateX(-40%)' },   // Middle of the animation (moves left)
        },
    },
    animation: {
      shake: 'shake 0.3s ease-in-out',
      'marquee-ping-pong': 'marquee-ping-pong 4s ease-in-out infinite',
    },

  },
  },
  plugins: [],
}