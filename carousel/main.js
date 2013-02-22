angular.module('MyApp', ['carousels']).

controller('MyCtrl', ['$scope', '$http', function($scope, $http) {

  /**
  *
  * Controller Event Handlers
  *
  */

  //Carousel Handlers

  var carousels = { //object to hold page's carousels
    dvr       : {},
    favorites : {},
    onDemand  : {},
    tvToGo    : {}
  };

  /*
  $scope.$on('carouselEvent', function (event, args) {
    switch(args.eventName) {
      case 'click':
        carousels.onClick(args.eventTarget);
        break;
      case: 'load':
        //carousels.handlers
      default:
        break;
    }
  });*/


  var dvrItems = [
      {
        id: 'item_0',
        artwork:  'img/art1.png',
        infoCard: {
          description: 'info card info goes here',
          buttons: [
            { label: 'button label', icon: '', url: 'img/art1.png' },
            { label: 'button label', icon: '', url: 'img/art2.png' }
          ]
        }
      },
      {
        id: 'item_1',
        artwork:  'img/art2.png',
        infoCard: {
          description: 'info card info goes here',
          buttons: [
            { label: 'text label', icon: '', url: 'img/art1.png' },
            { label: 'text label', icon: '', url: 'img/art2.png' }
          ]
        }
      }
    ];

    $scope.dvrItems = dvrItems;

}]);
