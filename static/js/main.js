(function() {
'use strict';

var addEvent = (function() {
	var queue = {},
		w3c = false,
		ie = false,
		add = function( el, event, fn ) {
			if ( !el || !event || !fn ) return;

			var eventQ = queue[ event ];

			if (!eventQ) eventQ = queue[ event ] = {};

			if ( !eventQ[ el ] ) {

				eventQ[ el ] = [ fn ];

				if ( w3c ) {
					el.addEventListener( event, run, false);
				} else if ( ie ) {
					el.attachEvent( 'on' + event, run);
				} else {
					el['on' + event] = run;
				}
			// Already run before
			} else {
				eventQ[ el ].push( fn );
			}
		},
		run = function( event ) {
			var eventQ = queue[ event.type ][ this ],
				l = eventQ.length,
				i = 0;

				for ( ; i < l; i++ ) {
					eventQ[ i ].apply(this, [ event ]);
				}
		};

		if ( document.addEventListener ) {
			w3c = true;
		} else if ( document.attachEvent ) {
			ie = true;
		}

	return add;
}());

// nav fixer
(function() {
	var onScroll = function() {
			if ( window.scrollY > 240 ) {
				navBar.classList.add('fixed');
			} else {
				navBar.classList.remove('fixed');
			}
		};

	if ( document.body.classList.contains('home') && document.documentElement.clientWidth > 800 ) {
		var navBar = document.querySelector( '.page-nav' );

		addEvent( window, 'scroll', onScroll );
	}

}());
}());
