const express = require('express') ;
const cors = require('cors');
const XLSX = require('xlsx');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/data', (req, res) => {
    const workbook = XLSX.readFile('Smart Daily Check Sheet Machine_INDOOR 1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
