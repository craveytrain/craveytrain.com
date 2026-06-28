// Serves /.well-known/webfinger as a static JRD (RFC 7033), replacing the
// netlify-plugin-mastodon-alias redirect. This makes mike@craveytrain.com (and
// any *@craveytrain.com) resolve to the hachyderm Mastodon account.
//
// It returns the same document regardless of the ?resource= query, which is
// fine for a single-identity personal domain. The avatar rel is intentionally
// omitted: it points at a hashed media URL that changes whenever the avatar is
// re-uploaded, and nothing in discovery needs it (clients read the avatar from
// the actor document found via the `self` link). Content-Type and CORS headers
// are set in netlify.toml.
export const data = {
	permalink: '/.well-known/webfinger',
	// WebFinger has no file extension by design; opt out of Eleventy's warning.
	eleventyAllowMissingExtension: true,
	eleventyExcludeFromCollections: true,
}

export function render() {
	return JSON.stringify({
		subject: 'acct:craveytrain@hachyderm.io',
		aliases: [
			'https://hachyderm.io/@craveytrain',
			'https://hachyderm.io/users/craveytrain',
		],
		links: [
			{
				rel: 'http://webfinger.net/rel/profile-page',
				type: 'text/html',
				href: 'https://hachyderm.io/@craveytrain',
			},
			{
				rel: 'self',
				type: 'application/activity+json',
				href: 'https://hachyderm.io/users/craveytrain',
			},
		],
	})
}
