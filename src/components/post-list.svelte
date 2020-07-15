<script>
	import PostListItem from './post-list-item.svelte'
	export let posts
</script>

<ul>
	{#each posts as { title, date, tags, slug }}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<PostListItem {title} {date} {tags} {slug} />
	{/each}
</ul>
