+++
title = "Git SVN setup"
date = "2010-11-11"
tags = ["git-svn", "tutorial", "git"]
+++
So I've been using Git-SVN for about a month at work now thanks largely to a [gist](https://gist.github.com/594472) put together by the magnanimous [Lachlan Hardy](http://lachstock.com.au/). Honestly, if you are getting started and have a standard SVN layout, that has all you are gonna need. Naturally, where I work doesn't exactly have a standard layout so I had to adjust the instructions a little bit. I wanted to help explain to others how to handle these other variants I have encountered.

## Getting Git Going

Windows users, don't despair, there is hope. However, I encourage you to embrace the command line. TortoiseGit does many features but it leaves you working in a SVN mindset and you don't necessarily know all the functions that are running behind the scenes. Personally, I sometimes use TortoiseSVN for commits and diffs but that's about it.

First things first, install [msysgit](http://code.google.com/p/msysgit/).

## Git Repo Setup

First off, let me explain, what you are doing here is creating a clone of the svn repo on your box, in Git. You will be completely autonomous from the SVN repo sending and getting data (or committing and updating using the SVN nomenclature) with a couple commands.

### Init

First things first, create the directory you want your Git repo in and go into that directory. Now open up the the Git Bash in that directory (yes, you can use command prompt, but why on earth would you?) and let's evaluate this command:


	git svn init http://svnserver.yourdomain.tld/path/to/specific/project --prefix=appName/  --trunk=Trunk --tags=Tags --branches=Branches

You can probably gather that we are telling Git where the specific SVN structured directories are. The keen among you may notice that --stdlayout or -s would do this for us. Honestly, I have found that flag to be flaky so I like to spell it out. YMMV. Also, others may mention we can run clone, I don't advise this for one major reason, clone does and init and the next command we are going to run (fetch) together. If you have a large repo (which we do) this will take ages. You want to make sure you have your configs setup right before you set that off.

### Config Adjustment

Now, you will notice there is a .git folder in this location. Go into that folder and open the config file in the text editor of your choice. It may look something like this:


	[svn-remote "svn"]
		url = http://svnserver.yourdomain.tld
		fetch = path/to/specific/project/Trunk:refs/remotes/appName/trunk
		branches = path/to/specific/project/Branches/*:refs/remotes/appName/*
		tags = path/to/specific/project/Tags/*:refs/remotes/appName/tags/*

Now, that's great if you use the standard layout. If you have some variables, you may have to adjust this. For example, we use a directories under Branches for types of branches (Hotfix, Feature, etc). Git won't recursively look for branches in that directory so we have to adjust the config. The line we are looking for is below:


	branches = path/to/specific/project/Branches/*:refs/remotes/appName/*

So, for our config, I made a slight adjustment:

	branches = path/to/specific/project/Branches/*/*:refs/remotes/appName/*

Notice the extra slash and asterisk before the colon. That is basically telling Git to check in all subdirectories of the Branch directory for branches for actual branches but go ahead and bubble them up to the namespace on the right. On to the pain.

### Fetch

Now, fetches should be pretty simple. It grabs every checkin in your repo in the directory you specified earlier and commits them into your local Git repo. Now, these are local commits, so they are fast, but if you are like us and have over 140,000 versions in your SVN repo, well, it takes a bit. Takes at bit as in, set it to go for the afternoon or before you leave for the day. The command is simply:

	git svn fetch

You can only fetch from a certain record and later if you like. This works great if you don't change the branch you are working out of. You just have to find a version number that has a file change in the directory you are grabbing. So, if you don't care about anything any earlier than version 120,000, you could go grab the most recent version that is commited to the folder you are getting after that and fetch from there. If the first commit to that directory after 120,000 is 120,653 your fetch command would look like this.

	git svn fetch -r120653

Alas, if you are like us and delete and recreate the branch you are looking for, this does not work very well. Also, the first time you forget to fetch based on that record number, it will go all the way back severely throwing off your workflow. I found it's just easier to get it out of the way to begin with. You have been warned.

That gets you to a working Git repo cloned off your svn repo. That Gist linked up top has a great workflow that I more or less mimic to do my work. And that's basically how I do it.
