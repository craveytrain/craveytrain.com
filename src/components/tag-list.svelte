<script>
	export let tags
</script>

<style>
	ul {
		display: flex;
		margin: 0;
		list-style: none;
	}

	a {
		display: block;
		background: var(--secondary-bg-color);
		border: 2px solid transparent;
		padding: 0.1rem 0.5rem;
		margin-right: 0.5rem;
		text-decoration: none;
		border-radius: 2px;
	}

	a:hover {
		color: var(--text-color);
		border-color: var(--link-hover-color);
	}
</style>

<ul>
	{#each tags as { slug, title }}
		<li>
			<a rel="prefetch" href="/tags/{slug}">{title}</a>
		</li>
	{/each}
</ul>
