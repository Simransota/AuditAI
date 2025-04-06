import os
import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.docstore.document import Document
import warnings

# Set up basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Suppress warnings
warnings.filterwarnings("ignore")

# API key
gemini_api_key = "AIzaSyB12_mkVK_TxKKgZASe0ov0jeurJ3nuKf0"

# Constants
FAISS_INDEX_PATH = "transaction_faiss_index"

# Function to load JSON data from file
def load_json_data(file_path):
    """Load transaction data from a JSON file."""
    try:
        if not os.path.exists(file_path):
            logger.error(f"File not found: {file_path}")
            return []
            
        with open(file_path, 'r') as file:
            data = json.load(file)
            logger.info(f"Successfully loaded {len(data)} transactions from {file_path}")
            return data
    except json.JSONDecodeError:
        logger.error(f"Invalid JSON format in file: {file_path}")
        return []
    except Exception as e:
        logger.error(f"Error loading data from {file_path}: {str(e)}")
        return []

# Load your JSON data
json_data = load_json_data("datasets/anomaly_analysis_output1.json")

# Fallback to sample data if file loading fails
if not json_data:
    logger.warning("Using sample data as fallback")
    json_data = [
        {
            "row_id": 1,
            "Invoice_No": "INV001",
            "crux_summary": "Unusually high discount ratio of 33% that exceeds policy limits",
            "severity": "High",
            "Price": 450,
            "Discount": 150,
            "Final_Total": 300,
            "Area": "Mumbai"
        },
        {
            "row_id": 2,
            "Invoice_No": "INV002", 
            "crux_summary": "Tax calculation error resulting in 5% underpayment",
            "severity": "Medium",
            "Price": 200,
            "Discount": 20,
            "Final_Total": 180,
            "Area": "Delhi"
        }
    ]

# QA prompt template
QA_PROMPT_TEMPLATE = """
You are an expert anomaly detection and forensic analyst specialized in analyzing sales transaction data for fraud detection and anomaly classification.
Context:
{context}

Question:
{question}

Instructions:
    • Analyze the provided context to detect any anomalies or unusual patterns.
    • Examine relationships between data points to understand underlying connections.
    • Address the question by providing a detailed explanation of any identified anomalies.
    • Clearly articulate the reasoning behind why these anomalies occur, considering factors such as data distributions, correlations, and external influences.
    • If applicable, suggest potential implications or actions to address the anomalies.
Answer:
"""

# Build FAISS vector database
def build_faiss_db():
    """Build FAISS vector database from the global json_data"""
    try:
        # Initialize embeddings
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", 
            google_api_key=gemini_api_key,
        )
        
        documents = []
        logger.info("Building FAISS vector database...")
        
        for transaction in json_data:
            # Create combined text for better search
            combined_text = json.dumps(transaction)
            
            # Store the document with metadata
            doc = Document(
                page_content=combined_text,
                metadata={"transaction": transaction}
            )
            documents.append(doc)
        
        # Create and save the vector store
        vector_store = FAISS.from_documents(documents, embeddings)
        vector_store.save_local(FAISS_INDEX_PATH)
        logger.info(f"FAISS DB saved successfully to {FAISS_INDEX_PATH}!")
        
        return vector_store
    except Exception as e:
        logger.error(f"Error building FAISS DB: {str(e)}")
        return None

# Load or build FAISS vector database
def get_vector_store():
    """Load FAISS vector database from disk or build if not found"""
    try:
        # Initialize embeddings
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001", 
            google_api_key=gemini_api_key,
        )
        
        if os.path.exists(FAISS_INDEX_PATH):
            vector_store = FAISS.load_local(FAISS_INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
            logger.info("FAISS DB loaded successfully!")
            return vector_store
        else:
            logger.info("FAISS DB not found. Building it...")
            return build_faiss_db()
    except Exception as e:
        logger.error(f"Error loading or building FAISS DB: {str(e)}")
        return None

# RAG search function
def rag_search(query):
    """Perform RAG search using the query"""
    try:
        # Get vector store
        vector_store = get_vector_store()
        if not vector_store:
            return "Error: Could not initialize search index."
        
        # Retrieve relevant documents
        docs = vector_store.similarity_search(query, k=3)
        
        # Extract context from documents
        combined_context = "\n\n---\n\n".join([doc.page_content for doc in docs])
        
        # Generate response using QA chain
        model = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash", 
            google_api_key=gemini_api_key,
            temperature=0.3  # Lower temperature for more consistent responses
        )
        
        prompt = PromptTemplate(template=QA_PROMPT_TEMPLATE, input_variables=["context", "question"])
        chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
        
        response = chain(
            {"input_documents": docs, "context": combined_context, "question": query},
            return_only_outputs=True
        )
        
        return response["output_text"]
    except Exception as e:
        logger.error(f"Error in RAG search: {str(e)}")
        return f"Error processing your question: {str(e)}"

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Build the FAISS index at startup
# @app.before_first_request
# def initialize():
#     build_faiss_db()

@app.route('/ask', methods=['POST'])
def ask():
    """API endpoint to ask questions about transaction data"""
    try:
        data = request.get_json()
        
        if not data or 'question' not in data:
            return jsonify({"error": "No question provided"}), 400
        
        question = data['question']
        
        # Perform RAG search
        answer = rag_search(question)
        
        return jsonify({
            "question": question,
            "answer": answer
        })
        
    except Exception as e:
        logger.exception("Error processing question")
        return jsonify({"error": str(e)}), 500

@app.route('/data', methods=['GET'])
def get_data():
    """API endpoint to get processed transaction data"""
    try:
        # Format the results for the response
        formatted_results = []
        for transaction in json_data:
            # Get the Date value and ensure it's not None/empty
            print(json_data)
            date = transaction.get("Date")
            if date:  # Only add if date exists
                formatted_results.append(transaction)
        
        return jsonify(formatted_results)
        
    except Exception as e:
        logger.exception("Error retrieving data")
        return jsonify({"error": str(e)}), 500

# Main execution
if __name__ == "__main__":
    # Build FAISS DB at startup
    logger.info("Building FAISS DB at startup...")
    build_faiss_db()
    
    # Start Flask app
    logger.info("Starting Flask server...")
    app.run(host="127.0.0.1", port=8000, debug=True)
