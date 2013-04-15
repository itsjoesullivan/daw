/** Timeline upon which events can be scheduled, executed, paused, etc. 

*/
var Timeline = function() {
	this.events = [];
	this.currentNotes = [];
	this._position = 0;
};

/** Where we are in time
*/
Timeline.prototype.position = function(pos) {
	if(pos || typeof pos === 'number') {
		this._position = pos;
	} else {
		return this._position;
	}
}

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
	this.events.forEach(function(ev) {
		this.handleEvent(ev);
	},this);
};

/** Stop the current events

*/
Timeline.prototype.stop = function() {
	this.currentNotes.forEach(function(note) {
		if(note.when > context.currentTime) { //the sound is scheduled to play, but isn't yet.
			note.source.noteOff(note.when);
		} else { //the sound is currently playing, or has already played
			note.source.noteOff(context.currentTime);
		}
	});
	this.currentNotes = [];
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
			verb: 'start' | 'stop'
			startAt: int, //alias: at; where relative to position() to start
			[at: int, ] //alias: startAt
			[endAt: int, ] //optional when to end playback relative to position()
			[soundOffset: int] //optional when to start the sound relative to the actual sound
		}

*/
Timeline.prototype.handleNote = function(ev) {

	//if this note is either currently playing or soon to be playing
	
	//play the note, either from the beginning or the place where it should be
	var when = context.currentTime + ev.at/1000 - this.position();
	if(ev.at >= this.position()) {
		ev.source = ev.sound.generateSource();
		ev.source.noteOn(when);
		this.currentNotes.push({
			ev: ev,
			source: ev.source,
			when: when
		});
	}
};

if(typeof 'define' !== 'undefined') {
	define(function() {
		return Timeline;
	});
}