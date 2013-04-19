define([
	'backbone',
	'/templates/ChannelStrip/ChannelStrip.js',
	'/templates/ChannelStripFader/ChannelStripFader.js',
	'/templates/ChannelStripKnob/ChannelStripKnob.js',
	'/templates/ChannelStripPan/ChannelStripPan.js',
	'/Controller/KnobController.js',
	'/Controller/EQController.js'],function(Backbone,channelStripTemplate,channelStripFaderTemplate,channelStripKnobTemplate,channelStripPanTemplate,KnobController,EQController) {

	/** Handles channel strip. Expects to be passed a channel and an el */
	var ChannelStripController = function(conf) {
		this.channel = conf.channel || conf.model;
		_.extend(this.channel,Backbone.Events);
		var self = this;
		var el = conf.el;
		this.el = conf.el;
		
		
		
		
		$(el).append(channelStripTemplate);
		this.channelEl = $(el).find('.ChannelStrip');
		
		$(this.el).find(".channel-label").html(this.channel.label);
		

		//set up EQ
		var eqController = new EQController({
			el: $('.eq-section',this.el),
			eQ: this.channel.eQ
		});
		
		
		//set up pan
		var pan = 0;

		var panKnobController = new KnobController({
			el: $(this.el).find('.pan-container'),
			range: 270
		});
		panKnobController.on('change', function(val) {
			pan += val/100;
			if(pan > 1) {
				pan = 1;
			}
			if(pan < -1) {
				pan = -1;
			}
			panKnobController.update(pan);
		});
		
		
		var verbController = new KnobController({
			el: $(".send.i",this.el)
		});
		verbController.on('change', function(val) {
			console.log(val);
			var oldVal = this.channel.send.gain.value;
			var newVal = oldVal += val/100;
			if(newVal > 1) {
				newVal = 1;
			}
			if(newVal < 0) {
				newVal = 0;
			}
			this.channel.send.gain.value = newVal;
			verbController.update(newVal);
		},this)
		
		console.log(verbController);
		
		
		//add fader
		$(this.channelEl).find(".ChannelStripFaderContainer").append(channelStripFaderTemplate);
		this.faderEl = $(el).find('.ChannelStripFader');

		//add knob to fader...
		$(this.faderEl).append(channelStripKnobTemplate);
		this.knobEl = $(el).find('.ChannelStripKnob');
		$(this.knobEl).hide();
		
		
		//add listener for fader knob
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
		
		//trigger knob once
		setTimeout(function() {
			self.moveKnob();
			$(self.knobEl).show();
		},1,self);
		
		//add listener for arm knob
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

		

		this.channel.on('change:gain', function() {
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