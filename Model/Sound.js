
/** Just a sound. Gives us "play", primarily.
*/
var Sound = function(conf,fn) {
	this.load(conf.path);
	this.out = conf.out;
	this.ready = fn;
	this.sources = [];
};

/** Spin off a buffer

*/
Sound.prototype.generateSource = function() {
	var source = context.createBufferSource();
	source.buffer = this.buffer;
	source.connect(this.out);
	return source;
}

Sound.prototype.play = function() {
	this.schedule(context.currentTime);
};

Sound.prototype.schedule = function(when) {
	if(! ('buffer' in this)) {
		return false;
	}
	if(typeof when !== 'number' && !when) {
		when = 0;
	}
	var source = this.generateSource();
	source.noteOn(when);
	this.sources.push({
		when: when,
		buffer: source
	});
};

Sound.prototype.stop = function() {
	this.sources.forEach(function(source) {
		source.buffer.noteOff(source.when);
	});
	this.sources = [];
};

Sound.prototype.load = function(path,fn) {
	var self = this;
	var req = new XMLHttpRequest();
	req.open("GET",path,true);
	req.responseType = "arraybuffer";
	req.onload = function() {
		context.decodeAudioData(req.response, function(buffer) {
			self.buffer = buffer;
			if(self.ready) {
				self.ready(self);
			}
		});
	};
	req.send();
}


if(typeof 'define' !== 'undefined') {
	define(function() {
		return Sound;
	});
}