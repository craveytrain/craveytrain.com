<style>
	section {
		display: flex;
		align-items: center;
		padding-top: calc(40vw + var(--text-vert-rhythm));
		margin-bottom: var(--text-vert-rhythm);
		background-image: url('/img/illustration.png');
		background-repeat: no-repeat;
		background-size: 40vw;
		background-position: top center;
		font-size: 24px;
		font-family: 'Nixie One', serif;
		text-align: center;
	}

	@media (min-width: 750px) {
		section {
			min-height: calc(300px + var(--text-vert-rhythm));
			padding-right: 325px;
			padding-top: 0;
			margin-bottom: 0;
			background-position-x: right;
			background-size: unset;
			text-align: initial;
		}
	}

	p {
		margin: 0;
	}

	span {
		display: block;
		margin: 0;
		padding: 0;
		font-family: var(--title-family);
		font-size: var(--title-size);
		font-weight: var(--title-weight);
	}
</style>

<section>
	<p>
		<span>Hey y'all,</span>
		my name is
		<strong>Mike Cravey</strong>
		and I'm a father, husband, and geek in Lake Jackson, TX.
	</p>
</section>
