# LLM-Powered SQL Chatbot

A simple chatbot app using FastAPI, ReactJS, and a Groq-hosted LLM (Llama 3.1 / Mistral-7B) to answer user queries by generating and running SQL on a customer database.

---

## 💻 Tech Stack

- **Backend:** FastAPI (Python)
- **Database:** SQLite3 (can switch to PostgreSQL easily)
- **Frontend:** ReactJS
- **LLM Endpoint:** Groq (Llama 3.1 / Mistral-7B)

---

## 🏗️ Features

- Accepts natural language queries (e.g., *Show me all female customers from Mumbai*).
- Sends the query to Groq LLM for SQL generation.
- Executes SQL on a real database and returns results.
- Displays results on a clean React frontend.
- **Bonus:** Query & SQL logging, error handling, API key in `.env`.

---

## 📝 Database Schema

| Field        | Type | Description     |
| ------------ | ---- | -------------- |
| customer_id  | INT  | Primary Key    |
| name         | TEXT | Customer name  |
| gender       | TEXT | Gender (M/F)   |
| location     | TEXT | City/Location  |

Sample data is pre-seeded with 5+ customers.

---

## ⚡ Quick Start

### 1. Clone the Repo

```bash
git clone https://github.com/roshaneshan/superteams.chatbot.git
cd superteams.ai
2. Backend Setup (FastAPI)
Create & Activate a virtualenv (optional):

 
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
Install dependencies:

 
pip install -r requirements.txt
Add your Groq API key:
Copy .env.example to .env and add your key:

 
GROQ_API_KEY=your_key_here
Run database seed script:

 
python seed_db.py
Run FastAPI backend:

 
uvicorn main:app --reload
3. Frontend Setup (React)
 
cd frontend
npm install
npm start
4. Usage
Open the frontend in your browser (localhost:3000).

Type queries like “List all customers”, “Show all female customers from Mumbai”, etc.

See results instantly!

🛡️ Bonus Features
Logging of incoming queries and LLM-generated SQL for debugging.

Graceful error messages for invalid queries.

Uses .env for all keys/config (never hard-coded).

[Optional] Simple bearer token for API security (see code comments).

🔧 API Example (if no frontend)
POST /query

 
{
  "question": "Show me all customers from Mumbai"
}
Returns:

 
{
  "results": [
    {"customer_id": 1, "name": "Ananya Sharma", "gender": "Female", "location": "Mumbai"},
    ...
  ]
}
📦 Project Structure
 
superteams.ai/
├── main.py          # FastAPI backend
├── seed_db.py       # DB schema + sample data
├── requirements.txt
├── .env.example
├── frontend/        # React frontend
│   └── src/
└── README.md
🙌 Credits
Built by Roshan.
Groq LLM API used for SQL generation.

📬 Contact
Questions?
roshaneshan20@gmail.com