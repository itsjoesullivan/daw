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

ChannelStrip.prototype.set = function(k,v) {
	switch(k) {
		case 'gain':
			this.output.gain.value = v;
			break;
		default:
			break;
	}
	this.trigger('change:' + k);
};

ChannelStrip.prototype.arm = function() {
	this.armed = true;
	if(!('recording' in this)) {
		this.recording = new Recording({
			input: this.output
		});
	}
	window.timeline.once('run', function() {
		var soundEvent = {
			type: 'note',
			at: timeline.position(),
			output: this.output
		}
		this.recording.recording = true;
		window.timeline.once('stop', function() {
			this.recording.recording = false;
			var sound = this.recording.toSound();
			soundEvent.sound = sound;
			timeline.add(soundEvent);
			
			this.armed = false;
		},this)
	},this);
};

if(typeof 'define' !== 'undefined') {
	define(function() {
		return ChannelStrip;
	});
}