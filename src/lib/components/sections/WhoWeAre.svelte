<script lang="ts">
	import { ABOUT_FEATURES } from '$lib/config/about';
	import { MQ } from '$lib/config/design-tokens';
	import { gsap } from '$lib/gsap';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let section = $state<HTMLElement>();

	$effect(() => {
		if (!section) return;
		const self = section;
		const hero = document.getElementById('home');
		const mm = gsap.matchMedia();

		mm.add({ desktop: MQ.desktop, reduce: MQ.reducedMotion }, (context) => {
			const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
			if (reduce) return;

			// Desktop: the hero stays pinned while this section slides up over it.
			if (desktop && hero) {
				gsap.to(hero.children, {
					opacity: 0.2,
					scale: 0.94,
					ease: 'none',
					scrollTrigger: {
						trigger: hero,
						start: 'top top',
						end: 'bottom top',
						pin: true,
						pinSpacing: false,
						scrub: true
					}
				});
			}

			gsap
				.timeline({
					defaults: { ease: 'expo.out', duration: 1.1 },
					scrollTrigger: { trigger: self, start: 'top 65%', once: true }
				})
				.from('[data-reveal]', { y: 36, autoAlpha: 0, stagger: 0.08 })
				.from('[data-card]', { y: 56, autoAlpha: 0, stagger: 0.12 }, '-=0.8');
		}, self);

		return () => mm.revert();
	});
</script>

<section
	bind:this={section}
	id="about"
	tabindex="-1"
	aria-labelledby="about-title"
	class="relative z-10 rounded-t-[2rem] bg-bg shadow-[0_-40px_80px_-30px_rgb(0_0_0/0.9)] md:rounded-t-[3rem]"
>
	<!-- Ember edge where the section meets the hero. -->
	<div
		aria-hidden="true"
		class="absolute inset-x-[8%] top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent"
	></div>
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgb(255_106_46/0.09),transparent_70%)]"
	></div>

	<div class="relative mx-auto max-w-7xl px-5 pt-24 pb-24 md:px-8 md:pt-36 md:pb-36">
		<div data-reveal>
			<Badge>Who we are</Badge>
		</div>

		<div class="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
			<h2
				id="about-title"
				data-reveal
				class="text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-fg lg:col-span-8"
			>
				We build systems that <span class="text-accent">learn, adapt and redefine</span>
			</h2>
			<p
				data-reveal
				class="max-w-xl text-base leading-relaxed text-secondary md:text-lg lg:col-span-4 lg:pb-2"
			>
				Zift is a studio of engineers, designers and product people shipping AI-native software. We
				take ownership from the first workshop to production: shaping the problem, designing the
				architecture and building products that keep improving after launch.
			</p>
		</div>

		<ul class="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3 lg:gap-5">
			{#each ABOUT_FEATURES as feature (feature.title)}
				<li
					data-card
					class="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 ease-(--ease-out-expo) hover:border-accent/35 hover:shadow-glow md:p-8"
				>
					<span
						aria-hidden="true"
						class="absolute inset-x-8 top-0 h-px origin-center scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-x-100"
					></span>
					<span
						class="grid size-12 place-items-center rounded-full border border-line text-accent-2 transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent"
					>
						<Icon name={feature.icon} />
					</span>
					<h3 class="mt-10 text-xl font-semibold tracking-[-0.01em] text-fg md:mt-14">
						{feature.title}
					</h3>
					<p class="mt-3 leading-relaxed text-secondary">{feature.description}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
