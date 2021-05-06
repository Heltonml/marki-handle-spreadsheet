const express = require('express');
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Hello api handle spreadsheet... ${process.env.ENVIRONMENT}`
    });
});

routes.use('/spreadsheet', require('./spreadsheet/app'));

module.exports = routes;
