const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Endpoint routes
app.use('/user', userRoute);

module.exports = app;
