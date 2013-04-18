define(['underscore'], function(_) {
	
	var overlap = function(d1,d2) {
		return ((d1.start <= d2.start && d1.end > d2.start) 
			|| (d1.start < d2.end && d1.end >= d2.end) 
			|| (d2.start === d1.start && d2.end === d1.end))
			|| (d2.start < d1.start && d2.end > d1.end);
	};
	
	var EventChannel = function() {
		/* an event must have start and end, i.e. { start: time, end: time} */
		this.events = [];
	};
	EventChannel.prototype.empty = function() {
		this.events = [];
	};
	EventChannel.prototype.push = function(ev) {
		if(!this.clearDuring(ev.start,ev.end)) {
			return false;
		}
		this.events.push.apply(this.events,arguments);
		return true;
	};
	EventChannel.prototype.clearDuring = function(start,end) {
		return !_(this.events).some(function(ev) {
			return overlap({start:start,end:end},ev);
		});
	};
	EventChannel.prototype.getClearDurations = function(start,end) {
		if(this.clearDuring(start,end)) {
			return [{start:start,end:end}];
		}
		var nextStart = start;
		var clearDurations = [];
		var nextDuration = {};
		var lastEnd = this.events[this.events.length-1].end;
		this.events.forEach(function(ev) {
			if(!overlap(ev,{start:start,end:end})) {
				return;
			}
			if(nextStart < ev.start) { //overlaps and this starts before
				clearDurations.push({
					start:nextStart,
					end: ev.start
				});
			}
			if(end > ev.end) {
				nextStart = ev.end;
			}
		});
		if(end > lastEnd) {
			clearDurations.push({
				start:nextStart,
				end:end
			});
		}
		return clearDurations;
	};
	return EventChannel;
});