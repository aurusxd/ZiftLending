<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Zift: AI-powered software studio</title>
	<meta
		name="description"
		content="Zift designs, engineers and launches AI-powered products, from discovery and architecture to launch and scale."
	/>
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<Footer />
