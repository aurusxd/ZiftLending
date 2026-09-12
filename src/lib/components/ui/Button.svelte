<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = {
		variant?: 'primary' | 'outline' | 'accent';
		size?: 'sm' | 'md';
		class?: string;
		children: Snippet;
	} & (HTMLAnchorAttributes & HTMLButtonAttributes);

	let { variant = 'primary', size = 'md', class: className = '', href, children, ...rest }: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-500 ease-(--ease-out-expo) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

	const sizes = {
		sm: 'h-10 px-5 text-sm',
		md: 'h-13 px-7 text-[0.95rem]'
	};

	const variants = {
		primary: 'bg-fg text-bg hover:bg-white hover:shadow-glow',
		outline:
			'border border-fg/30 text-fg hover:border-accent/80 hover:bg-accent/10 hover:shadow-glow',
		accent: 'bg-accent-gradient text-bg hover:shadow-glow hover:-translate-y-px'
	};

	const classes = $derived(`${base} ${sizes[size]} ${variants[variant]} ${className}`);
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- in-page #section anchors only -->
	<a {href} class={classes} {...rest as HTMLAnchorAttributes}>{@render children()}</a>
{:else}
	<button type="button" class={classes} {...rest as HTMLButtonAttributes}>{@render children()}</button>
{/if}
