<script>
	import { generateTitle } from '../utils/generate-title'
	import Hero from '../components/hero.svelte'

	let title = generateTitle()
</script>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background: var(--color-trans-gray);
		margin-left: calc(-1 * var(--main-padding-horz));
		margin-right: calc(-1 * var(--main-padding-horz));
	}

	article {
		flex: 1 1 250px;
		margin: 30px 50px;
	}

	h2 {
		font-weight: 800;
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Hero />
<section>
	<article>
		<h2>Github</h2>
		<p>
			On the intenet is where I was raised, on
			<a href="https://github.com/">Github</a>
			is where I spend most my days. One of my fav projects is my
			<a href="https://github.com/craveytrain/dotfiles">dotfiles</a>
			.
		</p>
	</article>

	<article>
		<h2>CodePen</h2>
		<p>
			I've rekindled my love for
			<a href="https://codepen.io/">CodePen</a>
			. I'm maintaining a
			<a href="https://codepen.io/craveytrain/pen/xaeXBm">sample recipe card</a>
			for a web development course I'm teaching.
		</p>
	</article>

	<article>
		<h2>LinkedIn</h2>
		<p>
			For a more professional view of my career, I maintain my
			<a href="https://www.linkedin.com/in/craveytrain/">LinkedIn profile page</a>
			.
		</p>
	</article>
</section>
