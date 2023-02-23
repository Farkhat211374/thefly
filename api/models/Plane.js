const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema({
    name: String,
    year: Number,
    photos:[String],
    description: String,
    seats: Number
});

const PlaneModel = mongoose.model('Plane', planeSchema);
module.exports = PlaneModel;

