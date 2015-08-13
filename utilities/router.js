var express = require('express');//Requiring express JS for easy routing
var url = require('url'); // URL handling
var utils = require('./utils.js'); //Utility-helper functions
var async = require('async') // Async JS for handling async operations

var root = express.static(__dirname + '/../client');// Set root path for static routes

var state, cropType, crop; // Global vars for API calls

module.exports.router = express.Router(); //Creating the router
module.exports.requestHandler = function (route, req, res){
  if(route === '/'){
    console.log('asking for root')
    return res.sendFile('/index.html');
  }
  else if(route === '/state'){
  //Post request for the state name
    state = (url.parse(req.url).query).toUpperCase();
    
    res.writeHead(200);
    res.end();
  }
  else if(route === '/cropType'){
  //Post request for the cropType
    var cropList;
    cropType = (url.parse(req.url).query).toUpperCase();
    async.series([
      function(cb){
        cropList = utils.getCropNames(state, cropType);
        cb();
      },
      function(cb){
        res.writeHead(200);
        res.end(cropList);
        cb();
      }
    ])
  }
  else if(route === '/crop'){
  //Post request for the crop name
    var production = {};
    var year = new Date().getFullYear()-1;
    crop = (url.parse(req.url).query).toUpperCase();
    //need an async loop. BUT dont know how
    async.series([
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
    ])
  } else {
    console.log('invalid route')
    res.writeHead(404)
    res.end()
  }
}
