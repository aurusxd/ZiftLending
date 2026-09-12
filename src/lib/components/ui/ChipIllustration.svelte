<script lang="ts" module>
	const C = 220; // viewBox center
	const HALF = 80; // chip half-size
	const EDGE = 206; // where traces terminate

	type Point = [number, number];

	// One side of PCB traces (pointing up), in coordinates relative to the center: pin → 45° jog → edge.
	const SIDE = [-54, -18, 18, 54].map((o) => {
		const s = Math.sign(o);
		const rise = 18 + Math.abs(o) * 0.35;
		const jog = 14 + Math.abs(o) * 0.9;
		const pin: Point = [o, -HALF - 10];
		return [
			[o + s * jog, -EDGE],
			[o + s * jog, -HALF - 10 - rise - jog],
			[o, -HALF - 10 - rise],
			pin
		] as Point[];
	});

	const rotate = ([x, y]: Point, quarter: number): Point => {
		for (let i = 0; i < quarter; i++) [x, y] = [-y, x];
		return [x, y];
	};

	const toPath = (points: Point[]) =>
		points.map(([x, y], i) => `${i ? 'L' : 'M'}${C + x} ${C + y}`).join(' ');

	const TRACES = [0, 1, 2, 3].flatMap((q) =>
		SIDE.map((points) => {
			const rotated = points.map((p) => rotate(p, q));
			return { d: toPath(rotated), via: rotated[0], pin: rotated[3], quarter: q };
		})
	);
</script>

<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<div class="relative aspect-square w-full">
	<svg viewBox="0 0 440 440" class="absolute inset-0 size-full" aria-hidden="true">
		<defs>
			<radialGradient id="chip-glow">
				<stop offset="0" stop-color="#ff6a2e" stop-opacity="0.32" />
				<stop offset="0.6" stop-color="#ff6a2e" stop-opacity="0.06" />
				<stop offset="1" stop-color="#ff6a2e" stop-opacity="0" />
			</radialGradient>
			<linearGradient id="chip-edge" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="#ff6a2e" />
				<stop offset="1" stop-color="#ffb454" />
			</linearGradient>
		</defs>

		<circle cx={C} cy={C} r="200" fill="url(#chip-glow)" />

		<g fill="none" stroke-linecap="round" stroke-linejoin="round">
			{#each TRACES as trace, i (i)}
				<path d={trace.d} stroke="rgb(244 241 236 / 0.13)" stroke-width="1.5" />
				<path
					class="pulse"
					d={trace.d}
					pathLength="400"
					stroke="#ffb454"
					stroke-width="2"
					style="animation-delay: -{(i * 0.37) % 3.2}s"
				/>
				<circle cx={C + trace.via[0]} cy={C + trace.via[1]} r="3.5" stroke="rgb(244 241 236 / 0.25)" stroke-width="1.5" />
			{/each}
		</g>

		{#each TRACES as trace, i (i)}
			<rect
				x={C + trace.pin[0] - (trace.quarter % 2 ? 7 : 3)}
				y={C + trace.pin[1] - (trace.quarter % 2 ? 3 : 7)}
				width={trace.quarter % 2 ? 14 : 6}
				height={trace.quarter % 2 ? 6 : 14}
				rx="1.5"
				fill="rgb(255 180 84 / 0.55)"
			/>
		{/each}

		<rect x={C - HALF} y={C - HALF} width={HALF * 2} height={HALF * 2} rx="20" fill="#141312" stroke="url(#chip-edge)" stroke-width="1.5" />
		<rect x={C - HALF + 14} y={C - HALF + 14} width={HALF * 2 - 28} height={HALF * 2 - 28} rx="10" fill="none" stroke="rgb(244 241 236 / 0.08)" />
	</svg>

	<span
		data-swap
		class="absolute inset-0 grid place-items-center font-wide text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold tracking-[0.06em] text-fg [text-shadow:0_0_24px_rgb(255_106_46/0.65)]"
	>
		{label}
	</span>
</div>

<style>
	.pulse {
		stroke-dasharray: 26 374;
		stroke-dashoffset: 400;
		animation: flow 3.2s linear infinite;
	}

	@keyframes flow {
		to {
			stroke-dashoffset: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pulse {
			animation: none;
			stroke-dasharray: none;
			stroke-opacity: 0.25;
		}
	}
</style>
