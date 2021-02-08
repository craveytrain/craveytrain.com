const svgContents = require('eleventy-plugin-svg-contents')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const postcss = require('postcss')

function contentTags(tags) {
	return tags.filter(tag => {
		switch (tag) {
			// this list should match the `filter` list in tags.njk
			case 'all':
			case 'nav':
			case 'foot':
			case 'post':
				return false
		}

		return true
	})
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'static/img': 'img' })
	eleventyConfig.addPassthroughCopy({ 'static/favicons': 'favicons' })
	eleventyConfig.addPassthroughCopy({ 'static/cv': 'cv' })
	eleventyConfig.addPassthroughCopy({ 'static/slides': 'slides' })

	// merge it deep
	eleventyConfig.setDataDeepMerge(true)

	// handle svg contents
	eleventyConfig.addPlugin(svgContents)
	// filter and sort nav items
	eleventyConfig.addPlugin(eleventyNavigationPlugin)
	// syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight)
	// generate RSS
	eleventyConfig.addPlugin(pluginRss)

	// postcss to inline css
	eleventyConfig.addPairedAsyncShortcode('postcss', async code =>
		postcss([require('postcss-nesting'), require('postcss-csso')])
			.process(code, { from: undefined })
			.then(result => {
				return result.css
			})
	)

	// pretty date
	eleventyConfig.addFilter('prettyDate', dateObj => {
		return dateObj.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	})

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', dateObj => {
		return dateObj.toISOString()
	})

	// generate tags
	eleventyConfig.addCollection('tagList', function (collection) {
		const tagSet = new Set()
		collection.getAll().forEach(function (item) {
			if ('tags' in item.data) {
				const tags = contentTags(item.data.tags)

				for (const tag of tags) {
					tagSet.add(tag)
				}
			}
		})

		// returning an array in addCollection works in Eleventy 0.5.3
		return [...tagSet].sort()
	})

	eleventyConfig.addFilter('contentTags', contentTags)

	return {
		dir: {
			data: '../data',
			// set src dir to `site`
			input: 'site',
			includes: '../includes',
			layouts: '../layouts',
		},
	}
}
