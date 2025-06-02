import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableView from './TableView';
import GraphView from './GraphView';



function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://smark-check-sheet-new-1.onrender.com/api/data')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>
      <TableView data={data} />
      <GraphView data={data} />
    </div>
  );
}


export default App;
