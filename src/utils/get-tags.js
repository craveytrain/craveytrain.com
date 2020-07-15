import { getAllPages } from './get-all-pages'
import { generateTagModel } from './generate-tag-model'

export async function getTags() {
	const posts = await getAllPages('content/posts')

	// collect tags
	const tags = posts.reduce((coll, post) => {
		if (post.tags) {
			post.tags.forEach(tag => {
				if (!coll[tag]) {
					coll[tag] = []
				}

				// remove tags from post
				delete post.tags

				coll[tag].push(post)
			})
		}

		return coll
	}, {})

	// sort tags
	return Object.keys(tags)
		.sort((a, b) => a - b)
		.map(tag => ({
			...generateTagModel(tag),
			posts: tags[tag],
		}))
}
