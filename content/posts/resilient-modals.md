---
title: Resilient modals
date: 2010-11-16
tags:
  - accessibility
  - modal
  - tutorial
---

Modals: Love them, hate them they are a current fad (and have been for a while). Modals are usually implemented via javascript for older browser support (though there are some cool things being done with CSS3 on the matter). I've seen it done lots of ways, but here's a simple way to make modals "work" on a browser without javascript.

**Make the trigger link link to the hashtag of the id of the modal.**

Sounds too simple, I know. And in truth, that is slightly oversimplified, but given the assumption that the contents of the modal are not dynamic but are known at initial download of the page, this is the most resilient way to make a modal.

Since I know that's a little light on the implementation details, lemme throw together a quick code example. For the purpose of this example, we are using jQuery, but apply what ever JS method makes you happy.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>modals</title>
		<link rel="stylesheet" href="style.css" media="screen" />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
		<script src="modal.js"></script>
		<noscript>
			<style>
				.modal {
					display: block;
					position: relative;
					top: auto;
					left: auto;
					margin-left: 0;
					width: auto;
				}
			</style>
		</noscript>
	</head>
	<body>
		<p>This is text that <a href="#modal" class="trigger">will link</a> to the modal.</p>

		<div id="modal" class="modal">
			<p>This is the modal, baby.</p>
			<a href="#" class="close">Back to top</a>
		</div>
	</body>
</html>
```

```css
body {
	margin: 0;
}

.modal {
	display: none;
	position: absolute;
	top: 0;
	left: 50%;
	margin-left: -100px;
	width: 200px;
	background: #fff;
}

#backdrop {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
}
```

```js
$(document).ready(function () {
	$('.trigger').click(function (e) {
		e.preventDefault()
		var id = $(this).attr('href').substring(1),
			$modal = $('#' + id),
			$backdrop = $('#backdrop').length ? $('#backdrop').show() : $('<div>', { id: 'backdrop' }).prependTo('body')

		$modal
			.show()
			.find('.close')
			.text('close')
			.click(function (e) {
				e.preventDefault()
				$('#backdrop').hide()
				$(this).closest('.modal').hide()
			})
	})
})
```

And before you rail on me, this is proof of concept code. This is in no way considered production ready.
