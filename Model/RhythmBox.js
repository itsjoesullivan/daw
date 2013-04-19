
define(['/Model/ChannelStrip.js'],function(ChannelStrip) {
	var RhythmBox = function(conf) {
	
		var sounds = {
			'kick': '/samples/rhythmBox/kick.wav',
			'snare': '/samples/rhythmBox/snare.wav'
		}
		
		this.running = false;
		
		this.tempo = 120;
		this.timeouts = [];
		
		this.channel = new ChannelStrip({});
		
		this.sounds = [];
		
		var patterns = []
		
		var pattern = {
			tempo: 120,
			resolution: 1/4,
			ticks: [
				[
					'kick'
				],
				[
					'snare'
				],
				[
					'kick'
				],
				[
					'snare'
				]
			]
		};
		
		this.currentPattern = pattern;
		
		for(var key in sounds) {
			this.sounds[key] = new Sound({
				path: sounds[key],
				output: this.channel.input
			});
		}
		
	};
	
	
	RhythmBox.prototype.playSound = function(sound) {
		var source = sound.generateSource();
		source.connect(this.channel.input);
		source.noteOn(0);
	};
	
	
	RhythmBox.prototype.start = function() {
		if(this.running) {
			return this.stop();
		}
		this.running = true;
		this.schedulePattern(this.currentPattern);
		return true;
	};
	
	RhythmBox.prototype.stop = function() {
		this.timeouts.forEach(function(timeout) {
			clearInterval(timeout);
		});
		this.running = false;
	};
	var i = 0;
	RhythmBox.prototype.schedulePattern = function(pattern) {
		var tickLength = 4 * 60 / this.tempo * pattern.resolution * 1000;
		var distance = 0;
		console.log(i);
		var tick = pattern.ticks[i];
		tick.forEach(function(note) {
			this.playSound(this.sounds[note]);
			this.timeouts.push(setTimeout(function() {
				
			}.bind(this),tickLength));
		}.bind(this));
		this.timeouts.push(setTimeout(function() {
			this.schedulePattern(pattern);
		}.bind(this),1000 * (60 / this.tempo)));
		console.log(this.currentPattern.ticks.length);
		i = this.currentPattern.ticks.length-1 > i ? i+1 : 0;
	};
	
	return RhythmBox;
});