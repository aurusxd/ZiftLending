<script lang="ts">
	import { gsap, handleAnchor, prefersReducedMotion } from '$lib/gsap';
	import { sky } from '$lib/state/sky.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Diamonds from '$lib/components/ui/Diamonds.svelte';
	import StarField from '$lib/components/ui/StarField.svelte';

	let glow = $state<HTMLElement>();
	let seen = 0;

	// The hero sky answers the lightning happening in the strip above it.
	$effect(() => {
		const strikes = sky.strikes;
		if (!glow || strikes === seen) return;
		seen = strikes;
		if (prefersReducedMotion()) return;

		gsap.killTweensOf(glow);
		gsap
			.timeline()
			.to(glow, { opacity: 0.85, duration: 0.08, ease: 'power2.out' })
			.to(glow, { opacity: 0.28, duration: 1.5, ease: 'expo.out' });
	});
</script>

<section
	id="home"
	tabindex="-1"
	aria-labelledby="hero-title"
	class="relative isolate flex min-h-svh items-center justify-center overflow-hidden pt-18 md:pt-20"
>
	<!-- Layer 2: the night sky of the hero, a separate node from the video in the strip -->
	<div class="absolute inset-0 -z-20" aria-hidden="true">
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-8%,rgb(255_106_46/0.18),transparent_68%)]"
		></div>
		<StarField count={120} seed={23} />
		<div
			bind:this={glow}
			class="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-10%,rgb(255_150_70/0.4),transparent_70%)] opacity-[0.28] mix-blend-screen"
		></div>
		<div class="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-bg"></div>
	</div>

	<!-- Layer 3: decorative diamonds, between the sky and the copy -->
	<Diamonds />

	<div
		class="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-16 text-center md:px-8"
	>
		<h1
			id="hero-title"
			class="hero-title font-wide text-[clamp(2.1rem,8.4vw,6rem)] leading-[0.94] font-extrabold tracking-display text-fg uppercase"
		>
			<span class="block">Building</span>
			<span class="block">the future</span>
			<span class="block">with AI</span>
		</h1>

		<p class="mt-6 max-w-xl text-base leading-relaxed text-fg/80 md:mt-8 md:text-lg">
			Zift is an AI-powered software studio. We design, engineer and launch intelligent products,
			from the first idea to production scale.
		</p>

		<div class="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-11">
			<Button href="#projects" onclick={handleAnchor('projects')} variant="primary">
				See Our Work
			</Button>
			<Button href="#contact" onclick={handleAnchor('contact')} variant="outline">
				Book Discovery Call
			</Button>
		</div>
	</div>
</section>

<style>
	.hero-title {
		text-shadow: 0 2px 28px rgb(10 10 10 / 0.6);
	}
</style>
