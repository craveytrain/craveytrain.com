<script>
	import Logo from '../img/logo.svg'

	export let segment
</script>

<style>
	nav {
		padding: var(--main-padding-vert) var(--main-padding-horz);
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
	}

	li {
		display: flex;
		padding-left: 20px;
	}

	a {
		display: block;
		color: inherit;
		text-decoration: none;
		align-self: center;
	}

	.home {
		padding: 0;
		flex: 1 1 auto;
	}

	.logo {
		padding: 0;
	}
</style>

<nav>
	<ul>
		<li class="home">
			<a class="logo" aria-current={segment === undefined ? 'page' : undefined} href="/" rel="prefetch">
				<Logo />
			</a>
		</li>
		<li>
			<a aria-current={segment === 'posts' ? 'page' : undefined} href="/posts" rel="prefetch">posts</a>
		</li>
		<li>
			<a aria-current={segment === 'about' ? 'page' : undefined} href="/about" rel="prefetch">about</a>
		</li>
		<li>
			<a aria-current={segment === 'contact' ? 'page' : undefined} href="/contact" rel="prefetch">contact</a>
		</li>
	</ul>
</nav>
