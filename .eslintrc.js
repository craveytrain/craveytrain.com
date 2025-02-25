module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		es2021: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		requireConfigFile: false,
		babelOptions: {
			plugins: ['@babel/plugin-syntax-import-assertions'],
		},
	},
	plugins: ['html'],
	extends: [
		'eslint:recommended', // start off with a good base
		'prettier', // make it look purty
	],
}
