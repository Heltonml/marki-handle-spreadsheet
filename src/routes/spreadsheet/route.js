const fillSheets = require('../../controller/spreadsheet/app');

const route = ({ router }) => {
    router.get('/download', fillSheets);

    return router;
};

module.exports = route;
