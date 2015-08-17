// need to set up stateName require and data handling, keep getting errors
// var cropSelections = require('../state_selection_dbs/selectionData.js');

var app = angular.module('map', ['ngAnimate', 'n3-line-chart']);
  // Defining our map controller

  app.controller('mapController', function($scope, $http){ // <-- setting controller
    $scope.init = function(){ // <-- defining methods to load on init
      $scope.cropFlag = false; // <-- starts H3 crop tag false, so it doesn't appear
      $scope.cropTypeFlag = false; // <-- starts H3 cropType flag flase, so it won't appear
      $('#vmap').vectorMap({ map: 'usa_en', // <--jQuery vector map
        backgroundColor: 'white', // <-- from here ....
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 1,
        color: '#18bc9c',
        enableZoom: false,
        hoverColor: '#2c3e50',
        hoverOpacity: null,
        showTooltip: false,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#2c3e50',
        selectedRegion: null,     // <-- to here sets the colors, and some styling options
        onRegionClick: function(element, code, region){ // <-- Function to handle state click
          $scope.graphFlag = false; // <-- resets flag on state click to hide H3
          $scope.cropTypeFlag = false; // <-- resets flag on state click to hide H3
          $scope.stateName = region; // <-- sets a scope var for access to angular in html
          $http.post('/state?'+region, region) // <-- Post request to the server for crop types
          .then(function(response){ // <-- waits for response from the server
            $scope.types = response.data; // <-- sets an array for ng-repeat (line 86, /client/index.html)
            $scope.cropFlag = true; // <-- sets the flag true to display the H3 tag (line 86, /client/index.html)
          })
        }
      });
    };

    $scope.init(); // <-- Loads the map, and inits all the methods

    $scope.getCrops = function(){ // <-- function that gets the crop names based on crop type click
      $http.post('/cropType?'+this.type) // <-- post request to the server for crop names
      .then(function(response){ // <-- waits for server response
        $scope.crops = response.data; // <-- array to be displayed in crop names
        $scope.cropTypeFlag = true; // <-- turns falg true to display crop type H3 (line 91, /index.html)
      })
    };

    $scope.getCropDetails = function(){ // <-- function to get the crop information for the graph
      $http.post('/crop?'+this.crop) // <-- Post request the server which be built into an API call
      .then(function(response){ // <-- waits for server response
        $scope.cropInfo = {}; 
        if(!response.data.length){
          $scope.cropInfo = ['NO DATA TO DISPLAY'];
        }else{
          $scope.details = response.data.forEach(function(dets){
            if(dets.unit_desc === '$')
              $scope.cropInfo[dets.year] = {'Year' : dets['year'], 'Amount' : dets['value'], 'unit_desc' : dets['unit_desc'], 'Class' : dets['class_desc']};
          })
        }
      })
      .then(function(){ // <-- waits for cropInfo to finish populating
        $scope.data = [];
        var i = 0;
        _.each($scope.cropInfo, function(val, key){
          $scope.data[i] = {x : key, value : val}
          i++;
        })
        $scope.graphFlag = true;
      })
    }
    $scope.replaceChars = function(str){ // <-- this function replaces unwanted characters for displaying
     str = str.replace(/%20/g,' '); // <-- replaces API spaces with spaces
     return str.replace(/%26/g,'&'); // <-- replaces API ampersands with '&'
   }
 })