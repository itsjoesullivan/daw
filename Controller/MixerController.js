define([
	'/Model/ChannelStrip.js',
	'/Controller/ChannelStripController.js'], function(ChannelStrip,ChannelStripController) {
	
	var MixerController = function(conf) {
		
		this.el = conf.el;
		this.channels = [];
		this.master = new ChannelStrip({
			out: context.destination
		});

		//create channels
		var ct = 4;
		while(ct--) {
			this.channels.push(new ChannelStrip({
				out: this.master.input
			}));
		}

		//create controllers for channels + render
		$(this.el).append("<div class='channel-strips'></div>");

		this.channelStripsEl = $(this.el).find(".channel-strips");

		this.channelControllers = [];
		this.channels.forEach(function(channel) {
			$(this.channelStripsEl).append("<div class='channel-strip'></div>");
			var el = $(this.channelStripsEl).find('.channel-strip').last();
			var controller = new ChannelStripController({
				model: channel,
				el: el
			});
			this.channelControllers.push(controller);
		}.bind(this));
		
		
		/*input.on('live', function() {
			console.log('live');
			input.source.connect(this.channels[0].input)
		},this)*/
		
	};
	return MixerController;
});
