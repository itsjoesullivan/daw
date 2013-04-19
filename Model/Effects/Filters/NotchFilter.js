define(['/Model/Effect.js'], function(Effect) {
var NotchFilter = function(conf) {
	conf = conf || {
		wet: 1
	};
	
	conf.effect = context.createBiquadFilter();

	  conf.effect.type = 5;
	  conf.effect.frequency.value = conf.frequency || 2000;
	  conf.effect.Q.value = conf.Q || .5;
	  conf.effect.gain.value = conf.gain || 0;
	Effect.call(this,conf);
}

NotchFilter.prototype = Object.create( Effect.prototype );
NotchFilter.prototype.constructor = NotchFilter;

return NotchFilter;

});

