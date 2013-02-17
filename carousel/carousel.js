angular.module('myApp', ['carousel']);

angular.module('carousel', []).

directive('carousel', function() { return {

  restrict    :   'E',
  scope       :   true,
  transclude  :   true,
  replace     :   false,
  controller  :   'CarouselCtrl',
  templateUrl :   'Carousel.html',

  link: function postLink(scope, elem, attrs, ctrl) {

    /**
      *
      * UI Behavior
      *
      */
     
    var self = scope;

    //elements
    var carousel = $(elem).find('.carousel');
    var tiles    = $(elem).find('.tile');
    var nxtBtn   = $(elem).find('.carousel-next');
    var prvBtn   = $(elem).find('.carousel-prev');

    //XXX - for debugging positioning
    var m1 = $('.m1');
    var m2 = $('.m2');
    var m3 = $('.m3');

    //measurements
    var carouselWidth    = carousel.width();
    var tileWidth        = tiles.width();
    var tileOffset       = $('li.tile').last().outerWidth(true);
    var tileMargin       = tileOffset - tileWidth;
    var elementsPerRow   = carouselWidth/tileOffset;
    var elementsPerFirst = carouselWidth;
    var resizeTimeout;
  
    //m2.css('left', cLeft);
    //m3.css('left', pos);

    //flags
    var showingFirstSet = true;
    var adjusting = false;

    self.addEventHandlers = function() {
  
      $(window).resize(function() {
       /* if(resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function(){
          refresh();
          tiles.css('margin-right', naturalMargin);
          adjustIndent();
        }, 200);*/
      });

      $(elem).mouseover(function() {
        showUI();
      });
       
      $(elem).mouseout(function() {
        hideUI();
      });

      prvBtn.click(function() {
        if(ctrl.getPageNo())
        ctrl.getPrev();
        showingFirstSet = (ctrl.getPageNo() < 2);
        showUI();
      });

      nxtBtn.click(function() {
        ctrl.getNext();
        showingFirstSet = (ctrl.getPageNo() < 2);
        showUI();
      });
    };

    /**
      *
      * DOM Manipulation Helpers
      *
      */

    //TODO: try to minimize this and refactor



    function showUI() {
      if(!ctrl.isMobile()) {
        if(showingFirstSet) {
          carousel.addClass('container'); //throw into tbs layout
          carousel.removeClass('show-prev-ui');
          carousel.addClass('show-next-ui');
        } else {
          carousel.removeClass('container'); //pull out of tbs container layout - full width
          carousel.addClass('show-prev-ui');
          carousel.addClass('show-next-ui');
        }  
      }
    }

    function hideUI() {
      if(!ctrl.isMobile()) {
        carousel.removeClass('show-prev-ui');
        carousel.removeClass('show-next-ui');
      }
    }

    function numberTilesToShow() {
      var screenWidth  = $(window).width();
      var marginOffset = naturalMargin;

      //return screenWidth / tileOffset;
    }

    function adjust() {
      
    }


    /*function adjustIndent() { //adjust left offset on first row of results
      //calculate carousel display area width and get last visible tile
      var carourselOffset = carousel.offset().left;
      var indentWidth     = tiles.first().offset().left - carourselOffset;
      var displayWidth    = carouselWidth - indentWidth; //remaining display room past indent
      var tilesVisible    = Math.round(displayWidth / tileOffset);
      var lastTileIx      = tilesVisible - 1;
      var lastTile        = tiles[lastTileIx];
      var marginPadding   = 0;

      //positioning vars
      var lastTileOffset  = $(lastTile).width()/2;
      var lastTileXCoord  = $(lastTile).offset().left;
      console.log(lastTileXCoord);
      var carouselEnd     = carouselWidth + carourselOffset;

      m3.css('left', carouselEnd); //orange

      if(!adjusting) {  
        while((lastTileXCoord + lastTileOffset + marginPadding) < carouselEnd) {
          var margin = Math.round((naturalMargin + marginPadding) / tilesVisible);

          adjusting = true;
          marginPadding++;
          tiles.css('margin-right', margin);
        }
      }
      adjusting = false;
    }*/

    function refresh() {
      carouselWidth = carousel.width();
    }

    self.addEventHandlers();

    var rightEdge = carousel.offset().left + carouselWidth;

    //marker.css('left', rightEdge);
    
  }
};}).

controller('CarouselCtrl', ['$scope', '$http', function($scope, $http) {

  /**
    *
    * UI Logic
    *
    */

  var self = $scope;

  var pageNo = 1; //current display results set
  
  //PUBLIC CONTROLLER METHODS
  
  self.isMobile = function() {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
       return true;
     } else {
       return false;
     }
  }; 

  self.getNext = function() {
    pageNo++;
  };

  self.getPrev = function() {
    pageNo--;
  };

  self.getPageNo = function() {
    return pageNo;
  };

  return self;
}]);