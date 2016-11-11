app.controller('EditController', ['$scope','$http', '$window', '$location',
function($scope, $http, $window, $location) {

  //$scope.maps = ['pie'];

  $http.get('/maps').then(function(response) {
    console.log(response.data);
    //make function that places each object in the array into my array
    $scope.maps = response.data
  });

  $scope.addMap = function() {
    $scope.maps.push()
  }

}]);
