from fastapi import FastAPI, Query
from pathlib import Path
import pandas as pd
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from frontend (Vite default: http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # you can replace "*" with ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["http://localhost:5173"],
    allow_headers=["http://localhost:5173"],
)


DATA_FILE = Path(__file__).resolve().parents[1] / "data" / "dump.csv"

df = pd.read_csv(DATA_FILE)

df["index_date"] = pd.to_datetime(df["index_date"], format="mixed", dayfirst=True, errors="coerce")
df = df.dropna(subset=["index_date"])

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/indices")
async def get_indices():
    
    indices = sorted(df["index_name"].unique().tolist())
    return {"indices": indices}

@app.get("/history")
async def get_history(
    index_name: str = Query(..., description="Exact name of the index"),
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    try:
        # Normalize both sides to avoid case/space mismatches
        filtered = df[df["index_name"].str.strip().str.lower() == index_name.strip().lower()]

        if start_date:
            filtered = filtered[filtered["index_date"] >= pd.to_datetime(start_date)]
        if end_date:
            filtered = filtered[filtered["index_date"] <= pd.to_datetime(end_date)]

        if filtered.empty:
            return {"data": [], "message": "No data found for this index and date range"}

        filtered = filtered.sort_values("index_date")
        return {"data": filtered.to_dict(orient="records")}
    
    except Exception as e:
        return {"error": str(e)}
