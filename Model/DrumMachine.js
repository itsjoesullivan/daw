
/** Basic drum machine
*/
var DrumMachine = function(conf) {
	this.output = context.createGain();
	this.output.connect(conf.out);
	var sounds = conf.sounds;
	this.soundMap = {};
	var self = this;
	var key;
	for(key in sounds) {
		this.soundMap[key] = new Sound({
			path: sounds[key],
			out: this.output
		});
	}
	document.addEventListener('keydown', function(e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if(key in self.soundMap) {
			self.soundMap[key].play();
		}
	},true);
};

if(typeof 'define' !== 'undefined') {
	define(function() {
		return DrumMachine;
	});
}