import { env } from 'process'

export async function handler(event) {
	let secret
	try {
		const { secret: _secret } = JSON.parse(event.body)
		secret = _secret
	} catch {
		return { statusCode: 400 }
	}

	if (secret !== env.WEBMENTION_IO_TOKEN) {
		return { statusCode: 401 }
	}

	try {
		const response = await fetch(
			'https://api.github.com/repos/craveytrain/craveytrain.com/dispatches',
			{
				method: 'POST',
				headers: { Authorization: `token ${env.GITHUB_WEBMENTION_TOKEN}` },
				body: '{ "event_type": "add-webmention" }',
			}
		).then(response => response.text())

		if (response) {
			return { statusCode: 500, body: response }
		}
		return { statusCode: 200, body: 'ok' }
	} catch (error) {
		return { statusCode: 500, body: error.message }
	}
}
