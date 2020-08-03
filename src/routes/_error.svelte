<script>
	import { generateTitle } from '../utils/generate-title'

	export let error

	export let title = generateTitle(error.message)

	// eslint-disable-next-line no-undef
	const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{error.message}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
