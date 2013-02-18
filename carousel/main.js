angular.module('MyApp', ['carousel']).

controller('MyCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.test = "my test";


  $scope.$on('someEvent', function (event, args) {
        console.log(args);
  });


}]);
