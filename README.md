# 📊 Stock Market Dashboard with AI/ML Predictions

This project is a **full-stack stock market dashboard** built with **React.js (frontend)** and **FastAPI (backend)**, featuring **AI/ML-powered stock predictions**.  
It allows users to select stock indices, view historical trends, and predict future values using machine learning.

---

## 🚀 Features
- **Interactive stock charts** for:
  - Closing Value 📉
  - % Change 📊
  - PE Ratio 📈
- **ML Predictions** using Linear Regression
  - Predicts future Closing Value for selected index
  - Displays predictions alongside historical data
- **Date range filter** for custom analysis
- **Responsive UI** built with Tailwind CSS
- **Backend powered by FastAPI** with CORS support
- **Sample dataset** included for offline testing
- **Footer with copyright**
  - Developed and Maintained by Hussain Shajapur Wala

---

## 🛠️ Technologies Used

### Frontend
- React.js
- Chart.js
- Tailwind CSS
- Axios

### Backend
- FastAPI
- Pandas
- Scikit-learn (ML Predictions)
- Uvicorn

---

## 📂 Project Structure
stock-market-dashboard/
│
├── backend/
│ ├── main.py # FastAPI server + ML integration
│ ├── data/dump.csv # Sample dataset
│ └── requirements.txt # Backend dependencies
│
├── frontend/
│ ├── src/App.jsx # Main React component
│ ├── src/api.js # API calls to backend
│ └── tailwind.config.js
│
└── README.md

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/hussainsw21/stock-market-dashboard.git
cd stock-market-dashboard

### 2️⃣ Setup Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend will run on: http://127.0.0.1:8000

### 3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev

Frontend will run on http://localhost:5173

### 📊 API Endpoints
Method	Endpoint	Description
GET	    /health	  Health check
GET	    /indices	Get list of all stock indices
GET	    /history	Get historical data for a given index
GET	    /predict	Get ML predictions for given index

## 🧠 ML Model
Algorithm: Linear Regression (Scikit-learn)
Training: Uses historical closing_index_value
Output: Future predictions for given number of days

##📌 Challenges Faced
Handling date formats and ensuring correct filtering
Managing CORS errors between frontend & backend
Aligning prediction data with chart rendering

##📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bf3b05d6-39f0-43bc-8a8b-623de5c021bc" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/904a71dd-9f6d-4e3e-bccf-95c116852915" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c6392546-ed5e-43b4-854c-cad659eb253a" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/198b3e91-3632-4947-9ce6-9533f4c2853c" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6c16eb9f-6e27-468c-96c3-f5d800bc6973" />


### 📜 License
This project is for educational purposes only.

© Developed and Maintained by Hussain Shajapur Wala
