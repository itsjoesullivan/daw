#ChannelStrip

ChannelStrip deals with a single signal path, including handling effects and recording input when armed.


##ChannelStrip.arm

Arm the ChannelStrip for recording

```javascript
var channelStrip = new ChannelStrip();

var drumLoop = new Sound({
  path: '/samples/drumLoop.wav'
  out: channelStrip.input
});

channelStrip.arm();

timeline.run();

drumLoop.play();

setTimeout(function() {
  timeline.stop();
  
},1000);
  
  
```
