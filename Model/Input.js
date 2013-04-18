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
				self.raw.connect(splitter);
				self.source = context.createGainNode();
				splitter.connect(self.source);
				//window.raw = self.raw;
				//se
				self.trigger('live');
			});
		}
	};
	return Input;
});
