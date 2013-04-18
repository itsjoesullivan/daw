define(function() {
	var MockSource = function(name,log,duration) {
		this.name = name;
		this.log = log;
	};
	MockSource.prototype.noteOn = function(val,duration) {
		log('noteOn',this.name,val,duration);
	};
	MockSource.prototype.start = function(val,duration) {
		this.noteOn.apply(this,arguments);
	};
	MockSource.prototype.noteOff = function(val) {
		log('noteOff',this.name,val);
	};
	MockSource.prototype.stop = function(val,duration) {
		this.noteOff.apply(this,arguments);
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