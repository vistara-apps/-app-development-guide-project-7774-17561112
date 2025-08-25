module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsla(210, 30%, 5%, 0.9)',
        text: {
          primary: 'hsl(0, 0%, 95%)',
          secondary: 'hsl(0, 0%, 70%)',
        },
        accent: 'hsl(160, 80%, 50%)',
        primary: 'hsl(210, 100%, 50%)',
        surface: 'hsla(210, 30%, 10%, 0.9)',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.2)',
        overlay: '0 8px 24px hsla(0, 0%, 0%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'fast-fade': 'fadeIn 100ms ease-out',
      },
      fontSize: {
        'display': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'heading': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.625' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem' }],
      },
    },
  },
  plugins: [],
}
