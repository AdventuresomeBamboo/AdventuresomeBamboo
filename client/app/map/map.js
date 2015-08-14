angular.module('app.map', ['datamaps'])

.controller('mapController', function ($scope) {
  $scope.title = "map"
  
  $scope.map = {
  	scope: 'usa',
  	responsive: true,
  	options: {
  		staticGeoData: true
  	}
   }

   $scope.updateActiveGeography = function(geography) {
		$scope.stateName = geography.properties.name;
 	 	console.log($scope.stateName);
  		$scope.stateCode = geography.id;
	}



});





