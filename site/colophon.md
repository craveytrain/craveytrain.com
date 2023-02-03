---
title: Colophon
date: 2022-12-22
layout: page
tags: foot
eleventyNavigation:
  key: Colophon
  order: 2
---

While this site has cycled it's tech stack a few times, it's always been built on the hard work of the open source community. While it's entirety is available on [github](http://github.com/craveytrain/craveytrain.com), I would like to recognize the tools I am using now, as well as others I have used through the years, to build this site.

## Version 9 (current)

### 2022 - Current

Turns out, as much I enjoy building apps with Svelte, it's just really hard to beat straight HTML and CSS for a website. So, I moved it to 11ty and I've tried to spend some time deprogramming some of my learned habits from building with frameworks. it's been a lot of fun.

- [Eleventy (11ty)](https://www.11ty.dev) is the Static Site Generator (SSG)
- Still hosted on [Netlify](https://www.netlify.com/)

## Version 8

### 2020 - 2022

This release was about trying a new platform. I've heard lots of good things about Svelte, so I am giving it a try. Some of the tooling that isn't specific to this site has been moved over to the [uses](/uses) page.

- [Svelte](https://svelte.dev) is the UI framework
- [Sapper](https://sapper.svelte.dev) is used to statically generate the site
- Continue to host on [Netlify](https://www.netlify.com/) cause it's awesome
- Markdown parsing is done by [Remark](https://remark.js.org), passed to [Rehype](https://github.com/rehypejs/rehype), and plumbed together by [Unified](https://unifiedjs.com).

## Version 7

### 2018 - 2020

I decided home grown static site generators are a pain, so I switched gears and went with Gatsby. This is also the first version in a while where I got out of the business of operations work for the site. I'm now using Netlify (after an aborted attempt to get it working in serverless fashion with AWS Lambdas and S3).

- [Gatsby](https://www.gatsbyjs.org/): This seems an interesting tool, that handles a lot of the PWA boilerplate. That seems like a useful framework to have mastery over.
- [Netlify](https://www.netlify.com/): Free hosting (for my size site, it's just simpler, does PR previews, auto publishing based on github master branch, all the things)
- [NPM](https://www.npmjs.com/): Package manager extraordinaire (now v6)
- [Atom](https://atom.io/): Still enjoying atom and while I'm using all the usual culprits for plugins, a couple are worth mentioning that may be off the beaten path
  - [Dark Mode](https://atom.io/packages/dark-mode): This may be my favorite one right now. It toggle between 2 themes based on ambient light detected by the onboard light sensor on my computer. As I tend to swap working inside and outside a fair bit, this is great for selecting a dark theme for indoors (solarized dark), and a bright theme for outdoors (solarized light);
  - [file-icons](https://atom.io/packages/file-icons): Cause I like pretty pictures
  - [Autocomplete for modules](https://atom.io/packages/autocomplete-modules): Having my IDE give me the relative path is a great way to make sure I'm never referencing a package that does not exist
- [Git](https://git-scm.com/): This tool has changed how I work and allows me to be productive no matter where I am.
- [Github](https://git-scm.com/): This tool has changed how I work and allows me to be productive no matter where I am.
- [Docker](https://github.com): Containerization has really simplified how I deploy and portability of my site.
- [ESLint](http://eslint.org/): Linting protects and style checking makes my code conform to standards.
- [EditorConfig](http://editorconfig.org/): Config sharing tool to normalize code style across IDEs and users.
- [stylelint](https://stylelint.io/): CSS linter and fixer
- [PrismJS](http://prismjs.com/): Lightweight syntax highlighter
- [Solarized](http://ethanschoonover.com/solarized): I use light and dark for terminal and IDE.

## Version 6 (current)

### 2016 - 2018

This was a home grown version of a static site generator, because, why not? I stripped down the visual style on this version (or, more accurately, I didn't bother building it back in).

- [Gulp](http://gulpjs.com/): While I often just go `NPM scripts`, this is handy for the metadata it uses about files. Plus, the plugin community is strong (and it's a lot faster than Grunt).
- [Digital Ocean](https://www.digitalocean.com/): Quite reasonably-priced cloud hosting
- [NPM](https://www.npmjs.com/): Package manager extraordinaire
- [CloudFlare](https://www.cloudflare.com/): DNS and performance tuning of the site.
- [Atom](https://atom.io/): I moved from Sublime to Atom after Sublime 3 was in beta longer than it's plugins and just became frustrating.
- [ImageOptim](https://imageoptim.com/mac): Great GUI for batch lossless compression of various image formats.
- [ImageAlpha](https://pngmini.com/): Still one of the best lossy PNG compressors that does PNG8+alpha transparency.
- [Git](https://git-scm.com/): This tool has changed how I work and allows me to be productive no matter where I am.
- [Docker](https://www.docker.com/): Containerization has really simplified how I deploy and portability of my site.
- [ESLint](http://eslint.org/): Linting protects and style checking makes my code conform to standards.
- _SVG_: From [svgo](https://github.com/svg/svgo) to [svgstore](https://github.com/w0rm/gulp-svgstore), vector graphics have really crispened up my site.

## Version 5

### 2012 - 2016

This is the current version of the site and represents a lot of the go-tos in my current toolkit. I have tried several different static site generators, starting off with [Octopress](http://octopress.org/), tried out [Github Pages](https://pages.github.com/), a bunch of aborted attempts of rolling my own, and eventually have settled on [Hugo](https://gohugo.io/). Here's my current set of tools:

- [Hugo](https://gohugo.io/): Go-based static site generator.
- [Digital Ocean](https://www.digitalocean.com/): Quite reasonably-priced cloud hosting
- [NPM](https://www.npmjs.com/): Package manager extraordinaire
- [Postcss](http://postcss.org/): Trying out a little alternative to Sass, Less, & Stylus these days
  - [cssnext](http://cssnext.io/): Trying to learn the new and emerging syntaxes
  - [cssnano](http://cssnano.co/): Appears to be latest and greatest css compressor
- [CloudFlare](https://www.cloudflare.com/): DNS and performance tuning of the site.
- [Atom](https://atom.io/): I moved from Sublime to Atom after Sublime 3 was in beta longer than it's plugins and just became frustrating.
- [ImageOptim](https://imageoptim.com/mac): Great GUI for batch lossless compression of various image formats.
- [ImageAlpha](https://pngmini.com/): Still one of the best lossy PNG compressors that does PNG8+alpha transparency.
- [Gulp](http://gulpjs.com/): While I often just go `NPM scripts`, this is handy for the metadata it uses about files. Plus, the plugin community is strong (and it's a lot faster than Grunt).
- [Git](https://git-scm.com/): This tool has changed how I work and allows me to be productive no matter where I am.
- [Docker](https://www.docker.com/): Containerization has really simplified how I deploy and portability of my site.
- [ESLint](http://eslint.org/): Linting protects and style checking makes my code conform to standards.
- [JSBeautify](https://github.com/beautify-web/js-beautify): I like my code looking consistent.
- _SVG_: From [svgo](https://github.com/svg/svgo) to [svgstore](https://github.com/w0rm/gulp-svgstore), vector graphics have really crispened up my site.

## Version 4

### 2009 - 2012

This is where this site gets a bit more relevant. I rebuilt this site several times and went from [Wordpress](https://wordpress.org/) (self hosted) -> Tumblr -> [Wordpress](https://wordpress.com/) (hosted) -> [Django](https://www.djangoproject.com/) -> [Rails](http://rubyonrails.org/) -> [Node](https://nodejs.org/en/) ([express](http://expressjs.com/)). I believed I needed a big, powerful site to host all of my dynamic content. Hindsight is truly 20/20.

## Version 3

### 2005 - 2009

Aaahh, the discovery of [Wordpress](https://wordpress.org/). The main topics here were more focused on food recipes and slow pitch softball. The one post that is preserved from this era is the [Bidet](/posts/bidet) post. Still my most popular post, ever.

## Version 2

### 2003 - 2005

[Movable Type](https://movabletype.org/). Aaahh... that was fun. I launched craveytrain.com in this time. I have some, terrible, terrible blog posts that are not worth preserving, hence they are not here. This was before I was fully aware how long things would be on the internet.

## Version 1

### 2001 - 2003

This was just built on blogger. I recall almost nothing about this site and there is, thankfully, no content available from it. This actually predates the domain.
