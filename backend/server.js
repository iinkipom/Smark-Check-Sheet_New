const express = require('express');
const xlsx = require('xlsx');
const app = express();
const PORT = 5000;

function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial);
  const total_seconds = Math.floor(86400 * fractional_day);
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor((total_seconds % 3600) / 60);
  const seconds = total_seconds % 60;

  date_info.setHours(hours, minutes, seconds);
  return date_info.toISOString(); // or use toLocaleString()
}

let processedData = [];

try {
  // ✅ Ensure correct filename spelling and case (case-sensitive on Render)
  const workbook = xlsx.readFile('Smart Daily Check Sheet Machine_INDOOR 1.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  processedData = jsonData.map(row => {
    if (typeof row['Start time'] === 'number') {
      row['Start time'] = excelDateToJSDate(row['Start time']);
    }
    if (typeof row['Completion time'] === 'number') {
      row['Completion time'] = excelDateToJSDate(row['Completion time']);
    }
    return row;
  });

  console.log(`✅ Loaded ${processedData.length} rows from Excel.`);
} catch (error) {
  console.error('❌ Error loading Excel file:', error.message);
}

app.get('/api/data', (req, res) => {
  if (!processedData.length) {
    return res.status(500).json({ error: 'Failed to load Excel data.' });
  }
  res.json(processedData);
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
