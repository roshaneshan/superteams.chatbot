import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import sqlite3
import requests
import logging

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
assert GROQ_API_KEY, "GROQ_API_KEY not found in .env!"

# Logger config
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(message)s")

# FastAPI app
app = FastAPI()

# CORS middleware to allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for dev); restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class QueryRequest(BaseModel):
    question: str

# LLM SQL generator function (uses Groq API)
def ask_groq_llm(question: str) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-70b-8192",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an expert SQL generator for a database with table 'customers' "
                    "and columns: customer_id (integer), name (text), gender (text), location (text). "
                    "ALWAYS reply with only the SQL query, nothing else. "
                    "ALWAYS use LOWER(column) = LOWER(value) for all string comparisons in WHERE clauses."
                )
            },
            {"role": "user", "content": question}
        ]
    }
    url = "https://api.groq.com/openai/v1/chat/completions"
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    sql = response.json()['choices'][0]['message']['content']
    logging.info(f"User Q: {question} | Generated SQL: {sql}")
    return sql.strip()

# POST endpoint for chatbot queries
@app.post("/query")
def query_db(req: QueryRequest):
    user_question = req.question
    try:
        # Get SQL from LLM
        sql_query = ask_groq_llm(user_question)
        logging.info(f"Executing SQL: {sql_query}")

        # Run SQL on DB
        conn = sqlite3.connect('customers.db')
        c = conn.cursor()
        c.execute(sql_query)
        rows = c.fetchall()
        columns = [col[0] for col in c.description] if c.description else []
        results = [dict(zip(columns, row)) for row in rows]
        conn.close()
        return {"sql": sql_query, "results": results}
    except Exception as e:
        logging.error(f"Error: {str(e)} | Q: {user_question}")
        return {"error": str(e), "sql_attempted": locals().get('sql_query', None)}

# Simple root endpoint
@app.get("/")
def root():
    return {"msg": "LLM-powered SQL chatbot backend running!"}
