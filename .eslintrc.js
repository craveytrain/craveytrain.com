module.exports = {
	root: true,
	env: {
		commonjs: true,
		browser: true,
		es2021: true,
	},
	plugins: ['html'],
	extends: [
		'eslint:recommended', // start off with a good base
		'prettier', // make it look purty
	],
}
