var Reverb = function(conf) {
	conf = conf || {
		wet: .9
	};
	conf.effect = context.createConvolver();
	
	
	Effect.call(this,conf);
	var self = this;
	new Sound({
		path: 'samples/feedback-spring.wav'
	}, function(sound) {
		self.effect.buffer = sound.buffer
	});
	
		
}

Reverb.prototype = Object.create( Effect.prototype );
Reverb.prototype.constructor = Reverb;