export const getWebmentionsForUrl = (webmentions, url) => {
	return webmentions.webmentions.filter(entry => entry['wm-target'] === url)
}

export const webmentionsByType = (mentions = [], mentionType) => {
	return mentions.filter(entry => !!entry[mentionType])
}
