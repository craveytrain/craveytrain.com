<script>
	import Nav from '../components/nav.svelte'
	import Footer from '../components/footer.svelte'

	export let segment
</script>

<style>
	div {
		min-width: var(--min-width);
		max-width: var(--max-width);
		min-height: 100vh;
		margin: auto;
	}

	main {
		padding: var(--main-padding-vert) var(--main-padding-horz) 0;
		margin-top: 2rem;
	}
</style>

<div>
	<Nav {segment} />

	<main>
		<slot />
	</main>

	<Footer />
</div>
