// need to set up stateName require and data handling, keep getting errors
// var cropSelections = require('../state_selection_dbs/selectionData.js');

var app = angular.module('map', ['ngAnimate', 'n3-line-chart']);
  // Defining our map controller

app.controller('mapController', function($scope, $http){
    // Setting our $scope statename that will change on click
    // Will pass in later to get data from state selection DB

    $scope.init = function(){
      $scope.cropFlag = false; 
      $scope.cropTypeFlag = false; 

      $('#vmap').vectorMap({ map: 'usa_en',
        backgroundColor: 'white',
        borderColor: '#818181',
        borderOpacity: 0.25,
        borderWidth: 1,
        color: '#18bc9c',
        enableZoom: false,
        hoverColor: '#2c3e50',
        hoverOpacity: null,
        showTooltip: true,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#2c3e50',
        selectedRegion: null, 
        onRegionClick: function(element, code, region){ 
          $scope.graphFlag = false;
          $scope.cropTypeFlag = false; 
          $scope.stateName = region;
          $http.post('/state?'+region, region)
          .then(function(response){
            $scope.types = response.data
            $scope.cropFlag = true;
          })
        }
      });
    };

    $scope.init(); // puts our map on the page,

    $scope.getCrops = function(){
      $http.post('/cropType?'+this.type.trim())
      .then(function(response){
        $scope.crops = response.data;
        $scope.cropTypeFlag = true; 
      })
    };

    $scope.getCropDetails = function(){
       $http.post('/crop?'+this.crop.trim())
       .then(function(response){
        $scope.cropInfo = {};
        var compareThisArray = [];
        if(!response.data.length){
          $scope.cropInfo = ["NO DATA AVAILABLE"];
        }else{
          $scope.details = response.data.forEach(function(dets){
            if(dets.unit_desc === '$'){
              $scope.cropInfo[dets.year] = {'Year' : dets['year'], 'Amount' : dets['value'], 'unit_desc' : dets['unit_desc'], 'Class' : dets['class_desc']}
            }
          })
        }
       })
       .then(function(){

        $scope.graphFlag = true;
        $scope.data = [];
        var i = 0; 
        _.each($scope.cropInfo, function(val, key){
            var amount = val["Amount"].replace(/,/g, ""); 
            var date = new Date(key)
            $scope.data[i] = {"x": date, "amount": Number(amount)};
            i++
        })

          $scope.options = {
            axes: {
              x: {type: "date", ticksInterval: 1}
            },

            series: [
              {
                y: "amount",
                label: "Production in US Dollars",
                color: "#9467bd"
              }
            ]
        }
    })
    
  }

    $scope.replaceChars = function(str){
     str = str.replace(/%20/g,' ');
     return str.replace(/%26/g,'&');
    }
  })