//global for transport mock... 



loader.ready(function() {
require(['/Test/Model/ChannelStrip/ChannelStrip.mock.js','/Controller/ChannelController.js'], function(ChannelStrip,ChannelController) {
	
	describe('ChannelController', function() {
		
		beforeEach(function() {
			$(".ChannelContainer").empty();
		});
		
		it('exists', function() {
			expect(typeof ChannelController).to.equal('function')
		});
		
		it('creates a channel view', function(done) {
			new ChannelController(new ChannelStrip(), function(channelController) {
				expect($(".ChannelStrip").length).to.equal(1);
				done();
			});
		});
	});
	
	mocha.run();
	
});

});