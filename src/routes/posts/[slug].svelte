<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`posts/${params.slug}.json`)
		const page = await res.json()

		if (res.status === 200) {
			return { page }
		} else {
			this.error(res.status, page.message)
		}
	}
</script>

<script>
	import { generateTitle } from '../../utils/generate-title'

	export let page
	export let title = generateTitle(page.title)
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{page.title}</h1>

<div class="content">
	{@html page.html}
</div>
