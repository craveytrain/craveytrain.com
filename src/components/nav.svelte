<script>
	import Logo from '../img/logo.svg'
	import Search from '../img/search.svg'

	export let segment
</script>

<style>
	nav {
		background: var(--text-color);
		color: var(--bg-color);
		padding: 0 var(--main-padding-horz);
	}

	ul {
		position: relative;
		display: flex;
		list-style: none;
		justify-content: space-between;
		margin: 0;
	}

	li {
		display: flex;
		align-content: center;
	}

	a {
		display: flex;
		color: inherit;
		text-decoration: none;
		align-self: center;
		padding: 9px 0;
	}

	.logo {
		padding: 0;
	}
</style>

<nav>
	<ul>
		<li>
			<a class="logo" aria-current={segment === undefined ? 'page' : undefined} href="/" rel="prefetch">
				<Logo />
			</a>
		</li>
		<li>
			<a aria-current={segment === 'posts' ? 'page' : undefined} href="/posts" rel="prefetch">Posts</a>
		</li>
		<li>
			<a aria-current={segment === 'about' ? 'page' : undefined} href="/about" rel="prefetch">About</a>
		</li>
		<li>
			<a aria-current={segment === 'contact' ? 'page' : undefined} href="/contact" rel="prefetch">Contact</a>
		</li>
		<li>
			<a href="https://www.google.com/search?sitesearch=craveytrain.com">
				<Search />
			</a>
		</li>
	</ul>
</nav>
