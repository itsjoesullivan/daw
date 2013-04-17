define(['/Model/Sound.js'],function(Sound) {

	var concatBuffers = function(buffer1,buffer2) {
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
		this.input.connect(this.node);
		this.node.onaudioprocess = function(e) {
			if(this.recording) {
				if(!('audioBuffer' in this)) {
					this.audioBuffer = e.inputBuffer;
				} else {
					this.audioBuffer = concatBuffers(this.audioBuffer,e.inputBuffer);
				}
			}
		}.bind(this);
	};

	/** Not necessary
*/
	Recording.prototype.generateSource = function() {
		var source = context.createBufferSource();
		source.buffer = this.audioBuffer;
		return source;
	};

	/** Convert the recording to a read-only sound
*/
	Recording.prototype.toSound = function(args) {
		var sound = new Sound({buffer: this.audioBuffer});
		return sound;
	};


	
return Recording;
	
});