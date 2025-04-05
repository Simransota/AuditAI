import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from a .env file if present

# Example configuration variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/mlops_db")
SCHEDULER_INTERVAL_SECONDS = int(os.getenv("SCHEDULER_INTERVAL_SECONDS", 30))
MODEL_PATH = os.getenv("MODEL_PATH", "models/model.pkl")  # Adjust as necessary
