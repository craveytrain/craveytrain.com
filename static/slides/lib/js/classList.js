/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
if (
	typeof document !== 'undefined' &&
	!('classList' in document.createElement('a'))
) {
	;(function (j) {
		var a = 'classList'

		var f = 'prototype'

		var m = (j.HTMLElement || j.Element)[f]

		var b = Object

		var k =
			String[f].trim ||
			function () {
				return this.replace(/^\s+|\s+$/g, '')
			}

		var c =
			Array[f].indexOf ||
			function (q) {
				var p = 0

				var o = this.length
				for (; p < o; p++) {
					if (p in this && this[p] === q) {
						return p
					}
				}
				return -1
			}

		var n = function (o, p) {
			this.name = o
			this.code = DOMException[o]
			this.message = p
		}

		var g = function (p, o) {
			if (o === '') {
				throw new n('SYNTAX_ERR', 'An invalid or illegal string was specified')
			}
			if (/\s/.test(o)) {
				throw new n(
					'INVALID_CHARACTER_ERR',
					'String contains an invalid character'
				)
			}
			return c.call(p, o)
		}

		var d = function (s) {
			var r = k.call(s.className)

			var q = r ? r.split(/\s+/) : []

			var p = 0

			var o = q.length
			for (; p < o; p++) {
				this.push(q[p])
			}
			this._updateClassName = function () {
				s.className = this.toString()
			}
		}

		var e = (d[f] = [])

		var i = function () {
			return new d(this)
		}
		n[f] = Error[f]
		e.item = function (o) {
			return this[o] || null
		}
		e.contains = function (o) {
			o += ''
			return g(this, o) !== -1
		}
		e.add = function (o) {
			o += ''
			if (g(this, o) === -1) {
				this.push(o)
				this._updateClassName()
			}
		}
		e.remove = function (p) {
			p += ''
			var o = g(this, p)
			if (o !== -1) {
				this.splice(o, 1)
				this._updateClassName()
			}
		}
		e.toggle = function (o) {
			o += ''
			if (g(this, o) === -1) {
				this.add(o)
			} else {
				this.remove(o)
			}
		}
		e.toString = function () {
			return this.join(' ')
		}
		if (b.defineProperty) {
			var l = { get: i, enumerable: true, configurable: true }
			try {
				b.defineProperty(m, a, l)
			} catch (h) {
				if (h.number === -2146823252) {
					l.enumerable = false
					b.defineProperty(m, a, l)
				}
			}
		} else {
			if (b[f].__defineGetter__) {
				m.__defineGetter__(a, i)
			}
		}
	})(self)
}
