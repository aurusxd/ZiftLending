<script lang="ts">
	import { PROCESS_STEPS } from '$lib/config/process';
	import { MQ } from '$lib/config/design-tokens';
	import { gsap } from '$lib/gsap';
	import Badge from '$lib/components/ui/Badge.svelte';

	let list = $state<HTMLElement>();

	// The connector fills with the accent as the steps scroll through the viewport;
	// each step frame lights up when the fill reaches it.
	$effect(() => {
		if (!list) return;
		const steps = list;
		const mm = gsap.matchMedia();

		mm.add({ wide: MQ.wide, reduce: MQ.reducedMotion }, (context) => {
			const { wide, reduce } = context.conditions as { wide: boolean; reduce: boolean };
			if (reduce) return;

			const frames = gsap.utils.toArray<HTMLElement>('[data-frame]', steps);
			const fills = gsap.utils.toArray<HTMLElement>('[data-fill]', steps);
			const axis = wide ? 'scaleX' : 'scaleY';

			const timeline = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: steps,
					start: 'top 75%',
					end: wide ? 'top 30%' : 'bottom 60%',
					scrub: 0.6
				}
			});

			timeline.fromTo(frames[0], { '--lit': 0 }, { '--lit': 1, duration: 0.3 });
			fills.forEach((fill, i) => {
				timeline
					.fromTo(fill, { [axis]: 0 }, { [axis]: 1, duration: 1 })
					.fromTo(frames[i + 1], { '--lit': 0 }, { '--lit': 1, duration: 0.3 });
			});
		}, steps);

		return () => mm.revert();
	});
</script>

<section id="process" tabindex="-1" aria-labelledby="process-title" class="relative z-10 bg-bg">
	<div class="mx-auto max-w-7xl border-t border-line px-5 py-24 md:px-8 md:py-36">
		<Badge>How we work</Badge>

		<div class="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
			<h2
				id="process-title"
				class="text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-fg lg:col-span-7"
			>
				From Idea to Intelligent Product
			</h2>
			<p class="max-w-xl text-base leading-relaxed text-secondary md:text-lg lg:col-span-5 lg:pb-2">
				A clear path with visible progress at every stage, so you always know what is being built,
				why, and what comes next.
			</p>
		</div>

		<ol bind:this={list} class="mt-16 grid gap-10 md:mt-24 lg:grid-cols-4 lg:gap-6">
			{#each PROCESS_STEPS as step, i (step.title)}
				<li class="relative flex gap-6 lg:flex-col lg:gap-0">
					{#if i < PROCESS_STEPS.length - 1}
						<!-- Connector to the next step's frame: vertical below lg, horizontal from lg. -->
						<span
							aria-hidden="true"
							class="absolute top-14 left-7 h-[calc(100%-3.5rem+2.5rem)] w-px bg-line lg:top-7 lg:left-14 lg:h-px lg:w-[calc(100%-3.5rem+1.5rem)]"
						>
							<span data-fill class="absolute inset-0 origin-top bg-accent-gradient lg:origin-left"></span>
						</span>
					{/if}

					<span
						data-frame
						class="frame relative grid size-14 shrink-0 place-items-center rounded-2xl border bg-bg font-wide text-sm font-bold tracking-[0.08em] tabular-nums"
					>
						{String(i + 1).padStart(2, '0')}
					</span>

					<div class="max-w-md pt-3 lg:mt-8 lg:pt-0 lg:pr-4">
						<h3 class="text-xl font-semibold tracking-[-0.01em] text-fg">{step.title}</h3>
						<p class="mt-3 leading-relaxed text-secondary">{step.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.frame {
		--lit: 1;
		border-color: color-mix(in oklab, #ff6a2e calc(var(--lit) * 100%), rgb(244 241 236 / 0.14));
		color: color-mix(in oklab, #f4f1ec calc(var(--lit) * 100%), rgb(244 241 236 / 0.4));
		box-shadow: 0 12px 32px -12px rgb(255 106 46 / calc(var(--lit) * 0.55));
	}
</style>
