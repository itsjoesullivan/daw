//global for transport mock... 
timeline = {
	status: 'stopped',
	play: function() {
		this.status = 'playing';
	},
	stop: function() {
		this.status = 'stopped';
	}
};
loader.ready(function() {
	

require(['/Controller/TransportController.js'], function(Timeline) {
	
	describe('TransportController', function() {
		
		beforeEach(function() {
			$("#TransportContainer").empty();
		});
		
		it('exists', function() {
			expect(typeof TransportController).to.equal('function')
		});
		
		it('creates a transport view', function(done) {
			var transportController = new TransportController(function(it) {
				var transportEl = $("#TransportContainer .Transport");
				expect(transportEl.length).to.equal(1);
				done();
			});
		});
		
		it('has property playButton', function(done) {
			var transportController;
			new TransportController(function(controller) {
				transportController = controller;
				expect('playButton' in controller).to.equal(true);
				done();
			});
		});
		
		it('attaches a listener to the play button that starts the timeline running', function(done) {
			var transportController = new TransportController(function(it) {		
					timeline.stop();
					expect(timeline.status).to.equal('stopped');
					$(".Transport .PlayButton").click();
					expect(timeline.status).to.equal('playing');
					done();
			});
		});
		
		it('attaches a listener to the stop button that stop the timeline running', function(done) {
			var transportController = new TransportController(function(it) {		
					timeline.play();
					expect(timeline.status).to.equal('playing');
					$(".Transport .StopButton").click();
					expect(timeline.status).to.equal('stopped');
					done();
			});
		});
		
		
		
	});
	
	mocha.run();
	
});

})

