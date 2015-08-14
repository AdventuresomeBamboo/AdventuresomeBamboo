angular.module('app', [
  'app.services',
  'datamaps',
  'ngRoute',
  'app.cropTypeSelect',
  'app.cropSelect',
  'app.map'
])

.config(function($routeProvider, $httpProvider) {

	 $routeProvider
	    .when('/cropSelect', {
	      templateUrl: 'app/cropSelect/cropSelect.html',
	      controller: 'cropSelectController'
	    })
	    .when('/cropType', {
	      templateUrl: 'app/cropType/cropType.html',
	      controller: 'cropTypeSelectController'
	    })
	    .when('/map',{
	      templateUrl: 'app/map/map.html',
	      controller: 'mapController'
	    })
	    .otherwise({
      		redirectTo: '/map'
    	});

})
