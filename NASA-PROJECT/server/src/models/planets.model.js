const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

/*
const promise = new Promise((resolve, reject) => {
    resolve(42);
});
promise.then((result) => {
 Do something with result.
});
const result = await promise; //Async code, promise first resolves, then continues
console.log(result);
*/

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            })) // allows for return of JSON objects
            .on('data', (data) => {
                if (isHabitablePlanet(data))
                    habitablePlanets.push(data);
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', () => {
                //console.log(habitablePlanets);
                // console.log(habitablePlanets.map((p) => {
                //     return p['kepler_name'];
                // }));
                console.log(`${habitablePlanets.length} planets found!`);
                resolve(); //don't need to resolve anything, we are sending back the habitable planets array in export after promise is resolved.
            });
    });
}

function getAllPlanets() {
    return habitablePlanets;
}


module.exports = {
    loadPlanetsData,
    getAllPlanets,
}