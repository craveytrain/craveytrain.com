import { sendPage } from '../_utils/send-page'
import { getFileContents } from '../../utils/get-file-contents'

export async function get(req, res) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params

	const { data, html } = await getFileContents(slug, 'content/posts')

	const payload = { html, slug, ...data }

	return sendPage(res, payload)
}
