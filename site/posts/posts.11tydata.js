import contentTags from '../../utils/content-tags.js'
import { getWebmentionsForUrl } from '../../utils/webmentions.js'

export default {
	layout: 'post',
	tags: ['post'],
	eleventyComputed: {
		contentTags: data => contentTags(data.tags),
		mentions: data => getWebmentionsForUrl(data.webmentions, data.page.url),
		year: data => {
			const date = data.date || data.page.date
			return new Date(date).getFullYear()
		},
	},
}
