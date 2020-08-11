/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const newMangerRoutes = require('./routers/newManger');
// const Post = require('./models/post');

const path = require('path');
// const userRoutes = require('./routes/user');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/images', express.static(path.join('backend/images')));

app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin ,X-Requested-With, Content-Type, Accept, Authorization '
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT '
    );
    next();
});

app.use('/api/newsManger', newMangerRoutes);

module.exports = app;
