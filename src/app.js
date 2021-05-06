const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.info(`The Server is running on port 🚀🚀🚀 ${PORT} 🚀🚀🚀`);
});

app.use('/', (req, res, next) => {
    res.status(200).json({ message: `Hello api handle spreadsheet... ${process.env.ENVIRONMENT}` });
});

app.use((req, res, next) => {
    const erro = new Error(`Route not found...`);
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        erro: {
            message: error.message
        }
    });
});

module.exports = app;
