import type { IconName } from '$lib/components/ui/Icon.svelte';

export interface Project {
	id: string;
	name: string;
	category: string;
	description: string;
	icon: IconName;
	/** Path under /static, 4:3. */
	preview: string;
	tags: string[];
	/** Placeholder entry: shows a "Sample project" label. Remove when replaced with real work. */
	sample?: boolean;
}

// Synthetic placeholders until real case studies are ready — replace names, copy and previews.
export const PROJECTS: Project[] = [
	{
		id: 'atlas-assist',
		name: 'Atlas Assist',
		category: 'AI support copilot',
		description:
			'An assistant for a logistics support team that answers shipment questions from internal documents and live tracking data, citing every source.',
		icon: 'chat',
		preview: '/portfolio/atlas-assist.svg',
		tags: ['LLM', 'RAG', 'Integrations'],
		sample: true
	},
	{
		id: 'pulse-forecast',
		name: 'Pulse Forecast',
		category: 'Demand forecasting platform',
		description:
			'Forecasting for a retail network: models trained on sales history and seasonality, surfaced in a dashboard planners open every morning.',
		icon: 'chart',
		preview: '/portfolio/pulse-forecast.svg',
		tags: ['ML', 'Data pipelines', 'Dashboard'],
		sample: true
	},
	{
		id: 'relay-ops',
		name: 'Relay Ops',
		category: 'Workflow automation',
		description:
			'A visual builder where operations teams chain triggers, LLM classification and human review into automations that run on their own.',
		icon: 'flow',
		preview: '/portfolio/relay-ops.svg',
		tags: ['Agents', 'Automation', 'Web app'],
		sample: true
	},
	{
		id: 'lumen-docs',
		name: 'Lumen Docs',
		category: 'Document intelligence',
		description:
			'Extracts fields from invoices and contracts, flags low-confidence values for review and syncs approved results to accounting.',
		icon: 'doc',
		preview: '/portfolio/lumen-docs.svg',
		tags: ['Vision', 'LLM', 'Workflow'],
		sample: true
	}
];
