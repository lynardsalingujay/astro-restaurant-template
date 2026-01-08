/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary color palette - Customize these for your restaurant brand
        // Default: Neutral slate/blue - works for most restaurants
        // Example alternatives: 
        //   - Warm restaurant: Replace with orange/amber tones
        //   - Upscale: Use deep purples or golds
        //   - Fresh/healthy: Use greens
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',  // Main primary color
          600: '#475569',  // Buttons, CTAs
          700: '#334155',  // Hover states
          800: '#1e293b',
          900: '#0f172a',
        },
        // Secondary/Accent color - Use for highlights and special elements
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Main accent color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
