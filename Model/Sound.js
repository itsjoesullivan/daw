
/** Just a sound. Gives us "play", primarily.
*/
var Sound = function(conf,fn) {
	this.load(conf.path);
	this.out = conf.out;
	this.ready = fn;
}

Sound.prototype.play = function() {
	var source = context.createBufferSource();
	source.buffer = this.buffer;
	source.connect(this.out);
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
			if(self.ready) {
				self.ready(self);
			}
		});
	};
	req.send();
}