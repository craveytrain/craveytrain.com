---
title: Relaunching with nodejs
date: 2011-04-19
tags:
  - psa
  - nodejs
  - markdown
  - express
  - jade
  - couchdb
---

So, over the weekend, I relaunched my blog on [Node.js](http://nodejs.org/). I tried Tumblr, Blogger, Wordpress (hosted and self), Django, Rails and was just about to rebuild it in Sinatra when a [friend](http://blog.rubikzube.com/) suggested I just build it in Node. Of course! Why didn't I think of that?

As for what drove me to roll my own blog when there are plenty of solutions that do it just fine, it was 1 part being anal about URLs (which Tumblr and Wordpress just wouldn't give me the level of control I wanted), 1 part wanting to serve up different types of content (ala Tumblr) and 1 part "why the hell not"?

As for the stack, I'm using [Express](http://expressjs.com/) for the framework, [Jade](http://jade-lang.com/) for the templating, [Markdown](http://daringfireball.net/projects/markdown/) for the content and [CouchDB](http://couchdb.apache.org/) for the document store. I'm using git to deploy to prod with the help of a little post-receive hook. I'm replicating my db locally to my prod box. This provides me with local copies of my site and my data.

I have a lot of things I want to do. I have gists I want to find a way to proxy the content for, I want to allow comments and am thinking of using Twitter for my OAuth provider. I want to host links as well as posts, with a nod to [Jeremy Keith](http://adactio.com/). Microformats. I love microformats and have none on the site. This will be remedied shortly.

I have a lot of things I need to fix. My content propagation isn't as clean as I would like. My design, well, let's just say it needs some love. Unfortunately, I don't know if I am the person who can give it that love. I tried to spend a good amount of time focusing on the readability and the font stack.

For anyone that happens to subscribe to my feed or link to my old posts, I apologize for the constant switching of URLs. One of the big reasons I went to this solution was to solidify my URL scheme. So I hope to be done with that. I will see about putting on some perm redirects for the old URLs.

Love it, hate or mildly ambivalent towards it, here it is. I have put both my [content](https://github.com/craveytrain/Craveytrain-Content) and my [app](https://github.com/craveytrain/Craveytrain-App) on github for all to see. Check it out. I'm interested in your feedback.
