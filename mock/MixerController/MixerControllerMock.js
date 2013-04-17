require([
		'jquery',
		'Controller/MixerController'
	], function($,MixerController) {
			var mixerController = new MixerController({
				el: $(".mixer")
			});
});