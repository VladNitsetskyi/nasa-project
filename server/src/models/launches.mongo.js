const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flight_number: {
        type: Number,
        required: true
    },
    launch_date : {
        type: Date,
        required: true
    },
    mission_name: {
        type: String,
        required: true
    },
    rocket_type: {
        type: String,
        required: true
    },
    destination_planet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "planet"
    },
    customer:{
        type: [String]
    },
    current_status: {
        type: String,
        default: 'upcoming'
    }, // upcoming, success, aborted
})
module.exports = mongoose.model('launch',launchesSchema)
