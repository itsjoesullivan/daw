var Delay = function(conf) {
	conf = conf || {
		wet: .5,
		time: .5,
		feedback: 0
	};
	conf.effect = context.createDelay();
	Effect.call(this,conf);
	
	this.effect.delayTime.value = conf.time;
	
	this.setFeedback(conf.feedback);
	
}

Delay.prototype = Object.create( Effect.prototype );
Delay.prototype.constructor = Delay;

Delay.prototype.setFeedback = function(val) {
	//establish feedback loop
	this.feedbackChannel = context.createGain();
	this.wetChannel.connect(this.feedbackChannel);
	this.feedbackChannel.gain.value = val;
	this.feedbackChannel.connect(this.input);
}

if(typeof 'define' !== 'undefined') {
	define(function() {
		return Delay;
	});
}