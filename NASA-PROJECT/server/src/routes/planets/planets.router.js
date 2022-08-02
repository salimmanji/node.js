const express = require('express');

// const planetsController = require('./planets.controller'); //destructure functions on import
const {
    httpGetAllPlanets,
} = require('./planets.controller'); 

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;