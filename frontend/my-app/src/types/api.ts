export interface AnomalyByType {
  type: string;
  count: number;
  color: string;
}

export interface AnomalyTrend {
  date: string;
  anomalies: number;
}

export interface RiskDistribution {
  name: string;
  value: number;
  color: string;
} 