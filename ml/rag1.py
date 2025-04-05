import os
import pandas as pd
import json
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
import warnings

# Load environment variables and suppress warnings

warnings.filterwarnings("ignore")
gemini_api_key = "AIzaSyB12_mkVK_TxKKgZASe0ov0jeurJ3nuKf0"

# Initialize Google Generative AI Embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001", 
    google_api_key=gemini_api_key
)

# Constants
FAISS_INDEX_PATH = "transaction_faiss_index"

# Sample transaction data
json_data = [
    {
        "Price": 450,
        "Qty_": 10,
        "Sub_Total": 4500,
        "Discount": 1500,
        "Tax": 225,
        "Final_Total": 3225,
        "Non_Taxable": 0,
        "CGST_Rate": 2.5,
        "CGST_Amount": 112.5,
        "SGST_Rate": 2.5,
        "SGST_Amount": 112.5,
        "VAT_Rate": 0,
        "VAT_Amount": 0,
        "Service_Charge_Rate": 0,
        "Service_Charge_Amount": 0,
        "amount_from": "Wallet",
        "amount_to": "Restaurant",
        "modified_by": "AdminUser12",
        "modify_comment": "High discount applied due to festive offer",
        "electron_pos": "POS_03",
        "Payment_Type": "Online",
        "Order_Type": "Delivery",
        "Area": "Mumbai",
        "Status": "Completed",
        "Server_Name": "Ravi",
        "Assign_To": "DeliveryPartnerX",
        "Aggregator_Discount_z": 1000,
        "Outlet_Discount_z": 500,
        "Aggregator_Discount_s": 0,
        "Outlet_Discount_s": 0,
        "Covers": 2,
        "Timestamp": "2025-04-05T12:30:00",
        "Invoice_No_": "INV123456",
        "Name": "John Doe",
        "bill_no": "BILL987654",
        "Zomato_delivery_time": 45,
        "Swiggy_delivery_time": 40,
        "assigned_to": "DeliveryPartnerX",
        "severity": "High",
    },
    # Add more transactions here as needed
]

# Prompt templates for Gemini models
DETAILED_DESCRIPTION_PROMPT = """
You are an expert anomaly detection and forensic analyst specialized in analyzing sales transaction data for fraud detection and anomaly classification.

Given the following transaction record:

{context}

Your task is to carefully analyze this record and provide the following output:

Detailed_Description:
(Write a detailed descriptive explanation of why this record is anomalous — refer to specific fields and values)

### Guidelines:
- Be logical and analytical in your response.
- Refer to the field names and their values from the given context.
- Output must be structured and well explained.
- Do not assume data not present in the context.

Provide your output strictly in the following format:
Detailed_Description:
<Generated Detailed Explanation based on context>
"""

ONE_LINE_SUMMARY_PROMPT = """
You are an expert anomaly detection and forensic analyst specialized in analyzing sales transaction data for fraud detection and anomaly classification.

Given the following transaction record:

{context}

Your task is to carefully analyze this record and provide the following output:

Crux_Summary:
(Write a 1-2 line concise summary describing the anomaly)

### Guidelines:
- Be logical and analytical in your response.
- Refer to the field names and their values from the given context.
- Crux_Summary should be concise and business friendly.

Provide your output strictly in the following format:
Crux_Summary:
<One or Two Line Summary capturing the main anomaly insight>
"""

ANOMALY_TYPE_PROMPT = """
You are an expert anomaly detection and forensic analyst specialized in analyzing sales transaction data for fraud detection and anomaly classification.

Given the following transaction record:

{context}

Your task is to carefully analyze this record and provide the following output:

Anomaly_Type:
(Generate relevant anomaly type(s) or tags — can be multiple, comma separated)

### Anomaly Types to Consider (but not limited to):
- Price Anomaly
- Discount Fraud
- Tax Manipulation
- Data Entry Error
- Revenue Leakage
- Delivery Time Manipulation
- Suspicious Manual Modification
- Abnormal Payment Type Usage
- Service Charge Anomaly
- Invoice Calculation Error
- Order Time Anomaly
- Suspicious Discount Application

### Guidelines:
- Be logical and analytical in your response.
- Refer to the field names and their values from the given context.
- If multiple anomaly types exist, list them all.

Provide your output strictly in the following format:
Anomaly_Type:
<Generated Anomaly Type(s)>
"""

QA_PROMPT_TEMPLATE = """
You are a specialized banking and financial services assistant. Your primary role is to provide accurate, clear, and helpful information about banking principles, financial services, and forex trading.

Context:
{context}

Question:
{question}

Instructions:
1. Respond with precise, factual information directly addressing the question.
2. Use simple, accessible language while maintaining technical accuracy.
3. If the exact answer isn't in the context, respond with "The information requested is not available in the provided context."
4. For numerical data, present information in a structured format when appropriate.
5. If the question is ambiguous, briefly note the ambiguity before answering the most likely interpretation.
6. Do not speculate or provide information beyond what's in the context.
7. If the question requests financial advice that would typically require personalized assessment, note the limitations of general information.

Answer:
"""
#abcd
# Function to get detailed description using Gemini
def get_detailed_description(transaction_json):
    """Get detailed description for a transaction using Gemini"""
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_key)
    prompt = PromptTemplate(template=DETAILED_DESCRIPTION_PROMPT, input_variables=["context"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    
    # Convert transaction to string format for context
    context = json.dumps(transaction_json, indent=2)
    
    # Get response
    response = chain({"input_documents": [], "context": context}, return_only_outputs=True)
    
    # Extract just the description text (remove the "Detailed_Description:" prefix)
    description_text = response["output_text"]
    if "Detailed_Description:" in description_text:
        description_text = description_text.split("Detailed_Description:", 1)[1].strip()
    
    return description_text

# Function to get one-line summary using Gemini
def get_one_line_summary(transaction_json):
    """Get one-line summary for a transaction using Gemini"""
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_key)
    prompt = PromptTemplate(template=ONE_LINE_SUMMARY_PROMPT, input_variables=["context"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    
    # Convert transaction to string format for context
    context = json.dumps(transaction_json, indent=2)
    
    # Get response
    response = chain({"input_documents": [], "context": context}, return_only_outputs=True)
    
    # Extract just the summary text (remove the "Crux_Summary:" prefix)
    summary_text = response["output_text"]
    if "Crux_Summary:" in summary_text:
        summary_text = summary_text.split("Crux_Summary:", 1)[1].strip()
    
    return summary_text

# Function to get anomaly types using Gemini
def get_anomaly_types(transaction_json):
    """Get anomaly types for a transaction using Gemini"""
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_key)
    prompt = PromptTemplate(template=ANOMALY_TYPE_PROMPT, input_variables=["context"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    
    # Convert transaction to string format for context
    context = json.dumps(transaction_json, indent=2)
    
    # Get response
    response = chain({"input_documents": [], "context": context}, return_only_outputs=True)
    
    # Extract just the anomaly types (remove the "Anomaly_Type:" prefix)
    anomaly_text = response["output_text"]
    if "Anomaly_Type:" in anomaly_text:
        anomaly_text = anomaly_text.split("Anomaly_Type:", 1)[1].strip()
        
    # Convert comma-separated string to list if needed
    if isinstance(anomaly_text, str):
        anomaly_list = [item.strip() for item in anomaly_text.split(",")]
        return anomaly_list
    
    return anomaly_text

# Process transactions with Gemini and prepare for FAISS
def process_transactions_with_gemini(transactions):
    """Process transactions with Gemini to get descriptions and anomaly types"""
    enriched_transactions = []
    
    print("Processing transactions with Gemini...")
    for i, transaction in enumerate(transactions):
        print(f"Processing transaction {i+1}/{len(transactions)}...")
        
        # Create a copy of the transaction
        enriched_transaction = transaction.copy()
        
        # Add row ID for reference
        enriched_transaction['row_id'] = i
        
        # Get detailed description
        enriched_transaction['detailed_description'] = get_detailed_description(transaction)
        
        # Get one-line summary
        enriched_transaction['crux_summary'] = get_one_line_summary(transaction)
        
        # Get anomaly types
        if 'anomaly_tags' not in transaction:  # Only generate if not already present
            enriched_transaction['anomaly_tags'] = get_anomaly_types(transaction)
        
        enriched_transactions.append(enriched_transaction)
    
    return enriched_transactions

# Build FAISS vector database
def build_faiss_db(enriched_transactions):
    """Build FAISS vector database from enriched transactions"""
    documents = []
    
    print("Building FAISS vector database...")
    for transaction in enriched_transactions:
        # Create combined text for better search
        combined_text = (
            f"Transaction ID: {transaction['row_id']}\n"
            f"Raw Data: {json.dumps(transaction)}\n"
            f"Summary: {transaction.get('crux_summary', '')}\n"
            f"Description: {transaction.get('detailed_description', '')}\n"
            f"Anomaly Tags: {', '.join(transaction.get('anomaly_tags', []))}"
        )
        
        # Store the document with metadata
        doc = Document(
            page_content=combined_text,
            metadata={
                "row_id": transaction['row_id'],
                "transaction": transaction
            }
        )
        documents.append(doc)
    
    # Create and save the vector store
    vector_store = FAISS.from_documents(documents, embeddings)
    vector_store.save_local(FAISS_INDEX_PATH)
    print(f"FAISS DB saved successfully to {FAISS_INDEX_PATH}!")
    
    return vector_store

# Load FAISS vector database
def load_faiss_db():
    """Load FAISS vector database from disk"""
    if os.path.exists(FAISS_INDEX_PATH):
        vector_store = FAISS.load_local(FAISS_INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
        print("FAISS DB loaded successfully!")
        return vector_store
    else:
        print("FAISS DB not found. Building it...")
        enriched_transactions = process_transactions_with_gemini(json_data)
        return build_faiss_db(enriched_transactions)

# RAG search function
def rag_search(query):
    """Perform RAG search using the query"""
    # Load or build FAISS DB
    vector_store = load_faiss_db()
    
    # Retrieve relevant documents
    docs = vector_store.similarity_search(query, k=3)
    
    # Extract context from documents
    combined_context = "\n\n---\n\n".join([doc.page_content for doc in docs])
    
    # Generate response using QA chain
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=gemini_api_key)
    prompt = PromptTemplate(template=QA_PROMPT_TEMPLATE, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    
    response = chain(
    {"input_documents": [], "context": combined_context, "question": query},
    return_only_outputs=True
)

    
    return response["output_text"]

# Flask application
app = Flask(__name__)

@app.route("/ask", methods=["POST"])
def ask():
    """API endpoint to ask questions about transaction data"""
    try:
        # Get request data
        data = request.get_json()
        question = data.get("question", "")
        
        if not question:
            return jsonify({"error": "No question provided"}), 400
        
        # Perform RAG search
        answer = rag_search(question)
        
        return jsonify({
            "question": question,
            "answer": answer
        }), 200
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/process", methods=["POST"])
def process():
    """API endpoint to process new transactions"""
    try:
        # Get request data
        data = request.get_json()
        transactions = data.get("transactions", [])
        
        if not transactions:
            return jsonify({"error": "No transactions provided"}), 400
        
        # Process transactions with Gemini
        enriched_transactions = process_transactions_with_gemini(transactions)
        
        # Build or update FAISS DB
        vector_store = build_faiss_db(enriched_transactions)
        
        return jsonify({
            "message": "Transactions processed and stored successfully",
            "transaction_count": len(enriched_transactions)
        }), 200
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# Main execution
if __name__ == "__main__":
    # Process sample data and build FAISS DB
    print("Starting processing of sample data...")
    enriched_transactions = process_transactions_with_gemini(json_data)
    vector_store = build_faiss_db(enriched_transactions)
    print(rag_search("What is the area ?"))
    
    # # Export enriched data to CSV
    # df = pd.DataFrame(enriched_transactions)
    # df.to_csv("enriched_transactions.csv", index=False)
    # print("Enriched transactions exported to CSV ✅")
    
    # Start Flask app
    print("Starting Flask server...")
    app.run(debug=True)