

var TransportController = function(done) {
	
	var self = this;
	
	require.config({
	    baseUrl: "/templates",
	    paths: {
	        "text": "/lib/text",
			"css": "/lib/css",
			"normalize": "/lib/normalize",
			"less": "/lib/less",
			"lessc": "/lib/lessc"
	    },
	});
	
	//define the templates I have
	var templateNames = ['Transport','PushButton','PlayButton','RecordButton','StopButton'];
	var templates = {};

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
	
	
	setTimeout(function() {
		render();
		if(typeof done === 'function') {
			done(self);
		}
	},200);

	//load them up.
	templateNames.forEach(function(template) {
		//first do a call for the html
		var htmlPath = 'text!' + '' + template + '/' + template + '.html';
		var stylePath = 'less!' + '' + template + '/' + template + '.less';
		require([stylePath]);
		require([htmlPath], function(html) {
			templates[template] = html;
			//render();
		});
	});
	
};


if(typeof 'define' !== 'undefined') {
	define(function() {
		return TransportController;
	});
}