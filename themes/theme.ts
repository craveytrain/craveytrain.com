export enum Kinds {
	THEME = 'Theme',
}

export type Color = {
	h: number
	s: number
	l: number
	a?: number
}

export interface Palette {
	[key: string]: Color
}

export interface Theme {
	kind: Kinds.THEME
	bg: Color
	text: Color
	heading: Color
	accent: Color
	accent2: Color
}

export interface Themes {
	[key: string]: Theme
}
