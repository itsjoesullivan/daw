define([
		'jquery',
		'/Controller/KnobController.js',
		'/templates/EQ/EQ.js'
	], function($,KnobController,eqTemplate) {
		
		
		var EQController = function(conf) {
			
			this.el = conf.el;
			
			$(this.el).append(eqTemplate);
			
			
			var knobController = new KnobController({
				el: $(".knob",this.el)
			});
		}
		
		return EQController;
});