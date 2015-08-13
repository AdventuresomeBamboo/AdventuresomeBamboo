var express = require('express');//Requiring express JS for easy routing
var router = express.Router(); //Creating the router
var url = require('url'); // URL handling
var async = require('async-series'); // Async JS for handling async operations
var path = require('path');
var utils = require('./utils.js'); //Utility-helper functions

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
    //*******ATTENTION***********\\ need to send back all crop types
    res.writeHead(200);
    res.write(cropTypes);
    res.end();
  }
  else if(route === '/cropType'){
  //Post request for the cropType
    var cropList;
    cropType = //(url.parse(req.url).query).toUpperCase();
    async([
      function(done){
        waiter(utils.getCropNames('IDAHO', 'VEGETABLES'));
        done(false);
      },
      function(done, result){
        console.log('crop list received...');
        done(false);
      }],
      function(err){
        if(err){console.log('Following error ocurred : ',err); return};
        console.log('...processing...')
        console.log(cropList);
        //res.writeHead(200);
        //res.write(cropList)
        //res.end();
      }
    );
  }
  else if(route === '/crop'){
  //Post request for the crop name
    var production = {};
    var year = new Date().getFullYear()-1;
    crop = (url.parse(req.url).query).toUpperCase();
    //need an async loop. BUT dont know how
    async([
      //first call without looping
      function(cb){
        production[year] = utils.showCropInfo(state, cropType, crop, year);
        cb();
      },
      function(cb){
        res.writeHead(200);
        res.end(production);
        cb();
      }
    ]);
  } else {
    console.log('invalid route');
    res.writeHead(404);
    res.end();
  }
};

/*HELPERS*/
var worker = function (func, cb){
  func.call(this, arguments);
  return cb();
};

var waiter = function (func){
  console.log(func)
  worker(func, function(){
    console.log('processing complete');
  });
};

module.exports.requestHandler('/cropType')
