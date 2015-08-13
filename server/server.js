var express = require('express')
var app = require('express')(); // Defining server
var http = require('http');
var https = require('https');
var router = require('../utils/router.js'); // Request handling-routing

/*********************** Routing ****************************/
//Handled by app.js
var openPort = 5678;
var lockPort = 5911;
http.createServer(app).listen(openPort, function(){
  console.log('Server listening on port',openPort)
}); // <-- initialize server for http
https.createServer(app).listen(lockPort) // <-- initialize server for https

/*********************** Routing ****************************/
//Handled by router.js

app.get('/',function(req, res){
  router.requestHandler('/', req, res);
});

app.post('/state',function(req, res){
  router.requestHandler('/state', req, res);
});

app.post('/cropType',function(req, res, next){
  router.requestHandler('/cropType', req, res);
});

app.post('/crop',function(req, res, next){
  router.requestHandler('/crop', req, res);
});