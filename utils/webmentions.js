export const getWebmentionsForUrl = (webmentions, url) => {
	return webmentions.webmentions.filter(entry => {
		const targetPath = new URL(entry['wm-target']).pathname
		return targetPath === url
	})
}

export const webmentionsByType = (mentions = [], mentionType) => {
	return mentions.filter(entry => !!entry[mentionType])
}
