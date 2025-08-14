import { useEffect, useState } from "react";
import { getIndices, getHistory, getPredictions } from "./api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Chart styling & formatting options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#fff",
        font: { size: 14 }
      }
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          return format(new Date(tooltipItems[0].label), "dd MMM yyyy");
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: "#ccc",
        callback: function (val, index) {
          const date = this.getLabelForValue(val);
          return format(new Date(date), "MMM yyyy");
        }
      },
      grid: { color: "rgba(255,255,255,0.1)" }
    },
    y: {
      ticks: { color: "#ccc" },
      grid: { color: "rgba(255,255,255,0.1)" }
    }
  },
  animation: {
    duration: 1000,
    easing: "easeInOutQuart"
  }
};

function App() {
  const [indices, setIndices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    getIndices().then(setIndices);
  }, []);

  const fetchHistory = () => {
    if (!selectedIndex) return;
    setLoading(true);
    setNoData(false);

    Promise.all([
      getHistory(selectedIndex, startDate, endDate),
      getPredictions(selectedIndex, 7) // Predict 7 days ahead
    ])
      .then(([history, predictions]) => {
        setHistoryData(history);
        setPredictionData(predictions || []);
        if (history.length === 0) {
          setNoData(true);
        }
      })
      .catch(() => {
        setNoData(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        Stock Market Dashboard 🚀✨
      </h1>

      {/* Controls */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <label className="block mb-1">Select Index:</label>
          <select
            value={selectedIndex}
            onChange={e => setSelectedIndex(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="">-- Select --</option>
            {indices.map((name, idx) => (
              <option key={idx} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>
        </div>

        <button
          onClick={fetchHistory}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded"
        >
          Load Data
        </button>
      </div>

      {/* Loading & No Data */}
      {loading && <p className="text-yellow-400">Loading...</p>}
      {noData && !loading && <p className="text-red-400">No data found for the selected index/date range.</p>}

      {/* Charts */}
      {historyData.length > 0 && !loading && (
        <div className="space-y-12">
          {/* Closing Value with Predictions */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Closing Value (with Predictions)</h3>
            <Line
              data={{
                labels: [
                  ...historyData.map(row => row.index_date),
                  ...predictionData.map(row => row.index_date)
                ],
                datasets: [
                  {
                    label: "Closing Value",
                    data: historyData.map(row => row.closing_index_value),
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.4)",
                    tension: 0.2
                  },
                  {
                    label: "Predicted Close",
                    data: [
                      ...new Array(historyData.length - 1).fill(null),
                      historyData.length > 0
                        ? historyData[historyData.length - 1].closing_index_value
                        : null,
                      ...predictionData.map(p => p.predicted_close)
                    ],
                    borderColor: "rgb(255, 99, 132)",
                    borderDash: [5, 5],
                    backgroundColor: "rgba(255, 99, 132, 0.4)",
                    tension: 0.2
                  }
                ]
              }}
              options={chartOptions}
            />
          </div>

          {/* % Change */}
          <div>
            <h3 className="text-xl font-semibold mb-2">% Change</h3>
            <Line
              data={{
                labels: historyData.map(row => row.index_date),
                datasets: [
                  {
                    label: "% Change",
                    data: historyData.map(row => row.change_percent),
                    borderColor: "rgb(255, 159, 64)",
                    backgroundColor: "rgba(255, 159, 64, 0.4)",
                    tension: 0.2
                  }
                ]
              }}
              options={chartOptions}
            />
          </div>

          {/* PE Ratio */}
          <div>
            <h3 className="text-xl font-semibold mb-2">PE Ratio</h3>
            <Line
              data={{
                labels: historyData.map(row => row.index_date),
                datasets: [
                  {
                    label: "PE Ratio",
                    data: historyData.map(row => row.pe_ratio),
                    borderColor: "rgb(153, 102, 255)",
                    backgroundColor: "rgba(153, 102, 255, 0.4)",
                    tension: 0.2
                  }
                ]
              }}
              options={chartOptions}
            />
          </div>
        </div>
      )}
      {/* Horizontal line */}
      <hr className="border-gray-700 mt-12" />

      {/* Footer */}
      <footer className="mt-4 text-sm text-gray-500 text-center">
        Powered by FastAPI, React, and Machine Learning  
        <br />© {new Date().getFullYear()} Developed and Maintained by Hussain Shajapur Wala
      </footer>

    </div>
  );
}

export default App;
