<script lang="ts">
	import { PROJECTS } from '$lib/config/portfolio';
	import { gsap, prefersReducedMotion } from '$lib/gsap';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let active = $state(0);
	let frame = $state<HTMLElement>();
	let animated = false;

	const project = $derived(PROJECTS[active]);

	// Crossfade previews on selection; the first run only sets the resting state.
	$effect(() => {
		const index = active;
		if (!frame) return;
		const previews = gsap.utils.toArray<HTMLElement>('[data-preview]', frame);
		const caption = frame.querySelector('[data-caption]');
		const instant = !animated || prefersReducedMotion();
		animated = true;

		previews.forEach((preview, i) => {
			const on = i === index;
			gsap.killTweensOf(preview);
			if (instant) gsap.set(preview, { autoAlpha: on ? 1 : 0, scale: on ? 1 : 1.04 });
			else
				gsap.to(preview, {
					autoAlpha: on ? 1 : 0,
					scale: on ? 1 : 1.04,
					zIndex: on ? 1 : 0,
					duration: on ? 0.9 : 0.5,
					ease: on ? 'expo.out' : 'power2.out'
				});
		});

		if (!instant && caption) {
			gsap.fromTo(caption, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' });
		}
	});
</script>

<section id="projects" tabindex="-1" aria-labelledby="projects-title" class="relative z-10 bg-bg">
	<div class="mx-auto max-w-7xl border-t border-line px-5 py-24 md:px-8 md:py-36">
		<div class="flex flex-col items-center text-center">
			<Badge>Portfolio</Badge>
			<h2
				id="projects-title"
				class="mt-8 text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-fg"
			>
				Work That Speaks for Itself
			</h2>
			<p class="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
				Products across AI, data and automation. Pick one to see the interface we shipped.
			</p>
		</div>

		<div class="mt-14 grid gap-6 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
			<!-- Preview -->
			<div class="sticky top-20 z-10 self-start lg:order-2 lg:top-28">
				<div
					bind:this={frame}
					id="project-preview"
					class="overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)] md:rounded-[2rem]"
				>
					<div class="relative aspect-[4/3] overflow-hidden">
						{#each PROJECTS as item, i (item.id)}
							<img
								data-preview
								src={item.preview}
								alt="{item.name} interface preview"
								width="1200"
								height="900"
								loading="lazy"
								decoding="async"
								class={['absolute inset-0 size-full object-cover', i !== 0 && 'invisible opacity-0']}
							/>
						{/each}
						{#if project.sample}
							<span
								class="absolute top-3 left-3 z-10 rounded-full border border-line bg-bg/75 px-3 py-1 text-xs text-fg/75 backdrop-blur-md md:top-5 md:left-5"
							>
								Sample project
							</span>
						{/if}
					</div>
					<div
						data-caption
						aria-live="polite"
						class="hidden items-center justify-between gap-4 border-t border-line px-6 py-5 sm:flex md:px-8"
					>
						<span class="font-semibold text-fg">{project.name}</span>
						<span class="flex flex-wrap justify-end gap-2">
							{#each project.tags as tag (tag)}
								<span class="rounded-full border border-line px-3 py-1 text-xs text-fg/70">{tag}</span>
							{/each}
						</span>
					</div>
				</div>
			</div>

			<!-- List -->
			<ul class="flex flex-col gap-3 lg:order-1">
				{#each PROJECTS as item, i (item.id)}
					{@const selected = active === i}
					<li>
						<button
							type="button"
							aria-pressed={selected}
							aria-controls="project-preview"
							onclick={() => (active = i)}
							onpointerenter={(event) => event.pointerType === 'mouse' && (active = i)}
							class={[
								'group flex w-full flex-col rounded-card border p-5 text-left transition-[border-color,background-color,box-shadow] duration-500 ease-(--ease-out-expo) md:p-6',
								selected
									? 'border-accent/40 bg-surface shadow-glow'
									: 'border-line hover:border-fg/20 hover:bg-surface/60'
							]}
						>
							<span class="flex w-full items-center gap-4">
								<span
									class={[
										'grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500',
										selected ? 'border-accent/50 text-accent' : 'border-line text-secondary'
									]}
								>
									<Icon name={item.icon} class="size-5" />
								</span>
								<span class="min-w-0 flex-1">
									<span class="block text-lg font-semibold text-fg">{item.name}</span>
									<span class="block text-sm text-secondary">{item.category}</span>
								</span>
								<Icon
									name="arrow-up-right"
									class={selected
										? 'size-5 shrink-0 -translate-y-0.5 translate-x-0.5 text-accent-2 transition-[transform,color] duration-500'
										: 'size-5 shrink-0 text-fg/30 transition-[transform,color] duration-500'}
								/>
							</span>
							<span class="mt-4 line-clamp-2 block text-sm leading-relaxed text-secondary">
								{item.description}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
