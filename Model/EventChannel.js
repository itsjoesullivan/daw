describe(['underscore'], function(_) {
	console.log(_);
	var EventChannel = function() {
		/* an event must have start and end, i.e. { start: time, end: time} */
		this.events = [];
	};
	EventChannel.prototype.push = function() {
		this.events.apply(this,arguments);
	};
	EventChannel.prototype.clearDuring = function(start,end) {
		return !_(this.events).some(function(ev) {
			return (ev.start < start && ev.end > start) || (ev.start < end && ev.end > end)
		}).length;
	};
	EventChannel.prototype.getClearDurations = function(start,end) {
		
	};
	console.log(EventChannel);
	return EventChannel;
});

