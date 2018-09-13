---
title: Character countdown
date: 2010-12-06
tags:
  - glgui
  - javascript
  - jquery
---

I had some spare time today, a really nasty plugin I had written for jQuery a while back to do character count downs and a desire to play with the widget factory. Let's get it on!

First things first, I have give thanks to [Adam J. Sontag](http://ajpiano.com/) for showing me the way with the widget factory. I had tried it before but was missing something (namely, the scope of this in event handlers was eluding me). Then I saw an example in [Adam's slides](http://ajpiano.com/charlie/). `$.proxy!` So that's what that does. He caused my eureka moment, and for that I am grateful (just missed Thanksgivings by a few days, sorry Adam).

Basically on a litany of events it counts the characters in a form field and compares it to the specified max (either a config property or maxlength value). It can do the threshold coloring like twitter does. Actually, it was modeled a lot after twitter.

You can check it out at the [GLGUI Toolbox](http://github.com/glgui/toolbox) and there is even an example page.
