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
	eleventyConfig.addPlugin(syntaxHighlight, {
		preAttributes: {
			class: 'line-numbers',
			'data-language': function ({ language }) {
				return language || 'text'
			},
		},
	})

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

	// month and year only (e.g., "Jan 2025")
	eleventyConfig.addFilter('monthYear', dateObj =>
		dateObj
			? dateObj.toLocaleDateString('en-US', {
					month: 'short',
					year: 'numeric',
				})
			: dateObj
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

	// splitBySections filter - parse HTML content by H2 tags
	eleventyConfig.addFilter('splitBySections', function (content) {
		// Split HTML content by H2 tags, return array of {label, content}
		const sections = []
		const h2Regex = /<h2[^>]*>(.*?)<\/h2>/gi
		const parts = content.split(h2Regex)

		// parts[0] is content before first H2 (usually empty)
		// parts[1] is first H2 text, parts[2] is content after first H2
		// parts[3] is second H2 text, parts[4] is content after second H2, etc.
		for (let i = 1; i < parts.length; i += 2) {
			const label = parts[i].trim()
			const sectionContent = parts[i + 1] || ''
			sections.push({ label, content: sectionContent.trim() })
		}

		return sections
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
