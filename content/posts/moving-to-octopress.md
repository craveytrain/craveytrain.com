+++
title = "Moving to octopress"
date = "2012-05-07"
tags = ["psa", "octopress"]
+++
I'm [following](http://alexsexton.com/) [the](http://rmurphey.com/) [trend](http://mattgemmell.com/) and moving over to [Octopress](http://octopress.org). While I do love my custom node blog, the amount of work it took to get a new post up and the stack it required for a simple blog was just overkill. It was a fun experiment and I will continue to play with node in all sorts of varieties, I just am not interested in rolling my own blog in it for now. Enter Octopress.

Octopress is billed as a hacker's blog tool. It met my rather modest criteria:

- sensible, semantic urls (that could maintain my existing ones),
- completely customizable templates and
- fun to work in.

On top of that were some things I hadn't really given creedence to. Things such as prerendering the blog. When ya think about a blog in it's most basic form, it makes total sense. It just took me a while to get on board. It's got good syntax highlighting built in. It uses SASS (another thing I didn't know I wanted until I used it).

The thing is, now I have extended/altered Octopress so much there is no easy merging back when they make more changes. I have my own theme, I have ripped out all of the asides, I have adjusted the Rakefile to add minification of scripts, hashing of static file names so I could have very long expires headers on them and thrown out the entire concept of custom includes and styles. The whole thing is custom at this point. I may have painted myself back into the same hole but even so, it has been fun getting here. I'm looking forward to doing a few things with regards to search auto-suggest, better theming and maybe some social integration (activity on github repos comes to mind).

If you are interested in seeing what I have done (and hopefully will be doing) to the codebase, please check out my [octopress fork](https://github.com/craveytrain/octopress) and my [octopress theme](https://github.com/craveytrain/octopress-theme).

Oh, and I turned comments off. Still deciding if I want to turn them back on or use something with regards to twitter or github discussions on the markdown pages that generate the posts for that or just do away with them all together. We shall see.
