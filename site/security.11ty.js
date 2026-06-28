// Serves /.well-known/security.txt (RFC 9116).
// Expires is mandatory and must stay in the future, so we compute it at build
// time (one year out) rather than hardcode a date that silently goes stale.
export const data = {
	permalink: '/.well-known/security.txt',
	eleventyExcludeFromCollections: true,
}

export function render({ metadata }) {
	const base = metadata.url.replace(/\/$/, '')
	const expires = new Date()
	expires.setFullYear(expires.getFullYear() + 1)

	return `Contact: ${base}/contact/
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: ${base}/.well-known/security.txt
`
}
