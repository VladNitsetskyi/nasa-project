const {getAllLaunches, addNewLaunch, deleteLaunch } = require('../../models/launches.model');
async function httpGetAllLaunches(req,res) {
    const params = req.query;
    const skip =  ((Number(params.limit) * (Number(params.page) - 1))) || 0;
    const launches = await getAllLaunches(skip,params.limit);
    if(launches) {
        return res.status(200).json(launches)
    }
    return  res.status(404).send('no launches found')
}

function httpPostNewLaunch(req,res) {
    const launch = req.body;
    let {launch_date, mission_name, rocket_type, destination_planet} = launch;
    if(!launch_date || !mission_name || !rocket_type || !destination_planet) {
        return res.status(400).json({error:"Missing required property."})
    }

    launch_date = new Date(launch_date);

    if(launch_date.toString().includes('Invalid')) {
        return res.status(400).json({error: "Invalid date format"})
    }
    launch.launch_date = launch_date;

    addNewLaunch(launch)
    res.status(201).json({
        newLaunch: launch,
        message: "New Launch has been added."
    })
}

async function httpDeleteLaunchById (req,res) {
    const id = req.body.id;
    if(!id){
        return res.status(401).json({
            error: "ID is required."
        })
    }
    const deleted = await deleteLaunch(req.body.id);
    if(!deleted) {
        return  res.status(404).json({
            error: "No such launch."
        })
    }
    return res.status(201).json({
        message: "Launch deleted."
    })
}
module.exports = {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpDeleteLaunchById
};