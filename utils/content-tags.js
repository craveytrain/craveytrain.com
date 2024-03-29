export default function contentTags(tags) {
	return tags.filter(tag => {
		switch (tag) {
			// this list should match the `filter` list in tags
			case 'all':
			case 'nav':
			case 'foot':
			case 'post':
				return false
		}

		return true
	})
}
