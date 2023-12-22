import svgContents from 'eleventy-plugin-svg-contents'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import pluginRss from '@11ty/eleventy-plugin-rss'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import contentTags from './utils/content-tags.js'
import optimizeCSS from './utils/optimize-css.js'
import tagList from './utils/tag-list.js'
import excerpt from 'eleventy-plugin-excerpt'
import { getWebmentionsForUrl, webmentionsByType } from './utils/webmentions.js'
import pluralize from './utils/pluralize.js'

export default async function (eleventyConfig) {
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
	eleventyConfig.addFilter('prettyDate', dateObj =>
		dateObj.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	)

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', dateObj => dateObj.toISOString())

	eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl)
	eleventyConfig.addFilter('webmentionsByType', webmentionsByType)

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
