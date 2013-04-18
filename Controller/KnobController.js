define([
		'jquery',
		'/templates/Knob/Knob.js'
	], function($,knobTemplate) {
		
		
		var KnobController = function(conf) {
			
			this.el = conf.el;
			
			$(this.el).append(knobTemplate());
			
			this.knobEl = $(".knob",this.el);
			
			var knobDeg = 46;

			$(this.knobEl)
			.mousedown(function(e) {
				mouseVal = -e.clientY + e.clientX;
			    $(window).mousemove(function(e) {
					var change = -e.clientY + e.clientX - mouseVal;
					mouseVal = -e.clientY + e.clientX;
					if(change > 0) {
						knobDeg += 6;
					} else {
						knobDeg -= 6;
					}
						$(this.knobEl).css({
							'-webkit-transform': 'rotate(' + knobDeg + 'deg)'
						});
					//console.log($('.knob').css('-webkit-transform'));

					//self.channel.set('gain',self.channel.output.gain.value+change/80);
			        isDragging = true;
			    }.bind(this));
			}.bind(this))
			$(window).mouseup(function() {
			    var wasDragging = isDragging;
			    isDragging = false;
			    $(window).unbind("mousemove");
			    if (!wasDragging) { //was clicking
			        //$("#throbble").show();
			    }
			});
		}
		
		return KnobController;
});