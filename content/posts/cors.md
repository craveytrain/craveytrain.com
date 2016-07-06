+++
title = "CORS"
date = "2011-06-17"
tags = ["javascript", "xhr", "cors", "jquery"]
+++

Recently I had to learn a little bit about CORS (cross origin resource sharing). I had sites on different domains I had to get data in between. I like to try to be foward thinking, so when I learned about a better option than JSONP, I jumped all over it. Nicholas Zakas explains is very well on his [article about CORS](http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/). Like all the other new, fun technologies, it's not supported by all older browsers. So I had to find a way to be forward thinking but have a fallback. What I ended up with is a CORS xhr that falls back to JSONP if CORS is not natively supported.

We are using [jQuery](http://jquery.com) on this project so it made it even simpler to do. I used the new [$.preFilter](http://api.jquery.com/jQuery.ajaxPrefilter/) to make it even easier.

```js
$.ajaxPrefilter( 'json', function( options, orig, jqXHR ) {
    if ( options.crossDomain && !$.support.cors ) return 'jsonp'
});

$.ajax( {
    url: 'http://nodeserver:3000',
    dataType: 'json',
    success: callback
} );

function callback( d ) {
    console.log( d );
};
```

The prefilter is just taking the dataType attribute, doing a check to see if the request is crossDomain (an internal jQuery property) and if the browser support CORS. If it is cross domain but the browser does not support CORS, it changes the dataType to JSONP. It's really that simple. jQuery does everything else behind the scenes. It takes care of the request, and if XHR, calls the success callback with the response payload of the request. If it's JSONP request, it calls the success callback with the same data as the XHR response passed in as a parameter.

I also threw together a sample server:

```js
var http = require( 'http' ),
    url = require( 'url' );

var json = JSON.stringify( [ {
    command: 'holla back, yungun',
    response: 'hooo hooo!'
} ] );

http.createServer( function( req, res ) {
    var reqUrl = url.parse( req.url, true ),
        resp = json,
        callback = reqUrl.query.callback;

    if ( callback ) {
        resp = callback + '(' + json + ')';
        res.writeHead( 200, {
            'Content-Type': 'application/javascript'
        } );
    } else {
        res.writeHead( 200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        } );
    }

    res.end( resp, encoding = 'utf8' );
}).listen( 3000 );
console.log( 'Listening on port 3000' );
```

The server just does a detection for the callback request param (the default request param name used if it's a JSONP request), and if so, it sends the response back as JSONP, using the value of the callback param as the function name and making sure to set the `Content-Type` to `applicastion/javascript`. If the request is XHR, it gives a `Content-Type` of `application/json` and sets a header of `Access-Control-Allow-Origin` to (preferably) the host making the request. For this example I am using a wildcard. You may not want to do that in a production environment.

If you read the explanation article above, you will notice it says that by default, auth items are not sent over on cross domain XHR requests. Missed that little note? Yeah, I did too the first time. That's why I'm writing this, to help it sink in. So, in the event you need to send over cookies or something along those lines, you just need to add `withCredentials: true` to the native XHR object. jqXHR makes that available via the `xhrFields` object.

```js
$.ajaxPrefilter( 'json', function( options, orig, jqXHR ) {
    if ( options.crossDomain && !$.support.cors ) return 'jsonp'
});

$.ajax( {
    url: 'http://nodeserver:3000',
    dataType: 'json',
    success: callback,
    xhrFields: {
        withCredentials: true
    }
} );

function callback( d ) {
    console.log( d );
};
```

The server just requires 1 more header in the response.

```apacheconf
Access-Control-Allow-Credentials: true
```

And that's it. I hope this was beneficial to ya. If you have any questions, feel free to lemme know.
