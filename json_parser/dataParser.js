var _=require('underscore'); 
//this is the json file you want to parse
var cropData = require('./cropData.json')


//this will hold our results
var container = {};

var cropFilter = _.each(cropData.data, function(record){
	//want the "state_name" key and the "commodity_desc" key from original object
	
	//make sure all states are included in the container and have an empty crops array 
	
	if(!(record["state_name"] in container)){
		container[record["state_name"]] = [];
	}; 
	
	//this filters out duplicates
	if(!(_.contains(container[record["state_name"]], record["commodity_desc"]))){
		container[record["state_name"]].push(record["commodity_desc"]);
	}
	
	return container
});

