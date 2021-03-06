
/** Just a sound. Gives us "play", primarily.
*/
var Sound = function(conf,fn) {
	if(!('buffer' in conf)) {
		this.loading = true;
		this.load(conf.path);
	} else {
		this.buffer = conf.buffer
	}
	this.out = conf.out;
	this.ready = fn;
	this.sources = [];
	//timeline.on('top', this.stop,this);
};

/** Spin off a buffer

*/
Sound.prototype.generateSource = function() {
	if(this.loading) {
		throw "Still loading file.";
	}
	var source = context.createBufferSource();
	source.buffer = this.buffer;
	return source;
}

Sound.prototype.play = function() {
	this.schedule(context.currentTime);
};

Sound.prototype.schedule = function(when) {
	var self = this;
	if(! ('buffer' in this)) {
		return false;
	}
	if(typeof when !== 'number' && !when) {
		when = 0;
	}
	var source = this.generateSource();
	source.noteOn(when);
	var sourceObj = {
		when: when,
		buffer: source
	};
	setTimeout(function() {
		source.noteOff(0);
		var ind = self.sources.indexOf(sourceObj);
		if(ind > -1) {
			self.sources.splice(ind,1);
		}
	},source.buffer.duration*1010);
	this.sources.push(sourceObj);
};

Sound.prototype.stop = function() {
	while(this.sources.length) {
		this.sources.pop().noteoff(source.when);
	}
};

Sound.prototype.load = function(path,fn) {
	var self = this;
	var req = new XMLHttpRequest();
	req.open("GET",path,true);
	req.responseType = "arraybuffer";
	req.onload = function() {
		context.decodeAudioData(req.response, function(buffer) {
			self.buffer = buffer;
			this.loading = false;
			if(this.ready) {
				this.ready(self);
			}
		}.bind(this));
	}.bind(this);
	req.send();
}


if(typeof 'define' !== 'undefined') {
	define(function() {
		return Sound;
	});
}