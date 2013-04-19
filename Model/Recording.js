define(['/Model/Sound.js','/lib/Recorderjs/recorder.js'],function(Sound,Rjs) {

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
		this.node = context.createJavaScriptNode(conf.bufferSize || 16384, 2, 2);
		this.node.connect(context.destination);
		this.recording = false;
		this.input.connect(this.node);
		this.worker = new Worker('/lib/Recorderjs/recorderWorker.js');
		this.worker.onmessage = function(e){
	      var blob = e.data;
	      curCallback(blob);
	    }
		this.worker.postMessage({
	      command: 'init',
	      config: {
	        sampleRate: context.sampleRate
	      }
	    });
		this.node.onaudioprocess = function(e) {
			if(this.recording) {
				this.worker.postMessage({
		        command: 'record',
		        buffer: [
		          e.inputBuffer.getChannelData(0),
		          e.inputBuffer.getChannelData(1)
		        ]
		      });
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
	
	Recording.prototype.render = function(cb) {
		curCallback = function(data) {
			console.log(data);
			var newBuffer = context.createBuffer( 2, (data[0].length), context.sampleRate );
			for (var i=0; i<2; i++) {
			      var channel = newBuffer.getChannelData(i);
			      channel.set( data[i], 0);
			}
			this.audioBuffer = newBuffer;
			window.audioBuffer = data;
			cb(data);
		}.bind(this);
		this.worker.postMessage({ command: 'getBuffer' })
	}
	
	function curCallBack(blob) {
		console.log('got:',blob);
	}
	
return Recording;
	
});