/*!
 * Bootstrap Confirm Button
 * https://github.com/stefanocudini/bootstrap-confirm-button
 *
 * Copyright 2017, Stefano Cudini - stefano.cudini@gmail.com
 * Licensed under the MIT license.
 */

jQuery.fn.btsConfirmButton = function(opts, callback) {

    if(typeof opts === 'string')
        opts = {msg: opts};
    else if(typeof opts === 'function')
        callback = opts;

	var opts = $.extend({
		msg: "I'm sure!",
		classname: 'btn-danger',
		timeout: 2000
	}, opts);

    $(this).each(function(idx, btn) {
        var timeoToken,
            thisBtn$ = $(btn),
            datas = thisBtn$.data(),            
            oriHtml = thisBtn$.html(),
            optsEl = $.extend({}, opts);

        for(var i in datas) {
            var opt, type, val = datas[i];
            if( (opt = i.match(/^confirm(.*)$/)) && (type = opt[1].toLowerCase()) ) {
                optsEl[type] = val;
                console.log(type, val)
            }
        }

        function resetBtn() {
            thisBtn$.html(oriHtml).removeClass(optsEl.classname).data('confirmed',false);
        }

        thisBtn$.data('confirmed', false);
        thisBtn$.on('click.confirm', function(e) {
            e.preventDefault();
            if(thisBtn$.data('confirmed'))
            {
                callback.call(thisBtn$, e);
                resetBtn();
            }
            else
            {
                thisBtn$.data('confirmed',true);
                thisBtn$.html(optsEl.msg).addClass(optsEl.classname).bind('mouseout.confirm', function() {
                    timeoToken = setTimeout(resetBtn, parseInt(optsEl.timeout));
                }).bind('mouseover.confirm', function() {
                    clearTimeout(timeoToken);
                });
            }
        }).removeClass(optsEl.classname);

    });

	return $(this);
};
