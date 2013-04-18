define(function() {
	var MockSource = function(name,log,duration) {
		this.name = name;
		this.log = log;
	};
	MockSource.prototype.noteOn = function(val) {
		log('noteOn',this.name,val);
	};
	MockSource.prototype.noteOff = function(val) {
		log('noteOff',this.name,val);
	};
	MockSource.prototype.connect = function() {};
	var MockSound = function(name,log,duration) {
		this.name = name;
		this.log = log;
		this.buffer = {
			duration: duration || 1
		};
	};
	MockSound.prototype.generateSource = function() {
		return new MockSource(this.name,this.log);
	};
	return MockSound;
});