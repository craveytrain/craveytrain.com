export default {
	eleventyComputed: {
		pageTitle: data => {
			if (data.title) {
				return `${data.title} — craveytrain.com`
			}
			return 'Craveytrain'
		},
	},
}