// need to set up stateName require and data handling, keep getting errors
// var cropSelections = require('../state_selection_dbs/selectionData.js');

angular.module('map', [])
  // Defining our map controller
  .controller('mapController', function($scope, $http){
    // Setting our $scope statename that will change on click
    // Will pass in later to get data from state selection DB
    $scope.init = function(){
      $('#vmap').vectorMap({ map: 'usa_en',
        backgroundColor: '#1640BC',
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 1,
        color: '#f4f3f0',
        enableZoom: true,
        hoverColor: '#8AA0DE',
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegion: null, 
        onRegionClick: function(element, code, region){ 

          $scope.stateName = region;
          $scope.cropTypes;

          $http.post('/state?'+region, region)
          .then(function(response){
            $scope.cropTypes = response.data;
          })
        }
      });
    };
    $scope.init();
    // puts our map on the page,
  })

  .service('mapServe', function(){

  })
