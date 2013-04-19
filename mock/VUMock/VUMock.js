require([
		'jquery',
		'/Controller/VUController.js',
		'/Model/Sound.js'
	], function($,VUController,Sound) {
		
		var sound = new Sound({
			path: '/demo/kick.wav'
		});
		
		console.log(sound);
		var meterEl = $('.vu-meter')
		
		sound.ready = function() {
			var meter = new VUController({
				el: meterEl
			});
			
			setInterval(function() {
				
			},10);
			
			var playNote = function() {
				var source = sound.generateSource()
				//source.connect(context.destination);
				source.connect(meter.analyser);
				var vol = new Uint8Array(2);
				meter.analyser.getByteTimeDomainData(vol);
				console.log(vol);
				source.noteOn(0);
			}
			
			var interval = setInterval(playNote,1000);
			
			window.start = function() {
				interval = setInterval(playNote,1000);
			}
			
			
			
			playNote();
			
			window.stop = function() { clearInterval(interval)};
			
		};
});