define([
		'jquery',
		'/Controller/KnobController.js',
		'/templates/EQ/EQ.js'
	], function($,KnobController,eqTemplate) {
		
		
		var EQController = function(conf) {
			
			this.el = conf.el;
			
			$(this.el).append(eqTemplate);
			
			var ranges = [];
			
			var knobController = new KnobController({
				el: $(".high .knob",this.el)
			});
			
			var knobController = new KnobController({
				el: $(".med .knob",this.el)
			});
			
			var knobController = new KnobController({
				el: $(".low .knob",this.el)
			});
		}
		
		return EQController;
});