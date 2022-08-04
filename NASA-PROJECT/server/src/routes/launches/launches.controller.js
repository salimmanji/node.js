const { getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithID,
    abortLaunchById,
} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
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
    await scheduleNewLaunch(launch); //async function!
    console.log(launch);
    return res.status(201).json(launch); //return response (only once) with status code.
}

async function httpAbortLaunch(req, res) {
    const launchID = Number(req.params.id);
    const existsLaunch = await existsLaunchWithID(launchID);

    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found.',
        });
    }

    const aborted = await abortLaunchById(launchID);
    if (!aborted) {
        return res.status(400).json({
            error: "Launch not aborted.",
        })
    }
    
    return res.status(200).json({
        ok: true,
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}