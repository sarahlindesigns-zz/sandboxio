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

    //measurements
    var tileWidth   = tiles.width();
    var tileOffset  = $('li.tile').last().outerWidth(true);
    var tileMargin  = tileOffset - tileWidth;
    var slideSpeed  = 500;

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

      $('.slide').css('left', position); //uses pure css for animation
      if(typeof callback === 'function') {
        callback();
      }
      /*
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
      console.log(carousel.width() / tileOffset);
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

  }
};}).

controller('CarouselCtrl', ['$scope', '$http', function($scope, $http) {

  /**
    *
    * UI Logic
    *
    */

  var CarouselCtrl = $scope;

  var setNo = 1; //currently displayed result set
  
  //PUBLIC CONTROLLER METHODS
  
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

  CarouselCtrl.loadElements = function(elementsArray) {
    var li, img, nav, span, btn;

    for(var i = 0; i < elementsArray.length; i++) {

      li  = $('<li class="tile">');  //create new li tag
      img = $('<img>'); //create new img tag

      img.attr('src', elementsArray[i].image);

      if(elementsArray[i].buttons.length > 0) {
        nav = $('<nav>');
        for(var j = 0; j < elementsArray[i].buttons.length; j++) {
          button = $('<button></button>');
          button.attr('id', elementsArray[i].buttons[j].label);
          button.click(elementsArray[i].buttons[j].action);
          button.appendTo(nav);
        }
      }
      nav.appendTo(li);
      img.appendTo(li);
      li.appendTo($('.tiles'));
    }
  };

  function generateTiles(amount) { //XXX
    var tiles = [];

    while(amount > 0) {
      tiles.push({
          id:      "tileID",
          image:   "http://placehold.it/140x187",
          buttons: [
            { label: 'button 1', action: function(){ alert("clicked button 1"); }},
            { label: 'button 2', action: function(){ alert("clicked button 2"); }}
          ]
        });
    amount--;
    }
    return tiles;
  }

  CarouselCtrl.loadElements(generateTiles(60));

  return CarouselCtrl;
}]);