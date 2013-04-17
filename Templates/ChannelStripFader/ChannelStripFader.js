var name = "ChannelStripFader",
  htmlPath = "text!/templates/" + name + "/" + name + ".html";
  stylePath = "less!/templates/" + name + "/" + name + ".less";

define(['underscore',htmlPath,stylePath], function(_,html,style) {
  return _.template(html)();
});