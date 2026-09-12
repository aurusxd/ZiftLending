<script lang="ts" module>
	// Authored 24×24 line icons, 1.5 stroke. Add new glyphs here, reference them by name from config.
	const ICONS = {
		cycle: [
			'M20 12a8 8 0 0 1-13.66 5.66',
			'M4 12a8 8 0 0 1 13.66-5.66',
			'M17.5 2.75v4h-4',
			'M6.5 21.25v-4h4',
			'M9.5 12h5',
			'M12 9.5v5'
		],
		chip: [
			'M7 7h10v10H7z',
			'M10 10h4v4h-4z',
			'M9.5 3v4',
			'M14.5 3v4',
			'M9.5 17v4',
			'M14.5 17v4',
			'M3 9.5h4',
			'M3 14.5h4',
			'M17 9.5h4',
			'M17 14.5h4'
		],
		compass: [
			'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
			'm15.5 8.5-2 5-5 2 2-5z',
			'M12 3v2',
			'M12 19v2',
			'M3 12h2',
			'M19 12h2'
		],
		chat: [
			'M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A1.5 1.5 0 0 1 4 14.5z',
			'M8.5 8.5h7',
			'M8.5 11.5h4'
		],
		chart: ['M3.5 20.5h17', 'M5 16l4.5-5 3.5 3 6-7', 'M15.5 7H19v3.5'],
		flow: ['M4 4.5h5v5H4z', 'M15 14.5h5v5h-5z', 'M9 7h3a3 3 0 0 1 3 3v4.5', 'M4 14.5h5v5H4z', 'M9 17h6'],
		doc: ['M6 3h8l4 4v14H6z', 'M14 3v4h4', 'M9 12h6', 'M9 15.5h6', 'M9 8.5h2'],
		'arrow-up-right': ['M7 17 17 7', 'M8 7h9v9'],
		'chevron-down': ['m6 9 6 6 6-6'],
		'chevron-left': ['m15 6-6 6 6 6'],
		'chevron-right': ['m9 6 6 6-6 6'],
		check: ['m5 12.5 4.5 4.5L19 7.5']
	} as const;

	export type IconName = keyof typeof ICONS;
</script>

<script lang="ts">
	let { name, class: className = 'size-6' }: { name: IconName; class?: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	class={className}
>
	{#each ICONS[name] as d, i (i)}
		<path {d} />
	{/each}
</svg>
