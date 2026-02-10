module.exports = {
	layout: 'post',
	tags: ['post'],
	eleventyComputed: {
		year: data => {
			const date = data.date || data.page.date
			return new Date(date).getFullYear()
		},
	},
}
