import 'prismjs';

const FontFaceObserver  = require( 'fontfaceobserver' );
import { perf } from '__ct';

new FontFaceObserver('League Spartan').load()
	.then( () => { document.firstElementChild.classList.add('hasLeagueSpartan') } )
	.then( () => { perf.mark('font:league-spartan:loaded') } );

new FontFaceObserver('Libre Baskerville').load()
	.then( () => { document.firstElementChild.classList.add('hasLibreBaskerville') } )
	.then( () => { perf.mark('font:libre-baskerville:loaded') } );

new FontFaceObserver('Inconsolata-g').load()
	.then( () => { document.firstElementChild.classList.add('hasInconsolata') } )
	.then( () => { perf.mark('font:inconsolata:loaded') } );
