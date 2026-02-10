---
date: 2016-01-27T22:30:35Z
title: Going live with es2015
description: Lessons from introducing ES2015 to a production codebase — team buy-in, proof of concepts, and the importance of starting small.
---

Last night, I gave a talk at [JS Monthly London](http://www.meetup.com/js-monthly-london/) on [Going live with ES2015](http://craveytrain.com/slides/live_with_es2015/). It was my first talk since moving to London in August. It was nice to dust the cobwebs off my public speaking, but I'm glad it wasn't recorded.

While I covered a few of the parts of ES2015 we use, and how we setup the build process, the meat of the talk was about how we went about choosing the technologies and getting it into production. Given that my role these days is more about process and mentoring, I thought I would elaborate on that portion of my talk for whoever might find it helpful. This is from the perspective of a manager. I hope you find it useful in convincing yours.

## Nearsightedness

When trying to introduce new technologies to your stack, resist the temptation to "solve all the problems". It's easy to get bogged down in the details of how something will integrate into your system, how it will consume your data, etc. This is the path to the dark side. You can solve all those problems in due time, but first, make sure the idea holds water. You will learn things from solving each problem that you can apply to the next one.

This also allows you to mitigate your risk of failure. Throwing away a few hours of work is, usually, much more palatable than a few days, or even weeks. Start small and build up, with checkpoints along the way. This is being responsible with your, and your company's time.

## Problem

It starts with a problem. We had race conditions. We had regressions in what we thought were "untouched" code. We had code that was just concatted together, registering itself globally, in a random order and auto-invoking. This let to all sorts of unintended consequences. This was not a position we could maintain.

## Solution

We stepped back from our problem and thought about what goals we would have for our code. In short order, we came up with a short list.

### Modularized

We wanted code that was small, simple, and did a single purpose. We wanted a dependency graph so we could know what could be impacted by code changes.

### Invokable

We wanted to be more intentional and explicit about our code. When more DOM gets loaded into the tree, we wanted to be able to run our code against that new DOM exclusively, not just "reload" the module.

### Extensible

We also wanted to override our, hopefully, sensible defaults.

### Testable

Possibly the most important one of the list, we wanted to have confidence that when we shipped our code, we knew what it was doing, and, more importantly, what it was not doing.

### Loosely coupled

One thing that becomes a real pain in testing JavaScript is testing code that interacts with the DOM. To isolate it, we created a pub/sub interface that all modules use to talk to each other. That way DOM-sensitive code can attach to DOM fixtures, listen for events, mutate the DOM and have the other side of the module exposed to the pub/sub for testing. Likewise, code on the other side that did service level things, maybe talk to the server, maybe do model work, could also have a clear separation point to attach testing to.

## Team buy-in

I feel very strongly that technology decisions should be made as a team, by the people who are going to use it every day. That doesn't mean I'm a silent bystander (those that know me are well acquainted my utter lack of ability to be silent), but my voice, even as the manager, doesn't weigh more than anyone else's. In fact, in many ways, it weighs less.

We talked about pros and cons of several ways to achieve our goals. We even added a couple on the spot:

### Expected future-proofness

Wouldn't it be great if we didn't have to transpile into something else to make the code work in the browser? One can dream.

### Intuitiveness

Code should strive towards obviousness, easy to grok. We want to include more developers, not create a walled garden.

### Excitement

If we are going to use this code every day, it should be something that we are excited to use. If it's boring and no one finds it interesting, why the hell are we using it?

## Proof of concept

So we made a decision, how do we know if it was a good one? We had to start putting it through it's paces. We created a POC that would prove if the idea could work. It had to solve those goals and nothing more. This is a hard thing to do. Again, resist the urge to figure out how it will work in your build system. Just focus on making the basic idea work first. Knowing how it will integrate in your system ultimately just isn't valuable at this juncture and what you learn in the process will help inform how to solve that problem later.
