/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();

const SERVER_PORT = 4000;

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(SERVER_PORT || 3000);
