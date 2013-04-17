define([
	'jquery',
	'/Model/Timeline.js',
	'/Controller/MixerController.js',
	'/Controller/TransportController.js',
	'/templates/App/App.js',
	'/Model/Input.js',
	'/templates/SecondDisplay/SecondDisplay.js'
	], function($,Timeline,MixerController,TransportController,appTemplate,Input,secondDisplayTemplate) {
		
		var AppController = function(conf) {
			
			
			this.userInput = new Input();
	
			
			this.timeline = new Timeline();
			
			this.timeline.on('run', function() {
				console.log('run');
			});
			
			this.timeline.on('stop', function() {
				console.log('stop');
			});
			
			
			this.el = conf.el;
			//$(this.el).hide();
			$(this.el).append(appTemplate);
			
			this.timeline.on('second', function(seconds) {
				seconds = seconds % 1000;
				var vals = {
					hundred: Math.floor(seconds/100),
					ten: Math.floor((seconds % 100)/10),
					one: seconds % 10
				};
				$('.time').html(secondDisplayTemplate(vals));
				$('.time .digit.one').animate({
					top:'-=15'
				}, 1000, 'linear');
				if(vals.one === 9) {
					$('.time .digit.ten').animate({
						top:'-=15'
					}, 1000, 'linear');
					if(vals.ten === 9) {
						$('.time .digit.hundred').animate({
							top:'-=15'
						}, 1000, 'linear');
					}
				}
				
			});
		
			
	
			this.mixerController = new MixerController({
				el: $(this.el).find(".mixer"),
				timeline:this.timeline,
				userInput: this.userInput
			});

			this.transportController = new TransportController({
				el: $(this.el).find(".transport"),
				timeline: this.timeline
			});
			
			
			$(document).keypress(function(e) {
				console.log(e.keyCode);
				//space 32 
				//1 49
				//2 50
				//3 51
				//4 52
				//q 113
				//z 122
				//w 119
				//x 120
				//e 101
				//c 99
				//r 114
				//v 118
				var newLog = function(val,inc) {
					var db = Math.log(val) / Math.log(1.122);
					db+=inc;
					return Math.pow(1.122,db)
				}
				switch(e.keyCode) {
					case 113:
						var value = this.mixerController.channels[0].output.gain.value
						this.mixerController.channels[0].set('gain',newLog(value,.5));
						console.log(this.mixerController.channels[0]);
						break;
					case 119:
						var value = this.mixerController.channels[1].output.gain.value
						this.mixerController.channels[1].set('gain',newLog(value,.5));
						break;
					case 101:
						var value = this.mixerController.channels[2].output.gain.value
						this.mixerController.channels[2].set('gain',newLog(value,.5));
						break;
					case 114:
						var value = this.mixerController.channels[3].output.gain.value
						this.mixerController.channels[3].set('gain',newLog(value,.5));
						break;
					case 122:
						var value = this.mixerController.channels[0].output.gain.value
						this.mixerController.channels[0].set('gain',newLog(value,-.5));
						console.log(this.mixerController.channels[0]);
						break;
					case 120:
						var value = this.mixerController.channels[1].output.gain.value
						this.mixerController.channels[1].set('gain',newLog(value,-.5));
						break;
					case 99:
						var value = this.mixerController.channels[2].output.gain.value
						this.mixerController.channels[2].set('gain',newLog(value,-.5));
						break;
					case 118:
						var value = this.mixerController.channels[3].output.gain.value
						this.mixerController.channels[3].set('gain',newLog(value,-.5));
						break;
					case 49:
						this.mixerController.channels[0].arm();
						break;
					case 50:
						this.mixerController.channels[1].arm();
						break;
					case 51:
						this.mixerController.channels[2].arm();
						break;
					case 52:
						this.mixerController.channels[3].arm();
						break;
					case 32:
						if(this.timeline.status === 'stopped') {
							this.timeline.run();
						} else {
							this.timeline.stop();
						}
						break;
					default:
						break;
				}
			}.bind(this));
			
		}
	
	return AppController
});
