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
              {headers.map(header => <td key={header}>{row[header]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
