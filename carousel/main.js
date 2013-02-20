angular.module('MyApp', ['carousels']).

controller('MyCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.test = "my test";


  $scope.$on('carouselEvent', function (event, args) {
        console.log(args);
  });


}]);
