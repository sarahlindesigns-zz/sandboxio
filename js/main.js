requirejs.config({
  paths: {
    'fancybox'   :  'vendor/fancybox/jquery.fancybox.pack'
  },
  shim: {
    'fancybox': [ 'vendor/jquery' ] //requires jquery
  }
});

require(['require', 'vendor/jquery', 'fancybox', 'config', 'flickr', 'lazy-loader'], function(){

  var config = root.config;

  var flickr = new root.Flickr(config);
  var lazyLoader = new root.LazyLoader(config, flickr);

  lazyLoader.init();

  $(".fancybox").fancybox();

});

