require([
		'jquery',
		'/Model/ChannelStrip.js',
		'/Controller/ChannelStripController.js'
	], function($,ChannelStrip,ChannelStripController) {
			var channelStrip = new ChannelStrip({out: context.destination});
			var channelStripController = new ChannelStripController({
				channel: channelStrip,
				el: $(".channel-strip")
			});
});