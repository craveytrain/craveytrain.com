import contentTags from './content-tags.js'

const PUBLIC_LIST_EXCLUSIONS = new Set(['colophon'])

export default function (collection) {
	const tagSet = new Set()
	collection.getAll().forEach(function (item) {
		if ('tags' in item.data) {
			const tags = contentTags(item.data.tags)

			for (const tag of tags) {
				if (!PUBLIC_LIST_EXCLUSIONS.has(tag)) {
					tagSet.add(tag)
				}
			}
		}
	})

	// returning an array in addCollection works in Eleventy 0.5.3
	return [...tagSet].sort()
}
