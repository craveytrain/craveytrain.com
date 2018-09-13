;(function (d) {
  var hasSupport = (function () {
    if (!d['querySelectorAll']) return false // Bool
    if (!d['addEventListener']) return false // Bool
    if (!d['isSameNode']) return false // Bool
    if (!('onhashchange' in window)) return false // Bool

    return true // Bool
  })()

  var currentIdx

  var slides

  var toc

  var storedCodes = []

  var states = ['past', 'current', 'future']

  var addClass = function (/* DOM Node */ el, /* String */ className) {
    var re = RegExp('\\b' + className + '\\b')
    if (!el.className.match(re)) {
      el.className += (el.className.length ? ' ' : '') + className
    }
  }

  var remClass = function (/* DOM Node */ el, /* String */ className) {
    var re = RegExp('\\b' + className + '\\b')
    el.className = el.className.replace(re, '')
  }

  var getId = function (/* Int */ idx) {
    return slides[idx - 1].id || idx
  }

  var getCurrent = function (/* String */ hash) {
    var current, i

    if (hash) {
      current = d.getElementById(hash)
      if (current) {
        for (i = 0, l = slides.length; i < l; i++) {
          if (current.isSameNode(slides[i])) return i // Int
        }
      } else if (!isNaN(hash)) {
        return parseInt(hash) - 1 // Int
      } else {
        return 0 // Int
      }
    } else {
      return 0 // Int
    }
  }

  var showCurrent = function (/* Int */ idx, /* Boolean */ reset) {
    var classAction = reset ? remClass : addClass

    var lastIdx = slides.length - 1

    classAction.call(this, slides[idx], states[1])

    if (idx > 0) classAction.call(this, slides[idx - 1], states[0])

    if (idx < lastIdx) classAction.call(this, slides[idx + 1], states[2])

    console.log(reset)
    console.log(idx)

    classAction.call(this, toc[idx], 'current')

    currentIdx = idx
  }

  var keyHandler = function (e) {
    if (typeof e.target.getAttribute('contenteditable') === 'string') return

    switch (e.keyCode) {
      // Enter
      case 13:
      // Space
      case 32:
      // Down Arrow
      case 40:
      // Right arrow
      case 39:
        e.preventDefault()
        setHash(currentIdx + 2)
        break
      // Backspace
      case 8:
      // Up Arrow
      case 38:
      // Left Arrow
      case 37:
        e.preventDefault()
        setHash(currentIdx)
        break
    }
  }

  var setHash = function (/* Int */ idx) {
    var hash

    var l = slides.length
    if (idx > 0) {
      if (idx < l) {
        hash = getId(idx)
      } else {
        hash = getId(l)
      }
    } else {
      hash = getId(1)
    }
    d.location.hash = hash
  }

  var hashHandler = function () {
    var idx = getCurrent(d.location.hash.substring(1))

    showCurrent(currentIdx, true)
    showCurrent(idx)
  }

  var prettify = function () {
    var codes = d.getElementsByTagName('code')

    var i = 0

    var l = codes.length

    var code

    for (; i < l; i++) {
      code = codes[i]
      code.className += (code.className ? ' ' : '') + 'prettyprint'
      storedCodes[i] = code.innerText
    }

    if (l) prettyPrint()
  }

  var buildIndex = function () {
    var index = d.createElement('ol')

    var str = ''
    index.id = 'index'

    Array.prototype.forEach.apply(slides, [
      function (slide) {
        var title = slide.querySelector('h1').innerText
        str += '<li><a href="#' + slide.id + '">' + title + '</a></li>'
      }
    ])

    index.innerHTML = str

    d.body.appendChild(index)

    toc = index.querySelectorAll('li')
  }

  var init = function () {
    slides = d.querySelectorAll('.slide')

    var idx = getCurrent(d.location.hash.substring(1))

    addClass(d.body, 'show')

    if (idx === 0) d.location.hash = getId(1)

    buildIndex()

    showCurrent(idx)

    d.addEventListener('keydown', keyHandler, false)

    window.addEventListener('hashchange', hashHandler, false)

    prettify()
  }

  if (hasSupport) d.addEventListener('DOMContentLoaded', init, false)
})(document)

/* TODO:
- swipe events/mobile support
- intraslide interaction

*/
