// const express = require('express');
// const app = express();
// app.listen();

const http = require('http'); // Node built in http request object
// const mongoose = require('mongoose'); <-- moved to mongo.js
require('dotenv').config();

const app = require('./app')
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer(); // no code relies on start server function.
