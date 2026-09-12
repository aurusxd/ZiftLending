<script lang="ts">
	import { MQ } from '$lib/config/design-tokens';
	import { gsap, prefersReducedMotion } from '$lib/gsap';
	import { sky } from '$lib/state/sky.svelte';
	import StarField from '$lib/components/ui/StarField.svelte';

	// Flash times in hero.mp4, measured from frame luminance.
	const STRIKE_TIMES = [3.33, 3.66];
	const VIDEO_MEDIA = `${MQ.desktop} and (prefers-reduced-motion: no-preference)`;

	let showVideo = $state(false);
	let failed = $state(false);
	let video = $state<HTMLVideoElement>();
	let flash = $state<HTMLElement>();
	let ember = $state<HTMLElement>();

	// Desktop with motion allowed gets the video; everyone else keeps the static frame.
	$effect(() => {
		const mq = matchMedia(VIDEO_MEDIA);
		const sync = () => (showVideo = mq.matches);
		sync();
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});

	function pulse(strength = 1) {
		if (!flash || prefersReducedMotion()) return;
		gsap.killTweensOf(flash);
		gsap
			.timeline()
			.to(flash, { opacity: 0.85 * strength, duration: 0.07, ease: 'power2.out' })
			.to(flash, { opacity: 0.15 * strength, duration: 0.16 })
			.to(flash, { opacity: 0.6 * strength, duration: 0.08 })
			.to(flash, { opacity: 0, duration: 1.1, ease: 'expo.out' });
	}

	// Play once, and report every flash to the layers below.
	$effect(() => {
		if (!video) return;
		const el = video;
		const timers: number[] = [];
		let fired = 0;

		// `timeupdate` fires ~4x/s: once a flash is close, schedule it for the exact moment.
		const onTimeUpdate = () => {
			const next = STRIKE_TIMES[fired];
			if (next === undefined) return;
			const remaining = next - el.currentTime;
			if (remaining > 0.4) return;
			fired++;
			const strength = fired === 1 ? 0.7 : 1;
			timers.push(
				window.setTimeout(() => {
					sky.strikes++;
					pulse(strength);
				}, Math.max(0, remaining * 1000))
			);
		};

		const onEnded = () => {
			el.pause();
			sky.ended = true;
		};

		// A background tab may refuse playback: wait until the page is visible, then play once.
		const onVisible = () => {
			if (document.hidden) return;
			document.removeEventListener('visibilitychange', onVisible);
			start();
		};
		const start = () =>
			el.play().catch(() => {
				if (document.hidden) return document.addEventListener('visibilitychange', onVisible);
				failed = true;
			});

		el.addEventListener('timeupdate', onTimeUpdate);
		el.addEventListener('ended', onEnded);
		el.muted = true;
		start();

		return () => {
			document.removeEventListener('visibilitychange', onVisible);
			timers.forEach(clearTimeout);
			el.removeEventListener('timeupdate', onTimeUpdate);
			el.removeEventListener('ended', onEnded);
		};
	});

	// Ambient layer: the ember never fully goes out, and rare heat lightning every 8-20s.
	$effect(() => {
		if (!sky.ended || prefersReducedMotion()) return;
		const breathing = ember
			? gsap.to(ember, { opacity: 0.62, duration: 6.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
			: null;
		let timer = 0;
		const schedule = () => {
			timer = window.setTimeout(
				() => {
					if (!document.hidden) pulse(0.5 + Math.random() * 0.4);
					schedule();
				},
				8000 + Math.random() * 12000
			);
		};
		schedule();
		return () => {
			breathing?.kill();
			clearTimeout(timer);
		};
	});
</script>

<div class="absolute inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
	{#if showVideo && !failed}
		<video
			bind:this={video}
			class={[
				'size-full object-cover object-top transition-opacity duration-1000',
				sky.ended && 'opacity-0'
			]}
			src="/hero/hero.mp4"
			autoplay
			muted
			playsinline
			preload="auto"
			disablepictureinpicture
		></video>
	{:else}
		<picture>
			<source srcset="/hero/poster.webp" type="image/webp" />
			<img
				src="/hero/poster.jpg"
				alt=""
				width="1280"
				height="720"
				fetchpriority="high"
				class="size-full object-cover object-top"
			/>
		</picture>
	{/if}

	<!-- Ambient sky, revealed when the intro video ends -->
	<div
		class={['absolute inset-0 transition-opacity duration-1000', sky.ended ? 'opacity-100' : 'opacity-0']}
	>
		<div
			bind:this={ember}
			class="absolute inset-0 bg-[radial-gradient(ellipse_75%_200%_at_50%_-45%,rgb(255_106_46/0.38),rgb(255_106_46/0.1)_55%,transparent_78%)]"
		></div>
		<div
			class="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgb(255_138_61/0.14),transparent)]"
		></div>
		<StarField count={46} seed={11} />
	</div>

	<div
		bind:this={flash}
		class="absolute inset-0 bg-[radial-gradient(ellipse_55%_220%_at_50%_0%,rgb(255_150_70/0.55),transparent_70%)] opacity-0 mix-blend-screen"
	></div>
	<div class="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"></div>
</div>
