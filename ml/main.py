from fastapi import FastAPI, HTTPException
import pandas as pd

app = FastAPI()


@app.get("/anomaly-records", response_model=list)
async def get_anomaly_records():
    """
    Endpoint to return anomaly records from anomaly_records.csv as JSON.
    """
    try:
        df = pd.read_csv("datasets/anomaly_records_og.csv")
    except FileNotFoundError:
        raise HTTPException(
            status_code=404, detail="The anomaly_records.csv file was not found."
        )
    # Convert DataFrame to a list of dictionaries (JSON serializable)
    json_data = df.to_dict(orient="records")
    return json_data
