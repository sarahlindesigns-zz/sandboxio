angular.module('myApp', ['carousel']);

angular.module('carousel', []).

directive('carousel', function() { return {

  restrict    :   'E',
  scope       :   true,
  transclude  :   true,
  replace     :   false,
  controller  :   'CarouselCtrl',
  templateUrl :   'Carousel.html',

  link: function(scope, elem, attrs, ctrl) {

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

    //measurements
    var carouselWidth  = carousel.width();
    var tileWidth      = tiles.width();
    var tileOffset     = tiles.outerWidth();
    var elementsPerRow = carouselWidth/tileOffset;

    //flags
    var showingFirstSet = true;

    self.addEventHandlers = function() {
  
      $(window).resize(function() {
        //updateElement PerRow();
      });

      $(elem).mouseover(function() {
        showUI();
      });
       
      $(elem).mouseout(function() {
        hideUI();
      });

      prvBtn.click(function() {
        console.log("load prev");
        if(ctrl.getPageNo())
        ctrl.getPrev();
        showingFirstSet = (ctrl.getPageNo() < 2);
        showUI();
      });

      nxtBtn.click(function() {
        console.log("load next");
        ctrl.getNext();
        showingFirstSet = (ctrl.getPageNo() < 2);
        showUI();
      });
    };

    //helper functions
    function getDisplayWidth() {
      //return carouselWidth
    }

    function showUI() {
      if(!ctrl.isMobile()) {
        if(showingFirstSet) {
         carousel.removeClass('show-prev-ui');
         carousel.addClass('show-next-ui');
        } else {
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

    function adjustIndent() { //adjust left offset on first row of results

    }

    self.addEventHandlers();   
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