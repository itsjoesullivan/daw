define(['underscore','backbone','/Model/Recording.js'], function(_,Backbone,Recording) {

/** Your basic channel strip

*/
var ChannelStrip = function(conf) {
	_.extend(this,Backbone.Events);
	this.input = context.createGain();
	this.bankInput = context.createGain();
	this.bankInput.connect(this.input);
	this.output = context.createGain();
	this.timeline = conf.timeline;
	this.armed = false;
	
	this.label = conf.label || '';
	
	this.effects = conf.effects || [];
	
	/* Connect the effects */
	var input = this.input;
	this.effects.forEach(function(effect) {
		input.connect(effect.input);
		input = effect.output;
	});
	
	this.panner = context.createPanner();
	input.connect(this.panner);
	this.panner.connect(this.output);
	
	this.panner.setPosition(-2,0,0);

	this.output.connect(conf.out);
	
	this.on('change:armed', function(val) {
		if(val) {
			this.bankInput.disconnect();
			console.log('disconnecting other things');
		} else {
			this.bankInput.connect(this.input);
		}
	})
};

ChannelStrip.prototype.set = function(k,v) {
	switch(k) {
		case 'gain':
			this.output.gain.value = v;
			break;
		default:
			this[k] = v;
			break;
	}
	this.trigger('change:' + k,v,this);
};

ChannelStrip.prototype.arm = function() {
	
	var soundEvent = {
		type: 'note',
		at: this.timeline.position(),
		output: this.bankInput,
		channel: this.label
	};
	
	var onStop = function() {
		console.log('stopping recording');
		this.recording.recording = false;
		var sound = this.recording.toSound();
		soundEvent.sound = sound;
		this.timeline.add(soundEvent);
		
		this.set('armed',false);
	};
	var onRun = function() {
		this.recording = new Recording({
			input: this.output
		});
		this.recording.recording = true;
		this.timeline.once('stop', onStop, this);
	}
	
	if(!this.armed) { //wasnt before
		this.timeline.once('run', onRun, this);
	} else { //take off any listener
		this.timeline.off('run',onRun,this);
		this.timeline.off('stop',onStop,this);
	}
	this.trigger('arm',this);
	return this.set('armed',!this.armed);
	
	
};

	
		return ChannelStrip;
	});