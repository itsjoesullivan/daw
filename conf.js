require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
        exports: "Backbone"
    }
  },
  paths: {
    "jquery": "/lib/jquery",
    "view": "/templates",
    "underscore": "/lib/underscore",
    "backbone": "/lib/backbone",
    "text": "/lib/text",
    "css": "/lib/css",
    "normalize": "/lib/normalize",
    "less": "/lib/less",
    "Model": "/Model",
    "Controller": "/Controller",
    "lessc": "/lib/lessc"
  },
});