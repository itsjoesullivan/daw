define([
	'underscore',
	'/templates/Transport/Transport.js',
	'/templates/PushButton/PushButton.js',
	'/templates/PlayButton/PlayButton.js',
	'/templates/RecordButton/RecordButton.js',
	'/templates/StopButton/StopButton.js',
	],function(_,transportTemplate,pushButtonTemplate,playButtonTemplate,recordButtonTemplate,stopButtonTemplate) {
	var TransportController = function(conf) {
		this.el = conf.el;
		this.timeline = conf.timeline;
	
		$(this.el).append(transportTemplate);

		
		$(this.el).append(recordButtonTemplate);
		$(this.el).append(playButtonTemplate);
		$(this.el).append(stopButtonTemplate);
		$(this.el).append(pushButtonTemplate);
		
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