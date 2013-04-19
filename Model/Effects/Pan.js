define(['/Model/Effect.js'], function(Effect,NotchFilter) {
var Pan = function(conf) {
	conf = conf || {
		wet: 1,
		pan:0
	};
	
	
	
	conf.effect = context.createGainNode();
	
	Effect.call(this,conf);
	
	this.input.disconnect();
	
	this.leftChannel = context.createGainNode();
	this.rightChannel = context.createGainNode();
	this.merger = context.createChannelMerger(2);
	
	
	var splitter = context.createChannelSplitter(2);
	
	this.input.connect(splitter);
	
	splitter.connect(this.leftChannel,0,0);
	splitter.connect(this.rightChannel,0,0);
	
	this.leftChannel.connect(this.merger,0,0);
	this.rightChannel.connect(this.merger,0,1);
	
	
	
	this.merger.connect(this.output);
	
	
	this.output.gain.channelCountMode = "explicit";
	this.output.gain.channelInterpretation = "speakers";
	
	this.gainMultiplier = .5;
	
	this.setLevels(0);
	
}

Pan.prototype = Object.create( Effect.prototype );
Pan.prototype.constructor = Pan;

/** @pan int between -1 and 1 */
Pan.prototype.setLevels = function(pan) {
	
	this.leftChannel.gain.value = Math.cos(.5 * Math.PI * ((pan + 1)/2) )
	this.rightChannel.gain.value = Math.sin(.5 * Math.PI * ((pan + 1)/2) )
};

/** alias */
//Pan.prototype.set = Pan.prototype.setLevels;

return Pan;

});

