import React from "react";
import "./DataTable.css";

const DataTable = ({ data }) => {
  const avgCount = data.reduce((sum, row) => sum + row.count, 0) / data.length;
  const avgAmount =
    data.reduce((sum, row) => sum + row.amount, 0) / data.length;
  const avgTotal = data.reduce((sum, row) => sum + row.total, 0) / data.length;
  const avgPrice = data.reduce((sum, row) => sum + row.price, 0) / data.length;

  const maxCount = Math.max(...data.map((row) => row.count), avgCount);
  const maxAmount = Math.max(...data.map((row) => row.amount), avgAmount);
  const maxTotal = Math.max(...data.map((row) => row.total), avgTotal);
  const maxPrice = Math.max(...data.map((row) => row.price), avgPrice);

  const getBarStyle = (value, max) => ({
    height: `${(value / max) * 100}%`,
    width: "50%",
    backgroundColor: "rgba(0, 128, 0, 0.8)",
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 0,
  });

  return (
    <div className="data-table-container">
      <div className="header-row">
        <div className="header">Count</div>
        <div className="header">Amount</div>
        <div className="header">Total</div>
        <div className="header">Price</div>
      </div>
      <div className="data-row-container">
        <div className="column">
          {data.map((row, index) => (
            <div key={index} className="cell">
              <span className="value">{row.count}</span>
            </div>
          ))}
          <div className="bar-background">
            <div className="bar" style={getBarStyle(avgCount, maxCount)}></div>
          </div>
        </div>
        <div className="column">
          {data.map((row, index) => (
            <div key={index} className="cell">
              <span className="value">{row.amount}</span>
            </div>
          ))}
          <div className="bar-background">
            <div
              className="bar"
              style={getBarStyle(avgAmount, maxAmount)}
            ></div>
          </div>
        </div>
        <div className="column">
          {data.map((row, index) => (
            <div key={index} className="cell">
              <span className="value">{row.total}</span>
            </div>
          ))}
          <div className="bar-background">
            <div className="bar" style={getBarStyle(avgTotal, maxTotal)}></div>
          </div>
        </div>
        <div className="column">
          {data.map((row, index) => (
            <div key={index} className="cell">
              <span className="value">{row.price}</span>
            </div>
          ))}
          <div className="bar-background">
            <div className="bar" style={getBarStyle(avgPrice, maxPrice)}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
