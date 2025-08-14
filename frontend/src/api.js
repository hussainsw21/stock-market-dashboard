import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

// Get all index names
export async function getIndices() {
  const res = await axios.get(`${API_BASE}/indices`);
  return res.data.indices;
}

// Get historical data
export async function getHistory(indexName, startDate, endDate) {
  const params = { index_name: indexName };
  if (startDate) params.start_date = startDate;
  if (endDate) params.end_date = endDate;

  const res = await axios.get(`${API_BASE}/history`, { params });
  return res.data.data || [];
}

// Get predictions for the given index
export async function getPredictions(indexName, days = 7) {
  try {
    const res = await axios.get(`${API_BASE}/predict`, {
      params: { index_name: indexName, days: days }
    });
    return res.data.predictions || [];
  } catch (error) {
    console.error("Prediction API error:", error);
    return [];
  }
}
