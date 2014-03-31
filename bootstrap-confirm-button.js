
jQuery.fn.confirmButton = function(options) {

	var opts = $.extend({
				msg: "I'm sure!",
				className: 'btn-danger',
				timeout: 3000
			}, options);

	return this.one('click.confirm', function(e) {
		e.preventDefault();
		var timeoToken,
			btn$ = $(this),
			oriText = btn$.html();

		btn$.html(opts.msg).addClass(opts.className).bind('mouseout.confirm', function() {
			timeoToken = setTimeout(function() {
				btn$.html(oriText).unbind('.confirm').removeClass(opts.className).confirm();
			}, opts.timeout);
		}).bind('mouseover.confirm', function() {
			clearTimeout(timeoToken);
		});
	}).removeClass(opts.className);
};
