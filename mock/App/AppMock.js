require([
		'jquery',
		'/Controller/AppController.js'
	], function($,AppController) {
		
		var appController = new AppController({
			el: $(".app")
		});
		
});