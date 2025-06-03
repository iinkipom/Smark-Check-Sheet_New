import React from 'react';

function TableView({ data }) {
  if (!data.length) return <p>Loading table...</p>;

  // Get all unique headers from all rows
  const headers = Array.from(
    new Set(data.flatMap(row => Object.keys(row)))
  );

  // Excel serial to JS date-time string
  const convertExcelDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial);
    const total_seconds = Math.floor(86400 * fractional_day);
    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds % 3600) / 60);
    const seconds = total_seconds % 60;

    date_info.setHours(hours, minutes, seconds);
    return date_info.toLocaleString();
  };

  return (
    <div className="mb-4">
      <h4>Data Table</h4>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table className="table table-bordered table-striped table-sm">
          <thead>
            <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {headers.map(header => {
                  let value = row[header] ?? ''; // Use empty string if field doesn't exist
                  if (
                    (header === 'Start time' || header === 'Completion time') &&
                    typeof value === 'number'
                  ) {
                    value = convertExcelDate(value);
                  }
                  return <td key={header}>{value}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableView;
