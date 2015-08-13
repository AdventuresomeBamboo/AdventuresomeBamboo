var express = require('express');//Requiring express JS for easy routing
var router = express.Router(); //Creating the router
var url = require('url'); // URL handling
var async = require('async-series'); // Async JS for handling async operations
var path = require('path'); // For resolving path names
var request = require('request'); // Request JS for simple API calls
var currentYear = new Date().getFullYear(); //Dynamically set current year

var root = express.static(__dirname + '/../client');// Set root path for static routes

var state, cropType, crop; // Global vars for API calls

/*ROUTING*/
module.exports.requestHandler = function (route, req, res){
  if(route === '/'){
    res.sendFile(path.join(__dirname, '/../client/index.html'));
  }
  else if(route === '/state'){
  //Post request for the crop types name
    state = 'TEXAS'//(url.parse(req.url).query).toUpperCase();
    getCropTypes(state, req, res);
  }
  else if(route === '/cropType'){
  //Post request for the cropType
  var cropList;
    cropType = 'VEGETABLES'//(url.parse(req.url).query).toUpperCase();
    getCropNames(state, cropType, req, res);
  }
  else if(route === '/crop'){
  //Post request for the crop name
  var production = {};
  var year = new Date().getFullYear()-1;
  crop = 'TOMATOES'//(url.parse(req.url).query).toUpperCase();
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
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&agg_level_desc=STATE&state_name='+state+'&year=2014&statisticcat_desc=PRODUCTION&class_desc=ALL%20CLASSES&domain_desc=TOTAL&freq_desc=ANNUAL&util_practice_desc=ALL%20UTILIZATION%20PRACTICES';
  async([
    function(done){
      request.get(link, function (error, response, body){
        types = JSON.parse(body).data
      })
      done(false);
    },
    function(done){
      console.log('processing...');
      done(false);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop types');
      res.writeHead(200);
      res.write(types);
      res.end();
    });
};

var getCropNames = function (state, cropType, req, res){
  var crops; // <-- holder for the crop names that will be passed in
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&state_name='+state+'&year=2014&statisticcat_desc=PRODUCTION&class_desc=ALL%20CLASSES&domain_desc=TOTAL&freq_desc=ANNUAL&util_practice_desc=ALL%20UTILIZATION%20PRACTICES&unit_desc=CWT';
  // ^-- Above is the link for the API request check the vars in the string...
  async([ //<-- handling of asynchronous calls
    function(done){
      request.get(link, function (error, response, body){ // <-- initiates connection to API server
        crops = JSON.parse(body).data;
        done(false);
      }) 
    },
    function(done){
      console.log('processing...');
      done(false);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop names!')
      return crops; //return it
    });
};

var showCropInfo = function (state, cropType, crop, year, req, res){
  var year = year || 2012;
  var production = {}; // <-- holder for the production values that will be passed in
  var data = ''; // <-- data hold for parsing
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+year+'&state_name='+state+'&commodity_desc='+crop;
  // ^-- Above is the link for the API request check the vars in the string...
  async([//<-- handling of asynchronous calls
    function(done){
      request.get(link, function (err, response, body){// <-- initiates connection to API server
        production[year] = JSON.parse(body).data;
      });
      done(false);
    },
    function(done){
      console.log('getting crop info...')
      done(false);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('Finished getting crop names!')
      return production;
    });
};