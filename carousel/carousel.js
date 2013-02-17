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
    var tileWidth   = tiles.width();
    var tileOffset  = $('li.tile').last().outerWidth(true);
    var tileMargin  = tileOffset - tileWidth;

    //flags
    var currentViewSet    = ctrl.getSetNo();

    self.addEventHandlers = function() {
  
      $(window).resize(function() {
       
      });

      $(elem).mouseover(function() {
        showUI();
      });
       
      $(elem).mouseout(function() {
        hideUI();
      });

      prvBtn.click(function() {
        currentViewSet--;
        slideTo('previous', function() {
          showUI();
          if(currentViewSet < 2) {
            addIndent();
          }
        });
      });

      nxtBtn.click(function() {
        slideTo('next', function(){
          showUI();
          currentViewSet++;
          if(hasIndent()) {
            removeIndent();
          }
        });
      });
    };

    /**
      *
      * DOM Manipulation Helpers
      *
      */

    function slideTo(dir, callback) {
      var position = (dir === 'next') ? getNextPosition(): getPrevPosition();
      $('.slide').animate({
        left: position
      }, 100, function() {
        if(typeof callback === 'function') {
          callback();
        }
      });
    }

    function showUI() {
      if(!ctrl.isMobile()) {
        if(currentViewSet === 1) {
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

    //indentation for TBS

    function removeIndent() {
      carousel.removeClass('container'); //pull out of tbs container layout - full width
    }

    function addIndent() {
      carousel.addClass('container'); //put into tbs layout for indent
    }

    function hasIndent() {
      return carousel.hasClass('container');
    }

    //slide calculations

    function getNumberVisible() {
      return Math.floor(carousel.width() / tileOffset);
    }

    function getViewWidth() {
      return (getNumberVisible() * tileOffset);
    }

    function getNextPosition() {
      console.log('get next position');
      return (isFirstSet()) ? getViewWidth() * -1: $('.slide').offset().left + (getViewWidth() * -1);
    }

    function getPrevPosition() {
      console.log('get previous position');
      return (isFirstSet()) ? 0 : $('.slide').offset().left + getViewWidth();
    }

    function isFirstSet() {
      return currentViewSet === 1;
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

  var setNo = 1; //currently displayed result set
  
  //PUBLIC CONTROLLER METHODS
  
  self.isMobile = function() {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
       return true;
     } else {
       return false;
     }
  };

  self.getNextSet = function() {
    setNo++;
  };

  self.getPrevSet = function() {
    setNo--;
  };

  self.getSetNo = function() {
    return setNo;
  };

  return self;
}]);