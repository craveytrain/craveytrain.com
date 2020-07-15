import { siteTitle } from '../config'

export function generateTitle(...titles) {
	return [...titles, siteTitle].join(' | ')
}
