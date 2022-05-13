const express = require('express');

const planetsRouter = express.Router();

const {httpGetAllPlanets, addPlanet} = require('./planets.controller')

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;