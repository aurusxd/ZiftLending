<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet; class?: string } = $props();
</script>

<span
	class="inline-flex items-center gap-2.5 rounded-full border border-line bg-fg/[0.03] py-1.5 pr-3.5 pl-3 text-[0.7rem] font-medium tracking-label text-secondary uppercase {className}"
>
	<span aria-hidden="true" class="size-1.5 rotate-45 bg-accent-gradient shadow-[0_0_10px_rgb(255_106_46/0.8)]"></span>
	{@render children()}
</span>
