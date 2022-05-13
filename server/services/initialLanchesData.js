const axios = require('axios');
const baseUrl = "https://api.spacexdata.com/v4/launches/query";
const launchesModel = require('../src/models/launches.mongo')

function parseLaunchFromSpaceX(originalLaunch) {
    function setStatus(upcoming, success) {
        if(upcoming)  return 'upcoming'
        if(success) return 'success'
        return 'aborted'

    }
    const parsedLaunch = {
        flight_number: originalLaunch.flight_number,
        launch_date: originalLaunch.date_local,
        mission_name: originalLaunch.name,
        rocket_type: originalLaunch.rocket.name,
        destination_planet: "626b73739e71083bd57d4d5d",
        customer: originalLaunch.payloads.flatMap((payload) => {
                return payload['customers'];
            })
        ,
        current_status: setStatus(originalLaunch.upcoming, originalLaunch.success)
    }
    return parsedLaunch;
}

async function getLaunchesFromSpacexAPI() {
    try{
        const res = await axios.post(baseUrl,{
        query: {},
        options: {
            page: 1,
            limit: 1,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ],
            pagination: false
        }
    })
        for(const launch of res.data.docs) {
        const parsedLaunch = parseLaunchFromSpaceX(launch);
        await  launchesModel.findOneAndUpdate({flight_number: parsedLaunch.flight_number},parsedLaunch, {upsert:true})

        }

    } catch (e) {
        console.log(e)
        throw new Error("Loading launches from SpaceX API failed! Reason: ",e)
    }

}

module.exports = {
    getLaunchesFromSpacexAPI
}
