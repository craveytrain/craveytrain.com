const { PurgeCSS } = require('purgecss')
const { minify } = require('csso')

const pattern = new RegExp('(?<=<style>).*?(?=</style>)', 'sg')
const purgeCSS = new PurgeCSS()

async function optimizeCSS(content, outputPath) {
	// if not an html file, skip
	if (!outputPath.endsWith('.html')) {
		return content
	}

	// pull all instances of style tags
	const styleTagsContents = [...content.matchAll(pattern)]
	// purge unused styles from css
	const purgedStyles = await purgeCSS.purge({
		// remove css from files so it doesn't falsely trigger matches
		content: [{ raw: content.replaceAll(pattern, ''), extension: 'html' }],
		css: styleTagsContents.map(tagContents => ({ raw: tagContents })),
	})

	// minify css
	const styles = purgedStyles.map(({ css }) => minify(css).css)

	// hack to loop through async generated contents
	let i = 0
	// replace old css with new css
	return content.replaceAll(pattern, () => styles[i++])
}

module.exports = optimizeCSS
