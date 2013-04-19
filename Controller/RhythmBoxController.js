define([
	'jquery',
	'/templates/RhythmBox/RhythmBox.js',
	'/templates/ChannelStripFader/ChannelStripFader.js',
	'/templates/ChannelStripKnob/ChannelStripKnob.js',
	'/templates/LED/LED.js',
	'/Controller/KnobController.js',
	'/Model/RhythmBox.js',
],function($,rhythmBoxTemplate,channelStripFaderTemplate,channelStripKnobTemplate,ledTemplate,KnobController,RhythmBox) {
	var RhythmBoxController = function(conf) {
		this.el = conf.el;
		$(this.el).html(rhythmBoxTemplate);
		
		this.rhythmBox = new RhythmBox();
		this.rhythmBox.channel.output.connect(conf.output);
		
		$(".volume-fader-container",this.el).append(channelStripFaderTemplate);
		$(".ChannelStripFader",this.el).append(channelStripKnobTemplate);
		
		$('.start-led',this.el).append(ledTemplate);
		$('.start-led .led-bulb',this.el).addClass('green');
		
		
		$(".start-button",this.el).click(function() {
			if(this.rhythmBox.start()) {
				$('.start-led .led-bulb',this.el).addClass('on');
			} else {
				$('.start-led .led-bulb',this.el).removeClass('on');
			}
		}.bind(this));
		
		var tempoKnobController = new KnobController({
			el: $('.tempo-knob',this.el),
			range: 270,
			size: 'large',
			offset: -135
		});
		tempoKnobController.on('change', function(val) {
			console.log(val);
			var newTempo = this.rhythmBox.tempo += val;
			if(newTempo > 200) {
				newTempo = 200;
			} else if(newTempo < 50) {
				newTempo = 50;
			}
			this.rhythmBox.tempo = parseInt(newTempo);
			$('.tempo-display').html(this.rhythmBox.tempo);
			
			tempoKnobController.update((this.rhythmBox.tempo - 50) / 150);
		}.bind(this))
		tempoKnobController.update((this.rhythmBox.tempo - 50) / 150);
	};
	
	return RhythmBoxController
});