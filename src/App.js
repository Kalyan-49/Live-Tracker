import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import "./DataChart.css";

const exampleData = Array.from({ length: 20 }, (_, index) => ({
  count: Math.floor(Math.random() * 10),
  total: Math.floor(Math.random() * 100),
  amount: (Math.random() * 1000).toFixed(2),
  price: (Math.random() * 10000).toFixed(2),
}));

function App() {
  const [data, setData] = useState(exampleData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        return prevData.map((row) => ({
          count: Math.floor(Math.random() * 10),
          total: Math.floor(Math.random() * 100),
          amount: (Math.random() * 1000).toFixed(2),
          price: (Math.random() * 10000).toFixed(2),
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="App"
      style={{ position: "relative", width: "100%", height: "500px" }}
    >
      <div className="data-table-container">
        <DataTable data={data} />
      </div>
    </div>
  );
}

export default App;
