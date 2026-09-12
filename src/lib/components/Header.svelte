<script lang="ts">
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { CONTACT_SECTION, NAV_LINKS } from '$lib/config/nav-links';
	import { MQ } from '$lib/config/design-tokens';
	import { handleAnchor, scrollToSection } from '$lib/gsap';
	import SkyStrip from '$lib/components/SkyStrip.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let active = $state('home');
	let menuButton = $state<HTMLButtonElement>();

	const motion = (ms: number) => (prefersReducedMotion.current ? 0 : ms);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 12);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Highlight the nav link of the section crossing the upper third of the viewport.
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) active = entry.target.id;
			},
			{ rootMargin: '-30% 0px -65% 0px' }
		);
		document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});

	// Mobile menu: lock page scroll, close on Escape or when the viewport grows to desktop.
	$effect(() => {
		if (!menuOpen) return;
		const desktop = matchMedia(MQ.desktop);
		const close = () => (menuOpen = false);
		const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();

		document.documentElement.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		desktop.addEventListener('change', close);
		return () => {
			document.documentElement.style.overflow = '';
			window.removeEventListener('keydown', onKey);
			desktop.removeEventListener('change', close);
			menuButton?.focus();
		};
	});

	async function goFromMenu(event: MouseEvent, id: string) {
		event.preventDefault();
		menuOpen = false;
		await tick();
		scrollToSection(id);
	}
</script>

<!-- Layer 1: the sky strip. Its video and ambient background sit behind this bar, while the
	 nav is ordinary content on top and never moves with the animation. -->
<header
	data-site-header
	class={[
		'fixed inset-x-0 top-0 z-50 isolate transition-shadow duration-500',
		scrolled && 'shadow-[0_18px_44px_-26px_rgb(0_0_0/0.95)]'
	]}
>
	<SkyStrip />

	<div
		class="relative mx-auto grid h-18 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:h-20 md:px-8"
	>
		<a
			href="#home"
			onclick={handleAnchor('home')}
			class="justify-self-start"
			aria-label="Zift, back to top"
		>
			<Logo />
		</a>

		<nav aria-label="Primary" class="hidden md:block">
			<ul class="flex items-center gap-1">
				{#each NAV_LINKS as link (link.section)}
					<li>
						<a
							href="#{link.section}"
							onclick={handleAnchor(link.section)}
							aria-current={active === link.section ? 'location' : undefined}
							class="group relative block rounded-full px-4 py-2 text-sm text-fg/70 transition-colors duration-300 hover:text-fg aria-[current=location]:text-fg"
						>
							{link.label}
							<span
								aria-hidden="true"
								class="absolute inset-x-4 bottom-0.5 h-px origin-left scale-x-0 bg-accent-gradient transition-transform duration-500 ease-(--ease-out-expo) group-aria-[current=location]:scale-x-100"
							></span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="col-start-3 flex items-center gap-3 justify-self-end">
			<div class="hidden md:block">
				<Button
					href="#{CONTACT_SECTION}"
					onclick={handleAnchor(CONTACT_SECTION)}
					variant="accent"
					size="sm"
				>
					Book a call
				</Button>
			</div>

			<button
				bind:this={menuButton}
				type="button"
				class="relative -mr-2 grid size-11 place-items-center rounded-full md:hidden"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span
					aria-hidden="true"
					class={[
						'absolute h-0.5 w-5 rounded-full bg-fg transition-transform duration-500 ease-(--ease-out-expo)',
						menuOpen ? 'rotate-45' : '-translate-y-1'
					]}
				></span>
				<span
					aria-hidden="true"
					class={[
						'absolute h-0.5 w-5 rounded-full bg-fg transition-transform duration-500 ease-(--ease-out-expo)',
						menuOpen ? '-rotate-45' : 'translate-y-1'
					]}
				></span>
			</button>
		</div>
	</div>
</header>

{#if menuOpen}
	<div
		id="mobile-menu"
		class="fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col bg-bg/95 px-5 pt-6 pb-10 backdrop-blur-xl md:hidden"
		transition:fade={{ duration: motion(250) }}
	>
		<nav aria-label="Mobile">
			<ul class="flex flex-col">
				{#each NAV_LINKS as link, i (link.section)}
					<li
						class="border-b border-line"
						in:fly={{ y: 20, duration: motion(700), delay: motion(60 + i * 50), easing: expoOut }}
					>
						<a
							href="#{link.section}"
							onclick={(event) => goFromMenu(event, link.section)}
							aria-current={active === link.section ? 'location' : undefined}
							class="flex items-center justify-between py-5 font-wide text-3xl font-bold tracking-display text-fg/80 uppercase aria-[current=location]:text-fg"
						>
							{link.label}
							{#if active === link.section}
								<span aria-hidden="true" class="size-2 rounded-full bg-accent-gradient"></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div
			class="mt-auto"
			in:fly={{ y: 20, duration: motion(700), delay: motion(300), easing: expoOut }}
		>
			<Button
				href="#{CONTACT_SECTION}"
				onclick={(event: MouseEvent) => goFromMenu(event, CONTACT_SECTION)}
				variant="accent"
				class="w-full"
			>
				Book a call
			</Button>
		</div>
	</div>
{/if}
