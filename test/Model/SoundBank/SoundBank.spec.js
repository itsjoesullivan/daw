require([
	'/Model/Sound.js',
	'/Model/ChannelStrip.js',
	'/Model/DrumMachine.js',
	'/Model/SoundBank.js'], function(Sound,ChannelStrip,DrumMachineSoundBank) {
		
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
		
		drumMachine = new DrumMachine({
			sounds: sounds,
			out: channelStrip.input
		});
	
	
	describe('SoundBank', function() {
		it('exists', function() {
			expect(typeof SoundBank).to.equal('function')
		});
		
		
		
	});
	
	mocha.run();
	
});

