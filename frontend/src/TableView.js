import React from 'react';

function TableView({ data }) {
  if (!data.length) return <p>Loading table...</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="mb-4">
      <h4>Data Table</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map(header => {
                let cellValue = row[header];

                // Format Start time and Completion time as readable date-time
                if (header === 'Start time' || header === 'Completion time') {
                  if (cellValue) {
                    const date = new Date(cellValue);
                    // Check for valid date
                    if (!isNaN(date)) {
                      cellValue = date.toLocaleString();
                    }
                  }
                }

                return <td key={header}>{cellValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
