const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'ZTM'],
    upcoming: true, 
    success: true,
};

launches.set(launch.flightNumber, launch);
//launches.get(flightnumber); In this case, export the data

function getAllLaunches() {
    return Array.from(launches.values())
}

//Check to see if a launch exists based on launchID/Flight#
function existsLaunchWithID(launchID) {
    return launches.has(launchID);
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, { //additional properties to add to object. If both in launch and new object, overwite the old with new Object properties.
        customers: ['NASA', 'ZTM'],
        flightNumber: latestFlightNumber, //object.assign returns a new object with properties from launch + flight number.
        upcoming: true,
        success: true,
    })
)};

function abortLaunchById(launchID) {
    const aborted = launches.get(launchID);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    existsLaunchWithID,
    abortLaunchById,
    addNewLaunch,
}