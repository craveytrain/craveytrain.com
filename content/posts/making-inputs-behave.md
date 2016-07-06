+++
title = "Making inputs behave"
date = "2010-07-26"
tags = ["css", "css3", "forms", "html"]
+++
Anyone who has styled forms understands the frustration that is the input/textarea (or whatever your weapon of choice for masochism). They can be frustrating to make behave consistently. I found a technique I used today that I thought I would share. I seriously doubt I'm the first to use it but none-the-less maybe someone hasn't seen this before.

I had always assumed inputs (from here on out, when input is used, assume all inputable form elements) act weirdly. They aren't inline, they aren't block, they are just... weird. While most of us have become accustomed to dealing with this, this can be particularly troublesome making them do things like behave like a block level element but have padding.

In a proper block level element, if you want it to take up the full available width and have padding, it does that by default. Maybe you have to set width: auto. But even when you set an input to block level element, it won't behave like one.

CSS3 introduced a nice little property called [box-sizing](http://www.css3.info/preview/box-sizing/). Essentially with a value of border-box this can make an element behave like Quirks mode in IE. Initially my response to this was "WTF?! Why?!". But this allows you to turn it on for 1 element. 1 element that normally won't adhere to the box model for block level elements. So, without further ado, full width inputs with padding:

```css
input {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	width: 100%;
}
```
