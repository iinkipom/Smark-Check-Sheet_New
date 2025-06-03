const express = require('express');
const xlsx = require('xlsx');
const app = express();

app.get('/data', (req, res) => {
  try {
    // Read the Excel file on the server
    const workbook = xlsx.readFile('Smart Daily Check Sheet Machine_INDOOR 1.xlsx');              // Path to Excel file
    const sheet = workbook.Sheets[workbook.SheetNames[0]];   // First sheet
    // Convert sheet data to JSON (array of objects)
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    res.json(jsonData);  // Send JSON to frontend
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read Excel file' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
