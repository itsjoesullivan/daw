//document just for loading up all the templates, which is something I haven't got an elegant solution for yet.

window.templates = {};
var loader = (function() {
	
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
	
	var queue = [];

	var templateNames = [
		'Transport',
		'PushButton',
		'PlayButton',
		'RecordButton',
		'StopButton',
		'ChannelStrip',
		'ChannelStripFader',
		'ChannelStripKnob'
	];
	
	var left = 0;
	
	templateNames.forEach(function(template) {
		left++;
		//first do a call for the html
		var htmlPath = 'text!' + '' + template + '/' + template + '.html';
		var stylePath = 'less!' + '' + template + '/' + template + '.less';
		require([stylePath]);
		require([htmlPath], function(html) {
			templates[template] = html;			
			left--;
			if(left === 0) {
				queue.forEach(function(fn) {
					fn();
				});
			}
		});
	});
	
	return {
		ready: function(cb) {
			queue.push(cb);
		}
	}
})();
