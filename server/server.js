//Lets require/import the HTTP module
var http = require('http');
//Requiring express JS for easy routing
var express = require('express');
//
var path = require('path')
//Setting router as variable to use express methods
var app = express();
//Creating the router
var router = express.Router();

//Lets define a port we want to listen to
const PORT=5678; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end();
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
})

// Routing
app.use('/', express.static(__dirname + '/../client'))
router.get('/',function(req, res){
  res.sendFile('/');
})

app.post('/',function(req, res){
  res.on('data', function(chunk){
    console.log(chunk)
  })
})