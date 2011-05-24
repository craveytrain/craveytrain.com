# Resilient Modals

Modals: Love them, hate them they are a current fad (and have been for a while). Modals are usually implemented via javascript for older browser support (though there are some cool things being done with CSS3 on the matter). I've seen it done lots of ways, but here's a simple way to make modals "work" on a browser without javascript.

__Make the trigger link link to the hashtag of the id of the modal.__

Sounds too simple, I know. And in truth, that is slightly oversimplified, but given the assumption that the contents of the modal are not dynamic but are known at initial download of the page, this is the most resilient way to make a modal.

Since I know that's a little light on the implementation details, lemme throw together a quick code example. For the purpose of this example, we are using jQuery, but apply what ever JS method makes you happy.

[Resilient Modals](https://gist.github.com/701146)

And before you rail on me, this is proof of concept code. This is in no way considered production ready.