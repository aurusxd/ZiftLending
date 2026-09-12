<script lang="ts">
	import { tick } from 'svelte';
	import { SERVICES } from '$lib/config/services';
	import { CONTACT_SECTION } from '$lib/config/nav-links';
	import { gsap, handleAnchor, prefersReducedMotion } from '$lib/gsap';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import ChipIllustration from '$lib/components/ui/ChipIllustration.svelte';

	let active = $state(0); // selected tab (drives aria + indicator immediately)
	let shown = $state(0); // content on screen (swaps after the exit tween)
	let panel = $state<HTMLElement>();
	let list = $state<HTMLElement>();
	let tabs: HTMLButtonElement[] = $state([]);
	let indicator = $state({ x: 0, w: 0 });
	let edges = $state({ start: false, end: false });
	let sequence = 0;

	const service = $derived(SERVICES[shown]);

	// Fade the tab row's edges only where more tabs are hidden behind the scroll.
	const mask = $derived(
		`linear-gradient(to right, ${edges.start ? 'transparent, black 2.5rem' : 'black, black'}, ${edges.end ? 'black calc(100% - 2.5rem), transparent' : 'black'})`
	);

	function updateEdges() {
		if (!list) return;
		edges = {
			start: list.scrollLeft > 4,
			end: list.scrollLeft + list.clientWidth < list.scrollWidth - 4
		};
	}

	// Keep the sliding pill under the selected tab, including after font load and resizes.
	$effect(() => {
		const tab = tabs[active];
		const row = list;
		if (!tab || !row) return;
		const measure = () => {
			indicator = { x: tab.offsetLeft, w: tab.offsetWidth };
			updateEdges();
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(row);
		tabs.forEach((t) => observer.observe(t));
		return () => observer.disconnect();
	});

	async function select(index: number, focus = false) {
		if (index === active) return;
		active = index;
		if (focus) tabs[index]?.focus();
		centerTab(index);

		const token = ++sequence;
		const targets = () => panel?.querySelectorAll('[data-swap]') ?? [];

		if (prefersReducedMotion()) {
			shown = index;
			return;
		}

		gsap.killTweensOf(targets());
		await gsap.to(targets(), { autoAlpha: 0, y: -12, duration: 0.22, ease: 'power2.in', stagger: 0.02 });
		if (token !== sequence) return;

		shown = index;
		await tick();
		gsap.fromTo(
			targets(),
			{ autoAlpha: 0, y: 20 },
			{ autoAlpha: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 }
		);
	}

	// On narrow screens the tab row scrolls horizontally: keep the selected tab in view.
	function centerTab(index: number) {
		const tab = tabs[index];
		if (!tab || !list || list.scrollWidth <= list.clientWidth) return;
		const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
		list.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
	}

	function onKeydown(event: KeyboardEvent) {
		const last = SERVICES.length - 1;
		const next = {
			ArrowRight: active === last ? 0 : active + 1,
			ArrowLeft: active === 0 ? last : active - 1,
			Home: 0,
			End: last
		}[event.key];
		if (next === undefined) return;
		event.preventDefault();
		select(next, true);
	}

	$effect(() => {
		const mm = gsap.matchMedia();
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			gsap
				.timeline({
					defaults: { ease: 'expo.out', duration: 1.1 },
					scrollTrigger: { trigger: '#services', start: 'top 65%', once: true }
				})
				.from('#services [data-reveal]', { y: 36, autoAlpha: 0, stagger: 0.08 });
		});
		return () => mm.revert();
	});
</script>

<section
	id="services"
	tabindex="-1"
	aria-labelledby="services-title"
	class="relative z-10 bg-bg"
>
	<div class="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
		<div class="flex flex-col items-center text-center">
			<div data-reveal><Badge>What we do</Badge></div>
			<h2
				id="services-title"
				data-reveal
				class="mt-8 text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-fg"
			>
				End-to-End AI Development
			</h2>
			<p data-reveal class="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
				Six disciplines under one roof. Bring us a single capability or the whole product, and one
				team carries it from the first sketch to production.
			</p>
		</div>

		<div data-reveal class="mt-14 md:mt-20">
			<div
				bind:this={list}
				role="tablist"
				tabindex="-1"
				aria-label="Services"
				onkeydown={onKeydown}
				onscroll={updateEdges}
				style="mask-image: {mask}; -webkit-mask-image: {mask}"
				class="relative mx-auto flex w-fit max-w-full snap-x gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				<span
					aria-hidden="true"
					class="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-fg transition-[transform,width] duration-500 ease-(--ease-out-expo)"
					style="width: {indicator.w}px; transform: translateX({indicator.x}px)"
				></span>
				{#each SERVICES as item, i (item.id)}
					<button
						bind:this={tabs[i]}
						type="button"
						role="tab"
						id="tab-{item.id}"
						aria-selected={active === i}
						aria-controls="services-panel"
						tabindex={active === i ? 0 : -1}
						onclick={() => select(i)}
						class={[
							'relative shrink-0 snap-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-300 md:px-5',
							active === i ? 'text-bg' : 'text-secondary hover:text-fg'
						]}
					>
						{item.label}
					</button>
				{/each}
			</div>

			<div
				bind:this={panel}
				id="services-panel"
				role="tabpanel"
				aria-labelledby="tab-{SERVICES[active].id}"
				class="mt-6 grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10 md:mt-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:p-16"
			>
				<div class="flex flex-col items-start">
					<h3
						data-swap
						class="text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-fg"
					>
						{service.title}
					</h3>
					<p data-swap class="mt-5 max-w-lg leading-relaxed text-secondary md:text-lg">
						{service.description}
					</p>
					<ul data-swap class="mt-8 flex flex-col gap-3">
						{#each service.points as point (point)}
							<li class="flex items-center gap-3 text-fg/90">
								<span aria-hidden="true" class="h-px w-5 bg-accent-gradient"></span>
								{point}
							</li>
						{/each}
					</ul>
					<div data-swap class="mt-10">
						<Button href="#{CONTACT_SECTION}" onclick={handleAnchor(CONTACT_SECTION)} variant="accent">
							Get started
						</Button>
					</div>
				</div>

				<div class="mx-auto w-full max-w-sm lg:max-w-md">
					<ChipIllustration label={service.chipLabel} />
				</div>
			</div>
		</div>
	</div>
</section>
