//Lets require/import the HTTP module
var http = require('http');
//Requiring express JS for easy routing
var express = require('express');
//Setting router as variable to use express methods
var app = express();
//Creating the router
var router = express.Router();
//URL handling
var url = require('url');
//Utility functions 
var utils = require('../utilities/utils.js')

//Lets define a port we want to listen to
const PORT=5678; 

//Create a server
var server = http.createServer();

//Lets start our server
app.listen(PORT, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
  })

//Global variables for API request
module.exports.state, module.exports.crop, module.exports.cropType, module.exports.link,
/*********************** Routing ****************************/

//Get request
app.use('/', express.static(__dirname + '/../client'))
router.get('*',function(req, res){
  res.sendFile('/index.html');
});
//Post request for the state name
router.post('/state',function(req, res, next){
  //sets State for API requst
  state = (url.parse(req.url).query).toUpperCase();
  //will delete from here....
  cropType = 'VEGETABLES'
  var crops = utils.getStateCrops(state, cropType)// <--- for testing purposes only MUST REMOVE IN PRODUCTION
  .then(console.log(crops))
  //until here for production
  res.writeHead(200);
  res.end();
  //next();
});

//Post request for the cropType
router.post('/cropType',function(req, res, next){
  var temp = (url.parse(req.url).query).toUpperCase();// <-- temp to pass into type selector
  cropType = utils.cropTypeSelector(temp);// <-- sets cropType to pass into get crops by state
  utils.getStateCrops(state, cropType);// <-- gets the list of crops by state
  res.writeHead(200);
  res.end();
});

//Post request for the crop name
router.post('/crop',function(req, res, next){
  crop = (url.parse(req.url).query).toUpperCase();
  utils.getProductionValue(state, cropType, crop);// <-- gets the crop production numbers by crop
  res.writeHead(200);
  res.end();
});