/*!
 * Bootstrap Confirm Button 0.1
 * https://github.com/stefanocudini/bootstrap-confirm-button
 *
 * Copyright 2014, Stefano Cudini - stefano.cudini@gmail.com
 * Licensed under the MIT license.
 */

jQuery.fn.confirmButton = function(options, callback) {

	var opts = $.extend({
				msg: "I'm sure!",
				className: 'btn-danger',
				timeout: 1500
			}, options);

	var timeoToken,
		btn$ = $(this),
		oriText = btn$.html();
	
	function resetBtn() {
		btn$.html(oriText).removeClass(opts.className).data('confirmed',false);
	}

	btn$.data('confirmed', false);
	btn$.on('click.confirm', function(e) {
		e.preventDefault();
		if(btn$.data('confirmed'))
		{
			callback(e);
			resetBtn();
		}
		else
		{
			btn$.data('confirmed',true);
			btn$.html(opts.msg).addClass(opts.className).bind('mouseout.confirm', function() {
				timeoToken = setTimeout(resetBtn, opts.timeout);
			}).bind('mouseover.confirm', function() {
				clearTimeout(timeoToken);
			});
		}
	}).removeClass(opts.className);
	
	return btn$;
};
