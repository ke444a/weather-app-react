const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "wild-sand": "#f5f5f5",
                tan: "#CDA280",
                "soft-peach": "#EEE5E9",
            },
            fontFamily: {
                sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                wiggle: {
                    "0%": { opacity: 0.2 },
                    "25%": { opacity: 0.4 },
                    "50%": { opacity: 0.6 },
                    "75%": { opacity: 0.8 },
                    "100%": { opacity: 0.9 },
                },
            },
            animation: {
                wiggle: "wiggle .3s ease-in-out",
            },
            screens: {
                xs: "550px",
            },
        },
    },
    plugins: [],
};
