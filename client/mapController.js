// need to set up stateName require and data handling, keep getting errors
// var cropSelections = require('../state_selection_dbs/selectionData.js');

var app = angular.module('map', ['ngAnimate']);
  // Defining our map controller

app.controller('mapController', function($scope, $http){
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
          $scope.cropInfo = [];
          $scope.crops = [];
          $http.post('/state?'+region, region)
          .then(function(response){
            $scope.types = response.data
          })
        }
      });
    };

    $scope.init(); // puts our map on the page,
    $scope.getCrops = function(){
      $http.post('/cropType?'+this.type)
      .then(function(response){
        $scope.crops = response.data;
      })
    };

    $scope.getCropDetails = function(){
       $http.post('/crop?'+this.crop)
       .then(function(response){
        $scope.cropInfo = [];
        var compareThisArray = [];
        if(!response.data.length){
          $scope.cropInfo = ['NO DATA TO DISPLAY'];
        }else{
          $scope.details = response.data.forEach(function(dets){
            if(dets.unit_desc === 'CWT' && dets.class_desc !== 'ALL CLASSES'){
              var year = dets.year;
              var val = dets.value;
              var desc = dets.class_desc;
              $scope.cropInfo.push(['Year : ',year ,'Type : ', desc, 'CWT : ', val]);
            }
            if(dets.class_desc === 'ALL CLASSES'){
              var year = dets.year;
              var val = dets.value;
              compareThisArray.push(['Year : ',year , 'CWT : ', val]);
            }
          })
          if(compareThisArray.length > $scope.cropInfo.length){
            $scope.cropInfo = compareThisArray;
          }
        }
       })
    }
    $scope.replaceChars = function(str){
     return str.replace(/%20|%26/g,' ');
    }
  })