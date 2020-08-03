import { getFileContents } from '../utils/get-file-contents'
import { sendPage } from './_utils/send-page'

export async function get(req, res) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params

	const { data, html } = await getFileContents(slug, 'content')

	const payload = { html, slug, ...data }

	return sendPage(res, payload)
}
