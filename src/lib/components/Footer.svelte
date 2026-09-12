<script lang="ts">
	import { CONTACT_SECTION, NAV_LINKS } from '$lib/config/nav-links';
	import { handleAnchor } from '$lib/gsap';
	import Logo from '$lib/components/ui/Logo.svelte';

	const links = [...NAV_LINKS, { label: 'Contact', section: CONTACT_SECTION }];
	const year = new Date().getFullYear();
</script>

<footer class="relative z-10 border-t border-line bg-bg">
	<div
		aria-hidden="true"
		class="absolute inset-x-[8%] top-0 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent"
	></div>
	<div
		class="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8"
	>
		<a href="#home" onclick={handleAnchor('home')} aria-label="Zift, back to top" class="w-fit">
			<Logo />
		</a>
		<nav aria-label="Footer">
			<ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary">
				{#each links as link (link.section)}
					<li>
						<a
							href="#{link.section}"
							onclick={handleAnchor(link.section)}
							class="transition-colors duration-300 hover:text-fg">{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
		<p class="flex items-center gap-2.5 text-sm text-secondary">
			<span aria-hidden="true" class="size-1.5 rotate-45 bg-accent-gradient"></span>
			© {year} Zift. All rights reserved.
		</p>
	</div>
</footer>
