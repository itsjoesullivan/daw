var sounds = {
	'a': 'demo/kick.wav',
	's': 'demo/snare.wav'
};

var channelStrip = new ChannelStrip({
	out: context.destination,
	effects: [
		//new Delay({ wet: .4, feedback: 0.4, time: .2}),
		new Reverb({ wet: 0.4})
	]
});

var drumMachine = new DrumMachine({
	sounds: sounds,
	out: channelStrip.input
});