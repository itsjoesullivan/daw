define([
	'backbone',
	'/templates/ChannelStrip/ChannelStrip.js',
	'/templates/ChannelStripFader/ChannelStripFader.js',
	'/templates/ChannelStripKnob/ChannelStripKnob.js'],function(Backbone,channelStripTemplate,channelStripFaderTemplate,channelStripKnobTemplate) {

	/** Handles channel strip. Expects to be passed a channel and an el */
	var ChannelStripController = function(conf) {
		this.channel = conf.channel || conf.model;
		_.extend(this.channel,Backbone.Events);
		var self = this;
		var el = conf.el;

		$(el).append(channelStripTemplate);
		this.channelEl = $(el).find('.ChannelStrip');

		$(this.channelEl).find(".ChannelStripFaderContainer").append(channelStripFaderTemplate);
		this.faderEl = $(el).find('.ChannelStripFader');

		$(this.faderEl).append(channelStripKnobTemplate);
		this.knobEl = $(el).find('.ChannelStripKnob');

		setTimeout(function() {
			self.moveKnob();
		},100,self);

		self.channel.on('change:gain', function() {
			self.moveKnob();
		});

		$(document).keypress(function(e) {
			switch(e.keyCode) {
				case 113:
					var value = self.channel.output.gain.value;
					//add a decibel
					var db = Math.log(value) / Math.log(1.122);
					db+=.5;
					value = Math.pow(1.122,db);
					self.channel.set('gain',value);
					break;
				case 122:
					var value = self.channel.output.gain.value;
					//remove a decibel
					var db = Math.log(value) / Math.log(1.122);
					db-=.5;
					value = Math.pow(1.122,db);
					if(value <=0 ) {
						value = 0;
					}
					self.channel.set('gain',value);
					break;	
				default:
					break;
			}
		});
	};

	var center = 100;
	ChannelStripController.prototype.moveKnob = function() {
		var height = $(this.knobEl).height();
		var slot = $(this.channelEl).find('.channel');
		var slotHeight = slot.height();
		var alpha = 172;
		var beta = 80;
		var gain = this.channel.output.gain.value;
		var pos = alpha - gain*beta;
		$(this.knobEl).css('top',pos + 'px');
	};
	return ChannelStripController;

});