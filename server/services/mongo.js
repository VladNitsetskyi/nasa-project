const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..','.env')});

const MONGO_URL = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.knsws.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connection.once('open',async() => {
    console.log("MongoDB connected")
});
mongoose.connection.on('error', (err) => {
    console.error(err)
});

mongoose.connection.once('disconnected',async() => {
    console.log("MongoDB disconnected")
});

async function startMongoDB () {
   return await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    startMongoDB,
    mongoDisconnect
}