# Prototype Methods

When I mentioned the [GLGUI Toolbox](http://github.com/glgui/toolbox) repo I failed to mention some of the content already in it. I'm gonna give a quick rundown of the two prototype methods I contributed.

## Date.toGenString

This is a prototype method from the Date object that just puts the Date out to a string formatted like '10/10/2010 21:15:07'. That's it, nothing special, just was a specific format I needed a lot on a project we are working on so I thought I would share.

## String.pluralize

Ok, I'm actually rather proud of this one, which is sad, because it's pretty trivial, but it just works and works well. That is not always the case with my code upon first release. Essentially you call it off a singular version of a string and pass it the integer you are referencing and it will perform some basic plural rules on it.

However, coding the English language can be tricky, so in observation of that, you can optionally pass it the plural form of the word and that will override the rules in the method.