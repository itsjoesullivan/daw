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