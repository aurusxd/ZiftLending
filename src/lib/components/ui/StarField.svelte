<script lang="ts" module>
	/** Deterministic PRNG, so server and client paint the same sky (no hydration mismatch). */
	function mulberry32(seed: number) {
		let t = seed >>> 0;
		return () => {
			t = (t + 0x6d2b79f5) >>> 0;
			let x = Math.imul(t ^ (t >>> 15), 1 | t);
			x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
			return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
		};
	}

	function makeStars(count: number, seed: number) {
		const rand = mulberry32(seed);
		return Array.from({ length: count }, () => {
			const bright = rand();
			return {
				x: +(rand() * 100).toFixed(2),
				y: +(rand() * 100).toFixed(2),
				size: +(0.9 + bright * 1.9).toFixed(2),
				opacity: +(0.16 + bright * 0.62).toFixed(2),
				duration: +(2.6 + rand() * 5.4).toFixed(2),
				delay: +(rand() * -8).toFixed(2),
				// Only part of the field twinkles: enough life, few animated layers.
				twinkles: rand() > 0.55
			};
		});
	}
</script>

<script lang="ts">
	let {
		count = 80,
		seed = 7,
		class: className = ''
	}: { count?: number; seed?: number; class?: string } = $props();

	const stars = $derived(makeStars(count, seed));
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden {className}">
	{#each stars as star, i (i)}
		<span
			class={['absolute rounded-full bg-fg', star.twinkles && 'twinkle']}
			style="left:{star.x}%; top:{star.y}%; width:{star.size}px; height:{star.size}px; opacity:{star.opacity}; --o:{star.opacity}; --dur:{star.duration}s; --delay:{star.delay}s"
		></span>
	{/each}
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		.twinkle {
			animation: twinkle var(--dur) ease-in-out var(--delay) infinite alternate;
		}
	}

	@keyframes twinkle {
		from {
			opacity: calc(var(--o) * 0.22);
		}
		to {
			opacity: var(--o);
		}
	}
</style>
