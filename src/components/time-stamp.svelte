<script>
	export let date
	export let formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
</script>

<style>
	time {
		color: var(--secondary-text-color);
	}
</style>

<time class="timestamp" datetime={date}>{formattedDate}</time>
