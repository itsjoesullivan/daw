require([
		'jquery',
		'/Controller/AppController.js'
	], function($,AppController) {
		
		window.appController = new AppController({
			el: $(".app")
		});
		
});