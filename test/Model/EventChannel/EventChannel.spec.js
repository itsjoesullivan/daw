require(['/Model/EventChannel.js'], function(EventChannel) {
	console.log(arguments);
	
	var eventChannel;
		
		describe('EventChannel', function() {
			
			
			
			it('exists', function() {
				expect(typeof EventChannel).to.equal('function')
			});
			
			
			describe('clearDuring(start,end)', function() {
				eventChannel = new EventChannel();
				eventChannel.events.push({
					start: 1,
					end: 2
				});
				
				
				it('returns true when the interval is clear', function() {
					expect(eventChannel.clearDuring(0,1)).to.equal(true);
				})
				
				it('returns false when the period is not clear', function() {
					expect(eventChannel.clearDuring(1,2)).to.equal(false);
					expect(eventChannel.clearDuring(0,2)).to.equal(false);
					expect(eventChannel.clearDuring(0.5,2)).to.equal(false);
					expect(eventChannel.clearDuring(0,1.5)).to.equal(false);
					expect(eventChannel.clearDuring(0.5,1.5)).to.equal(false);
					expect(eventChannel.clearDuring(0.5,2.5)).to.equal(false);
					expect(eventChannel.clearDuring(0,3)).to.equal(false);
				});
			});
			
			
			describe('getClearDurations(start,end)', function() {
				it('returns an array of durations that are free in that channel between the interval of the start and end argument', function() {
					
				})
			});
			
			describe('push(ev)', function() {
				it('adds an event to this.events', function() {
					var eventChannel = new EventChannel();
					eventChannel.push({start:1,end:2});
					expect(eventChannel.events.length).to.equal(1);
				});
				it('adds does not add an event and returns false when the interval isn\'t clear', function() {
					var eventChannel = new EventChannel();
					eventChannel.push({start:1,end:2});
					expect(eventChannel.events.length).to.equal(1);
					var worked = eventChannel.push({start:0,end:4});
					expect(worked).to.equal(false);
					expect(eventChannel.events.length).to.equal(1);
				})
			});
			
		
		
		});
		
		mocha.run();
		
	
});

