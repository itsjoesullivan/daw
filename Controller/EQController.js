define([
		'jquery',
		'/Controller/KnobController.js',
		'/templates/EQ/EQ.js'
	], function($,KnobController,eqTemplate) {
		
		
		var EQController = function(conf) {
			
			this.el = conf.el;
			
			$(this.el).append(eqTemplate);
		
			
			this.eQ = conf.eQ;
			
			var knobControllers = [
				new KnobController({
					el: $(".high .knob",this.el),
					range: 270
				}),
				new KnobController({
					el: $(".med .knob",this.el),
					range: 270
				}),
				new KnobController({
					el: $(".low .knob",this.el),
					range: 270
				})
			];
			knobControllers[0].on('change', function(val) {
				var currentGain = this.eQ.high.effect.gain.value;
				currentGain += val;
				if(currentGain > 40) {
					currentGain = 40;
				}
				if(currentGain < 0) {
					currentGain = 0;
				}
				this.eQ.high.effect.gain.value = currentGain;
			}.bind(this));
			
			knobControllers.forEach(function(knobController) {
				var setting = 0;
				knobController.on('change', function(val) {
					setting += val/100;
					if(setting > 1) {
						setting = 1;
					}
					if(setting < -1) {
						setting = -1;
					}
					knobController.update(setting);
				});
			});
		}
		
		return EQController;
});