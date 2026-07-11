export default function contentTags(tags) {
	return tags.filter(tag => {
		switch (tag) {
			// structural tags, never content topics
			case 'all':
			case 'nav':
			case 'foot':
			case 'now':
			case 'post':
				return false
		}

		return true
	})
}
