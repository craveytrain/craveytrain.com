export default function pluralize(str, count, pluralOverride) {
	// if count is singular, return singular form
	if (count === 1) {
		return str
	}

	// if plural override provided, use it
	if (pluralOverride) {
		return pluralOverride
	}

	// switch for last character of string
	switch (str.at(-1)) {
		case 's':
		case 'x':
		case 'z':
			return `${str}es`

		default:
			return `${str}s`
	}
}
