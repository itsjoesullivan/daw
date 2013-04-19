define([
	'underscore',
	'/templates/Transport/Transport.js',
	'/templates/PushButton/PushButton.js',
	'/templates/PlayButton/PlayButton.js',
	'/templates/RecordButton/RecordButton.js',
	'/templates/StopButton/StopButton.js',
	'/templates/FFButton/FFButton.js',
	'/templates/RWButton/RWButton.js',
	'/templates/ToBeginningButton/ToBeginningButton.js',
	'/templates/ToEndButton/ToEndButton.js'
	],function(_,transportTemplate,pushButtonTemplate,playButtonTemplate,recordButtonTemplate,stopButtonTemplate,ffButtonTemplate,rwButtonTemplate,beginningButtonTemplate,endButtonTemplate) {
	var TransportController = function(conf) {
		this.el = conf.el;
		this.timeline = conf.timeline;
	
		$(this.el).append(transportTemplate);		
		$(this.el).append(beginningButtonTemplate);
		$(this.el).append(rwButtonTemplate);
		$(this.el).append(ffButtonTemplate);
		$(this.el).append(endButtonTemplate);
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
		
		this.ffButton = $(this.el).find('.ff-button');
		$(this.ffButton).click(function() {	
			var running = this.timeline.status === 'running';
			if(running) {
				this.timeline.stop();
			}
			this.timeline.position(this.timeline.position() + 1);
			if(running) {
				this.timeline.run();
			}
		}.bind(this));
		
		this.rwButton = $(this.el).find('.rw-button');
		$(this.rwButton).click(function() {	
			var running = this.timeline.status === 'running';
			if(running) {
				this.timeline.stop();
			}
			this.timeline.position(this.timeline.position() - 1);
			if(running) {
				this.timeline.run();
			}
		}.bind(this));
		
		this.toBeginningButton = $(this.el).find('.beginning-button');
		$(this.toBeginningButton).click(function() {	
			var running = this.timeline.status === 'running';
			if(running) {
				this.timeline.stop();
			}
			this.timeline.position(0);
			if(running) {
				this.timeline.run();
			}
		}.bind(this));
		
		this.endButtonTemplate = $(this.el).find('.end-button');
		$(this.endButtonTemplate).click(function() {	
			var running = this.timeline.status === 'running';
			if(running) {
				this.timeline.stop();
			}
			this.timeline.position(this.timeline.position() + 20);
			if(running) {
				this.timeline.run();
			}
		}.bind(this));
		
		

	};

	return TransportController;

});