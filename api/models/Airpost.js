const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
    name: String,
    code: String,
    city_code: String,
    country_code: String,
    timezone: String,
    coordinates:[Number],
    Photos:[String],
    perks:[String],
});

const AirportModel = mongoose.model('Airport', airportSchema);
module.exports = AirportModel;

