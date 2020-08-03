import { kebabize } from './kebabize'

export const generateTagModel = tag => ({
	title: tag,
	slug: kebabize(tag),
})
