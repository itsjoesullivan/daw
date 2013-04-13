/** Your basic channel strip

*/
var ChannelStrip = function(conf) {
	this.input = context.createGain();
	this.output = context.createGain();
	
	this.input.connect(this.output);
	this.output.connect(conf.out);
};