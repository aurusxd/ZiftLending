import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 100, email: 254, date: 10, time: 5, timezone: 64 } as const;

type Lead = Record<keyof typeof LIMITS, string>;

function parseLead(body: unknown): Lead | null {
	if (!body || typeof body !== 'object') return null;
	const raw = body as Record<string, unknown>;
	const lead = {} as Lead;

	for (const key of Object.keys(LIMITS) as (keyof Lead)[]) {
		const value = typeof raw[key] === 'string' ? raw[key].trim() : '';
		if (!value || value.length > LIMITS[key]) return null;
		lead[key] = value;
	}

	if (!EMAIL_RE.test(lead.email)) return null;
	if (!/^\d{4}-\d{2}-\d{2}$/.test(lead.date) || !/^\d{2}:\d{2}$/.test(lead.time)) return null;
	return lead;
}

const escapeHtml = (s: string) =>
	s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);

export const POST: RequestHandler = async ({ request, fetch }) => {
	const token = env.TELEGRAM_BOT_TOKEN;
	const chatId = env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) {
		return json({ ok: false, error: 'Lead delivery is not configured.' }, { status: 503 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ ok: false, error: 'Request body must be JSON.' }, { status: 400 });
	}

	// Honeypot: real visitors never fill the hidden `company` field.
	if (body && typeof body === 'object' && (body as Record<string, unknown>).company) {
		return json({ ok: true });
	}

	const lead = parseLead(body);
	if (!lead) {
		return json({ ok: false, error: 'Some fields are missing or invalid.' }, { status: 422 });
	}

	const text = [
		'<b>New discovery call request</b>',
		`Name: ${escapeHtml(lead.name)}`,
		`Email: ${escapeHtml(lead.email)}`,
		`When: ${lead.date} ${lead.time} (${escapeHtml(lead.timezone)})`
	].join('\n');

	const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
	});

	if (!res.ok) {
		return json({ ok: false, error: 'Could not deliver the request.' }, { status: 502 });
	}
	return json({ ok: true });
};
