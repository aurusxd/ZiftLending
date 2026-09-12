<script lang="ts">
	import { MQ } from '$lib/config/design-tokens';
	import { gsap, handleAnchor } from '$lib/gsap';
	import Button from '$lib/components/ui/Button.svelte';

	// Video time (s) just before the bolt's first flash; flashes peak at ~3.4s and ~3.75s.
	const STRIKE_AT = 3.33;
	// Resting glow once the strike has passed — matches the poster (last frame).
	const SETTLED = 0.35;
	// Served to desktop <picture> instead of the poster, so the poster is never downloaded there.
	const EMPTY_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	const VIDEO_MEDIA = `${MQ.desktop} and (prefers-reduced-motion: no-preference)`;

	let section = $state<HTMLElement>();
	let video = $state<HTMLVideoElement>();
	let showVideo = $state(false);
	let videoFailed = $state(false);

	// Desktop with motion allowed gets the video; everyone else keeps the static poster.
	$effect(() => {
		const mq = matchMedia(VIDEO_MEDIA);
		const sync = () => (showVideo = mq.matches);
		sync();
		mq.addEventListener('change', sync);
		return () => mq.removeEventListener('change', sync);
	});

	// Play once, and light the headline in sync with the bolt's two flashes.
	$effect(() => {
		if (!video || !section) return;
		const el = video;
		const target = section;

		gsap.set(target, { '--strike': 0 });
		const strike = gsap
			.timeline({ paused: true })
			.to(target, { '--strike': 0.55, duration: 0.07, ease: 'power2.out' })
			.to(target, { '--strike': 0.15, duration: 0.22, ease: 'power1.in' })
			.to(target, { '--strike': 1, duration: 0.08, ease: 'power2.out' }, '+=0.06')
			.to(target, { '--strike': SETTLED, duration: 1.6, ease: 'expo.out' });

		// `timeupdate` fires ~4×/s: once the strike is close, schedule it for the exact moment.
		let timer = 0;
		const onTimeUpdate = () => {
			const remaining = STRIKE_AT - el.currentTime;
			if (timer || remaining > 0.4) return;
			timer = window.setTimeout(() => strike.play(), Math.max(0, remaining * 1000));
		};
		const onEnded = () => strike.progress(1);

		// Background tabs may refuse playback: wait until the page is visible, then play once.
		const onVisible = () => {
			if (document.hidden) return;
			document.removeEventListener('visibilitychange', onVisible);
			start();
		};
		const start = () =>
			el.play().catch(() => {
				if (document.hidden) return document.addEventListener('visibilitychange', onVisible);
				videoFailed = true;
				gsap.set(target, { '--strike': SETTLED });
			});

		el.addEventListener('timeupdate', onTimeUpdate);
		el.addEventListener('ended', onEnded);
		el.muted = true;
		start();

		return () => {
			document.removeEventListener('visibilitychange', onVisible);
			clearTimeout(timer);
			el.removeEventListener('timeupdate', onTimeUpdate);
			el.removeEventListener('ended', onEnded);
			strike.kill();
			gsap.set(target, { '--strike': SETTLED });
		};
	});
</script>

<section
	bind:this={section}
	id="home"
	tabindex="-1"
	aria-labelledby="hero-title"
	class="hero relative isolate flex min-h-svh items-center justify-center overflow-hidden"
>
	<div class="absolute inset-0 -z-10" aria-hidden="true">
		<picture>
			<source media={VIDEO_MEDIA} srcset={EMPTY_PIXEL} />
			<source srcset="/hero/poster.webp" type="image/webp" />
			<img
				src="/hero/poster.jpg"
				alt=""
				width="1280"
				height="720"
				loading="eager"
				fetchpriority="high"
				class="size-full object-cover"
			/>
		</picture>

		{#if showVideo && !videoFailed}
			<video
				bind:this={video}
				class="absolute inset-0 size-full object-cover"
				src="/hero/hero.mp4"
				autoplay
				muted
				playsinline
				preload="auto"
				disablepictureinpicture
			></video>
		{:else if showVideo}
			<img src="/hero/poster.webp" alt="" class="absolute inset-0 size-full object-cover" />
		{/if}

		<!-- Strike light, then legibility scrims: header shade, text pool, fade into the page. -->
		<div class="strike-light absolute inset-0 mix-blend-screen"></div>
		<div class="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-bg/70 to-transparent"></div>
		<div
			class="absolute inset-0 bg-[radial-gradient(ellipse_95%_42%_at_50%_55%,rgb(10_10_10/0.7),transparent_80%)] md:bg-[radial-gradient(ellipse_48%_36%_at_50%_54%,rgb(10_10_10/0.62),transparent_75%)]"
		></div>
		<div class="absolute inset-x-0 bottom-0 h-48 bg-linear-to-b from-transparent to-bg"></div>
	</div>

	<div class="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-28 pb-24 text-center md:px-8">
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
	.hero {
		--strike: 0.35;
	}

	.strike-light {
		opacity: var(--strike);
		background: radial-gradient(
			ellipse 70% 65% at 50% 28%,
			rgb(255 150 70 / 0.34),
			rgb(255 106 46 / 0.08) 55%,
			transparent 80%
		);
	}

	.hero-title {
		text-shadow:
			0 2px 28px rgb(10 10 10 / 0.6),
			0 0 calc(var(--strike) * 60px) rgb(255 138 61 / calc(var(--strike) * 0.6));
	}
</style>
