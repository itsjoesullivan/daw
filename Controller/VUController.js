define(['jquery','/templates/VU/VU.js'],function($,VUTemplate) {
	var VUController = function(conf) {
		this.analyser = context.createAnalyser();
		this.analyser.smoothingTimeConstant = .999999;		
		this.el = conf.el;
		$(this.el).html(VUTemplate);
		
		var mover = $('.needle-holder',this.el);
		
		$(mover).css({
			position: 'relative'
		});
		
		if('input' in conf) {
			console.log('connecting');
			conf.input.connect(this.analyser);
		}
		
		var wait = 10;
		var constant = 15;
		var at = 0;
		setInterval(function() {
			var vol = new Uint8Array(1);
			this.analyser.getByteTimeDomainData(vol);
			var amp = Math.abs(vol[0]-127) * constant;
			var distance = amp - at;
			var go = wait * distance / 150;
			at += go;
			var offset = -45;
				$(mover).css({
					'-webkit-transform': 'rotate(' + (at + offset) + 'deg)'
				});
		}.bind(this),wait,this);
		
		
	};
	
	return VUController
});