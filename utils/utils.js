var request = require('request'); // Request JS for simple API calls
var async = require('async') // Async JS for handling async operations
var currentYear = new Date().getFullYear(); //Dynamically set current year

/*********************** Functions ****************************/

module.exports.getCropNames = function (state, cropType){
  var year 2012;
  var crops = {}; // <-- holder for the crop names that will be passed in
  var data = ''; // <-- data hold for parsing
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&state_name='+state+'&year='+year+'&statisticcat_desc=PRODUCTION&class_desc=ALL%20CLASSES&domain_desc=TOTAL&freq_desc=ANNUAL&util_practice_desc=ALL%20UTILIZATION%20PRACTICES&unit_desc=CWT';
  request.get(link) // <-- initiates connection to API server
  .on('data', function(chunk){ // <-- listens for data
    data += chunk;             // <-- then collects it
  })
  .on('end', function(){                // <-- once data is done sending
    parseData(data).data.forEach(function(info){ // Parse it
      crops[info.util_practice_desc] = info.commodity_desc; //add the names to the crops object
    })
  })
      return dataReturn(crops);                    //return it
}

module.exports.showCropInfo = function (state, cropType, crop, year){
  var year = year || 2012;
  var data = '';
  var production = {};
  link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+year+'&state_name='+state+'&commodity_desc='+crop;
  request.get(link)
  .on('data', function(chunk){
    data += chunk;
  })
  .on('end', function(){
    parseData(data).data.forEach(function(info){
      console.log(info.commodity_desc+' : '+info.value);
    });
  })
  return dataReturn(production)
};

module.exports.parseData = function (data){
  return JSON.parse(data);
};

module.exports.dataReturn = function (data){
  console.log(data);
  return data;
};
