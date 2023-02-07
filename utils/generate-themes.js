function camelCaseify(strings) {
	return strings
		.map((string, i) => {
			if (i > 0) {
				return string.replace(/^[a-z]/, match => match.toUpperCase())
			}

			return string
		})
		.join('')
}

function serializeThemes(tree, path = []) {
	return Object.entries(tree).reduce((acc, [name, theme]) => {
		if (Object.hasOwn(theme, 'kind')) {
			const { kind: _, ...themeData } = theme
			acc.push([[...path, name], themeData])
		} else {
			return serializeThemes(theme, [...path, name])
		}

		return acc
	}, [])
}

function hslToCSS({ h, s, l, a }) {
	const alphaString = a ? ` / ${a}%` : ''
	return `hsl(${h} ${s}% ${l}%${alphaString})`
}

function generateCSSVars([name, theme]) {
	// const customProps = Object.keys(theme)
	// console.log('vars', customProps)
	const customPropsString = Object.entries(theme)
		.map(([prop, value]) => `\t--${prop}: ${hslToCSS(value)};`)
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
