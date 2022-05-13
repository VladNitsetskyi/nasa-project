const launchModel = require('./launches.mongo');
require('./planets.mongo');
const mongoose = require('mongoose');


async function getAllLaunches (skip,limit) {
    return await launchModel.find({})
        .skip(skip)
        .limit(limit)
        .populate('destination_planet',['kepler_name'])
        .sort({flight_number: 'asc'})
}

async function addNewLaunch(launch) {
    const latest_launch = await launchModel.findOne().sort('-flight_number')
    launch.flight_number = latest_launch ? Number(latest_launch.flight_number) + 1 : 100;
    launch.customer = ['NASA','Japan Space'];
    launch.current_status = 'upcoming'; // upcoming, success, aborted
    launch.destination_planet = mongoose.Types.ObjectId(launch.destination_planet);
    const newLaunchModel =  new launchModel(launch)
    return await newLaunchModel.save();
}

async function deleteLaunch (id) {
    const updatedLaunch = await launchModel.updateOne({flight_number: id}, {current_status: 'aborted'})
    return updatedLaunch;

}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    deleteLaunch
}