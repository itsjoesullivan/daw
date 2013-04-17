require(['/Model/Timeline.js'], function(Timeline) {
	
	
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
		
	});
	
	//handleNote expects to have a Sound to work with
	
	mocha.run();
	
});

