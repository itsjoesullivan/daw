
/** Basic drum machine
*/
var DrumMachine = function(conf) {
	this.input = context.createGain();
	this.input.connect(context.destination);
	var sounds = conf.sounds;
	this.soundMap = {};
	var self = this;
	var key;
	for(key in sounds) {
		self.soundMap[key] = new Sound({
			path: sounds[key],
			out: self.input
		});
	}
	document.addEventListener('keydown', function(e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if(key in self.soundMap) {
			self.soundMap[key].play();
		}
	},true);
};