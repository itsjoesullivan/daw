/** SoundBank is the place that holds all your audio files */

var SoundBank = function() {
	this.sounds = [];
};


if(typeof define !== 'undefined') {
	define(function() {
		return SoundBank;
	});
}