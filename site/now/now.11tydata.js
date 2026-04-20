const datedEntry = /^\d{4}-\d{2}-\d{2}$/

const prettyDate = date =>
	new Date(date).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC',
	})

export default {
	layout: 'now',
	'override:tags': ['now'],
	eleventyComputed: {
		title: data =>
			datedEntry.test(data.page.fileSlug)
				? `Now, ${prettyDate(data.date)}`
				: data.title,
	},
}
