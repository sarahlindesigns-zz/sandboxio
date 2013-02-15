define(['vendor/jquery', 'config'], function() {
  
  root.LazyLoader = function(config, flickr) {
    var self  = this;
    var debug = config.debug;
   
    //flags
    var loading = false;

    //measurements
    var screenHeight;
    var imageHeight = config.image.maxHeight;
    var imgOffset = imageHeight;
    var batchSize = config.image.batchSize;
    var lastScrollTop = 0;
    var imgId = 0;
    var lastImgId;

    //page elements 
    var thumbContainer = $('#image-frame');

    //status
    if(debug) console.log('Loaded the \'LazyLoader\' class');  

    self.init = function() {//initialize function - kick things off!

      if(debug) console.log("Initializing lazy loader");

      loadImages();

      self.addEventHandlers();
    };

    self.addEventHandlers = function() {

      $(document).ready(function(){
        screenHeight = $(window).height();
      });

      $(window).resize(function() {
        screenHeight = updateWindowHeight();
      });

      $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollingDown = (scrollTop > lastScrollTop)? true: false; //only act if we are scrolling downward
        var scrollBottom, lastElementTop;

        if(!loading) {

          if(scrollingDown) {
            scrollBottom   = $(window).scrollTop() + $(window).height();
            lastElementTop = $('#image-frame > a:last-child').offset().top + imgOffset;

            if(scrollBottom > lastElementTop) {
              loadImages();
            }
          }
        }
        lastScrollTop = scrollTop; //for capturing scroll direction
      });
    };

    function loadImages() {

      loading = true; //disable additional loading until images have loaded

      showLoadingPlaceholders(batchSize);//show temporary placeholders while images load

      flickr.getImages(batchSize, function(results) {

        var imgStartId = lastImgId - batchSize;
        var id, url, fbUrl;

        if(results.length > 0) {

          for(var i = 0; i < results.length; i++) {
            url   = flickr.getImageUrl(results[i], 'm');
            fbUrl = flickr.getImageUrl(results[i], 'z'); //get larger image url for fancybox

            id = imgStartId + i;

            $('#img-' + id).attr('src', url);
            $('#img-' + id).parent().attr('href', fbUrl);
          }

          loading = false; //done loading, clear flag

        } else {
          console.log('Sorry, there are no more images to load');
        }
      });
    }

    function showLoadingPlaceholders(amount) { //creates elements with loading gif
      for(var i = 0; i < amount; i++) {
        var a = $('<a>');
        var img = $('<img>');

        //set attributes
        a.attr('class', 'fancybox');
        img.attr('id', 'img-' + imgId);
        //img.attr('src', 'http://placehold.it/150x150');
        img.attr('src', 'img/Loading.gif');

        //append elements
        img.appendTo(a);
        a.appendTo('#image-frame');
        
        imgId++;
      }
      lastImgId = imgId;
    }

    function updateWindowHeight() {
      return $(window).height();
    }  

  };

});
