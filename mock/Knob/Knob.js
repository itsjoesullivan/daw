require([
		'jquery',
		'/templates/Knob/Knob.js'
	], function($,knobTemplate) {
		
		console.log(knobTemplate);
		
		
		$("body").append(knobTemplate({
			size: 'small',
			color: 'green'
		}));
		
		$("body").append(knobTemplate({
			size: 'medium',
			color: 'green'
		}));
		
		
		
		$("body").append(knobTemplate({
			size: 'large',
			color: 'green'
		}));
		
		var knobDeg = 20;
		
		$(".knob")
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
					$(".knob").css({
						'-webkit-transform': 'rotate(' + knobDeg + 'deg)'
					});
				//console.log($('.knob').css('-webkit-transform'));
				
				//self.channel.set('gain',self.channel.output.gain.value+change/80);
		        isDragging = true;
		    });
		})
		$(window).mouseup(function() {
		    var wasDragging = isDragging;
		    isDragging = false;
		    $(window).unbind("mousemove");
		    if (!wasDragging) { //was clicking
		        //$("#throbble").show();
		    }
		});
});