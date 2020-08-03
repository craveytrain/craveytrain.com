import { siteUrl, siteDescription, siteTitle } from '../config'
import { getPosts } from '../utils/get-posts'
import { sortByLatest } from '../utils/sort-by-latest'

export function formatRSSFeed(posts) {
	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
    <title><![CDATA[${siteTitle}]]></title>
    <link>${siteUrl}</link>
		<atom:link href="${siteUrl}/feed.rss" rel="self" type="application/rss+xml" />
  	<description><![CDATA[${siteDescription}]]></description>
  	<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
			<url>${siteUrl}/static/img/illustration.png</url>
			<title><![CDATA[${siteTitle}]]></title>
			<link>${siteUrl}</link>
    </image>
    ${posts
			.map(
				post => `
			<item>
				<title>${post.title}</title>
	      <link>${siteUrl}/posts/${post.slug}</link>
  	    <guid isPermaLink="false">${siteUrl}/posts//${post.slug}</guid>
				<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			</item>
    `
			)
			.join('\n')}
	</channel>
</rss>`
}

export async function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		'Content-Type': 'application/rss+xml',
	})

	const posts = (await getPosts()).sort(sortByLatest)

	const feed = formatRSSFeed(posts)
	res.end(feed)
}
