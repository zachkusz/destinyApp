app.controller('Four04Controller', ['$scope','$http', '$window', '$location',
function($scope, $http, $window, $location) {

  //use angular to read address and use it for link variable
  var link = "page";

  $scope.err = "Error 404 " + link + " not found."
}]);
