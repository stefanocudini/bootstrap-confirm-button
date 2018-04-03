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

    callback = callback || $.noop;
    
	opts = $.extend({
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
                $(e.target).trigger('confirm:after');
                callback.call(thisBtn$, e);
                resetBtn();
            }
            else
            {
                thisBtn$.data('confirmed',true);
                
                $(e.target).trigger('confirm:before', e.target);

                thisBtn$.html(optsEl.msg).addClass(optsEl.classname).bind('mouseout.confirm', function() {
                    timeoToken = setTimeout(function() {
                        resetBtn();
                        $(e.target).trigger('confirm:expired', e.target);
                    }, parseInt(optsEl.timeout));
                }).bind('mouseover.confirm', function() {
                    clearTimeout(timeoToken);
                });
            }
        }).removeClass(optsEl.classname);

    });

	return $(this);
};
