var express = require('express')
var app = express(); // Defining server
var http = require('http');
var https = require('https');
var router = require('../utilities/router.js'); // Request handling-routing

/*********************** Routing ****************************/
//Handled by app.js
console.log(__dirname);
app.use(express.static(__dirname + '/../client'));

var openPort = 5678;
var lockPort = 5911;


/*********************** Routing ****************************/
//Handled by router.js\\

// app.get('/',function(req, res){
// 	console.log("request url", req.url);
//   router.requestHandler('/', req, res);
// });

app.post('/state',function(req, res){
  router.requestHandler('/state', req, res);
});

app.post('/cropType',function(req, res, next){
  router.requestHandler('/cropType', req, res);
});

app.post('/crop',function(req, res, next){
  router.requestHandler('/crop', req, res);
});


http.createServer(app).listen(openPort, function(){
  console.log('Server listening on port',openPort)
}); // <-- initialize server for http
https.createServer(app).listen(lockPort); // <-- initial