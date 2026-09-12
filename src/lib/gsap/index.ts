import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MOTION, MQ } from '$lib/config/design-tokens';

if (browser) {
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	// Web font swap changes section heights; re-measure trigger positions once fonts are in.
	document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () => browser && matchMedia(MQ.reducedMotion).matches;

/** Smooth-scrolls to a section by id, offsetting the fixed header, then moves focus there. */
export function scrollToSection(id: string) {
	const target = document.getElementById(id);
	if (!target) return;

	const header = document.querySelector<HTMLElement>('[data-site-header]');
	const isTop = id === 'home';

	gsap.to(window, {
		duration: prefersReducedMotion() ? 0 : MOTION.scroll.duration,
		ease: MOTION.scroll.ease,
		scrollTo: { y: isTop ? 0 : target, offsetY: isTop ? 0 : (header?.offsetHeight ?? 0), autoKill: true },
		onComplete: () => {
			target.focus({ preventScroll: true });
			history.replaceState(history.state, '', `#${id}`);
		}
	});
}

/** Click handler for in-page anchors; modifier clicks keep native behaviour. */
export const handleAnchor = (id: string) => (event: MouseEvent) => {
	if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
	event.preventDefault();
	scrollToSection(id);
};
