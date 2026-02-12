module.exports = {
    theme: {
        extend: {
            keyframes: {
                logoSpin: {
                    '0%': { transform: 'rotate(0deg) scale(1)' },
                    '50%': { transform: 'rotate(20deg) scale(1.05)' },
                    '100%': { transform: 'rotate(0deg) scale(1)' }
                }
            },
            animation: {
                logoSpin: 'logoSpin 1.6s ease-in-out infinite'
            }
        }
    }};