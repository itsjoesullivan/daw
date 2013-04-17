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
		this.el = conf.el;
		
		$(el).append(channelStripTemplate);
		this.channelEl = $(el).find('.ChannelStrip');
		
		$(this.el).find(".label").html(this.channel.label);

		$(this.channelEl).find(".ChannelStripFaderContainer").append(channelStripFaderTemplate);
		this.faderEl = $(el).find('.ChannelStripFader');

		$(this.faderEl).append(channelStripKnobTemplate);
		this.knobEl = $(el).find('.ChannelStripKnob');
		
		var self = this;
		var isDragging = false;
		var mouseVal = [0,0];
		$(this.knobEl)
		.mousedown(function(e) {
			mouseVal = -e.clientY;
		    $(window).mousemove(function(e) {
				var change = -e.clientY - mouseVal;
				mouseVal = -e.clientY;
				self.channel.set('gain',self.channel.output.gain.value+change/80);
		        isDragging = true;
		    });
		})
		.mouseup(function() {
		    var wasDragging = isDragging;
		    isDragging = false;
		    $(window).unbind("mousemove");
		    if (!wasDragging) { //was clicking
		        //$("#throbble").show();
		    }
		});
		
		$(".armed",this.el).click(function(el) {
			this.channel.arm();
		}.bind(this));
		this.channel.on('change:armed', function(armed,channel) {
			if(!armed) {
				$(".armed",this.el).removeClass("active");
			} else {
				$(".armed",this.el).addClass("active");
			}
		}.bind(this));

		setTimeout(function() {
			self.moveKnob();
		},100,self);
		
		$()

		this.channel.on('change:gain', function() {
			console.log('gain change');
			this.moveKnob();
		},this);

		
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