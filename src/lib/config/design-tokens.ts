// JS-side tokens (breakpoints, motion). Colors, type, radii and shadows live in
// `src/routes/layout.css` under `@theme` — Tailwind v4's config source of truth.

export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export const MQ = {
	desktop: `(min-width: ${BREAKPOINTS.md}px)`,
	wide: `(min-width: ${BREAKPOINTS.lg}px)`,
	reducedMotion: '(prefers-reduced-motion: reduce)'
} as const;

export const MOTION = {
	ease: { out: 'expo.out', inOut: 'power3.inOut' },
	duration: { fast: 0.25, base: 0.6, slow: 1.1 },
	scroll: { duration: 1.1, ease: 'power3.inOut' }
} as const;
