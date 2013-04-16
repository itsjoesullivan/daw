console.log('asdf');

require(
	[
		'Model/Sound',
		'Model/ChannelStrip',
		'Model/DrumMachine',
		'Model/Effect',
		'Model/Effects/Delay',
		'Model/Effects/Reverb',
		'Model/Timeline'
		], 
		function(Sound,ChannelStrip,DrumMachine,Effect,Delay,Reverb,Timeline) {
			var sounds = {
				'a': '/demo/kick.wav',
				's': '/demo/snare.wav'
			};

			var channelStrip = new ChannelStrip({
				out: context.destination,
				effects: [
					//new Delay({ wet: .4, feedback: 0.8, time: .1}),
					//new Reverb({ wet: 0.8})
				]
			});

			drumMachine = new DrumMachine({
				sounds: sounds,
				out: channelStrip.input
			});
			
			var timeline = new Timeline();


			timeline.add({
				type: 'note',
				at: 0,
				sound: drumMachine.soundMap['a'],
				output: drumMachine.output
			});
			
			timeline.add({
				type: 'note',
				at: 500,
				sound: drumMachine.soundMap['s'],
				output: drumMachine.output
			});
			setInterval(function() {
				timeline.stop();
				timeline.position(0);
				timeline.run();
			},1000);
});