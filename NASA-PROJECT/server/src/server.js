// const express = require('express');
// const app = express();
// app.listen();

const http = require('http'); // Node built in http request object

const app = require('./app')

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;
const HOSTNAME = 'localhost';

const server = http.createServer(app); //pass express into it. Any middleware will also be passed along

async function startServer() {
    await loadPlanetsData();

    server.listen(PORT, HOSTNAME, () => {
        console.log(`Listening on ${HOSTNAME} : ${PORT}...`);
    });
}

startServer(); // no code relies on start server function.
