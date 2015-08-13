var express = require('express')
var app = require('express')(); // Defining server
var http = require('http');
var https = require('https');
var router = require('../utils/router.js'); // Request handling-routing

/*********************** Routing ****************************/
//Handled by app.js
var openPort = 3456;
var lockPort = 3911;
http.createServer(app).listen(openPort, function(){
  console.log('Listening on port',openPort)
}); // <-- initialize server for http
https.createServer(app).listen(lockPort) // <-- initialize server for https

app.get('*',function(req, res){
var http = require('http'); // Require/import the HTTP module
var app = require('express')(); // Defining server
var router = require('../utils/router.js'); // Request handling-routing

const PORT=6789; // Port we want to listen to
var server = http.createServer(); //Create a server

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
  })
/*********************** Routing ****************************/
//Handled by router.js

app.get('/',function(req, res){
  console.log('get request made')
  var req = req;
  var res = res;
  router.requestHandler('/', req, res)
});

app.post('/state',function(req, res){
  var req = req;
  var res = res;
  router.requestHandler('/state', req, res)
});

app.post('/cropType',function(req, res, next){
  var req = req;
  var res = res;
  router.requestHandler('/cropType', req, res)
});

app.post('/crop',function(req, res, next){
  var req = req;
  var res = res;
  router.requestHandler('/crop', req, res)

});