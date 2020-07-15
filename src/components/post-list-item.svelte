<script>
	import TagList from './tag-list.svelte'
	import TimeStamp from './time-stamp.svelte'

	export let title
	export let date
	export let tags
	export let slug
</script>

<style>
	li {
		list-style: none;
		margin-bottom: 1.5rem;
	}

	h2 {
		margin: 0;
	}

	a {
		text-decoration: none;
	}
</style>

<li>
	<TimeStamp {date} />
	<h2>
		<a href="/posts/{slug}">{title}</a>
	</h2>
	{#if tags}
		<TagList {tags} />
	{/if}
</li>
