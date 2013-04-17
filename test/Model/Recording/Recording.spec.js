require([
	'/Model/Sound.js',
	'/Model/Recording.js'], function(Sound,Recording) {
		

		
		var sound = new Sound({
			path: '/demo/kick.wav',
			out: context.destination
		});
		
		
		setTimeout(function() {
			sound.play();
			
			
			describe('Recording', function() {
				it('exists', function() {
					expect(typeof Recording).to.equal('function')
				});

				it('records an input to it.buffer', function(done) {
					recording = new Recording({
						input: sound
					});
					sound.out = recording.node;
					recording.recording = true;
					sound.play();
					setTimeout(function() {
						recording.recording = false;
						var source = recording.toSource();
						source.connect(context.destination);
						expect(source.buffer.getChannelData(0)[0]).to.not.equal(0);
						//source.noteOn(context.currentTime);
						done();
					},500);
				});
			});
			mocha.run();
		},200);
});

