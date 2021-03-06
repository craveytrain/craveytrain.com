const svgContents = require('eleventy-plugin-svg-contents')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const contentTags = require('./utils/content-tags')
const optimizeCSS = require('./utils/optimize-css')
const tagList = require('./utils/tag-list')

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
	eleventyConfig.addCollection('tagList', tagList)

	eleventyConfig.addFilter('contentTags', contentTags)
	eleventyConfig.addTransform('optimizeCSS', optimizeCSS)

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
