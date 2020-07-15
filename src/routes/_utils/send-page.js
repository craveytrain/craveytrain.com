export function sendPage(res, payload) {
	try {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		})

		res.end(JSON.stringify(payload))
	} catch (err) {
		if (err.code === 'ENOENT') {
			res.writeHead(404, {
				'Content-Type': 'application/json',
			})

			res.end(
				JSON.stringify({
					message: `Not found`,
				})
			)
		}

		return
	}
}
