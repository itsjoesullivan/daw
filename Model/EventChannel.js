define(['underscore'], function(_) {
	var EventChannel = function() {
		/* an event must have start and end, i.e. { start: time, end: time} */
		this.events = [];
	};
	EventChannel.prototype.push = function(ev) {
		console.log(ev);
		if(!this.clearDuring(ev.start,ev.end)) {
			console.log('wont');
			return false;
		}
		this.events.push.apply(this.events,arguments);
		console.log(this.events);
		return true;
	};
	EventChannel.prototype.clearDuring = function(start,end) {
		return !_(this.events).some(function(ev) {
			return ((ev.start <= start && ev.end > start) 
				|| (ev.start < end && ev.end >= end) 
				|| (start === ev.start && end === ev.end))
				|| (start < ev.start && end > ev.end);
		});
	};
	EventChannel.prototype.getClearDurations = function(start,end) {
		
	};
	return EventChannel;
});