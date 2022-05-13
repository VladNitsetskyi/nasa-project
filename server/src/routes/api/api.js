const express = require('express');
const planetsRouter = require('../planets/planets.router');
const launchesRouter = require('../launches/launches.router');


const apiRouter = express.Router();

apiRouter.use('/v1/planets', planetsRouter);
apiRouter.use('/v1/launches',launchesRouter);


module.exports = apiRouter;