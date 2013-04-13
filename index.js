var sounds = {
	'a': 'demo/kick.wav',
	's': 'demo/snare.wav'
};

var channelStrip = new ChannelStrip();

var drumMachine = new DrumMachine({
	sounds: sounds,
	out: channelStrip.input;
});

