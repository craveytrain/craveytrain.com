import { basename, extname } from 'path'
import { readdir } from 'fs/promises'
import { getFileContents } from './get-file-contents'

export async function getAllPages(context) {
	const posts = await readdir(context)

	return Promise.all(
		posts.map(async fileName => {
			const slug = basename(fileName, extname(fileName))
			const { data, html } = await getFileContents(slug, context)

			//builds data
			return { html, slug, ...data }
		})
	)
}
