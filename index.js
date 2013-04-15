require(
	[
		'Model/Sound',
		'Model/ChannelStrip',
		'Model/DrumMachine',
		'Model/Effect',
		'Model/Effects/Delay',
		'Model/Effects/Reverb',
		'Model/Timeline',
		'Controller/TransportController'
		], 
		function(Sound,ChannelStrip,DrumMachine,Effect,Delay,Reverb,Timeline,TransportController) {
			var sounds = {
				'a': 'demo/kick.wav',
				's': 'demo/snare.wav'
			};

			var channelStrip = new ChannelStrip({
				out: context.destination,
				effects: [
					//new Delay({ wet: .4, feedback: 0.8, time: .1}),
					//new Reverb({ wet: 0.4})
				]
			});

			drumMachine = new DrumMachine({
				sounds: sounds,
				out: channelStrip.input
			});
			
			var timeline = new Timeline();
			
			timeline.add({
				at:100,
				fn: function() {
					drumMachine.soundMap['a'].play();
				}
			});
			
			timeline.add({
				at:500,
				fn: function() {
					drumMachine.soundMap['a'].play();
				}
			});
			
			timeline.add({
				at:900,
				fn: function() {
					drumMachine.soundMap['a'].play();
				}
			});
			
			timeline.add({
				type: 'note',
				at: 1100,
				sound: drumMachine.soundMap['s']
			});
			setTimeout(function() {
				//timeline.run();
			},100);
			setTimeout(function() {
				//timeline.stop();
			},1300);
			
			//set up channel
			
			//add some tracks
			
			//render transport view
			var transportController = new TransportController();
			
			
});