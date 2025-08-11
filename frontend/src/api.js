import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const getIndices = async () => {
    const res = await axios.get(`${API_BASE}/indices`);
    return res.data.indices;
}

export const getHistory = async (indexName, startDate, endDate) => {
    let url = `${API_BASE}/history?index_name=${encodeURIComponent(indexName)}`;
    if (startDate) url += `&start_date=${startDate}`;
    if (endDate) url += `&end_date=${endDate}`;
    const res = await axios.get(url);
    return res.data.data;
}