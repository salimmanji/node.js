const launchesDB = require('./launches.mongo')
const planets = require('./planets.mongo');
const axios = require('axios');

const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//     flightNumber: 100, //flight_number
//     mission: 'Kepler Exploration X', //name
//     rocket: 'Explorer IS1', //rocket.name
//     launchDate: new Date('December 27, 2030'), //date_local
//     target: 'Kepler-442 b', //NA
//     customers: ['NASA', 'ZTM'], //payload.customers for each payload
//     upcoming: true, //upcoming
//     success: true, //success
// };

// saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
    console.log('downloading launch data from SpaceX...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                }, {
                    path: "payloads",
                    select: {
                        customers: 1,
                    }
                }
            ]
        }//request body in this object
    });

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs; //data from body of response
    //when using SpaceX endpoint, response is within "docs" array.

    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });

        const launch = { //map properties from SpaceX API response to our Mongo DB
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        //console.log(`${launch.flightNumber} ${launch.mission} ${launch.rocket}`);
        console.log(launch);
        await saveLaunch(launch);
    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });

    if (firstLaunch) {
        console.log('Launch data already loaded!');
    } else {
        await populateLaunches();
    }
}

async function getAllLaunches(skip, limit) {
    return await launchesDB
        .find({}, { '_id': 0, '__v': 0 })
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
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

async function findLaunch(filter) {
    return await launchesDB.findOne(filter);
}

//Check to see if a launch exists based on launchID/Flight#
async function existsLaunchWithID(launchID) {
    return await findLaunch({
        flightNumber: launchID,
    });
}

async function saveLaunch(launch) {
    await launchesDB.findOneAndUpdate({ //check to see if the new launch's flight number already exists. If no, insert, else upsert. findOneAndUpdate vs updateOne
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planets found');
    }

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
    loadLaunchData,
    getAllLaunches,
    existsLaunchWithID,
    abortLaunchById,
    scheduleNewLaunch,
}