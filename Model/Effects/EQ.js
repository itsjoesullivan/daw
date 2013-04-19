define(['/Model/Effect.js','/Model/Effects/Filters/NotchFilter.js'], function(Effect,NotchFilter) {
var EQ = function(conf) {
	conf = conf || {
		wet: 1
	};
	
	
	
	conf.effect = context.createGainNode();
	
	Effect.call(this,conf);
	
	this.input.disconnect();
	
	this.input.gain.value = .1;
	
	this.high = new NotchFilter({
		frequency: 4000
	});
	this.input.connect(this.high.input);
	//this.high.output.connect(this.effect);
	
	this.mid = new NotchFilter({
		frequency: 2300
	});
	this.high.output.connect(this.mid.input);
	//this.mid.output.connect(this.effect);
	
	this.low = new NotchFilter({
		frequency: 200
	});
	this.mid.output.connect(this.low.input);
	this.low.output.connect(this.effect);
}

EQ.prototype = Object.create( Effect.prototype );
EQ.prototype.constructor = EQ;

return EQ;

});

