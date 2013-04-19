define([
	'/Model/ChannelStrip.js',
	'/Controller/ChannelStripController.js',
	'/Model/Effects/Reverb.js',
	'/Controller/KnobController.js'], function(ChannelStrip,ChannelStripController,Reverb,KnobController) {
	
	var MixerController = function(conf) {
		
		this.el = conf.el;
		this.channels = [];
		this.timeline = conf.timeline;
		this.master = new ChannelStrip({
			out: context.destination
		});
		
		this.masterController = new ChannelStripController({
			el: $(".master-channel-container"),
			model: this.master
		});
		$(".master-channel-container").find(".ChannelStrip").addClass('master');
		$(".master-channel-container").find(".ChannelStripKnob").addClass('red');
		this.userInput = conf.userInput;

		//create channels
		for(var i = 1; i <=4 ; i++ ) {
			this.channels.push(new ChannelStrip({
				out: this.master.input,
				label: '' + i,
				timeline: this.timeline
			}));
		}
		
		
		var reverb = new Reverb({
			wet: 1
		});
		
		reverb.output.connect(context.destination);
		
		this.channels.forEach(function(channel) {
			channel.send.connect(reverb.input);
		},this);
		
		
		
		
	

		//create controllers for channels + render
		$(this.el).append("<div class='channel-strips'></div>");

		this.channelStripsEl = $(this.el).find(".channel-strips");

		this.channelControllers = [];
		this.channels.forEach(function(channel) {
			channel.on('change:armed', function(armed,channel) {
				if(armed) {
					this.userInput.source.connect(channel.input);
				} else {
					this.userInput.source.disconnect(0);
				}
			},this);
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
