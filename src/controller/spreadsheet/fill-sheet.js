const Excel = require('exceljs');

const fillSheet = ({ }) => {
    return function handle(req, res) {
        try {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Sheet1');

            worksheet.columns = [
                { header: 'Id', key: 'id', width: 10 },
                { header: 'Name', key: 'name', width: 260 }
            ];

            worksheet.addRow({ id: 1, name: 'Millenium Falcon' });
            worksheet.addRow({ id: 2, name: 'Death star' });

            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );

            res.setHeader(
                'Content-Disposition',
                'attachment; filename=' + 'export.xlsx'
            );

            return workbook.xlsx.write(res).then(() => {
                res.status(200).end();
            });
        } catch (error) {
            console.error(error);
        }
    };
};

module.exports = fillSheet;
