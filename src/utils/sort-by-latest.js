export const sortByLatest = (post1, post2) => {
	const date1 = new Date(post1.date)
	const date2 = new Date(post2.date)

	return date2 - date1
}
