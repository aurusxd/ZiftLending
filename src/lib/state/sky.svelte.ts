/**
 * Shared state between the sky strip in the header (layer 1) and the hero layers below it.
 * The strip owns the video; every other layer only reacts to what it reports.
 */
export const sky = $state({
	/** Bumped on every lightning flash in the intro video. */
	strikes: 0,
	/** The intro video has played through; the ambient star layer is running. */
	ended: false
});
