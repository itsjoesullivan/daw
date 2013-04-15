var ChannelController = function(channel,done) {
	this.channel = channel;
	console.log(this.channel);
	var el = $(".ChannelStripContainer");
	var self = this;
	
	var channelStrip = _.template(templates['ChannelStrip']),
		channelStripFader = _.template(templates['ChannelStripFader']),
		channelStripKnob = _.template(templates['ChannelStripKnob']);
		
	
	$(el).append(channelStrip);
	this.channelEl = $(el).find('.ChannelStrip');
	
	$(this.channelEl).append(channelStripFader);
	this.faderEl = $(el).find('.ChannelStripFader');
	
	$(this.faderEl).append(channelStripKnob);
	this.knobEl = $(el).find('.ChannelStripKnob');
	
	if(typeof done === 'function') {
		done(this);
	}
	
	$(document).keypress(function(e) {
		switch(e.keyCode) {
			case 113:
				self.channel.level+=.1;
				self.moveKnob();
				break;
			case 122:
				channel.level-=.1;
				self.moveKnob();
				break;	
			default:
				break;
		}
	});
};
var center = 100;
var knobPosition = function(vol) {
	return center - 50* vol;
}

ChannelController.prototype.moveKnob = function() {
	$(this.knobEl).css('top',knobPosition(this.channel.level) + 'px');
};


if(typeof 'define' !== 'undefined') {
	define(function() {
		return ChannelController;
	});
}