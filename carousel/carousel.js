angular.module('carousels', []).

/**
*
* Carousel Directive
*
*/

directive('carousel', function() { return {

  restrict    :   'E',
  scope: {
    localItems: '=items' //local carousel items list
  },
  transclude  :   true,
  replace     :   false,
  controller  :   'CarouselCtrl',
  templateUrl :   'Carousel.html',

  link: function postLink(scope, elem, attrs, ctrl) {
     
    var self = scope;

    //elements
    var id       = $(elem).attr('id');
    var carousel = $(elem).find('.carousel');
    var slide    = $(elem).find('.slide');
    var items    = $(elem).find('.item');
    var nxtBtn   = $(elem).find('.carousel-next');
    var prvBtn   = $(elem).find('.carousel-prev');

    //measurements
    var winWidth   = $(window).width();
    var itemWidth  = items.width();
    var itemOffset = items.last().outerWidth(true);
    var itemMargin = itemOffset - itemWidth;
    var slidePos   = 0;
    var currentSet = 1;

    //var slideSpeed  = 200; //use for configuring jQuery Animation fallback

    /**
    *
    * Carousel Event Handlers
    *
    */

    self.addEventHandlers = function() {

      /**
      *   Carousel Event Emission
      *
      *   Carousels will emit click events on its clickable elements which any parent
      *   controller (including the carousel directive itself) can respond to...
      *   this produces a simple way to link actions and communicate across scopes
      *
      *   (Example) In the parent controller you would use the $on as follows:
      *
      *   $scope.$on('carouselEvent', function (event, target) { console.log(target); });
      *
      */

      self.click = function(event) {
        scope.$emit('carouselEvent', {eventName: 'click', eventTarget: event.target});
      };

      window.resize = function() {
        winWidth = $(window).width();
      };

      $(elem).mouseover(function() {
        showUI();
      });
       
      $(elem).mouseout(function() {
        hideUI();
      });

      prvBtn.click(function() {
        currentSet--;
        slideTo('previous', function() {
          showUI();
          if(isFirstSet()) {
            addIndent();
          }
        });
      });

      nxtBtn.click(function() {
        slideTo('next', function() {
          currentSet++;
          if(hasIndent()) {
            removeIndent();
          }
          showUI();
        });
      });

      self.$watch('localItems', function() {
        //automatically loads items when associated property changes within the parent scope/ctrl
        if(scope.localItems) {
          updateItems();
        }
      });
    };

    /**
    *
    * Public Directive Methods
    *
    */

    self.load = function(items) {
      //TODO: Handle manual loading for edge cases
    };

    /**
    *
    * UI Behavior Functions
    *
    */

    function init() {

      self.foo = false;


      self.addEventHandlers();

      //scope.items = ctrl.generateMockElements(20); //XXX

      //window.carousel = self;//XXX expose to window

      scope.$emit('carouselEvent', {eventName: 'click', eventTarget: $(elem) });
    }

    function updateItems() {
      //TODO load items
      self.items = self.localItems;
    }

    function slideTo(dir, callback) {
      var position = (dir === 'next') ? center(getNextPosition(),dir): center(getPrevPosition(),dir);

      slide.css('left', position); //uses pure css for animation

      updatePostion(position);
      if(typeof callback === 'function') { callback(); }

      /*
      //jQuery animation fallback
      $('.slide').animate({
        left: position
      }, slideSpeed, function() {
        if(typeof callback === 'function') {
          updatePostion(position);
          callback();
        }
      });
      */
    }

    function showUI() {
      if(!ctrl.isMobile()) {
        if(isFirstSet()) {
          carousel.removeClass('show-prev-ui');
          carousel.addClass('show-next-ui');
        } else if(isLastSet()) {
          carousel.addClass('show-prev-ui');
          carousel.removeClass('show-next-ui');
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

    // "First Result Set" Indentation for TBS

    function removeIndent() {
      carousel.removeClass('container'); //pull out of tbs container layout - full width
    }

    function addIndent() {
      carousel.addClass('container'); //put into tbs layout for indent
    }

    function hasIndent() {
      return carousel.hasClass('container');
    }

    //Carousel slide behavior calculations

    function getNumberVisible() {
      return (isClippingLast()) ? Math.floor(carousel.width() / itemOffset): Math.floor((carousel.width() + itemWidth) / itemOffset);
    }

    function isClippingLast() {
      return (isFirstSet()) ? (winWidth - getViewWidth() - getPosition()) < itemWidth:  (winWidth - getViewWidth()) < itemWidth;
    }

    function getViewWidthPadded() {
      return carousel.width() / itemOffset;
    }

    function getViewWidth() {
      return  Math.floor(carousel.width() / itemOffset) * itemOffset;
    }

    function getNextPosition() {
      return (isFirstSet()) ? getNumberVisible() * itemOffset * -1: getPosition() + (getNumberVisible() * itemOffset * -1);
    }

    function getPrevPosition() {
      return (isFirstSet()) ? 0 : getPosition() + getViewWidth();
    }

    function getPosition() {
      return slidePos;
    }

    function updatePostion(position) {
      slidePos = position;
    }

    function getTotalWidth() { //forces a recount, just like when bush got elected
      return (items.parent().children().length - 1) * itemOffset;
    }

    function center(pos, dir) {
      var adjust = (getNextSet(dir) === 1) ? 0: (winWidth - ((Math.floor(winWidth / itemOffset) * itemOffset) - itemMargin)) / 2;

      return (dir === 'previous') ? pos - adjust: pos + adjust;
    }

    function getNextSet(dir) {
      return (dir === 'previous') ? currentSet: currentSet + 1;
    }

    function isFirstSet() {
      return currentSet === 1;
    }

    function isLastSet() {
      return (Math.abs(getPosition()) + (winWidth)) > getTotalWidth();
    }

    init();
  }

};}).

controller('CarouselCtrl', ['$scope', '$compile', '$http', function($scope, $http) {

  /**
  *
  * Carousel Controller
  *
  */

  var CarouselCtrl = $scope;
  
  //PUBLIC CONTROLLER METHODS
  
  //move to utils?
  CarouselCtrl.isMobile = function() {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
       return true;
     } else {
       return false;
     }
  };

  CarouselCtrl.generateMockElements = function(amount) { //XXX
    var items = [];
    var ix = 1;

    while(ix < amount) {
      items.push({
          id:      'item_' + ix,
          image:   'img/art' + ix + '.png',
          buttons: [
            { label: 'button 1', value: 'button 1'},
            { label: 'button 2', value: 'buttone 2'}
          ]
        });
      ix++;
    }
    return items;
  };

  //strangely, ng-repeat kills css transitions for animating the carousel
  //appending a single empty li onto the items ul makes it work again
  CarouselCtrl.emptyElementHack = function() {
    var li = $('<li class="item">');  //create new li tag
    li.css('visibility', 'hidden');
    li.appendTo($('.items'));
  };

  CarouselCtrl.emptyElementHack();

  return CarouselCtrl;
}]);