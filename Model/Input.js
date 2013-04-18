var stream;

define(['underscore','backbone'],function(_,Backbone) {
	var Input = function() {
		var self = this;
		_.extend(this,Backbone.Events);
		if(!stream) {
			navigator.webkitGetUserMedia( {audio:true}, function(stream) {
				//self.source = context.createMediaStreamSource(stream);
				self.raw = context.createMediaStreamSource(stream);
				var splitter = context.createChannelSplitter();
				
				self.source = context.createGainNode();
				self.raw.connect(splitter);
				splitter.connect(self.source,0,0);
				//window.raw = self.raw;
				//se
				self.trigger('live');
			});
		}
	};
	return Input;
});
