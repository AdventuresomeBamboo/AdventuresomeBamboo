var express = require('express');//Requiring express JS for easy routing
var router = express.Router(); //Creating the router
var url = require('url'); // URL handling
var async = require('async-series'); // Async JS for handling async operations
var path = require('path'); // For resolving path names
var request = require('request'); // Request JS for simple API calls
var currentYear = new Date().getFullYear(); //Dynamically set current year
var data = require('../state_selection_dbs/selectionData.js').selectionData;

var root = express.static(__dirname + '/../client');// Set root path for static routes

var state, cropType, crop; // Global vars for API calls

/*ROUTING*/
module.exports.requestHandler = function (route, req, res){
  if(route === '/'){
    res.sendFile(path.join(__dirname, '/../client/index.html'));
  }
  else if(route === '/state'){
  //Post request for the crop types name
    state = (url.parse(req.url).query).toUpperCase();
    getCropTypes(state, req, res);
  }
  else if(route === '/cropType'){
  //Post request for the cropType
  var cropList;
    cropType = (url.parse(req.url).query).toUpperCase();
    getCropNames(state, cropType, req, res);
  }
  else if(route === '/crop'){
  //Post request for the crop name
  var production = {};
  var year = new Date().getFullYear()-1;
  crop = (url.parse(req.url).query).toUpperCase();
    //need an async loop. BUT dont know how
    showCropInfo(state, cropType, crop, year, req, res);
  } else {
    console.log('invalid route');
    res.writeHead(404);
    res.end();
  }
};

/*********************** \Functions/ ***********************/

var getCropTypes = function (state, req, res){
  var types = [];// <-- holder for the cropTypes that will be passed in
  async([
    function(done){
        for (var key in data){
          console.log(key)
          if(data[key][state]){
            types.push(key)
          }
        }
      done(false);
    },
    function(done){
      console.log('processing...');
      done(false);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop types : ',types );
      res.writeHead(200);
      res.write(JSON.stringify(types));
      res.end();
    });
};



var getCropNames = function (state, cropType, req, res){
  var crops = [];; // <-- holder for the crop names that will be passed in
  async([ //<-- handling of asynchronous calls
    function(done){
      for(var i = 0; i < data[cropType][state].length; i++){
        crops.push(data[cropType][state][i])
      }
      done(false);
  },
    function(done){
      console.log('processing...');
      done(false);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop names : ',crops)
      res.writeHead(200);
      res.write(JSON.stringify(crops));
      res.end();
    });
};

var showCropInfo = function (state, cropType, crop, year, req, res){
  var production = {}; // <-- holder for the production values that will be passed in
  // ^-- Above is the link for the API request check the vars in the string...
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year__or=2014&year__or=2013&year__or=2011&year__or=2010&year__or=2012&state_name='+state+'&commodity_desc='+crop+'&statisticcat_desc=PRODUCTION';
  async([//<-- handling of asynchronous calls
    function(done){
      request.get(link, function (err, response, body){// <-- initiates connection to API server
        production = JSON.parse(body).data;
        console.log(production);
      });
      done(false);
    },
    function(done){
      console.log('getting crop info for '+year+'...')
      done();
    },
    function(done){
      setTimeout(done, 2000);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop names!')
        res.writeHead(200);
      if(production){
        console.log("this is production", production.data)
        res.write(JSON.stringify(production));
      }else{
        res.write('No Data to Display') 
      }
      res.end();
    });
};

var getCropInfo = function (year){
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+year+'&state_name='+state+'&commodity_desc='+crop+'&statisticcat_desc=PRODUCTION';
}
