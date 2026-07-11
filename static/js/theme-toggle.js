// Three-state theme toggle: jour -> nuit -> auto -> jour…
// Vanilla custom element, no shadow DOM, so it inherits the site's global
// styles (see `theme-toggle button` in main.css).

const GLYPHS = { jour: '☀', nuit: '☾', auto: '◐' }
const LABELS = { jour: 'Jour', nuit: 'Nuit', auto: 'Auto' }
// Accessible name stays English; the French labels are visual flavor.
const ARIA_LABELS = { jour: 'day', nuit: 'night', auto: 'auto' }
// Mirrors --cream / --midnight-deep in main.css :root and the two
// <meta name="theme-color"> tags in layouts/base.njk. Keep all three in sync.
const META_COLORS = { jour: '#f0e9d6', nuit: '#1b2445' }
const ORDER = ['jour', 'nuit', 'auto']
const valid = value => (value === 'jour' || value === 'nuit' ? value : 'auto')

class ThemeToggle extends HTMLElement {
	connectedCallback() {
		this.metas = [...document.querySelectorAll('meta[name="theme-color"]')]
		this.originalContents = this.metas.map(meta => meta.getAttribute('content'))

		this.button = document.createElement('button')
		this.button.type = 'button'

		this.glyph = document.createElement('span')
		this.glyph.className = 'toggle-glyph'
		this.glyph.setAttribute('aria-hidden', 'true')

		this.label = document.createElement('span')
		this.label.className = 'toggle-label'
		// Visible label is French ("Jour"/"Nuit"); announce it as French (WCAG 3.1.2)
		this.label.setAttribute('lang', 'fr')

		this.button.append(this.glyph, this.label)
		this.button.addEventListener('click', () => this.cycle())

		// Live cross-tab sync: `storage` fires only in the other tabs when the
		// theme key changes there; adopt the new value without re-persisting.
		window.addEventListener('storage', e => {
			if (e.key === 'theme') this.apply(valid(e.newValue))
		})

		// Render before inserting, arm aria-live after: the initial state must
		// not be announced on page load, only actual changes.
		this.render()
		this.append(this.button)
		this.button.setAttribute('aria-live', 'polite')

		this.syncMetas(this.state)
	}

	get state() {
		if (!this._state) {
			try {
				this._state = valid(localStorage.getItem('theme'))
			} catch {
				// localStorage unavailable, fall through to auto
				this._state = 'auto'
			}
		}
		return this._state
	}

	cycle() {
		const next = ORDER[(ORDER.indexOf(this.state) + 1) % ORDER.length]

		try {
			if (next === 'auto') {
				localStorage.removeItem('theme')
			} else {
				localStorage.setItem('theme', next)
			}
		} catch {
			// localStorage unavailable, theme won't persist this session
		}

		this.apply(next)
	}

	// Make `state` what this tab displays: html attribute, chrome tint, button
	// UI, and the in-memory cache (kept even when localStorage is unavailable).
	apply(state) {
		this._state = state

		if (state === 'auto') {
			delete document.documentElement.dataset.theme
		} else {
			document.documentElement.dataset.theme = state
		}

		this.syncMetas(state)
		this.render()
	}

	syncMetas(state) {
		this.metas.forEach((meta, i) => {
			meta.setAttribute(
				'content',
				state === 'auto' ? this.originalContents[i] : META_COLORS[state]
			)
		})
	}

	render() {
		const state = this.state
		this.glyph.textContent = GLYPHS[state]
		this.label.textContent = ` ${LABELS[state]}`
		this.button.setAttribute('aria-label', `Theme: ${ARIA_LABELS[state]}`)
	}
}

customElements.define('theme-toggle', ThemeToggle)
