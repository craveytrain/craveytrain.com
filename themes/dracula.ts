import { Kinds, Palette, Themes } from './theme'

const palette: Palette = {
	narwhalGrey: {
		h: 231,
		s: 62,
		l: 5,
	},
	morningSnow: {
		h: 60,
		s: 30,
		l: 96,
	},
	diva: {
		h: 265,
		s: 89,
		l: 78,
	},
	lotion: {
		h: 60,
		s: 30,
		l: 98,
	},
	nightSky: {
		h: 231,
		s: 15,
		l: 18,
	},
	placebo: {
		h: 0,
		s: 0,
		l: 91,
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
