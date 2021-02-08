---
title: Austin metro init
date: 2010-11-22
tags:
  - javascript
  - metro
  - rail
  - austin
---

Since Austin has opened up their rail "system" I have really embraced mass transit. I happen to be in the sweet spot of living 3 miles from the park and ride and working 3 blocks from the downtown station. However, I noticed that for Austin being such a tech savvy town, the mass transit mobile app situation is awful. Sure, Google Maps work great if you want to get from one place to another and don't know how to get there, but for people who know the routes and just want to see when the next train is running, you have to go to [Cap Metro's site](http://capmetro.org/). Their site leaves a little to be desired, especially when viewed on a mobile device. So, I decided to do something about it.

This is by no means a finished product but this gave me the opportunity to play with a few technologies and techniques I hadn't prior. Based on some of the features I am using I made some pretty advanced assumptions on clients. I may very well refactor this to generate more code server side to support more clients and be more accessible, but honestly, at this point, this was fun to do mostly client side.

## Geo Location

Geolocation is something I have been wanting to play with as a native function of the browser, not relying on mobile device features. It was reasonable cut and dry but it's important to consider that due to being on a mobile device, you may have intermittent connectivity. So you have to feature detect and still do the actual getting of the location inside of a try/catch.

## Pub/Sub

I've been reading about pub/sub a lot and have been wanting to try it. I slightly refactored [Pete Higgin's jQuery pub/sub](http://github.com/phiggins42/bloody-jquery-plugins) to work without a library.

## Library-less JavaScript

I am not currently using a library. Just basic DOM scripting. I'm not handling the IE exceptions right now, and it's glorious. I may or may decide to support IE.

I've put it on [GitHub](http://github.com/) for anyone that wants to [check it out](http://github.com/craveytrain/AustinMetro).

If you want to [use the site](http://metro.craveytrain.com/).
