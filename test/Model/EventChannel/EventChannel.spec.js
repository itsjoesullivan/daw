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
				it('returns {start:start,end:end} when the events array is empty', function() {
					eventChannel = new EventChannel();
					var clearDurations = eventChannel.getClearDurations(0,1);
					expect(clearDurations[0].start).to.equal(0);
					expect(clearDurations[0].end).to.equal(1);
				})
				it('returns an empty array when no room', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 0,
						end: 100
					});
					var clearDurations = eventChannel.getClearDurations(0,1);
					expect(clearDurations.length).to.equal(0);
				});
				
				it('returns a shortened array when only the first bit fits', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 10,
						end: 100
					});
					var clearDurations = eventChannel.getClearDurations(0,50);
					expect(clearDurations.length).to.equal(1);
					expect(clearDurations[0].start).to.equal(0);
					expect(clearDurations[0].end).to.equal(10);
				});
				
				it('returns a shortened array when only the last bit fits', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 0,
						end: 10
					});
					var clearDurations = eventChannel.getClearDurations(5,20);
					expect(clearDurations.length).to.equal(1);
					expect(clearDurations[0].start).to.equal(10);
					expect(clearDurations[0].end).to.equal(20);
				});
				
				it('breaks an event into 2 pieces when something in the middle', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 5,
						end: 10
					});
					var clearDurations = eventChannel.getClearDurations(0,20);
					expect(clearDurations.length).to.equal(2);
					expect(clearDurations[0].start).to.equal(0);
					expect(clearDurations[0].end).to.equal(5);
					expect(clearDurations[1].start).to.equal(10);
					expect(clearDurations[1].end).to.equal(20);
				});
				
				it('breaks an event into n+1 pieces when n discontinuous elements are in the middle', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 5,
						end: 10
					}, {
						start: 15,
						end: 20
					}, {
						start: 25,
						end: 30
					});
					var clearDurations = eventChannel.getClearDurations(0,35);
					expect(clearDurations.length).to.equal(4);
					expect(clearDurations[0].start).to.equal(0);
					expect(clearDurations[0].end).to.equal(5);
					expect(clearDurations[1].start).to.equal(10);
					expect(clearDurations[1].end).to.equal(15);
				});
				
				it('doesnt die on continuous events', function() {
					eventChannel = new EventChannel();
					eventChannel.push({
						start: 5,
						end: 10
					}, {
						start: 10,
						end: 20
					});
					var clearDurations = eventChannel.getClearDurations(0,35);
					expect(clearDurations.length).to.equal(2);
				});
				
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

