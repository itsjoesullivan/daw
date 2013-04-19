define(['/Model/Effect.js'],function(Effect) {
	var Reverb = function(conf) {
		conf = conf || {
			wet: .9
		};
		conf.effect = context.createConvolver();


		Effect.call(this,conf);
		
		//load a sound and apply it to the convolver
		new Sound({
			path: '/impulse_responses/plate/l960a.wav'
		}, function(sound) {
			this.effect.buffer = sound.buffer
		}.bind(this));


	}

	Reverb.prototype = Object.create( Effect.prototype );
	Reverb.prototype.constructor = Reverb;

	return Reverb;
});