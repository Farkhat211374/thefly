const mongoose = require('mongoose');
const AirportModel = require('Airpost')

const flightSchema = new mongoose.Schema({
    departure_place: String,
    arrival_place: String,
    departureTime: {type: Date},
    arrivalTime: {type: Date},
    airline: {String},
    plane: String,
    Photos:[String],
    employees:[String],
    price: Number,
});

const FlightModel = mongoose.model('Flight', flightSchema);
module.exports = FlightModel;

