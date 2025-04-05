from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import dashboard_routes

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
