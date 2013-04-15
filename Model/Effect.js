var Effect = function(conf) {
	//don't overwrite conf
	conf = conf || {};
	this.input = context.createGain();
	this.output = context.createGain();
	
	//add as property effect.
	this.effect = conf.effect || context.createGain();
	this.input.connect(this.effect);
	
	//create gain for dry/wet
	this.wetChannel = context.createGain();
	this.effect.connect(this.wetChannel);
	
	
	//add the dry channel
	this.dry = context.createGain();
	this.input.connect(this.dry);

	
	this.dry.connect(this.output);
	this.wetChannel.connect(this.output);
	
	for(var i in conf) {
		this.set(i,conf[i])
	}
};
Effect.prototype.set = function(key,val) {
	switch(key) {
		case 'wet':
			this.setWet(val);
			break;
		default:
			break;
	}
};
Effect.prototype.setWet = function(val) {
	console.log('setWet',val);
	this.dry.gain.value = 1-val;
	this.wetChannel.gain.value = val;
};


if(typeof 'define' !== 'undefined') {
	define(function() {
		return Effect;
	});
}