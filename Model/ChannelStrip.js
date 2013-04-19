define(['underscore','backbone','/Model/Recording.js','/Model/Effects/EQ.js'], function(_,Backbone,Recording,EQ) {

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
	var nextInput = this.input;
	this.effects.forEach(function(effect) {
		nextInput.connect(effect.input);
		nextInput = effect.output;
	});
	
	
	
	
	this.panner = context.createPanner();
	
	this.eQ = new EQ();
	this.eQ.output.connect(this.output);
	
	
	this.input.connect(this.eQ.input);
	//this.panner.connect(this.output);
	
	//this.panner.setPosition(0,0,0);
	// 
	// 
	// 

	this.output.connect(conf.out);
	
	this.send = context.createGainNode();
	this.output.connect(this.send);
	this.send.gain.value = 1;
	
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
		this.recording.render(function(data) {
			console.log('data');
			
			var sound = this.recording.toSound();
			soundEvent.sound = sound;
			this.timeline.add(soundEvent);
		}.bind(this));
		
		
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