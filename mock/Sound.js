describe(function() {
	var MockSource = function(name,log) {
		this.name = name;
		this.log = log;
	};
	MockSource.prototype.noteOn = function(val) {
		log('noteOn',this.name,this.val);
	};
	MockSource.prototype.noteOff = function(val) {
		log('noteOff',this.name,this.val);
	};
	var MockSound = function(name,log) {
		this.name = name;
		this.log = log;
	};
	MockSound.prototype.generateSource = function() {
		return new MockSource(this.name,this.log);
	};
	return MockSound;
});