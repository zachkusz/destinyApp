app.controller('EditController', ['$scope','$http', '$window', '$location',
function($scope, $http, $window, $location) {

  $scope.maps = [];

  $http.get('/maps').then(function(response) {
    var mapArray = response.data;
    for (var i = 0; i < mapArray.length; i++) {
      $scope.maps.push(mapArray[i].map);
    }
  });

}]);
