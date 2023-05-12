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
function generateThemes() {
	if (!themes.length) {
		themes = serializeThemes(require('../_themes'))
		themeString = themes.map(generateCSSVars).join('\n')
	}

	return themeString
}

module.exports = generateThemes
