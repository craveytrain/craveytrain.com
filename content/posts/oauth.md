+++
title = "OAuth"
date = "2011-05-24"
tags = ["oauth", "nodejs", "twitter", "markdown"]
+++
I had been trying to decide what to do with comments. I like to give the ability to people to make comments but I just did not want to deal with keeping track of people's username, passwords, etc. Furthermore, I absolutely abhor CAPTCHA or anything of the sort. I got to thinking about using something like OpenID. The main problem I have with that is adoption. I don't want to make it hard for people to comment, but I don't want to deal with user info. Then I read [Chris Shiflett write about using Twitter for comments](http://shiflett.org/blog/2011/mar/using-twitter-for-comments) and I knew that was the key for me.

There are several popular oauth networks out there but Twitter seems to make the most sense for my audience (both of you) and my subject matter (primarily technical blatherings). So, I set out to learn oauth and use Twitter. Had I known how long it would take me, I might have gone another route. But I'm here with lots of lessons learned and a much stronger understanding of the oauth paradigm. And that is the real reason I rolled my own blog: to give myself the reason to go learn new things.

## The Process
Basically, the oauth process breaks down into 3 major steps:

1. Generate a request token,
2. Using said request token, ask the user to grant the requesting app permission to access the user's account and
3. Once permission is given, exchange the request token with an access token.

Then it's just the matter of caching that access token (I chose a cookie which I bring into session on the first page load) and requesting the user's pertinent information. Currently, I am grabbing their Twitter screen name, id, url (which I piece together based on the standard twitter user page and their screen name) and their image. I use this information to attribute the comments on the blog.

As for comment contents, I knew I didn't want to bother with whitelisting tags or anything like that, so I just did the simple thing and went with Markdown. I have really come to love Markdown as a simple tool for authoring content. That's what I write my blog posts in. To help the users write in markdown I linked up the syntax reference.

What I'm particularly proud of is the realtime comment previewer. It shows the author's comment, right in line with the other comments and I think does a good job showing them exactly how their comment will look. Right now this is written as a call back to the server because I haven't found a good client side lib to parse markdown on the fly. [Showdown](https://github.com/coreyti/showdown) seemed to crap out on &lt; &amp; &gt;. I will look into it some more in the future. But let's be honest, it's not like I have enough commenters right now to really put a strain on my server. Famous last words? I can only hope.

Obviously I didn't code everything from scratch, cause, that's just loco, ese. For the basic oauth work, I used the [excellent oauth wrapper for node.js](https://github.com/ciaranj/node-oauth). I'm still using [express](http://expressjs.com/) for my basic framework with [jade](http://jade-lang.com/) for templates.

If you have any comments, questions or concerns, hey, you can voice them now, so feel free.
