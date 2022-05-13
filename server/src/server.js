const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..','.env')});
const http = require('http');
const app = require('./app');
const { startMongoDB } = require('../services/mongo')

startMongoDB();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log("Server is started on port " + process.env.PORT)
});
