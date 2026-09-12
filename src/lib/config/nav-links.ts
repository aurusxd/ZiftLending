export type SectionId = 'home' | 'about' | 'services' | 'process' | 'projects' | 'contact';

export interface NavLink {
	label: string;
	section: SectionId;
}

export const NAV_LINKS: NavLink[] = [
	{ label: 'Home', section: 'home' },
	{ label: 'Services', section: 'services' },
	{ label: 'Projects', section: 'projects' },
	{ label: 'About', section: 'about' }
];

export const CONTACT_SECTION: SectionId = 'contact';
