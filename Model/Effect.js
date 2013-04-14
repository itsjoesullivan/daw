var Effect = function(conf) {
	//don't overwrite conf
	conf = conf || {};
	this.input = context.createGain();
	this.output = context.createGain();
	
	//add as property effect.
	this.effect = conf.effect || context.createGain();
	this.input.connect(this.effect);
	
	//create gain for dry/wet
	this.wetGain = context.createGain();
	this.effect.connect(this.wetGain);
	
	
	//add the dry channel
	this.dry = context.createGain();
	this.input.connect(this.dry);

	
	this.dry.connect(this.output);
	this.effect.connect(this.output);
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
	this.dry.gain.value = 1-val;
	this.wetGain.gain.value = val;
};