//
// create closure
//
(function($) {
	//
	// plugin definition
	//
	$.fn.defaultValues = function(options) {
		debug(this);
 		// build main options before element iteration
	 	var opts = $.extend({}, $.fn.defaultValues.defaults, options);		
 		// iterate and reformat each matched element
	 	return this.each(function() {
			$this = $(this);
   			// build element specific options
   			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			// use the data function to save the data
			$this.data( "txt", $.trim($this.val()) );
			$this.focus(function(){
				// On focus test for default saved value and if not the same clear it
				if ( $.trim($(this).val()) === $(this).data("txt") ) {
					 $(this).val("");
				}
			}).blur(function(){
				// Use blur event to reset default value in field that have class clear
				// but ignore if class once is present
				if ( $.trim($(this).val()) === "" && !$(this).hasClass("once") ) {
					//Restore saved data
					// call our format function
					var markup = $(this).data("txt");
					markup = $.fn.defaultValues.format(markup);
					$(this).val(markup);
				}
			});
 		});
  	};
	//
	// private function for debugging
	//
	function debug($obj) {
		if (window.console && window.console.log)
			window.console.log('count: ' + $obj.size());
	};
	//
	// define and expose our format function
	//
	$.fn.defaultValues.format = function(txt) {
		//return '<strong>' + txt + '</strong>';
		return txt;
	};
	//
	// plugin defaults
	//
	$.fn.defaultValues.defaults = {
		text: 'Input only alphabets',
		number: 'Input only numbers'
	};
//
// end of closure
//
})(jQuery);