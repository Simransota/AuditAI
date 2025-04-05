export async function getAnomaliesByType() {
  const response = await fetch('http://localhost:8000/anomalies/by_type');
  return response.json();
}

export async function getAnomalyTrend() {
  const response = await fetch('http://localhost:8000/anomalies/trend');
  return response.json();
}

export async function getRiskDistribution() {
  const response = await fetch('http://localhost:8000/anomalies/risk_distribution');
  return response.json();
} 