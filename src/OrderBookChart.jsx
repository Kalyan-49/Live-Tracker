import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./OrderBookChart.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderBookChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Count",
        data: [],
        borderColor: "rgba(0, 255, 0, 0.6)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Amount",
        data: [],
        borderColor: "rgba(0, 255, 0, 0.4)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Total",
        data: [],
        borderColor: "rgba(0, 255, 0, 0.2)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Price",
        data: [],
        borderColor: "rgba(0, 255, 0, 0.1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map((_, index) => `Row ${index + 1}`);
      const counts = data.map((row) => row.count);
      const amounts = data.map((row) => row.amount);
      const totals = data.map((row) => row.total);
      const prices = data.map((row) => row.price);

      setChartData({
        labels,
        datasets: [
          {
            label: "Count",
            data: counts,
            borderColor: "rgba(0, 255, 0, 0.6)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Amount",
            data: amounts,
            borderColor: "rgba(0, 255, 0, 0.4)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Total",
            data: totals,
            borderColor: "rgba(0, 255, 0, 0.2)",
            borderWidth: 2,
            fill: false,
          },
          {
            label: "Price",
            data: prices,
            borderColor: "rgba(0, 255, 0, 0.1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      });
    }
  }, [data]);

  // Calculate maximum values for each column
  const maxCount = Math.max(...data.map((row) => row.count), 1);
  const maxTotal = Math.max(...data.map((row) => row.total), 1);
  const maxAmount = Math.max(...data.map((row) => row.amount), 1);
  const maxPrice = Math.max(...data.map((row) => row.price), 1);

  const getBarStyle = (value, max, color) => ({
    height: `${(value / max) * 100}%`,
    width: "100%",
    backgroundColor: color,
    borderRadius: "5px",
    transition: "height 0.3s ease",
  });

  return (
    <div className="order-book-chart">
      <table className="data-table">
        <thead>
          <tr>
            <th>Count</th>
            <th>Total</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={getBarStyle(
                      row.count,
                      maxCount,
                      "rgba(0, 255, 0, 0.6)"
                    )}
                  ></div>
                </div>
                {row.count}
              </td>
              <td>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={getBarStyle(
                      row.total,
                      maxTotal,
                      "rgba(0, 255, 0, 0.4)"
                    )}
                  ></div>
                </div>
                {row.total}
              </td>
              <td>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={getBarStyle(
                      row.amount,
                      maxAmount,
                      "rgba(0, 255, 0, 0.2)"
                    )}
                  ></div>
                </div>
                {row.amount}
              </td>
              <td>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={getBarStyle(
                      row.price,
                      maxPrice,
                      "rgba(0, 255, 0, 0.1)"
                    )}
                  ></div>
                </div>
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-container">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
  );
};

export default OrderBookChart;
