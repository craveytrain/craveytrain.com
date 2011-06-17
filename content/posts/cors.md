# Cross domain XHR

Recently I had to learn a little bit about CORS (cross origin resource sharing). I had sites on different domains I had to get data in between. I like to try to be foward thinking, so when I learned about a better option than JSONP, I jumped all over it. Nicholas Zakas explains is very well on his [article about CORS](http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/). Like all the other new, fun technologies, it's not supported by all older browsers. So I had to find a way to be forward thinking but have a fallback. What I ended up with is a CORS xhr that falls back to JSONP if CORS is not natively supported.

We are using [jQuery](http://jquery.com) on this project so it made it even simpler to do. I used the new [$.preFilter](http://api.jquery.com/jQuery.ajaxPrefilter/) to make it even easier.

[client.js](https://gist.github.com/1028553#file_client.js)

The prefilter is just taking the dataType attribute, doing a check to see if the request is crossDomain (an internal jQuery property) and if the browser support CORS. If it is cross domain but the browser does not support CORS, it changes the dataType to JSONP. It's really that simple. jQuery does everything else behind the scenes. It takes care of the request, and if XHR, calls the success callback with the response payload of the request. If it's JSONP request, it calls the success callback with the same data as the XHR response passed in as a parameter.

 I also threw together a sample server:

[server.js](https://gist.github.com/1028553#file_server.js)

The server just does a detection for the callback request param (the default request param name used if it's a JSONP request), and if so, it sends the response back as JSONP, using the value of the callback param as the function name and making sure to set the `Content-Type` to `applicastion/javascript`. If the request is XHR, it gives a `Content-Type` of `application/json` and sets a header of `Access-Control-Allow-Origin` to (preferably) the host making the request. For this example I am using a wildcard. You may not want to do that in a production environment.

If you read the explanation article above, you will notice it says that by default, auth items are not sent over on cross domain XHR requests. Missed that little note? Yeah, I did too the first time. That's why I'm writing this, to help it sink in. So, in the event you need to send over cookies or something along those lines, you just need to add `withCredentials: true` to the native XHR object. jqXHR makes that available via the `xhrFields` object.

[client-withCredentials.js](https://gist.github.com/1028553#file_client_with_credentials.js)

The server just requires 1 more header in the response.

	Access-Control-Allow-Credentials: true
	
And that's it. I hope this was beneficial to ya. If you have any questions, feel free to lemme know.