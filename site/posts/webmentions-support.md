---
title: Webmentions Webhook
date: 2023-04-05
tags:
  - web standards
  - webmentions
---

I've really enjoyed my first foray into the world of webmentions. I am really intrigued by the idea of owning all the content on my site, including external interactions. And I'm very appreciative of the work [Aaron Parecki](https://aaronparecki.com) has done on [Webmention.io](https://webmention.io) to make that information available in a clean way. But I've never loved my initial solution of polling the service every 15 minutes to see if I have new webmentions. It works, but it hits a site for information that 99% of the time hasn't changed. So I decided to try a different approach.

In general, I don't love cron jobs. The consistent running of a job, oblivious to whether there is even any reason to run it again feels inefficient and wasteful. Like a brute force solution to a problem. If possible, I prefer a way to do something only when there's a reason to do it. So I went looking for a better way to be notified when a webmention was added. Thankfully, webmention.io has a [webhook setting](https://webmention.io/settings/webhooks), POSTing to an end point whenever there was a new webmention.

Excellent, I thought. This is exactly what I was looking for. However, just cause I can be notified of a webmention, doesn't mean I can necessarily do anything about it. As a little context, this site is a statically generated website. Meaning, there's nothing listening for POST calls to it. It's all pre-generated static assets (HTML, CSS, and maybe eventually JS) that a simple webserver sends to eager readers when requested. So what's going to listen for the webhook.

## Github Actions

I've been enamored with Github Actions from very early on. Integrating my CI into my remote host version control system seemed like a no-brainer to me, and while there have been a few bumps along the way, for the most part, I've felt empowered by the offering. And when I learned they had a way to listen for POST events as a webhook, I figured this was done and done. However,
