import { getAllPages } from './get-all-pages'
import { generateTagModel } from './generate-tag-model'

export async function getPosts() {
	// get all the posts
	const posts = await getAllPages('content/posts')

	// convert tags to a model structure
	return posts.map(post => ({
		...post,
		...(post.tags && { tags: post.tags.map(generateTagModel) }),
	}))
}
