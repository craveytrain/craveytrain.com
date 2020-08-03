import { getTags } from '../../utils/get-tags'
import { sendPage } from '../_utils/send-page'

export async function get(req, res) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params

	const tags = await getTags()
	const tag = tags.find(tag => tag.slug === slug)

	sendPage(res, tag)
}
