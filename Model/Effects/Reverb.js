var Reverb = function(conf) {
	conf = conf || {
		wet: .9
	};
	conf.effect = context.createConvolver();
	
	
	Effect.call(this,conf);
	var self = this;
	new Sound({
		path: '/samples/dining-living-true-stereo.wav'
	}, function(sound) {
		self.effect.buffer = sound.buffer
	});
	
		
}

Reverb.prototype = Object.create( Effect.prototype );
Reverb.prototype.constructor = Reverb;

if(typeof 'define' !== 'undefined') {
	define(function() {
		return Reverb;
	});
}