const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name: {type:String, required:true},
    code: {type:String, required:true, unique:true}
});

const AirlineModel = mongoose.model('Airline', airlineSchema);
module.exports = AirlineModel;

