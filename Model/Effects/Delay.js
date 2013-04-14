var Delay = function(conf) {
	conf = conf || {
		wet: .5,
		time: .5,
		feedback: 0
	};
	conf.effect = context.createDelay();
	Effect.call(this,conf);
	
	this.effect.delayTime.value = conf.time;
	
	//establish feedback loop
	this.feedbackChannel = context.createGain();
	this.wetChannel.connect(this.feedbackChannel);
	this.feedbackChannel.gain.value = conf.feedback;
	this.feedbackChannel.connect(this.input);

	
	
	
}

Delay.prototype = Object.create( Effect.prototype );
Delay.prototype.constructor = Delay;