const express = require('express');
const xlsx = require('xlsx');
const app = express();
const PORT = 5000;

// Helper: Convert Excel serial date to JS date string
function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // seconds
  const date_info = new Date(utc_value * 1000);

  // Add fractional day (time)
  const fractional_day = serial - Math.floor(serial);
  const total_seconds = Math.floor(86400 * fractional_day);
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor((total_seconds % 3600) / 60);
  const seconds = total_seconds % 60;

  date_info.setHours(hours, minutes, seconds);
  return date_info.toISOString(); // Or use toLocaleString()
}

app.get('/api/data', (req, res) => {
  const workbook = xlsx.readFile('Smart Daily Check Sheet Machine_INDOOR 1.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  // Convert date fields manually
  const processedData = jsonData.map(row => {
    if (typeof row.Date === 'number') {
      row.Date = excelDateToJSDate(row.Date); // Convert
    }
    return row;
  });

  res.json(processedData);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
