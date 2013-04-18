require([
		'jquery',
		'/Model/ChannelStrip.js',
		'/Controller/ChannelStripController.js'
	], function($,ChannelStrip,ChannelStripController) {
			var channelStrip = new ChannelStrip({
				out: context.destination,
				label: '01'
			});
			var channelStripController = new ChannelStripController({
				channel: channelStrip,
				el: $(".channel-strip")
			});
});