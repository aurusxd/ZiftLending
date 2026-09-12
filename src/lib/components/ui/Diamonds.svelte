<script lang="ts">
	import { MQ } from '$lib/config/design-tokens';
	import { gsap, prefersReducedMotion } from '$lib/gsap';
	import { sky } from '$lib/state/sky.svelte';

	// Nested diamond outlines, largest first; the outer ring is dropped on narrow screens.
	const RINGS = [200, 152, 104, 56];
	const diamond = (s: number) => `0,${-s} ${s},0 0,${s} ${-s},0`;
	const CLUSTERS = [
		{ side: 'left', position: 'left-[-12%] md:left-[1%] lg:left-[6%]' },
		{ side: 'right', position: 'right-[-12%] md:right-[1%] lg:right-[6%]' }
	];

	let root = $state<HTMLElement>();
	let seen = 0;

	// Light parallax as the hero scrolls away: 18px, opposite directions per cluster.
	$effect(() => {
		if (!root) return;
		const scope = root;
		const mm = gsap.matchMedia();

		mm.add({ desktop: MQ.desktop, reduce: MQ.reducedMotion }, (context) => {
			const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
			if (reduce || !desktop) return;
			const scrollTrigger = { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true };
			gsap.to('[data-cluster="left"]', { y: 18, ease: 'none', scrollTrigger });
			gsap.to('[data-cluster="right"]', { y: -18, ease: 'none', scrollTrigger });
		}, scope);

		return () => mm.revert();
	});

	// Pulse with each lightning flash in the strip above.
	$effect(() => {
		const strikes = sky.strikes;
		if (!root || strikes === seen) return;
		seen = strikes;
		if (prefersReducedMotion()) return;

		const clusters = root.querySelectorAll('[data-cluster]');
		gsap.killTweensOf(clusters);
		gsap
			.timeline()
			.to(clusters, { opacity: 0.58, duration: 0.1, ease: 'power2.out' })
			.to(clusters, { opacity: 0.24, duration: 1.4, ease: 'expo.out' });
	});
</script>

<div bind:this={root} aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
	{#each CLUSTERS as cluster (cluster.side)}
		<div class="absolute top-1/2 -translate-y-1/2 {cluster.position}">
			<svg
				data-cluster={cluster.side}
				viewBox="-210 -210 420 420"
				class="size-[clamp(240px,32vw,430px)] text-accent opacity-[0.24]"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
			>
				{#each RINGS as ring, i (ring)}
					<polygon
						points={diamond(ring)}
						stroke-opacity={1 - i * 0.14}
						class={i === 0 ? 'max-md:hidden' : ''}
					/>
				{/each}
			</svg>
		</div>
	{/each}
</div>
