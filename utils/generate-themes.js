function serializeThemes(tree, path = []) {
	return Object.entries(tree).reduce((acc, [name, theme]) => {
		if (Object.hasOwn(theme, 'kind')) {
			const { kind, ...themeData } = theme // eslint-disable-line no-unused-vars
			acc.push([[...path, name], themeData])
		} else {
			return serializeThemes(theme, [...path, name])
		}

		return acc
	}, [])
}

function lchToCSS({ l, c, h, a }) {
	const alphaString = a ? ` / ${a}%` : ''
	return `oklch(${l}% ${c} ${h}${alphaString})`
}

function generateCSSVars([name, theme]) {
	const customPropsString = Object.entries(theme)
		.map(([prop, value]) => `\t--${prop}: ${lchToCSS(value)};`)
		.join('\n')

	return `[data-theme='${name.join(
		'-'
	)}'] {\n${customPropsString}\n\tbackground: var(--bg);\n\tcolor: var(--text);\n}`
}

let themes = []
let themeString = ''
export default async function generateThemes() {
	if (!themes.length) {
		themes = serializeThemes(await import('../_themes/index.js'))
		themeString = themes.map(generateCSSVars).join('\n')
	}

	return themeString
}
