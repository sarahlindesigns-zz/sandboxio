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
  });
  */

  var dvrItems = [
      {
        id:   'item_0',
        art:  'img/art1.png',
        info: '',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_1',
        art:  'img/art1.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_2',
        art:  'img/art2.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_3',
        art:  'img/art3.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_4',
        art:  'img/art4.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_5',
        art:  'img/art5.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_6',
        art:  'img/art6.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_7',
        art:  'img/art7.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_8',
        art:  'img/art8.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_9',
        art:  'img/art9.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_10',
        art:  'img/art10.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_11',
        art:  'img/art11.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_12',
        art:  'img/art12.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_13',
        art:  'img/art13.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_14',
        art:  'img/art14.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_15',
        art:  'img/art15.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_16',
        art:  'img/art16.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_17',
        art:  'img/art1.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_18',
        art:  'img/art1.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_19',
        art:  'img/art1.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      },
      {
        id:   'item_20',
        art:  'img/art1.png',
        info: 'info card info goes here',
        buttons: [
          { label: 'button label', icon: '', url: 'img/art1.png' },
          { label: 'button label', icon: '', url: 'img/art2.png' }
        ]
      }
    ];

    $scope.dvrItems = dvrItems;

}]);
