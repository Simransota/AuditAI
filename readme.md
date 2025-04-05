# Create a virtual environment named "venv"
python -m venv venv

# Activate the virtual environment:
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies (assuming you have a requirements.txt)
pip install -r requirements.txt

# Run FastAPI using uvicorn
uvicorn main:app --reload