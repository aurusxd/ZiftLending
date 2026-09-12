export interface ProcessStep {
	title: string;
	description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
	{
		title: 'Discovery',
		description:
			'Workshops with your team to map the problem, the users and the data. You leave with a scoped plan and clear priorities.'
	},
	{
		title: 'Architecture',
		description:
			'We choose models, infrastructure and product structure, and test the riskiest assumptions with quick prototypes.'
	},
	{
		title: 'Build & Iterate',
		description:
			'Short cycles with working releases you can click through, each one measured against the goals set in discovery.'
	},
	{
		title: 'Launch & Scale',
		description:
			'Production rollout, monitoring and model evaluation, then steady improvements as real usage data comes in.'
	}
];
