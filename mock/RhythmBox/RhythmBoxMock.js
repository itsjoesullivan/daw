require([
		'jquery',
		'/Controller/RhythmBoxController.js'
	], function($,RhythmBoxController) {
		var rhythmBoxController = new RhythmBoxController({
			el: $(".rhythm-box-container")
		});
});