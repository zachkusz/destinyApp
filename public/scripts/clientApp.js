var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '../views/doc.html',
      controller: "DocController"
    })
    .when('/', {
      templateUrl: '../views/doc.html',
      controller: "DocController"
    })
    .when('/edit', {
      templateUrl: '../views/edit.html',
      controller: "EditController"
    })
		.otherwise({
			redirectTo: 'four04',
      templateUrl: '../views/four04.html',
      controller: "Four04Controller"
		})
}]);
