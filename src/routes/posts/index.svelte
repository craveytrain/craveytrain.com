<script context="module">
	export function preload() {
		return this.fetch(`posts.json`)
			.then(r => r.json())
			.then(posts =>
				posts.map(post => ({
					...post,
					date: new Date(post.date),
				}))
			)
			.then(posts => ({ posts }))
	}
</script>

<script>
	import { generateTitle } from '../../utils/generate-title'
	import PostList from '../../components/post-list.svelte'

	export let pageTitle = 'Posts'
	export let posts
	export let title = generateTitle(pageTitle)
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{pageTitle}</h1>

<PostList {posts} />
