require(['/Model/Timeline.js'], function(Timeline) {
	
	require(['/mock/Sound.js'], function(Sound) {
		
		describe('Timeline', function() {
			
			
			it('exists', function() {
				expect(typeof Timeline).to.equal('function')
			});

			it('triggers fn when available at the correct time', function(done) {
				var timeline = new Timeline();
				var message = 'this never happened';

				timeline.add({
					at: 100,
					fn: function() {
						message = 'this happened';
					}
				});

				timeline.run();

				expect(message).to.equal('this never happened');
				setTimeout(function() {
					expect(message).to.equal('this happened');
					done();
				},200);
			});

			it('triggers multiple fns when available at the correct time', function(done) {
				var timeline = new Timeline();
				var message = 'this never happened';

				timeline.add({
					at: 100,
					fn: function() {
						message = 'this happened';
					}
				});

				timeline.add({
					at: 300,
					fn: function() {
						message = 'this happened again';
					}
				});

				timeline.run();

				expect(message).to.equal('this never happened');
				setTimeout(function() {
					expect(message).to.equal('this happened');
				},200);

				setTimeout(function() {
					expect(message).to.equal('this happened again');
					done();
				},400);
			});

			var elog = [];
			log = function(eventName,name,time,duration) {
				elog.push({
					eventName: eventName,
					name: name,
					time: time,
					duration:duration
				});
				elog = elog.sort(function(a,b) { if(a.time === b.time) { return b.eventName === 'noteOff' } return a.time - b.time})
			}

			beforeEach(function() {
				elog = [];
			})
			it('triggers sounds', function(done) {
				var timeline = new Timeline();
				var sound = new Sound('s1');
				timeline.add({
					type: 'note',
					at: 50,
					sound: sound
				});
				timeline.run();
				expect(elog.length).to.equal(1);
				done();
			});
			
			var sample = 44100;
			var expectWithinASample = function(val,exp) {
				expect(val).to.be.within(exp-1/sample,exp+1/sample);
			}
			
			it('triggers sounds to start at the correct time', function() {
				var timeline = new Timeline();
				var sound = new Sound('s1');
				timeline.add({
					type: 'note',
					at: 50,
					sound: sound
				});
				var startTime = context.currentTime;
				timeline.run();
				var startTime = context.currentTime;
				expectWithinASample(elog[0].time - startTime,.05);
			});
			
			it('stops a sound when stop() is called', function(done) {
				
				var timeline = new Timeline();
				var sound = new Sound('s1');
				timeline.add({
					type: 'note',
					at: 50,
					sound: sound
				});
				var startTime = context.currentTime;
				timeline.run();
				setTimeout(function() {
					var startTime = context.currentTime;
					timeline.stop();
					expectWithinASample(elog[1].time,startTime);
					done();
				},100);

				
			});
			
			it('stops a sound at the time that it starts when stop() is called before the event fires', function(done) {
				var timeline = new Timeline();
				var sound = new Sound('s1');
				timeline.add({
					type: 'note',
					at: 500,
					sound: sound
				});
				var startTime = context.currentTime;
				timeline.run();
				setTimeout(function() {
					var startTime = context.currentTime;
					timeline.stop();
					expectWithinASample(elog[1].time,elog[0].time);
					done();
				},100);				
			});
			
			it('doesn\'t play two sounds at once from the same channel', function() {
				var timeline = new Timeline();
				var sound = new Sound('s1',log,15);
				timeline.add({
					type: 'note',
					at: 10,
					sound: sound,
					channel: 1
				});
				var sound2 = new Sound('s2',log,10);
				timeline.add({
					type: 'note',
					at: 20,
					sound: sound2,
					channel: 1
				});
				var startTime = context.currentTime;
				timeline.run();
				expect(elog[1].eventName).to.equal('noteOff');
				expect(elog[1].name).to.equal('s1');
				expect(elog[2].eventName).to.equal('noteOn');
				expect(elog[2].name).to.equal('s2');				
			});
			
			it('in media res', function() {
				var timeline = new Timeline();
				var sound = new Sound('s1',log,15);
				timeline.add({
					type: 'note',
					at: 10,
					sound: sound,
					channel: 1
				});
				timeline.position(15);
				var startTime = context.currentTime;
				timeline.run();
				expect(elog.length).to.equal(1);		
				console.log(startTime,elog[0]);
				expectWithinASample(startTime,elog[0].time);
				expect(elog[0].duration).to.equal(5);
				console.log(elog);
			});
		});

		
		
		mocha.run();
		
	});
	

	
});

