---
title: Webmentions Support
date: 2023-02-16
description: Adding webmention support to my Eleventy blog, inspired by the IndieWeb movement and the push to own your own content.
tags:
  - web standards
  - webmentions
---

All this talk about web standards and owning your own data inspired me to support webmentions on this blog. I'm not treading any new ground here, so I won't bother you with another post describing the process. Instead, I'd like to treat this more like a link farm, referencing those I learned from and where I chose to coincide with or deviate from. Maybe someone will find this useful when evaluating their own options.

First off, I want to say, this would not have been even in my purview if not for the encouragement of [IndieWeb][indieweb] standard bearer [Tantek Çelik][tantek]. He originally put me on this idea of owning your own content years ago, when I would notice his Twitter posts had links back to his site, where a full copy of his message was stored. I was always impressed by this, even if I wasn't initially motivated by it. It wouldn't be until years later, spurred by the push of returning to web standards movement gaining so much momentum on Mastodon, that I decided to start making steps towards owning my own data.

Recently I polished off the old blog (which hadn't seen a new post in years), and most recently have added support for [webmentions][webmention]. I was finally inspired into action by a [post][nicolas-hoizey-post] by [Nicolas Hoizey][nicolas-hoizey]. And like any good web citizen, he cited his inspirations, a [primer on webmentions in Eleventy][max-bock-post] by [Max Böck][max-bock] and a [really thorough walk through of setting up webmentions in Eleventy][sia-codes-post] by [Sia Karamalegos][sia-codes]. Also, none of this would be possible without the awesome services of [Bridgy][bridgy] to crawl my accounts on other sites, looking for mentions and posting them to [webmention.io][webmention.io], an endpoint to receive and return webmentions upon request.

Generally, my setup lines up with Nicolas' post. I like the idea of committing the webmentions as data in my repo, because it is content used to generate the site. If something were to happen to the source for those webmentions, I would not want to lose them, so I'm keeping them. Here's the basic process:

1. Github action cron job queries webmentions.io every 15 minutes or so.
1. If webmentions are found, dedupe and write them to the [webmentions.json][webmentions.json] file as a file-based document store.
1. Create a PR with the data file changes with a handy label to let me know I can merge it in.
1. I manually approve the PR, which merges in the webmentions, closes the branch, and deletes it. (I hope to look at ways to automate this)
1. This triggers a hook on [Netlify][netlify] to rebuild and redeploy the site.

And while conceptually I made the same trade-offs as Nicolas, I followed all the code samples from Sia's post. She wrote the most thorough and understandable post on the subject I've seen to date, replete with code samples in the article and sample code in gists. I really appreciated her approach and the way she explained things made it pretty straight forward to add them to my site.

While I didn't use Max's post as reference as much as the other 2 on this subject, his additional [post on webmentions analytics][max-bock-webmentions-analytics] is fascinating and inspiring work. I look forward to taking a swing at it myself in the future.

Finally, for the style of likes and reposts, I was inspired by, tried to change, but ultimately took wholesale, [Zach Leatherman][zachleat]'s implementation of a facepile. I really like the look of it and I tried to make it work with what I felt was more semantic markup of avatars in a list. However, I ended up using his code pretty liberally after I wasn't able to make my preferred syntax work. I don't have any replies, yet, so I'm unsure of how that will look, but when I get some, I'm sure I will be quickly adjusting the style of them.

Hope you found this useful and I highly recommend all the links I shared in this post.

[webmentions.json]: https://github.com/craveytrain/craveytrain.com/blob/main/data/webmentions.json
[netlify]: https://www.netlify.com
[bridgy]: https://brid.gy
[webmention.io]: https://webmention.io
[webmention]: https://indieweb.org/Webmention
[mastodon]: https://joinmastodon.org
[indieweb]: https://indieweb.org
[tantek]: https://tantek.com
[max-bock]: https://mxb.dev
[max-bock-post]: https://mxb.dev/blog/using-webmentions-on-static-sites/
[max-bock-webmentions-analytics]: https://mxb.dev/blog/webmention-analytics/
[nicolas-hoizey]: https://nicolas-hoizey.com
[nicolas-hoizey-post]: https://nicolas-hoizey.com/articles/2023/02/05/updating-webmentions-on-a-static-site/
[sia-codes]: https://sia.codes
[sia-codes-post]: https://sia.codes/posts/webmentions-eleventy-in-depth/
[zachleat]: https://www.zachleat.com
