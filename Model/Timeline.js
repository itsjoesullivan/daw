define(['underscore','backbone','/Model/EventChannel.js'],function(_,Backbone, EventChannel) {
	

/** Timeline upon which events can be scheduled, executed, paused, etc. 

*/
var Timeline = function() {
	_.extend(this,Backbone.Events);
	this.events = [];
	this.currentNotes = [];
	this._position = 0;
	this.status = 'stopped';
	//currentTime is a snapshot of _position, updated at run() and used by eventHandlers that would ideal run at the same time
	this.currentTime = this._position;
	this.contextTimer = context.currentTime;
	this.timer = false;
	this.secondInterval = false;
	this.inFirstTick = false;
	this.eventChannels = {};
};

/** Where we are in time
When stopped, we're not going anywhere. So when stopped, jut return position
When running, we are going somewhere, so calculate the difference in context.currentTime from when we started to this fxn call

*/
Timeline.prototype.position = function(pos) {
	if(pos || typeof pos === 'number') {
		this._position = pos;
		this.trigger('second',Math.round(this.position()));
	} else {
		if(!this.inFirstTick && this.status === 'running') {
			var extra = 
			this._position += (context.currentTime - this.contextTimer);
			this.contextTimer = context.currentTime;
		}
		return this._position;
	}
};

/**

Example:
	timeline.add({
		play: {sample},
		at:
		for: sample.length
	})

*/
Timeline.prototype.add = function(ev) {
	this.events.unshift(ev);
};

/** Start the timeline

*/
Timeline.prototype.run = function() {
	this.inFirstTick = true;
	this.status = 'running';
	this.contextTimer = context.currentTime;
	this.events.forEach(function(ev) {
		this.handleEvent(ev);
	},this);
	this.trigger('run');
	
	//second interval stuff
	this.secondInterval = setInterval(function() {
		this.trigger('second',Math.round(this.position()));
	}.bind(this),1000);
	this.trigger('second',Math.round(this.position()));
	
	//and we're done
	this.inFirstTick = false;
};

/** Stop the current events

*/
Timeline.prototype.stop = function() {
	
	if(this.status === 'stopped') {
		this.position(0);
		return;
	}
	
	this.position();
	
	this.status = 'stopped';
	clearInterval(this.secondInterval);
	
	this.timer = false;
	this.currentNotes.forEach(function(note) {
		
		if(note.when > context.currentTime) { //the sound is scheduled to play, but isn't yet.
			note.source.stop(note.when);
		} else { //the sound is currently playing, or has already played
			note.source.stop(context.currentTime);
		}
	});
	this.currentNotes = [];
	//this.position(0);
	this.trigger('second',Math.round((this.position())));
	_(this.eventChannels).each(function(eventChannel) {
		eventChannel.empty();
	})
	this.trigger('stop');
};

/** Deal with a specific event, generally passing off to helper methods

*/
Timeline.prototype.handleEvent = function(ev) {
	switch(ev.type) {
		case 'note':
			this.handleNote(ev);
			break;
		default:
			setTimeout(function() {
				ev.fn();
			},ev.at - this._position);
			break;
	}
};

/** Handle a note event, or sample playback. Traits include: could need to start halfway through, need to stop 

	Example notes:
	
		{
			sound: {sound}, //responds to play, stop
			verb: 'start' | 'stop'.
			channel: string, //event channels are monophonic
			startAt: int, //alias: at; where relative to position() to start
			[at: int, ] //alias: startAt
			[endAt: int, ] //optional when to end playback relative to position()
			[soundOffset: int] //optional when to start the sound relative to the actual sound
		}

*/
Timeline.prototype.handleNote = function(ev) {

	//if this note is either currently playing or soon to be playing
	
	//play the note, either from the beginning or the place where it should be
	
	//if(/*ev.at >= this.position()*/) {
		//when is a when for context, so needs to be absolute(context time) and in seconds. take absolute time, add "at", and subtract our progress
		var when = this.contextTimer + ev.at/1000 - this.position();
		//check that channel is clear
		if('channel' in ev) {
			ev.channel = '' + ev.channel;
			//fill it in
			if(!(ev.channel in this.eventChannels)) {
				this.eventChannels[ev.channel] = new EventChannel();
			}
			var clearDurations = this.eventChannels[ev.channel].getClearDurations(ev.at,ev.at + ev.sound.buffer.duration)
			if(!clearDurations.length) {
				console.log("no clear durations");
				return;
			}
			clearDurations.forEach(function(duration) {
				console.log(duration);
				this.scheduleDuration(ev,duration);
			},this);
		} else {
			ev.source = ev.sound.generateSource();
			ev.source.connect(ev.output);
			ev.source.start(when);
			this.currentNotes.push({
				ev: ev,
				source: ev.source,
				when: when
			});
		}
		
	//} else if(true) {
		
	//	console.log(ev);
	//}
};

/**

@duration: object like {start: start, end: end} where start and end are in transport-time

*/

Timeline.prototype.scheduleDuration = function(ev,duration) {
	ev.source = ev.sound.generateSource();
	ev.source.connect(ev.output);
	var when = this.contextTimer + duration.start - this.position();
	console.log("diff:",duration.start,this.position())
	var immediateOffset = 0;
	if(duration.start < this.position()) {
		console.log('need fix');
		immediateOffset = this.position() - duration.start;
		console.log('offset is:',immediateOffset);
	}
	console.log('decided offset is:',duration.start - ev.at + immediateOffset);
	ev.source.start(when + immediateOffset,duration.start - ev.at + immediateOffset);
	if(when + ev.sound.buffer.duration > duration.end) { //if the note will still be playing when the duration ends, kill it then
		ev.source.stop(this.contextTimer + duration.end - this.position(),duration.end - ev.at);
	}
	this.currentNotes.push({
		ev: ev,
		source: ev.source,
		when: when
	});
	this.eventChannels[ev.channel].push(duration);
};


		return Timeline;
});
