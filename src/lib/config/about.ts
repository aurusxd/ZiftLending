import type { IconName } from '$lib/components/ui/Icon.svelte';

export interface Feature {
	icon: IconName;
	title: string;
	description: string;
}

export const ABOUT_FEATURES: Feature[] = [
	{
		icon: 'cycle',
		title: 'Full-Cycle Delivery',
		description:
			'One team from discovery to launch. Strategy, design, engineering and operations stay in the same room, so nothing gets lost in handoffs.'
	},
	{
		icon: 'chip',
		title: 'AI-First Engineering',
		description:
			'Models, data pipelines and evaluation are part of the architecture from day one, not a feature bolted on at the end.'
	},
	{
		icon: 'compass',
		title: 'Product Thinking',
		description:
			'We start from the problem and the people who have it, and measure success by what the product changes for them.'
	}
];
