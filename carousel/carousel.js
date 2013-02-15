angular.module('myApp', ['carousel']);

angular.module('carousel', []).

directive('carousel', function() { return {
   restrict: 'E',
   scope: true,
   transclude: true,
   replace: false,
   controller: 'CarouselCtrl',
   templateUrl: 'Carousel.html',
   link: function postLink(scope, elem, attrs, ctrl) {
     
     var self = scope;

     //elements
     var carousel = $(elem).find('.carousel');
     var tiles    = $(elem).find('.tile');

     var carouselWidth  = carousel.width();
     var tileWidth  = tiles.width();
     var tileOffset = tiles.outerWidth();


     var elementsPerRow = carouselWidth/tileOffset;

     console.log(elementsPerRow);
    

     $(window).resize(function() {
      updateElementPerRow();
     });

     $(elem).mouseover(function() {
       if(!ctrl.isMobile()) {
         $('.carousel').addClass('show-ui');
       }
     });
     
     $(elem).mouseout(function() {
       if(!ctrl.isMobile()) {
         $('.carousel').removeClass('show-ui');
       }
     });

     $('.carousel-prev').click(function() {
       console.log("load prev");
     });

     $('.carousel-next').click(function() {
       console.log("load next");
       getMaskWidth();
     });


   }
};}).

controller('CarouselCtrl', ['$scope', '$http', function($scope, $http) {

  var self = $scope;
  
  //PUBLIC CONTROLLER METHODS
  
  self.isMobile = function() {
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
       return true;
     } else {
       return false;
     }
  }; 

  
  return self;
}]);