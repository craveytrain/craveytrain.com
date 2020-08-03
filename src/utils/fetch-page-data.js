export async function fetchPageData(path, pageId) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`${path}/${pageId}.json`)
	const data = await res.json()

	if (res.status === 200) {
		return { page: data }
	} else {
		this.error(res.status, data.message)
	}
}
