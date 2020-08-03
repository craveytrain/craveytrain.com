import { sortByLatest } from '../../utils/sort-by-latest'
import { getPosts } from '../../utils/get-posts'

export async function get(req, res) {
	const posts = (await getPosts()).sort(sortByLatest)

	res.writeHead(200, {
		'Content-Type': 'application/json',
	})

	res.end(JSON.stringify(posts))
}
