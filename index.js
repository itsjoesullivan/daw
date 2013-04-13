var context = new webkitAudioContext();


var sounds = {
	'a': 'kick.wav',
	's': 'snare.wav'
};

var Sound = function(buffer) {
	if(typeof buffer === 'string') {
		this.load(buffer);
	} else {
		this.buffer = buffer;
	}
}
Sound.prototype.play = function() {
	var source = context.createBufferSource();
	source.buffer = this.buffer;
	source.connect(context.destination);
	source.noteOn(0);
}
Sound.prototype.load = function(path,fn) {
	var self = this;
	var req = new XMLHttpRequest();
	req.open("GET",path,true);
	req.responseType = "arraybuffer";
	req.onload = function() {
		context.decodeAudioData(req.response, function(buffer) {
			self.buffer = buffer;
		});
	};
	req.send();
}

var DrumMachine = function(conf) {
	var sounds = conf.sounds;
	this.soundMap = {};
	var self = this;
	var i;
	for(i in sounds) {
		self.addSoundAs(sounds[i],i);
	}
	document.addEventListener('keydown', function(e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if(key in self.soundMap) {
			self.soundMap[key].play();
		}
	},true);
};

DrumMachine.prototype.addSoundAs = function(path,key,fn) {
	var self = this;
	self.soundMap[key] = new Sound(path);
};

var drumMachine = new DrumMachine({
	sounds: sounds
});