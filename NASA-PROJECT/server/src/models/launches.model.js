const launchesDB = require('./launches.mongo')
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true, 
    success: true,
};

saveLaunch(launch);

async function getAllLaunches() {
    return await launchesDB
    .find({}, { '_id': 0, '__v':0 });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDB
    .findOne() //returns first document (if more than one)
    .sort('-flightNumber'); //sort by flightnumber.... returns latest launch (- implies descending sort order)

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

//Check to see if a launch exists based on launchID/Flight#
async function existsLaunchWithID(launchID) {
    return await launchesDB.findOne({
        flightNumber: launchID,
    });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planets found');
    }

    await launchesDB.findOneAndUpdate({ //check to see if the new launch's flight number already exists. If no, insert, else upsert. findOneAndUpdate vs updateOne
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNum = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'ZTM'],
        flightNumber: newFlightNum,
    });
    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchID) {
    const aborted = await launchesDB.updateOne({
        flightNumber: launchID,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1 && aborted.matchedCount === 1;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithID,
    abortLaunchById,
    scheduleNewLaunch,
}