import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0d0d10',
          900: '#15151a',
          800: '#1c1c22',
          700: '#2a2a32',
          600: '#3a3a40',
        },
        bone: {
          DEFAULT: '#e8e6df',
          dim: '#a8a69d',
          mute: '#6b6a64',
        },
        accent: {
          DEFAULT: '#f97316',
          glow: '#ff8a3d',
          deep: '#c2410c',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(249,115,22,.25), 0 8px 40px -8px rgba(249,115,22,.55), inset 0 1px 0 rgba(255,255,255,.04)',
        'glow-lg':
          '0 0 0 1px rgba(249,115,22,.35), 0 20px 80px -10px rgba(249,115,22,.55), inset 0 1px 0 rgba(255,255,255,.06)',
        card: '0 1px 0 rgba(255,255,255,.04) inset, 0 20px 60px -20px rgba(0,0,0,.6)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,.08), transparent 60%)',
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
