const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.info(`The Server is running on port 🚀🚀🚀 ${PORT} 🚀🚀🚀`);
});

app.use(require('./routes/app'));

app.use((req, res, next) => {
    const erro = new Error(`Route not found...`);
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            code: error.code,
            message: error.message
        }
    });
});

module.exports = app;
