//global for transport mock... 



loader.ready(function() {
require(['/Test/Model/ChannelStrip/ChannelStrip.mock.js','/Controller/ChannelStripController.js'], function(ChannelStrip,ChannelStripController) {
	
	describe('ChannelStripController', function() {
		
		beforeEach(function() {
			$(".ChannelContainer").empty();
		});
		
		it('exists', function() {
			expect(typeof ChannelStripController).to.equal('function')
		});
		
		it('creates a channel view', function(done) {
			new ChannelStripController(new ChannelStrip(), function(channelController) {
				expect($(".ChannelStrip").length).to.equal(1);
				done();
			});
		});
	});
	
	mocha.run();
	
});

});