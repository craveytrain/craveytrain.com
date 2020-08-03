import { resolve } from 'path'
import { readFile } from 'fs/promises'
import { convertMD2HTML } from './convert-md-to-html'
// import marked, { Renderer } from 'marked'
import grayMatter from 'gray-matter'

// const renderer = new Renderer()

export async function getFileContents(slug, context) {
	const post = await readFile(resolve(context, `${slug}.md`), 'utf-8')

	const { data, content } = grayMatter(post)

	// render html from string
	const { contents: html } = await convertMD2HTML(content)

	return { data, html }
}
