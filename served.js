//Lets require/import the HTTP module
var http = require('http');
//Requiring express JS for easy routing
var express = require('express');
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
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
})

// Routing
app.get('/',function(req, res){
  res.sendFile('/index.html')
})