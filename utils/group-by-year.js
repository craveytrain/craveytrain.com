export default function groupByYearDesc(posts) {
	const groups = new Map()

	for (const post of posts) {
		const year = post.data.year
		if (!groups.has(year)) {
			groups.set(year, [])
		}
		groups.get(year).push(post)
	}

	// Convert to array and sort years descending
	return Array.from(groups.entries())
		.sort(([a], [b]) => b - a)
		.map(([year, posts]) => ({ year, posts }))
}