+++
title = "Dotfiles"
date = "2011-04-27"
tags = ["bash", "prompt", "os x"]
+++
I've been helping some of the guys at work get acclimated to macs and with that, helping them customize their bash prompt. With much thanks due to [mschout](https://github.com/mschout), I have finally got mine setup more or less how I like it (until I change it again).

I want to give a quick rundown of what I am using and why. The code is in my [local-config](https://github.com/craveytrain/local-config) repo on github (with basic install instructions), so I won't go line for line through the configs, just an overview of why I do the voodoo that I do.

## bash_profile

No one wants to dupe their code, and your bash prompt is no different. I use [iTerm2](http://www.iterm2.com/) as my terminal which does some nifty things, not the least of which is give the ability to open up a new tab at the same path as the previous tab's path. However, when doing this, it will only run the .bashrc file, not the .bash_prompt. The reasons why are beyond the scope of this post but are at least highlighted at [server fault](http://serverfault.com/questions/8882/what-is-the-difference-between-a-login-and-an-interactive-bash-shell). Point being: write your code once, and just call it up.

## bash_completion

There are a couple files associated with this feature and a lot more scripts I am not using. This is a pretty sweet little script for allowing tab completion of git commands as well as branch information in your prompt (if you are in a git branch). I took the stock one and adjusted it to color the branch name based on whether it was clean or not. There are other bash_completion scripts, I just haven't gotten around to trying them out yet.

## gitconfig

I didn't originally have this one in there, but a lot of people started asking me how I had my git setup. So, here's what I have and why:

### color
Turn 'em on, all of 'em

### aliases
I like co for checkout, br for branch, st for status and lg for this funky, pretty little log format I found on [stack overflow](http://stackoverflow.com/questions/267761/what-does-your-gitconfig-contain).

### mergetool
Yeah, I'm lazy, I am using opendiff (aka file merge)

### editor
Textmate, though I am considering to going back to just using vim or whatever was default

### autocrlf
input.

This one sparks some conversation. It's my belief that we should be using lf in the repo, cause that's how Linus intended it. The real issue here is I work with windows developers and occasionally work in windows myself. This will change anything I commit into lf but won't mess with the checkout. So, in theory, I could cause myself a lot of hell on commits of files I changing but it has yet to bite me so far. I know it's just a waiting game.

## bash_mac

Here is some stuff that only works if you are on a mac, which I am:

### growl notification
Just run (or script) `growl text` and you'll see a growl notification with text.

### rm
Basically instead of delete it now moves to the trash. I'm used to the trash and I want it available on the command line. There is plenty of hard drive space, if it gets full, I'll dump it, but I want the ability to have that buffer.

### browser aliases
I just setup browser aliases so I could start the main browsers I use from the command line and give it a URL or the more likely scenario, a local file.

## bashrc

Here's where the magic happens. All the other files we have been talking about culiminate in here. The top is some basic filler: source the skel bashrc (if it exists) & create some path adding and deleting functions.

### Paths

We add in paths for the bin directory local to the user for things like the bash_completion scripts. In theory there will be more, but the idea is it's a local bin dir for the user. Also, we add in /usr/local/bin and sbin. I personally subscribe to a lot of the POSIX ideas about where to put things and I like the idea of putting local execution files installed by the user in those directories. I use [homebrew](http://mxcl.github.com/homebrew/) and they put their stuff there. I also roll my own [nodejs](http://nodejs.org/) and that goes there.

### lang
I honestly don't know why this is there. I think it just sounded like something I might need.

### VIM vs VI
VIM is better (hence the name).

### Prompt

Some really interesting stuff goes on here, and frankly, some if it I'm still just copying and pasting. Basically, I'm telling it to show dirty state, show stashed files, show untracked files and then sending it some colors to shade the branch info from the bash_completion script. I'm setting my basic prompt to:

	user@host:/full/path (git branch)
	$

Notice the prompt wraps to the second line cause that path can get lengthy.

### RVM
I love me some [RVM](https://rvm.beginrescueend.com/). I really enjoy working in Ruby and RVM has saved me so much hassle while working on projects and not messing with the local installed ruby versions. Cannot recommend it enough.


## Summary
That's about it. If you have any questions or find any issues, please reach out to me at the [local-config issue tracker](https://github.com/craveytrain/local-config/issues). Thanks and I hope y'all enjoy it.
