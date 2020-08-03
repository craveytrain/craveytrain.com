<script context="module">
	export function preload() {
		return this.fetch(`tags.json`)
			.then(r => r.json())
			.then(tags => {
				return { tags }
			})
	}
</script>

<script>
	import { generateTitle } from '../../utils/generate-title'

	export let tags
	export let title = generateTitle('Tags')
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>Tags</h1>

<ul>
	{#each tags as tag}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li>
			<a rel="prefetch" href="tags/{tag.slug}">{tag.title} ({tag.posts.length})</a>
		</li>
	{/each}
</ul>
