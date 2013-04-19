define([
		'jquery',
		'/templates/Knob/Knob.js',
		'underscore',
		'backbone'
	], function($,knobTemplate,_,Backbone) {
		
		
		var KnobController = function(conf) {
			this.range = conf.range || 180;
			
			this.offset = (conf.offset || 0) + 44;
			
			_.extend(this,Backbone.Events);
			
			this.el = conf.el;
			this.onChange = conf.onChange;
			
			$(this.el).append(knobTemplate({
				color: conf.color || 'green',
				size: conf.size || 'medium'
			}));
			
			this.knobEl = $(".knob",this.el);
			
			
			
			var isDragging = false;
			$(this.knobEl)
			.mousedown(function(e) {
				mouseVal = -e.clientY + e.clientX;
			    $(window).mousemove(function(e) {
						var change = -e.clientY + e.clientX - mouseVal;
						mouseVal = -e.clientY + e.clientX;
						this.trigger('change',change);
			        isDragging = true;
			    }.bind(this));
			}.bind(this))
			$(window).mouseup(function() {
			    var wasDragging = isDragging;
			    isDragging = false;
			    $(window).unbind("mousemove");
			    if (!wasDragging) { //was clicking
			    }
			});
			this.update(conf.defaultValue || 0);
		}
		
		//var offset = 44;
		
		KnobController.prototype.update = function(val) {
			$(this.knobEl).css({
				'-webkit-transform': 'rotate(' + (this.offset + val * this.range) + 'deg)'
			});
		};
		
		return KnobController;
});