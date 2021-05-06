const express = require('express');
const router = express.Router();

const route = require('./route');

const routes = route({ router });

module.exports = routes;
