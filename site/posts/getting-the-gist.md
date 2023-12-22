---
title: Getting the gist
date: 2010-12-10
tags:
  - gist
  - git
  - github
  - javascript
  - jquery
---

I really like [Gist](https://gist.github.com/), a lot. They are full on git repos and as such have version control, remote updating, all of the things you would expect out of a github repo including most of the social aspects. They also have the best syntax highlighting I have seen. Yes, there are other libs that do it in various languages, but I really like theirs and I like having my code in 1 place.

I've made several gists since I have become a member and expect that I will be making more now that I have gotten this down. The main complaint I have with gists is that to embed them in your blog you have to include a script tag that does a document.write. Aside from my misgivings about document.write, this poses a performance and user experience issue. Consider on a blog post with multiple snippets of code, the page stops loading until the scripts are downloaded and executed. Nevermind anything they may clobber during the process. And finally, I end up with a stylesheet in the DOM for each included gist that are all the exact same. So, I did:

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Gist Fetch</title>
	</head>
	<body>
		<h1>Separate Files</h1>
		<h2>Contact_form.html</h2>
		<a
			class="gistPlaceholder"
			href="https://gist.github.com/476405#file_contact_form.html"
			>contact_form.html</a
		>

		<h2>overlay.js</h2>
		<a
			class="gistPlaceholder"
			href="https://gist.github.com/476405#file_overlay.js"
			>overlay.js</a
		>

		<h2>style.css</h2>
		<a
			class="gistPlaceholder"
			href="https://gist.github.com/476405#file_style.css"
			>style.css</a
		>

		<h1>Combo File</h1>
		<a class="gistPlaceholder" href="https://gist.github.com/476405"
			>Accessible Inline Form Labels</a
		>

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
		<script src="jquery-gistFetch.js"></script>
		<script>
			$(document).ready(function () {
				$('.gistPlaceholder').gistFetch()
			})
		</script>
	</body>
</html>
```

```js
;(function ($) {
	// Fetch Gist and drop it into page
	$.fn.gistFetch = function (options) {
		var opts = $.extend({}, $.fn.gistFetch.defaults, options)

		// Duck punch document.write
		document.oldWrite = document.write
		document.write = $.fn.gistFetch.docOverwrite

		return this.each(function () {
			var $this = $(this)

			// Support for the Metadata Plugin.
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts,
				aURL = this.href.split(/[\/#]/),
				gistId = aURL[3],
				fileName = aURL[4] ? aURL[4].substring(5) : '',
				gistURL = o.gistURL + gistId + '.js',
				snipId = gistId + fileName

			gistURL += fileName ? '?file=' + fileName : ''

			// Store a pointer to the gist place holder
			$(document).data(snipId, $this)

			$.getScript(gistURL)
		})
	}

	$.fn.gistFetch.docOverwrite = function (/* String */ markup) {
		$gist = $(markup)
		// If the code in the document.write starts with a link and is from gist.github.com
		if (
			markup.substring(1, 5).toLowerCase() === 'link' &&
			$gist.attr('href').match('gist.github.com')
		) {
			if (!$(document).data('gisted')) {
				$('head').append(markup)
				$(document).data('gisted', true)
			}
			// If the code in document.write has a class of 'gist' assume it's a gist
		} else if ($gist.hasClass('gist')) {
			var gistId = $gist.attr('id').substring('5'),
				fileName = $gist.find('.gist-meta a:eq(1)').text(),
				snipId = gistId + fileName,
				$link = $(document).data(snipId)

			// If the pointer for the gistId and fileName exists (meaning file specfic gist)
			if (typeof $link !== 'undefined') {
				$link.replaceWith($gist)
				$(document).removeData(snipId)
				// Else assumes gist link of whole gist with no fileName specified
			} else {
				$(document).data(gistId).replaceWith($gist)
				$(document).removeData(gistId)
			}
			// Else just run plain old document.write
		} else {
			document.oldWrite.apply(document, arguments)
		}
	}

	// default options
	$.fn.gistFetch.defaults = {
		gistURL: 'https://gist.github.com/',
	}
})(jQuery)
```

Ironically enough, I made a gist about it. As usual, it's using jQuery (cause that's my fav little DOM manip/XHR lib) and it's just a simple little plugin that looks for links to gists, parses out the gist id and file name (if provided), fetches the gist, and duck punches document.write to replace said link with the code and drop the css file into the head (only once). This is all after DOM ready, so the page will load up just fine, only applying these things after the fact.

So, I know what you are thinking "Whoa, whoa, whoa! Duck punching document.write?!" Honestly, I wish I could have avoided it. I tried various techniques to leave document.write alone but I just couldn't find another way to make it work. Eventually I decided this was the easiest way to do it. I really despise document.write, so I only feel partially guilty about this. That and this plugin was developed for my site. If I don't want you using document.write on my website, well, that's my prerogative. If you use this plugin, know that.

Feel free to update or give feedback.
