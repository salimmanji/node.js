const express = require('express');

// const planetsController = require('./planets.controller'); //destructure functions on import
const {
    getAllPlanets,
} = require('./planets.controller'); 

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;