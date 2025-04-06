from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dashboard_routes
from fastapi.responses import JSONResponse

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(dashboard_routes.router) 

file_path = "anomaly_data.json"

# Endpoint to read the anomaly data and send it as JSON response
@app.get("/get_anomaly_data", response_class=JSONResponse)
async def get_anomaly_data():
    # Read the contents of the JSON file
    with open(file_path, "r") as file:
        anomaly_data = json.load(file)
    
    # Return the data as a JSON response
    return anomaly_data