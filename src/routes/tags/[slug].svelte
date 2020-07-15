<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`tags/${params.slug}.json`)

		if (res.status === 200) {
			return res
				.json()
				.then(tag => ({
					...tag,
					posts: tag.posts.map(p => ({
						...p,
						date: new Date(p.date),
					})),
				}))
				.then(tag => ({ tag }))
		} else {
			this.error(res.status, tag.message)
		}
	}
</script>

<script>
	import { generateTitle } from '../../utils/generate-title'
	import PostList from '../../components/post-list.svelte'

	export let tag
	export let title = generateTitle(`${tag.title} posts`)
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{tag.title} posts</h1>

<PostList posts={tag.posts} />
