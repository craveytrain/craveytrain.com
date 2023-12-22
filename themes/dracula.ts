import { Kinds, Palette, Themes } from './theme.js'

const palette: Palette = {
	narwhalGrey: {
		l: 13.55,
		c: 0.031,
		h: 271.82,
	},
	morningSnow: {
		l: 97.7,
		c: 0.008,
		h: 106.55,
	},
	diva: {
		l: 74.68,
		c: 0.146,
		h: 302.21,
	},
	lotion: {
		l: 98.85,
		c: 0.004,
		h: 106.47,
	},
	nightSky: {
		l: 28.43,
		c: 0.022,
		h: 277.09,
	},
	placebo: {
		l: 93.12,
		c: 0,
		h: 0,
	},
}

export const dracula: Themes = {
	dark: {
		kind: Kinds.THEME,
		bg: palette.narwhalGrey,
		text: palette.morningSnow,
		heading: palette.morningSnow,
		accent: palette.diva,
		accent2: palette.placebo,
	},
	light: {
		kind: Kinds.THEME,
		bg: palette.lotion,
		text: palette.narwhalGrey,
		heading: palette.nightSky,
		accent: palette.diva,
		accent2: palette.placebo,
	},
}
