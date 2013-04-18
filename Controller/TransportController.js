define([
	'underscore',
	'/templates/Transport/Transport.js',
	'/templates/PushButton/PushButton.js',
	'/templates/PlayButton/PlayButton.js',
	'/templates/RecordButton/RecordButton.js',
	'/templates/StopButton/StopButton.js',
	'/templates/FFButton/FFButton.js',
	'/templates/RWButton/RWButton.js',
	],function(_,transportTemplate,pushButtonTemplate,playButtonTemplate,recordButtonTemplate,stopButtonTemplate,ffButtonTemplate,rwButtonTemplate) {
	var TransportController = function(conf) {
		this.el = conf.el;
		this.timeline = conf.timeline;
	
		$(this.el).append(transportTemplate);		
		$(this.el).append(rwButtonTemplate);
		$(this.el).append(rwButtonTemplate);
		$(this.el).append(ffButtonTemplate);
		$(this.el).append(ffButtonTemplate);
		$(this.el).append('<br>');
		$(this.el).append(stopButtonTemplate);
		$(this.el).append(playButtonTemplate);
		$(this.el).append(recordButtonTemplate);
		
		
		this.playButton = $(this.el).find('.play-button');
		
		$(this.playButton).click(function() {	
			this.timeline.run();
		}.bind(this));
		
		this.stopButton = $(this.el).find('.stop-button');
		
		$(this.stopButton).click(function() {	
			this.timeline.stop();
		}.bind(this));

	};

	return TransportController;

});