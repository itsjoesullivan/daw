require([
		'jquery',
		'/Model/ChannelStrip.js',
		'/Model/DrumMachine.js',
		'/Controller/AppController.js'
	], function($,ChannelStrip,DrumMachine,AppController) {
		
		var sounds = {
			'a': '/demo/kick.wav',
			's': '/demo/snare.wav',
			'd': '/demo/song/drums.wav',
			'f': '/demo/song/bass.wav',
			'g': '/demo/song/voice.wav',
			'h': '/demo/song/gtr.wav'
		};
		

		var channelStrip = new ChannelStrip({
			out: context.destination,
			effects: [
				//new Delay({ wet: .4, feedback: 0.8, time: .1}),
				//new Reverb({ wet: 0.4})
			]
		});
		
		//var channelStripController = new ChannelStripController(channelStrip);

		drumMachine = new DrumMachine({
			sounds: sounds,
			out: channelStrip.input
		});
		
		appController = new AppController({
			el: $(".app")
		});
		
		timeline = appController.timeline;
		
		timeline.add({
			type: 'note',
			at: 1,
			sound: drumMachine.soundMap['d'],
			output: context.destination,
			channel:'' + 1
		});
		timeline.add({
			type: 'note',
			at: 1,
			sound: drumMachine.soundMap['f'],
			output: context.destination,
			channel:'' + 2
		});
		timeline.add({
			type: 'note',
			at: 1,
			sound: drumMachine.soundMap['g'],
			output: context.destination,
			channel:'' + 3
		});
		
		
		console.log(timeline);
		
		setTimeout(function() {
			timeline.position(3);
			timeline.run();
		},800);
		
		
});