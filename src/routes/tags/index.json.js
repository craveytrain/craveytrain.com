import { getTags } from '../../utils/get-tags'

export async function get(req, res) {
	const tags = await getTags()

	res.writeHead(200, {
		'Content-Type': 'application/json',
	})

	res.end(JSON.stringify(tags))
}
