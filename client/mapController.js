// need to set up stateName require and data handling, keep getting errors
// var cropSelections = require('../state_selection_dbs/selectionData.js');

var map = angular.module('map', [])
  // Defining our map controller
  .controller('mapController', function($scope){
    // Setting our $scope statename that will change on click
    // Will pass in later to get data from state selection DB
<<<<<<< HEAD
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
    onRegionClick: function(element, code, region)
    { 
      $scope.stateName = region;
      // Need to fix line above this one, data binding not displaying right?
      console.log("scope : ", $scope);
      console.log("stateName in scope : ", $scope.stateName);
      // Console logging right, but not showing up on html as supposed to
      // Look at lines 17-22 in index.html ???
      // commented out ajax for now
      $.ajax({
        url:'http://localhost:5678/state?'+region,
        type: 'post',
        success: function (data){
          console.log('Success')
        }
      })
      .done(function(data){
        $scope.types = JSON.parse(data);
      })
    }
  });
};
$scope.init();
    // puts our map on the page,
    });

    // map.service('mapService', function(){

    // })