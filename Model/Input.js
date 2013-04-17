var stream;


define(['underscore','backbone'],function(_,Backbone) {
	var Input = function() {
		var self = this;
		_.extend(this,Backbone.Events);
		if(!stream) {
			navigator.webkitGetUserMedia( {audio:true}, function(stream) {
				self.source = context.createMediaStreamSource(stream);
				self.trigger('live');
			});
		}
	};
	return Input;
})
