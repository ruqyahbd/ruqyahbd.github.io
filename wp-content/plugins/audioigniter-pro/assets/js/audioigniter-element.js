(function ( $ ) {
	$( document ).on( 'elementor/render/ai-element', function ( event, element ) {
		if ( __CI_AUDIOIGNITER_MANUAL_INIT__ ) {
			var node = jQuery( element ).find( '.audioigniter-root' ).get( 0 );
			__CI_AUDIOIGNITER_MANUAL_INIT__( node );
		}
	} );

})( jQuery );
