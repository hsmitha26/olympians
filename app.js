const dotenv = require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var olympiansRouter = require('./routes/api/v1/olympians');
var olympianStatsRouter = require('./routes/api/v1/olympian_stats');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/olympians', olympiansRouter);
app.use('/api/v1/olympian_stats', olympianStatsRouter);

module.exports = app;
