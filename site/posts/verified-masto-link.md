---
title: Verified Mastodon Link
date: 2022-12-22
description: How to verify your Mastodon profile link without cluttering your page — using a link tag in the head instead of a visible anchor.
tags:
  - mastodon
  - html
---

Like many others, I've been called by the siren song of [Mastodon](https://joinmastodon.org/) and have created an account ([@craveytrain@hachyderm.io](https://hachyderm.io/@craveytrain)) in the fediverse to check it out. One of the things that interests me is the ability to self-verify the links I reference, as a way to say I am who I say I am (as much as anyone can do on the internet).

The recommended way to achieve that verification status on a link from Mastodon is to link back to your Mastodon account from the linked page. They even (helpfully) give an example on the link page:

```html
<a rel="me" href="https://hachyderm.io/@craveytrain">Mastodon</a>
```

The problem I have with this is I don't want a link to my Mastodon account on my home page. That's not my ideal IA (let's just assume I actually have an IA for now). A lot of people seem to solve this with adding a link on their home page but hiding it visually. I don't love this cause, it's hacky, and stinks of bot tricks, not to mention users who access your site with a device that would read that link aloud (think text only browsers or screen readers).

So, I did a little digging on [Mastodon's Profile Link Verification](https://docs.joinmastodon.org/user/profile/#verification) page and discovered a little line:

> the resolved page contains at least one `a` or `link` tag with a `rel="me"`

Of course, a `link` tag! So, instead of putting an `a href` on my home page and hiding it, I can put a `link` tag in my header and all is well. So, here is what I put in my header to get me the nice little green checkmark:

```html
<link rel="me" href="https://hachyderm.io/@craveytrain" />
```
