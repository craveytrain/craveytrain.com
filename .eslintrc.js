module.exports = {
	root: true,
	env: {
		commonjs: true,
		browser: true,
		es6: true,
		'cypress/globals': true,
	},
	plugins: ['cypress', 'svelte3', 'html'],
	extends: ['eslint:recommended', 'prettier'],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
}
