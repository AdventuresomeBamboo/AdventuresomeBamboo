//Lets require/import the HTTP module
var http = require('http');
//Requiring express JS for easy routing
var express = require('express');
//Setting router as variable to use express methods
var app = express();
//Creating the router
var router = express.Router();
//request handler
var request = require('request')

//Lets define a port we want to listen to
const PORT=5678; 

//Create a server
var server = http.createServer();

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
})

// Routing
app.use('/', express.static(__dirname + '/../client'))
router.get('*',function(req, res){
  res.sendFile('/index.html');
})

app.post('/state',function(req, res, body){
  res.writeHead(200)
  console.log(body);
  res.end();
})