// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // Extend colors to support your gradient backgrounds
        colors: {
          // Add any custom colors you reference in your gradients
          purple: {
            950: 'rgb(33, 0, 75)', // Matches your via-purple-950
          },
          blue: {
            950: 'rgb(0, 10, 75)', // Matches your to-blue-950
          }
        },
        // Add support for your custom animations
        animation: {
          float: 'float 6s ease-in-out infinite',
          dash: 'dash 10s linear infinite',
          'slow-spin': 'spin 30s linear infinite',
          'pulse-custom': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          dash: {
            to: { 'stroke-dashoffset': '100' },
          },
          spin: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
          pulse: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
        },
        // Add any other utilities you use frequently
        backdropBlur: {
          sm: '4px',
        },
        borderColor: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: [
      // Add any plugins you might need
      require('@tailwindcss/forms'),
    ],
  }