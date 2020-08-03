const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const slug = require('remark-slug')
const highlight = require('rehype-prism')

const processor = unified().use(markdown).use(slug).use(remark2rehype).use(highlight).use(html)

export async function convertMD2HTML(content) {
	return processor.process(content)
}
