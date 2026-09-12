<script lang="ts">
	import { untrack } from 'svelte';
	import { BOOKING_DAYS, CALL_EXPECTATIONS, TIME_SLOTS, TIMEZONES } from '$lib/config/contact';
	import { prefersReducedMotion } from '$lib/gsap';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	type Field = 'name' | 'email' | 'date' | 'time' | 'timezone';
	type Status = 'idle' | 'submitting' | 'success' | 'error';
	interface Day {
		value: string;
		weekday: string;
		day: string;
		month: string;
	}
	interface Zone {
		id: string;
		label: string;
		offset: number;
	}

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

	let name = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('');
	let timezone = $state('');
	let company = $state(''); // honeypot

	let days = $state<Day[]>([]);
	let zones = $state<Zone[]>([]);
	let status = $state<Status>('idle');
	let serverError = $state('');
	let attempted = $state(false);
	let touched = $state<Partial<Record<Field, boolean>>>({});
	let form = $state<HTMLFormElement>();
	let dayRow = $state<HTMLElement>();

	const errors = $derived<Record<Field, string>>({
		name: name.trim().length < 2 ? 'Enter your name.' : '',
		email: !email.trim()
			? 'Enter your email.'
			: EMAIL_RE.test(email.trim())
				? ''
				: 'Enter a valid email, like name@company.com.',
		date: date ? '' : 'Choose a day for the call.',
		time: time ? '' : 'Choose a time slot.',
		timezone: timezone ? '' : 'Choose your timezone.'
	});

	const visibleError = (field: Field) => ((attempted || touched[field]) && errors[field]) || '';
	const selectedDay = $derived(days.find((d) => d.value === date));

	const pad = (n: number) => String(n).padStart(2, '0');

	function zoneInfo(id: string): Zone | null {
		try {
			const part = new Intl.DateTimeFormat('en-US', { timeZone: id, timeZoneName: 'shortOffset' })
				.formatToParts(new Date())
				.find((p) => p.type === 'timeZoneName')?.value;
			const [, sign = '+', hours = '0', minutes = '0'] = part?.match(/GMT([+-])(\d+)(?::(\d+))?/) ?? [];
			const offset = (sign === '-' ? -1 : 1) * (Number(hours) * 60 + Number(minutes));
			const city = id.split('/').pop()!.replaceAll('_', ' ');
			return { id, offset, label: `(${part === 'GMT' ? 'GMT+0' : part}) ${city}` };
		} catch {
			return null;
		}
	}

	// Client-only data: the date row depends on today, the default timezone on the visitor.
	$effect(() => {
		const list: Day[] = [];
		const today = new Date();
		for (let offset = 1; list.length < BOOKING_DAYS; offset++) {
			const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset, 12);
			if (d.getDay() === 0 || d.getDay() === 6) continue;
			list.push({
				value: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
				weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
				day: String(d.getDate()),
				month: d.toLocaleDateString('en-US', { month: 'short' })
			});
		}
		days = list;

		const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const ids = TIMEZONES.includes(detected) ? TIMEZONES : [detected, ...TIMEZONES];
		zones = ids
			.map(zoneInfo)
			.filter((z): z is Zone => z !== null)
			.sort((a, b) => a.offset - b.offset);

		if (!untrack(() => timezone)) timezone = zones.some((z) => z.id === detected) ? detected : '';
	});

	function scrollDays(direction: 1 | -1) {
		dayRow?.scrollBy({
			left: direction * dayRow.clientWidth * 0.7,
			behavior: prefersReducedMotion() ? 'auto' : 'smooth'
		});
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		attempted = true;

		const invalid = (Object.keys(errors) as Field[]).find((field) => errors[field]);
		if (invalid) {
			form?.querySelector<HTMLElement>(`[data-field="${invalid}"]`)?.focus();
			return;
		}

		status = 'submitting';
		serverError = '';
		try {
			const response = await fetch('/api/lead', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name: name.trim(), email: email.trim(), date, time, timezone, company })
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok || !result.ok) throw new Error(result.error || 'The request could not be sent.');
			status = 'success';
		} catch (error) {
			serverError = error instanceof Error ? error.message : 'The request could not be sent.';
			status = 'error';
		}
	}

	function bookAnother() {
		date = '';
		time = '';
		attempted = false;
		touched = {};
		status = 'idle';
	}

	const inputClass =
		'h-13 w-full rounded-2xl border border-line bg-bg px-4 text-fg transition-[border-color,box-shadow] duration-300 placeholder:text-fg/55 hover:border-fg/25 focus:border-accent/70 focus:shadow-[0_0_0_4px_rgb(255_106_46/0.15)] focus:outline-none aria-invalid:border-danger/70';
	const pillFocus =
		'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-2';
</script>

<section id="contact" tabindex="-1" aria-labelledby="contact-title" class="relative z-10 overflow-hidden bg-bg">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_55%_60%_at_50%_100%,rgb(255_106_46/0.13),transparent_70%)]"
	></div>

	<div class="relative mx-auto max-w-7xl border-t border-line px-5 py-24 md:px-8 md:py-36">
		<div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="min-w-0 lg:col-span-5 lg:pt-4">
				<h2
					id="contact-title"
					class="text-[clamp(2.1rem,4.8vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.025em] text-fg"
				>
					Book a Discovery Call
				</h2>
				<p class="mt-6 max-w-md text-base leading-relaxed text-secondary md:text-lg">
					Tell us what you're building. We'll look at your idea, the data you have and the fastest
					route to a working product.
				</p>
				<ul class="mt-10 flex flex-col gap-4">
					{#each CALL_EXPECTATIONS as item (item)}
						<li class="flex gap-4 leading-relaxed text-fg/85">
							<span aria-hidden="true" class="mt-3 h-px w-5 shrink-0 bg-accent-gradient"></span>
							{item}
						</li>
					{/each}
				</ul>
			</div>

			<div class="min-w-0 lg:col-span-7">
				<div class="rounded-[2rem] border border-line bg-surface p-6 sm:p-8 md:p-10">
					{#if status === 'success'}
						<div role="status" class="flex flex-col items-start py-6 md:py-10">
							<span class="grid size-14 place-items-center rounded-full bg-accent-gradient text-bg shadow-glow">
								<Icon name="check" class="size-7" />
							</span>
							<h3 class="mt-8 text-3xl font-semibold tracking-[-0.02em] text-fg">Request received</h3>
							<p class="mt-4 max-w-md leading-relaxed text-secondary">
								Thanks, {name.trim().split(/\s+/)[0]}. We'll email <span class="text-fg">{email.trim()}</span>
								to confirm the call on
								<span class="text-fg">
									{selectedDay ? `${selectedDay.weekday}, ${selectedDay.month} ${selectedDay.day}` : date} at {time}
								</span>
								({timezone.replaceAll('_', ' ')}).
							</p>
							<button
								type="button"
								onclick={bookAnother}
								class="mt-8 text-sm font-medium text-accent-2 underline-offset-4 hover:underline"
							>
								Choose another time
							</button>
						</div>
					{:else}
						<form bind:this={form} novalidate onsubmit={submit} class="relative flex flex-col gap-8">
							<div class="grid gap-5 sm:grid-cols-2">
								<div class="flex flex-col gap-2">
									<label for="lead-name" class="text-sm font-medium text-fg/85">Name</label>
									<input
										id="lead-name"
										data-field="name"
										name="name"
										autocomplete="name"
										placeholder="Jane Cooper"
										bind:value={name}
										onblur={() => (touched.name = true)}
										aria-invalid={!!visibleError('name')}
										aria-describedby={visibleError('name') ? 'lead-name-error' : undefined}
										class={inputClass}
									/>
									{#if visibleError('name')}
										<p id="lead-name-error" class="text-sm text-danger">{errors.name}</p>
									{/if}
								</div>

								<div class="flex flex-col gap-2">
									<label for="lead-email" class="text-sm font-medium text-fg/85">Work email</label>
									<input
										id="lead-email"
										data-field="email"
										name="email"
										type="email"
										inputmode="email"
										autocomplete="email"
										placeholder="jane@company.com"
										bind:value={email}
										onblur={() => (touched.email = true)}
										aria-invalid={!!visibleError('email')}
										aria-describedby={visibleError('email') ? 'lead-email-error' : undefined}
										class={inputClass}
									/>
									{#if visibleError('email')}
										<p id="lead-email-error" class="text-sm text-danger">{errors.email}</p>
									{/if}
								</div>
							</div>

							<fieldset class="min-w-0" aria-describedby={visibleError('date') ? 'lead-date-error' : undefined}>
								<legend class="sr-only">Day</legend>
								<div class="flex items-center justify-between">
									<span aria-hidden="true" class="text-sm font-medium text-fg/85">Day</span>
									<span class="hidden gap-1 md:flex">
										<button
											type="button"
											aria-label="Earlier days"
											onclick={() => scrollDays(-1)}
											class="grid size-9 place-items-center rounded-full border border-line text-fg/70 transition-colors hover:border-fg/30 hover:text-fg"
										>
											<Icon name="chevron-left" class="size-4" />
										</button>
										<button
											type="button"
											aria-label="Later days"
											onclick={() => scrollDays(1)}
											class="grid size-9 place-items-center rounded-full border border-line text-fg/70 transition-colors hover:border-fg/30 hover:text-fg"
										>
											<Icon name="chevron-right" class="size-4" />
										</button>
									</span>
								</div>
								<div
									bind:this={dayRow}
									class="-mx-1 mt-3 flex snap-x gap-2 overflow-x-auto px-1 py-1 [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
								>
									{#if days.length}
										{#each days as day (day.value)}
											<label class="shrink-0 snap-start">
												<input
													type="radio"
													name="date"
													value={day.value}
													data-field="date"
													bind:group={date}
													class="peer sr-only"
												/>
												<span
													class="flex h-[5.75rem] w-[4.5rem] cursor-pointer flex-col items-center justify-center rounded-2xl border border-line bg-bg transition-[border-color,background-color,box-shadow] duration-300 peer-checked:border-accent/60 peer-checked:bg-accent/10 peer-checked:shadow-glow hover:border-fg/25 {pillFocus}"
												>
													<span class="text-[0.65rem] tracking-label text-secondary uppercase">{day.weekday}</span>
													<span class="mt-1 text-2xl font-semibold text-fg tabular-nums">{day.day}</span>
													<span class="text-xs text-secondary">{day.month}</span>
												</span>
											</label>
										{/each}
									{:else}
										{#each { length: 8 }, i (i)}
											<span class="h-[5.75rem] w-[4.5rem] shrink-0 animate-pulse rounded-2xl bg-fg/5"></span>
										{/each}
									{/if}
								</div>
								{#if visibleError('date')}
									<p id="lead-date-error" class="mt-2 text-sm text-danger">{errors.date}</p>
								{/if}
							</fieldset>

							<fieldset class="min-w-0" aria-describedby={visibleError('time') ? 'lead-time-error' : undefined}>
								<legend class="text-sm font-medium text-fg/85">Time</legend>
								<div class="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
									{#each TIME_SLOTS as slot (slot)}
										<label>
											<input
												type="radio"
												name="time"
												value={slot}
												data-field="time"
												bind:group={time}
												class="peer sr-only"
											/>
											<span
												class="flex h-11 cursor-pointer items-center justify-center rounded-full border border-line bg-bg text-sm text-fg/85 tabular-nums transition-[border-color,background-color,color] duration-300 peer-checked:border-accent/60 peer-checked:bg-accent/10 peer-checked:text-fg hover:border-fg/25 {pillFocus}"
											>
												{slot}
											</span>
										</label>
									{/each}
								</div>
								{#if visibleError('time')}
									<p id="lead-time-error" class="mt-2 text-sm text-danger">{errors.time}</p>
								{/if}
							</fieldset>

							<div class="flex flex-col gap-2">
								<label for="lead-timezone" class="text-sm font-medium text-fg/85">Timezone</label>
								<div class="relative">
									<select
										id="lead-timezone"
										data-field="timezone"
										name="timezone"
										bind:value={timezone}
										onblur={() => (touched.timezone = true)}
										aria-invalid={!!visibleError('timezone')}
										aria-describedby="lead-timezone-hint"
										class="{inputClass} cursor-pointer appearance-none pr-11"
									>
										<option value="" disabled>{zones.length ? 'Select timezone' : 'Detecting…'}</option>
										{#each zones as zone (zone.id)}
											<option value={zone.id}>{zone.label}</option>
										{/each}
									</select>
									<Icon
										name="chevron-down"
										class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg/60"
									/>
								</div>
								<p id="lead-timezone-hint" class={['text-sm', visibleError('timezone') ? 'text-danger' : 'text-secondary']}>
									{visibleError('timezone') || 'Time slots are in this timezone.'}
								</p>
							</div>

							<div aria-hidden="true" class="absolute -left-[9999px] size-px overflow-hidden">
								<label>
									Company
									<input tabindex="-1" autocomplete="off" name="company" bind:value={company} />
								</label>
							</div>

							{#if status === 'error'}
								<p role="alert" class="rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm leading-relaxed text-fg">
									{serverError} Please try again in a moment.
								</p>
							{/if}

							<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<Button type="submit" variant="accent" disabled={status === 'submitting'} class="sm:min-w-44">
									{#if status === 'submitting'}
										<span aria-hidden="true" class="size-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg"></span>
										Booking…
									{:else}
										Book a call
									{/if}
								</Button>
								<p class="text-sm text-secondary">We reply to every request personally.</p>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
