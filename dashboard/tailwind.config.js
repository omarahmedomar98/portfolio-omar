/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'fintech-bg': '#090d16',
                'fintech-card': '#111827',
                'fintech-primary': '#38bdf8', // Sky 400 (Matches Portfolio)
                'fintech-primary-dark': '#0ea5e9', // Sky 500
                'fintech-accent': '#10b981', // Emerald 500
                'fintech-text': '#f8fafc',
                'fintech-muted': '#a0aec0',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
