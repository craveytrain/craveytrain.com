import html from 'eslint-plugin-html'
import globals from 'globals'
import babelParser from '@babel/eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

export default [
	{
		ignores: [
			'**/package.json',
			'**/package-lock.json',
			'**/.vscode',
			'**/_site',
			'**/_themes',
			'**/slides',
		],
	},
	...compat.extends('eslint:recommended', 'prettier'),
	{
		plugins: {
			html,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},

			parser: babelParser,
			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				requireConfigFile: false,

				babelOptions: {
					plugins: ['@babel/plugin-syntax-import-assertions'],
				},
			},
		},
	},
]
