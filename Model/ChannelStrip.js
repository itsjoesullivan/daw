/** Your basic channel strip

*/
var ChannelStrip = function(conf) {
	this.input = context.createGain();
	this.output = context.createGain();
	
	this.effects = conf.effects || [];
	
	/* Connect the effects */
	var input = this.input;
	this.effects.forEach(function(effect) {
		input.connect(effect.input);
		input = effect.output;
	});
	input.connect(this.output);

	this.output.connect(conf.out);
};

if(typeof 'define' !== 'undefined') {
	define(function() {
		return ChannelStrip;
	});
}