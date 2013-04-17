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
	this.contextCurrentTime = context.currentTime;
	this.timer = false;
	
	this.secondInterval = false;
};

/** Where we are in time
*/
Timeline.prototype.position = function(pos) {
	if(pos || typeof pos === 'number') {
		this._position = pos;
	} else {
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
	this.events.push(ev);
};

/** Start the timeline

*/
Timeline.prototype.run = function() {
	this.status = 'running';
	this.currentTime = this.position();
	this.contextCurrentTime = context.currentTime;
	if(this.timer) {
		this.currentTime = this.position() + this.timer;
		this.position(this.currentTime);
	} else {
		this.timer = new Date().getTime();
	}
	this.events.forEach(function(ev) {
		this.handleEvent(ev);
	},this);
	this.trigger('run');
	this.secondInterval = setInterval(function() {
		this.trigger('second',Math.round((this.position() + (new Date().getTime() - this.timer))/1000))
	}.bind(this),1000);
	this.trigger('second',Math.round((this.position() + (new Date().getTime() - this.timer))/1000))
};

/** Stop the current events

*/
Timeline.prototype.stop = function() {
	this.status = 'stopped';
	clearInterval(this.secondInterval);
	this.position(new Date().getTime() - this.timer);
	
	this.timer = false;
	this.currentNotes.forEach(function(note) {
		
		if(note.when > context.currentTime) { //the sound is scheduled to play, but isn't yet.
			note.source.noteOff(note.when);
		} else { //the sound is currently playing, or has already played
			note.source.noteOff(context.currentTime);
		}
	});
	this.currentNotes = [];
	this.position(0);
	this.trigger('second',Math.round((this.position() + (new Date().getTime() - this.timer))/1000))
	this.trigger('stop');
};

/** Deal with a specific event, generally passing off to helper methods

*/
Timeline.prototype.handleEvent = function(ev) {
	console.log('handling event: ',ev);3
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
	var when = this.contextCurrentTime + ev.at/1000 - this.currentTime;
	if(ev.at >= this.position()) {
		//if(!('source' in ev)) {
		ev.source = ev.sound.generateSource();
		//}
		ev.source.connect(ev.output);
		console.log(ev.output);
		ev.source.noteOn(when);
		this.currentNotes.push({
			ev: ev,
			source: ev.source,
			when: when
		});
	}
};



if(typeof 'define' !== 'undefined') {
	define(['underscore','backbone'],function(_,Backbone) {
		return Timeline;
	});
}