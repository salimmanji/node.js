const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['Nasa', 'ZTM'],
    upcoming: true, 
    success: true,
};

launches.set(launch.flightNumber, launch);
//launches.get(flightnumber); In this case, export the data

function getAllLaunches() {
    return Array.from(launches.values())
}

module.exports = {
    getAllLaunches,
}