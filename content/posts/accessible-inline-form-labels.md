+++
title = "Accessible inline form labels"
date = "2009-06-17"
tags = ["accessibility", "css", "forms", "html", "javascript", "labels"]
+++
__Update:__ Added the check to make sure the input is empty before showing the overlayed label the first time.

I recently read [Trevor Davis](http://trevordavis.net/)‘ post on [inline form labels](http://trevordavis.net/blog/tutorial/jquery-inline-form-labels/). First off, I have the utmost respect for TD. I read his blog regularly and have learned a lot from his posts. While I respect the work he has done for his plugin, I approach things differently. I am a UX Architect for a government site so I have significant concerns about accessibility, semantics and progressive enhancement.

My approach differs from him in 2 main facets:

* He is pulling his inline form label value from the title attribute. I am using the actual label. I feel this is more semantic.
* He is adding and removing a value to the form field. This can cause validation and styling issues. I am going to overlay the label on to the form field therefore not mucking with the value of the field.

That is not to say my technique is not without issue. It relies on good support of the CSS box model.

{{< gist craveytrain 476405 >}}

Simple markup, just your basic form. I’m an unordered list guy for forms, but certainly your favorite method of marking up forms should be fine. Except for tables, cause that’s just wrong.

Again, simple stuff, note the position: relative on the li. That’s sets a bounding box for everything inside of it. Then we are free to use position:absolute for the label (when overlayed). That effectively removes it from layout allowing the inputs to slide left (or up, depending on your form layout).

Notice the use of the overlayed class. I could just style the labels this way by default, but the whole technique here needs javascript. As a general rule of thumb, I use the same technology to add something as I use to manipulate it. Since I will need JavaScript to manipulate the label visibility, I will use JavaScript to put it in position to begin with. I could have styled the label in a default manner (left of the input, above the input, etc) but chose not to for simplicity’s sake.

This code is relatively simple as well but let me point out a few things. Obviously this is assuming jQuery is loaded. Setting a native object for the form elements saves a lot of processing time. Doing the jQuery lookup every time you reference the object is very expensive. Do it once and store it to an object.

Moving on, for each form element set a label variable based on the associated label tag then add the class overlayed to the label. This will position the label inside the form field. Since JavaScript is needed for this technique, we want to initialize the whole thing with JavaScript. You don’t want to end up in a situation where the user has stylesheets capabilities but not Javascript leaving them with an overlayed label and no way to hide it.

Finally we add some event listeners for each form field. The first is a focus which does a lookup on the label associated with the field that has focus and hides it using jQuery’s hide method.

The second event listener added is for blur. If, on blur, the form field value attribute is empty we show the associated label using jQuery’s show method.

That’s about it. I hope you found this technique useful. If nothing else, maybe you found this to be an alternative to Trevor’s inline form label technique. If I get enough interest I will look into creating a jQuery plugin for this. Feel free to wholesale reuse this technique. I hardly coined it, I just blogged it.
