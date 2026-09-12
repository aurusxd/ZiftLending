export interface Service {
	id: string;
	label: string;
	title: string;
	description: string;
	points: string[];
	/** Short mark printed on the chip illustration. */
	chipLabel: string;
}

export const SERVICES: Service[] = [
	{
		id: 'ai-ml',
		label: 'AI & ML Solutions',
		title: 'Intelligence built into the product',
		description:
			'From LLM-powered assistants and retrieval pipelines to custom models, we design AI features around real workflows, with evaluation and guardrails built in from the start.',
		points: ['LLM apps, agents and RAG', 'Model fine-tuning and training', 'Evaluation, monitoring, guardrails'],
		chipLabel: 'LLM'
	},
	{
		id: 'full-stack',
		label: 'Full-Stack Engineering',
		title: 'Products engineered end to end',
		description:
			'Web and mobile applications with clean architecture, typed APIs and interfaces people enjoy using, built so your team can own them after handover.',
		points: ['Web and mobile applications', 'APIs and integrations', 'Design systems in code'],
		chipLabel: 'API'
	},
	{
		id: 'cloud',
		label: 'Cloud Infrastructure',
		title: 'Infrastructure that scales with you',
		description:
			'Cloud architecture, CI/CD and observability set up so releases become routine and costs stay predictable as usage grows.',
		points: ['AWS, GCP and Azure architecture', 'Containers, IaC and CI/CD', 'Monitoring and cost control'],
		chipLabel: 'OPS'
	},
	{
		id: 'data',
		label: 'Data Engineering',
		title: 'Data your models can trust',
		description:
			'Pipelines, warehouses and feature stores that turn scattered data into a reliable foundation for analytics and machine learning.',
		points: ['Batch and streaming pipelines', 'Warehouses and lakehouses', 'Data quality and governance'],
		chipLabel: 'ETL'
	},
	{
		id: 'automation',
		label: 'Automation Systems',
		title: 'Work that runs itself',
		description:
			"Automations and AI agents that take repetitive operations off your team's plate, connected to the tools you already use.",
		points: ['Workflow and process automation', 'AI agents with human review', 'Integrations across your stack'],
		chipLabel: 'BOT'
	},
	{
		id: 'design',
		label: 'Product Design',
		title: 'Interfaces people understand',
		description:
			'Research, UX and visual design for AI products, where explaining what the system does matters as much as what it does.',
		points: ['Research and discovery', 'UX for AI interactions', 'Prototypes and design systems'],
		chipLabel: 'UX'
	}
];
