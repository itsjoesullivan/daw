var TransportController = function(done) {
	
	var self = this;
	

	var render = function() {
		var transport = _.template(templates['Transport']);
		var playButton = _.template(templates['PlayButton'])
		var playButtonHtml = playButton();
		var stopButton = _.template(templates['StopButton'])
		var stopButtonHtml = stopButton();
		var pushButton = _.template(templates['PushButton'])
		var pushButtonHtml = pushButton();
		var transportHtml = transport();
		var recordButton = _.template(templates['RecordButton'])
		var recordButtonHtml = recordButton();

		$('#TransportContainer').append(transportHtml);
		self.transportEl = $("#TransportContainer .Transport");
		
		
		$(self.transportEl).append(recordButtonHtml);
		$(self.transportEl).append(playButtonHtml);
		$(self.transportEl).append(stopButtonHtml);
		$(self.transportEl).append(pushButtonHtml);
		
		self.playButton = $(self.transportEl).find('.PlayButton');
		
		$(self.playButton).click(function() {	
			timeline.play();
		});
		
		self.stopButton = $(self.transportEl).find('.StopButton');
		
		$(self.stopButton).click(function() {	
			timeline.stop();
		});
		
	}
	
	
	//setTimeout(function() {
		render();
		if(typeof done === 'function') {
			done(self);
		}
	//},200);


	
};


if(typeof 'define' !== 'undefined') {
	define(function() {
		return TransportController;
	});
}