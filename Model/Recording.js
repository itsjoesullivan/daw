var concatBuffers = function(buffer1,buffer2) {
	console.log(buffer1.length);
	var newBuffer = context.createBuffer( 2, (buffer1.length + buffer2.length), buffer1.sampleRate );
	for (var i=0; i<2; i++) {
	      var channel = newBuffer.getChannelData(i);
	      channel.set( buffer1.getChannelData(i), 0);
	      channel.set( buffer2.getChannelData(i), buffer1.length);
	}
	return newBuffer;
};

var Recording = function(conf) {
	this.channel = conf.channel || false;
	this.position = 0;
	this.input = conf.input;
	this.node = context.createJavaScriptNode(conf.bufferSize || 1024, 2, 2);
	this.node.connect(context.destination);
	this.recording = false;
	this.buffers = {
		left: [],
		right: []
	};
	//this.audioBuffer = false;
	var self = this;
	this.node.onaudioprocess = function(e) {
		
		if(self.recording) {
			if(!('audioBuffer' in self)) {
				console.log('setting as');
				self.audioBuffer = e.inputBuffer;
			} else {
				self.audioBuffer = concatBuffers(self.audioBuffer,e.inputBuffer);
			}
			console.log(self.audioBuffer);
		}
	};
};
Recording.prototype.toSource = function() {
	//var buffer = this.toFloat();
	//console.log(buffer);
	var source = context.createBufferSource();
		console.log(this.audioBuffer);
	source.buffer = this.audioBuffer;
	return source;
};

Recording.prototype.play = function() {
	var source = this.toSource();
	source.connect(context.destination);
	source.noteOn(0);
}


if(typeof define !== 'undefined') {
	define(function() {
		return Recording;
	})
}