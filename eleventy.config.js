import fs from 'fs/promises'
import svgContents from 'eleventy-plugin-svg-contents'
import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import contentTags from './utils/content-tags.js'
import optimizeCSS from './utils/optimize-css.js'
import tagList from './utils/tag-list.js'
import { getWebmentionsForUrl, webmentionsByType } from './utils/webmentions.js'
import pluralize from './utils/pluralize.js'

const metadata = await fs
	.readFile('./data/metadata.json', 'utf8')
	.then(contents => JSON.parse(contents))

const feedDetails = {
	collection: {
		name: 'post', // iterate over `collections.posts`
		limit: 0, // 0 means no limit
	},
	metadata: {
		language: 'en',
		title: metadata.title,
		subtitle: metadata.description,
		base: metadata.url,
		author: {
			name: metadata.author.name,
			email: '', // Optional
		},
	},
}

export default async function (eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
	eleventyConfig.setInputDirectory('site')

	// This is relative to your input directory!
	eleventyConfig.setIncludesDirectory('../includes')

	// This is relative to your input directory!
	eleventyConfig.setLayoutsDirectory('../layouts')

	// This is relative to your input directory!
	eleventyConfig.setDataDirectory('../data')

	eleventyConfig.addPassthroughCopy({ 'static/img': 'img' })
	eleventyConfig.addPassthroughCopy({ 'static/favicons': 'favicons' })
	eleventyConfig.addPassthroughCopy({ 'static/cv': 'cv' })
	eleventyConfig.addPassthroughCopy({ 'static/slides': 'slides' })
	eleventyConfig.addPassthroughCopy({ 'static/fonts': 'fonts' })
	eleventyConfig.addPassthroughCopy({ 'static/css': 'css' })

	// merge it deep
	eleventyConfig.setDataDeepMerge(true)

	// handle SVG contents
	eleventyConfig.addPlugin(svgContents)
	// filter and sort nav items
	eleventyConfig.addPlugin(eleventyNavigationPlugin)
	// syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight)

	// pretty date
	eleventyConfig.addFilter('prettyDate', dateObj =>
		dateObj
			? dateObj.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				})
			: dateObj
	)

	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', dateObj =>
		dateObj ? dateObj.toISOString() : dateObj
	)

	eleventyConfig.addFilter('getWebmentionsForUrl', getWebmentionsForUrl)
	eleventyConfig.addFilter('webmentionsByType', webmentionsByType)

	eleventyConfig.addFilter('pluralize', pluralize)

	// generate tags
	eleventyConfig.addCollection('tagList', tagList)

	eleventyConfig.addFilter('contentTags', contentTags)

	// head filter - get first N items from array
	eleventyConfig.addFilter('head', (array, n) => {
		if (!Array.isArray(array) || array.length === 0) return []
		if (n < 0) {
			return array.slice(n)
		}
		return array.slice(0, n)
	})

	eleventyConfig.addTransform('optimizeCSS', optimizeCSS)

	eleventyConfig.addPlugin(feedPlugin, {
		...feedDetails,
		type: 'rss', // or "rss", "json"
		outputPath: '/feed.xml',
	})

	eleventyConfig.addPlugin(feedPlugin, {
		...feedDetails,
		type: 'json', // or "rss", "json"
		outputPath: '/feed.json',
	})
}
