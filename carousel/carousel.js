angular.module('carousels', []).

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

    //measurements
    var tileWidth   = tiles.width();
    var tileOffset  = $('li.tile').last().outerWidth(true);
    var tileMargin  = tileOffset - tileWidth;
    var slideSpeed  = 500;

    //flags
    var currentViewSet    = ctrl.getSetNo();

    self.addEventHandlers = function() {

      /**
      *   Carousel Event Emission
      *
      *   Carousels emit click events on their element which any parent
      *   controller including the carousel directive can respond to
      *
      *   (Example) In the parent controller you would use this:
      *
      *   $scope.$on('carouselEvent', function (event, target) { console.log(target); });
      *
      */

      self.submit = function(event) { //emit events upward to parent ctrl scope
        scope.$emit('carouselEvent', event.target);
      };

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

      $('.slide').css('left', position); //uses pure css for animation
      if(typeof callback === 'function') {
        callback();
      }
      /* //jQuery animation fallback
      $('.slide').animate({
        left: position
      }, slideSpeed, function() {
        if(typeof callback === 'function') {
          callback();
        }
      });
      */
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
      return (isFirstSet()) ? getViewWidth() * -1: $('.slide').offset().left + (getViewWidth() * -1);
    }

    function getPrevPosition() {
      return (isFirstSet()) ? 0 : $('.slide').offset().left + getViewWidth();
    }

    function isFirstSet() {
      return currentViewSet === 1;
    }

    self.addEventHandlers();

    scope.tiles = ctrl.generateMockElements(20);
  }
};}).

controller('CarouselCtrl', ['$scope', '$compile', '$http', function($scope, $http) {

  /**
    *
    * Carousel Controller
    *
    */

  var CarouselCtrl = $scope;

  var setNo = 1; //currently displayed result set
  
  //PUBLIC CONTROLLER METHODS
  
  //move to utils?
  CarouselCtrl.isMobile = function() {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
       return true;
     } else {
       return false;
     }
  };

  CarouselCtrl.getNextSet = function() {
    setNo++;
  };

  CarouselCtrl.getPrevSet = function() {
    setNo--;
  };

  CarouselCtrl.getSetNo = function() {
    return setNo;
  };

  CarouselCtrl.generateMockElements = function(amount) { //XXX
    var tiles = [];
    var ix = 1;

    while(ix < amount) {
      tiles.push({
          id:      'tile_' + ix,
          image:   'img/art' + ix + '.png',
          buttons: [
            { label: 'button 1', value: 'button 1'},
            { label: 'button 2', value: 'buttone 2'}
          ]
        });
      ix++;
    }
    return tiles;
  };

  //strangely, ng-repeat kills css transitions for animating the carousel
  //appending a single empty li onto the tiles ul makes it work again
  CarouselCtrl.emptyElementHack = function() {
    var li = $('<li class="tile">');  //create new li tag
    li.css('visibility', 'hidden');
    li.appendTo($('.tiles'));
  };

  CarouselCtrl.emptyElementHack();

  return CarouselCtrl;
}]);