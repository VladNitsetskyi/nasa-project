const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api/api')

const app = express();

app.use(cors());

const staticPath = path.join(__dirname, '..','public')
app.use(express.static(staticPath))
app.use(express.json());

app.use('/api/',apiRouter);

app.use('/', (req,res)=> {
    res.sendFile(path.join(path.join(__dirname, '..','public'),'index.html'))
})


module.exports = app;