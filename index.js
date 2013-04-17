
loader.ready(function() {
	

require(
	[
		'Model/Sound',
		'Model/ChannelStrip',
		'Model/DrumMachine',
		'Model/Effect',
		'Model/Effects/Delay',
		'Model/Effects/Reverb',
		'Model/Timeline',
		'Controller/TransportController',
		'Controller/ChannelStripController'
		], 
		function(Sound,ChannelStrip,DrumMachine,Effect,Delay,Reverb,Timeline,TransportController) {
			timeline = new Timeline();
			
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
			
			var channelStripController = new ChannelStripController(channelStrip);

			drumMachine = new DrumMachine({
				sounds: sounds,
				out: channelStrip.input
			});
			
			
			

			
			/*timeline.add({
				type: 'note',
				at: 00,
				sound: drumMachine.soundMap['d']
			});
			timeline.add({
				type: 'note',
				at: 10,
				sound: drumMachine.soundMap['f']
			});
			timeline.add({
				type: 'note',
				at: 20,
				sound: drumMachine.soundMap['g']
			});
			timeline.add({
				type: 'note',
				at: 30,
				sound: drumMachine.soundMap['h']
			});*/
			
			setTimeout(function() {
				timeline.run();
			},1000);

			var transportController = new TransportController();
			
			
			
});

})