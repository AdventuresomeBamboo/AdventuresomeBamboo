var request = require('request'); // Request JS for simple API calls
var async = require('async-series'); // Async JS for handling async operations
var currentYear = new Date().getFullYear(); //Dynamically set current year

/*********************** Functions ****************************/

 var getCropNames = function (state, cropType){
  var year = year || 2014;
  var crops = {}; // <-- holder for the crop names that will be passed in
  var data = ''; // <-- data hold for parsing
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&state_name='+state+'&year='+year+'&statisticcat_desc=PRODUCTION&class_desc=ALL%20CLASSES&domain_desc=TOTAL&freq_desc=ANNUAL&util_practice_desc=ALL%20UTILIZATION%20PRACTICES&unit_desc=CWT';
  // ^-- Above is the link for the API request check the vars in the string...
  async([ //<-- handling of asynchronous calls
    function(done){
      request.get(link, function (error, response, body){ // <-- initiates connection to API server
        crops = JSON.parse(body).data;
        done(false, crops);
      }) 
    },
    function(done){
      console.log('processing...');
      done(false, crops);
    }],
    function(err){
      if(err){console.log('Following error ocurred : ',err); return};
      console.log('processing complete')
      return crops; //return it
    });
};

var showCropInfo = function (state, cropType, crop, year){
  var year = year || 2012;
  var production = {}; // <-- holder for the production values that will be passed in
  var data = ''; // <-- data hold for parsing
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+year+'&state_name='+state+'&commodity_desc='+crop;
  // ^-- Above is the link for the API request check the vars in the string...
  async([//<-- handling of asynchronous calls
    function(done){
      request.get(link)// <-- initiates connection to API server
      .on('data', function(chunk){ // <-- listens for data
        data += chunk;              // <-- then collects it
      })
      .on('end', function(){        // <-- once data is done sending
        production[year] = [];
        parseData(data).forEach(function(info){ 
        production[year].push(info.value);
        });
      });
      done();
    },
    function  (done){
      done();
      return dataReturn(production);
    }
  ]);
};

 var parseData = function (data){
  return JSON.parse(data).data;
};


module.exports.getCropNames = getCropNames;
module.exports.showCropInfo = showCropInfo;