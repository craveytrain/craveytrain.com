import { siteTitle, siteUrl, siteDescription } from '../config'
import { getPosts } from '../utils/get-posts'
import { sortByLatest } from '../utils/sort-by-latest'

const formatJSONFeed = posts => ({
	version: 'https://jsonfeed.org/version/1',
	title: siteTitle,
	description: siteDescription,
	home_page_url: siteUrl,
	feed_url: `${siteUrl}/feed.json`,
	icon: `${siteUrl}/favicons/android-chrome-512x512.png`,
	items: posts.map(post => ({
		id: `${siteUrl}/posts/${post.slug}`,
		title: post.title,
		url: `${siteUrl}/posts/${post.slug}`,
		content_html: post.html,
		date_published: new Date(post.date).toISOString(),
		tags: post.tags,
	})),
})

export async function get(req, res) {
	res.writeHead(200, {
		'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
		'Content-Type': 'application/json',
	})

	const posts = (await getPosts()).sort(sortByLatest)

	res.end(JSON.stringify(formatJSONFeed(posts)))
}
