//Lets require/import the HTTP module
var http = require('http');
//Requiring express JS for easy routing
var express = require('express');
//Setting router as variable to use express methods
var app = express();
//Creating the router
var router = express.Router();
//request handler
var request = require('request');
//URL handling
var url = require('url');

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
var state, crop, cropType, link;
/*********************** Routing ****************************/

//Get request
app.use('/', express.static(__dirname + '/../client'))
router.get('*',function(req, res){
  res.sendFile('/index.html');
});
//Post request for the state name
app.post('/state',function(req, res, next){
  state = (url.parse(req.url).query).toUpperCase();
  console.log(state);
  res.writeHead(200);
  res.end();
});
//Post request for the cropType
app.post('/cropType',function(req, res, next){
  /************* URGENT - WILL NEED TO FORMAT THIS BASED ON CHOICE (4 OPTIONS) *******************/
  cropType = (url.parse(req.url).query).toUpperCase();
  switch(cropType){
    case 'FIELD': // <-- WILL NEED TO SET THESE CASES BASED ON USER CLICKS
      cropType = 'FIELD%20CROPS'
      break;
    case 'FRUIT':
      cropType = 'FRUIT%20%26%20TREE%20NUTS'
      break;
    case 'HORTICULTURE':
      cropType = 'HORTICULTURE'
      break;
    case 'VEGETABLES':
      cropType = 'VEGETABLES'
      break;
    default:
      break;
  }
  res.writeHead(200);
  res.end();
});
//Post request for the crop name
app.post('/crop',function(req, res, next){
  crop = (url.parse(req.url).query).toUpperCase();
  makeApiCall(state, cropType, crop);
  res.writeHead(200);
  res.end();
});


/*********************** Helper Functions ****************************/

var makeApiCall = function (state, cropType, crop){
    link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year=2010&state_name='+state+'&commodity_desc='+crop;
};