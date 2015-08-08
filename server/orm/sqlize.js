var Sequelize = require('sequelize');
// initiating the new ORM tables
var sequelize = new Sequelize('commodityData', 'admin', 'admin', {
  //definining the host and DB type
  host: 'localhost',
  port: '5678', //using port 5678
  dialect: 'postgres'
});

var State = sequelize.define('state', {
  //defining a model with stateName, type and field title
  stateName: {
    type: Sequelize.STRING,
    field: 'state_name'
  }
});

var Crop = sequelize.define('crop', {
  //defining a model with cropName, type and field title
  cropName: {
    type: Sequelize.STRING,
    field: 'crop_name'
  },
  value: { //is the production amount in LBs
    type: Sequelize.INTEGER,
    field: 'value'
  }
});

State.hasMany(Crop);
Crop.belongsTo(State);
sequelize.sync();