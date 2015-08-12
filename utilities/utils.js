//request handler
var request = require('request-promise');
//Requiring server module, for variable access
var server = require('../server/server.js');
//Gloabl variable for dynamic date
var date = new Date().getFullYear();
//Sets the cropType based on user click
module.exports.cropTypeSelector = function (cropType){
  /************* URGENT - WILL NEED TO FORMAT THIS BASED ON CHOICE (4 OPTIONS) *******************/
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
      cropType = 'VEGETABLES'
      break;
  }
  return cropType
};

module.exports.getStateCrops = function (state, cropType){
  var crops = {};// <-- object to hold list of crops
  for( var i = 2010; i < date; i++){
    link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+i+'&state_name='+state;
    request(link, function(err, res, body){
      if (!err && res.statusCode == 200) {
        crops[i] = JSON.parse(body).data[j];
      }
      console.log(crops)
    });
  }
  return crops;
};

module.exports.getProductionValue = function (state, cropType, crop){
  for( var i = 2010; i < date; i++){
    link = 'http://nass-api.azurewebsites.net/api/api_get?source_desc=SURVEY&sector_desc=CROPS&group_desc='+cropType+'&agg_level_desc=STATE&year='+i+'&state_name='+state+'&commodity_desc='+crop;
    request(link, function(err, res, body){
      if (!err && res.statusCode == 200) {
        console.log(JSON.parse(body).data[0].value);
        production[i]=JSON.parse(body).data[0].value;
      }
    });
  }
}