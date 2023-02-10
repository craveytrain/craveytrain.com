module.exports = {
	getWebmentionsForUrl: (webmentions, url) => {
		return webmentions.webmentions.filter(entry => entry['wm-target'] === url)
	},
	webmentionsByType: (mentions, mentionType) => {
		return mentions.filter(entry => !!entry[mentionType])
	},
}
