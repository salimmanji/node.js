const { getAllLaunches,
        addNewLaunch,
        existsLaunchWithID,
        abortLaunchById,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body; //get request body with user input.
    //input validation
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property.",
        }); //some part of input is invalid
    };
    launch.launchDate = new Date(launch.launchDate); //parse string, and convert to Date object
    if (isNaN(launch.launchDate)) { //check to see if date object is a number.
        return res.status(400).json({
            error: "Invalid launch date.",
        });
    }
    addNewLaunch(launch); //call function with launch info
    return res.status(201).json(launch); //return response (only once) with status code.
}

async function httpAbortLaunch(req, res) {
    const launchID = Number(req.params.id);

    if (!existsLaunchWithID(launchID)) {
        return res.status(404).json( {
            error: 'Launch not found.',
        });    
    } else {
        const aborted = await abortLaunchById(launchID);
        return res.status(200).json(aborted);
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}