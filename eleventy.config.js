const svgContents = require('eleventy-plugin-svg-contents')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const contentTags = require('./utils/content-tags')
const optimizeCSS = require('./utils/optimize-css')
const tagList = require('./utils/tag-list')
const excerpt = require('eleventy-plugin-excerpt')
const filters = require('./utils/webmentions')
const pluralize = require('./utils/pluralize.js')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'static/img': 'img' })
	eleventyConfig.addPassthroughCopy({ 'static/favicons': 'favicons' })
	eleventyConfig.addPassthroughCopy({ 'static/cv': 'cv' })
	eleventyConfig.addPassthroughCopy({ 'static/slides': 'slides' })

	// merge it deep
	eleventyConfig.setDataDeepMerge(true)

	// handle SVG contents
	eleventyConfig.addPlugin(svgContents)
	// filter and sort nav items
	eleventyConfig.addPlugin(eleventyNavigationPlugin)
	// syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight)
	// generate RSS
	eleventyConfig.addPlugin(pluginRss)
	// add excerpt tag
	eleventyConfig.addPlugin(excerpt)

	// pretty date
	eleventyConfig.addFilter('prettyDate', dateObj => dateObj.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}))

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', dateObj => dateObj.toISOString())

	Object.keys(filters).forEach(filterName => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})

	eleventyConfig.addFilter('absoluteUrl', pluginRss.absoluteUrl)
	eleventyConfig.addFilter('htmlToAbsoluteUrls', pluginRss.htmlToAbsoluteUrls)
	eleventyConfig.addFilter('dateToRfc3339', pluginRss.dateToRfc3339)

	eleventyConfig.addFilter('pluralize', pluralize)


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
