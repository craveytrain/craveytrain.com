# Craveytrain.com blog

This is the software that runs craveytrain.com. It's nothing special, just really a pet project more than anything. Please feel free to dig around, take what ya like, etc. If you have any questions, suggestions, comments, etc, please feel free to use the appropriate mechanisms here on github. Thanks.

## TODO
- Use a jade template for gists to get more meta information in, making it closer to the original gist format.

- Get GZIP compression in. Not sure if that means using the connect-gzip module, moving the static server over to nginx or what.

- Stylus/SASS/LESS. I really need to learn one of these. How do I have a build process for dev that renders it on the fly but for prod is precompiled? Git hook for push to production?

- Make markdown realtime client side. Tried using showdown and it threw up on characters like <. I expect any markdown library should escape those property. That's actually imperative to using markdown as a comment syntax.

- Invoke commenter script only on those pages either via plugin format that only invokes when the selector comes back with a collection or better yet, only invoke the script at all on those pages. Look into modular scripting options or layout template placeholders.

- Add link type of content

- Paginate

- Search

- Add colophon