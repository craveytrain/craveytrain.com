import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import html from 'eslint-plugin-html'
import globals from 'globals'

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
	js.configs.recommended,
	prettier,
	{
		plugins: {
			html,
		},

		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},

			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
]
