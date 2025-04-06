import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from fpdf import FPDF
from datetime import datetime
import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
import base64
import io
from PIL import Image
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
import json
# from langchain.llms import OpenAI
from langchain_openai import OpenAI
from openai import OpenAI as OpenAIClient  # updated OpenAI SDK
from langchain_openai import OpenAI  # updated LangChain LLM wrapper
from langchain_community.llms import OpenAI
import openai

load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAIClient(api_key=openai_api_key)

json_data = [
    {
        "timestamp": "2025-04-06T08:15:23",
        "category": "Suspicious Discount",
        "severity": "High",
        "anomaly_score": 0.92,
        "department": "Billing",
        "description": "Anomaly detected in system behavior #1"
    },
    {
        "timestamp": "2025-04-06T08:17:11",
        "category": "Tax Mismatch",
        "severity": "Medium",
        "anomaly_score": 0.68,
        "department": "Accounting",
        "description": "Anomaly detected in system behavior #2"
    },
    {
        "timestamp": "2025-04-06T08:21:45",
        "category": "Service Charge on Complimentary",
        "severity": "Low",
        "anomaly_score": 0.35,
        "department": "Hospitality",
        "description": "Anomaly detected in system behavior #3"
    },
    {
        "timestamp": "2025-04-06T08:25:32",
        "category": "Inconsistent Totals",
        "severity": "High",
        "anomaly_score": 0.87,
        "department": "Audit",
        "description": "Anomaly detected in system behavior #4"
    },
    {
        "timestamp": "2025-04-06T08:28:59",
        "category": "Manual Modification Detected",
        "severity": "Medium",
        "anomaly_score": 0.62,
        "department": "Operations",
        "description": "Anomaly detected in system behavior #5"
    },
    {
        "timestamp": "2025-04-06T08:32:47",
        "category": "Negative/Zero Quantity",
        "severity": "Low",
        "anomaly_score": 0.29,
        "department": "Inventory",
        "description": "Anomaly detected in system behavior #6"
    },
    {
        "timestamp": "2025-04-06T08:35:13",
        "category": "Suspicious Discount",
        "severity": "Medium",
        "anomaly_score": 0.55,
        "department": "Billing",
        "description": "Anomaly detected in system behavior #7"
    },
    {
        "timestamp": "2025-04-06T08:38:21",
        "category": "Tax Mismatch",
        "severity": "High",
        "anomaly_score": 0.81,
        "department": "Accounting",
        "description": "Anomaly detected in system behavior #8"
    },
    {
        "timestamp": "2025-04-06T08:42:06",
        "category": "Manual Modification Detected",
        "severity": "Medium",
        "anomaly_score": 0.61,
        "department": "Operations",
        "description": "Anomaly detected in system behavior #9"
    },
    {
        "timestamp": "2025-04-06T08:44:50",
        "category": "Inconsistent Totals",
        "severity": "High",
        "anomaly_score": 0.89,
        "department": "Audit",
        "description": "Anomaly detected in system behavior #10"
    },
    {
        "timestamp": "2025-04-06T08:48:12",
        "category": "Negative/Zero Quantity",
        "severity": "Low",
        "anomaly_score": 0.33,
        "department": "Inventory",
        "description": "Anomaly detected in system behavior #11"
    },
    {
        "timestamp": "2025-04-06T08:50:31",
        "category": "Service Charge on Complimentary",
        "severity": "Low",
        "anomaly_score": 0.42,
        "department": "Hospitality",
        "description": "Anomaly detected in system behavior #12"
    },
    {
        "timestamp": "2025-04-06T08:53:17",
        "category": "Suspicious Discount",
        "severity": "High",
        "anomaly_score": 0.94,
        "department": "Billing",
        "description": "Anomaly detected in system behavior #13"
    },
    {
        "timestamp": "2025-04-06T08:56:08",
        "category": "Tax Mismatch",
        "severity": "Medium",
        "anomaly_score": 0.59,
        "department": "Accounting",
        "description": "Anomaly detected in system behavior #14"
    },
    {
        "timestamp": "2025-04-06T08:58:35",
        "category": "Manual Modification Detected",
        "severity": "High",
        "anomaly_score": 0.83,
        "department": "Operations",
        "description": "Anomaly detected in system behavior #15"
    },
    {
        "timestamp": "2025-04-06T09:01:22",
        "category": "Inconsistent Totals",
        "severity": "Medium",
        "anomaly_score": 0.66,
        "department": "Audit",
        "description": "Anomaly detected in system behavior #16"
    },
    {
        "timestamp": "2025-04-06T09:03:58",
        "category": "Negative/Zero Quantity",
        "severity": "Low",
        "anomaly_score": 0.24,
        "department": "Inventory",
        "description": "Anomaly detected in system behavior #17"
    },
    {
        "timestamp": "2025-04-06T09:06:41",
        "category": "Suspicious Discount",
        "severity": "High",
        "anomaly_score": 0.91,
        "department": "Billing",
        "description": "Anomaly detected in system behavior #18"
    },
    {
        "timestamp": "2025-04-06T09:09:27",
        "category": "Tax Mismatch",
        "severity": "Medium",
        "anomaly_score": 0.71,
        "department": "Accounting",
        "description": "Anomaly detected in system behavior #19"
    },
    {
        "timestamp": "2025-04-06T09:12:15",
        "category": "Service Charge on Complimentary",
        "severity": "Low",
        "anomaly_score": 0.38,
        "department": "Hospitality",
        "description": "Anomaly detected in system behavior #20"
    }
]

class AuditReportGenerator:
    def __init__(self, vector_store_path):
        """
        Initialize the Audit Report Generator with the path to the FAISS vector store
        """
        self.vector_store_path = vector_store_path
        self.index = None
        self.anomaly_data = None
        self.summary = None

    def load_vector_store(self):
        """
        Load the FAISS vector store containing anomaly data
        """
        try:
            self.index = FAISS.read_index(self.vector_store_path)
            print(f"Successfully loaded vector store from {self.vector_store_path}")
            self.anomaly_data = self._retrieve_anomaly_data()
            return True
        except Exception as e:
            print(f"Error loading vector store: {e}")
            return False

    def _retrieve_anomaly_data(self):
        """
        Retrieve anomaly data from the vector store
        """
        anomaly_data = pd.DataFrame({
            'timestamp': pd.date_range(start='2025-03-01', periods=20, freq='D'),
            'category': np.random.choice(['Financial', 'Operational', 'Compliance', 'Security'], 20),
            'severity': np.random.choice(['High', 'Medium', 'Low'], 20, p=[0.2, 0.5, 0.3]),
            'anomaly_score': np.random.uniform(0.5, 1.0, 20),
            'department': np.random.choice(['HR', 'Finance', 'IT', 'Operations'], 20),
            'description': [f"Anomaly detected in system behavior #{i}" for i in range(1, 21)]
        })
        return anomaly_data

    def generate_summary_with_openai(self, context, question):
        messages = [
            {
                "role": "system",
                "content": """Perform forensic analysis on food delivery transaction data. Use chain-of-thought reasoning to:
    1. Calculate temporal metrics for Zomato (_z) and Swiggy (_s)
    2. Identify anomalies using IQR and Z-score methods
    3. Compare platforms across order types and discounts
    4. Generate actionable recommendations

    Follow this strict analysis framework:
    <analysis_steps>
    1. Temporal Analysis:
    - Prep_time = Accepted_Time - Mark_Ready_Time
    - Delivery_time = Picked_up_Time - Delivered_Time
    - E2E_time = Received_Time - Delivered_Time
    - Compare distributions using Mann-Whitney U test

    2. Anomaly Detection:
    - Z-score >3: Critical outliers
    - IQR 1.5-3x: Moderate anomalies
    - Hourly segmentation for peak patterns

    3. Pattern Recognition:
    - Discount clusters (Aggregator vs Outlet)
    - Status-time correlations
    - Missing data patterns

    4. Root Cause Analysis:
    - Kitchen capacity vs order volume
    - Traffic patterns vs delivery radius
    - Discount abuse patterns
    </analysis_steps>"""
            },
            {
                "role": "user",
                "content": f"Analyze dataset {context} to answer {question}"
            }
        ]

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.3
        )

        self.summary = response.choices[0].message.content
        print(self.summary)
        return self.summary



    def create_charts(self):
        """
        Generate charts visualizing the anomaly data
        """
        if self.anomaly_data is None:
            print("No anomaly data available. Please load vector store first.")
            return []

        charts = []
        os.makedirs('charts', exist_ok=True)

        # Chart 1: Anomalies by category
        plt.figure(figsize=(10, 6))
        sns.countplot(x='category', data=self.anomaly_data, palette='viridis', hue='severity')
        plt.title('Anomalies by Category and Severity')
        plt.tight_layout()
        chart_path = 'charts/anomalies_by_category.png'
        plt.savefig(chart_path)
        charts.append(chart_path)
        plt.close()

        # Chart 2: Anomaly scores distribution
        plt.figure(figsize=(10, 6))
        sns.histplot(self.anomaly_data['anomaly_score'], kde=True, bins=15)
        plt.title('Distribution of Anomaly Scores')
        plt.xlabel('Anomaly Score')
        plt.ylabel('Frequency')
        plt.tight_layout()
        chart_path = 'charts/anomaly_score_distribution.png'
        plt.savefig(chart_path)
        charts.append(chart_path)
        plt.close()

        # Chart 3: Anomalies by department
        plt.figure(figsize=(10, 6))
        dept_severity = pd.crosstab(self.anomaly_data['department'], self.anomaly_data['severity'])
        dept_severity.plot(kind='bar', stacked=True, colormap='viridis')
        plt.title('Anomalies by Department and Severity')
        plt.xlabel('Department')
        plt.ylabel('Count')
        plt.tight_layout()
        chart_path = 'charts/anomalies_by_department.png'
        plt.savefig(chart_path)
        charts.append(chart_path)
        plt.close()

        # Chart 4: Anomalies over time
        plt.figure(figsize=(12, 6))
        time_series = self.anomaly_data.set_index('timestamp')
        time_series['count'] = 1
        daily_anomalies = time_series['count'].resample('D').sum()
        daily_anomalies.plot(kind='line', marker='o')
        plt.title('Anomalies Detected Over Time')
        plt.xlabel('Date')
        plt.ylabel('Number of Anomalies')
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.tight_layout()
        chart_path = 'charts/anomalies_over_time.png'
        plt.savefig(chart_path)
        charts.append(chart_path)
        plt.close()

        return charts

    def generate_pdf_report(self, output_path='audit_report.pdf'):
        """
        Generate a PDF report with the summary and charts
        """
        if self.summary is None:
            if not self.generate_summary_with_openai(context_json, "What are the key patterns and risks in these anomalies?"):
                return False

        charts = self.create_charts()

        pdf = FPDF()
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, 'Anomaly Detection Audit Report', 0, 1, 'C')
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, f'Generated on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
        pdf.line(10, 30, 200, 30)
        pdf.ln(10)

        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Executive Summary', 0, 1, 'L')
        pdf.set_font('Arial', '', 10)

        paragraphs = self.summary.split('\n\n')
        for paragraph in paragraphs:
            if paragraph.strip():
                if paragraph.strip().endswith(':'):
                    pdf.set_font('Arial', 'B', 11)
                    pdf.multi_cell(0, 5, paragraph.strip(), 0, 'L')
                    pdf.set_font('Arial', '', 10)
                else:
                    pdf.multi_cell(0, 5, paragraph.strip(), 0, 'L')
                pdf.ln(3)

        pdf.add_page()
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Visual Analysis', 0, 1, 'L')

        for i, chart_path in enumerate(charts):
            if os.path.exists(chart_path):
                if i > 0 and i % 2 == 0:
                    pdf.add_page()

                chart_title = os.path.basename(chart_path).replace('.png', '').replace('_', ' ').title()
                pdf.set_font('Arial', 'B', 10)
                pdf.cell(0, 10, chart_title, 0, 1, 'L')
                pdf.image(chart_path, x=10, y=None, w=180)
                pdf.ln(5)

        pdf.add_page()
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Detailed Anomaly Data', 0, 1, 'L')

        pdf.set_font('Arial', 'B', 8)
        col_width = 35
        row_height = 10
        headers = ['Date', 'Category', 'Severity', 'Department', 'Score']
        for header in headers:
            pdf.cell(col_width, row_height, header, 1, 0, 'C')
        pdf.ln(row_height)

        pdf.set_font('Arial', '', 8)
        sorted_data = self.anomaly_data.sort_values('anomaly_score', ascending=False)

        for idx, row in sorted_data.head(20).iterrows():
            pdf.cell(col_width, row_height, row['timestamp'].strftime('%Y-%m-%d'), 1, 0, 'C')
            pdf.cell(col_width, row_height, row['category'], 1, 0, 'C')
            pdf.cell(col_width, row_height, row['severity'], 1, 0, 'C')
            pdf.cell(col_width, row_height, row['department'], 1, 0, 'C')
            pdf.cell(col_width, row_height, f"{row['anomaly_score']:.3f}", 1, 0, 'C')
            pdf.ln(row_height)

        try:
            pdf.output(output_path)
            print(f"PDF report successfully generated at {output_path}")
            return output_path
        except Exception as e:
            print(f"Error generating PDF: {e}")
            return None

    def generate_downloadable_pdf(self):
        """
        Generate PDF and return it as base64 string for download in web applications
        """
        temp_filename = 'temp_audit_report.pdf'
        if self.generate_pdf_report(temp_filename):
            try:
                with open(temp_filename, 'rb') as f:
                    pdf_bytes = f.read()
                    encoded_pdf = base64.b64encode(pdf_bytes).decode('utf-8')

                os.remove(temp_filename)
                return encoded_pdf
            except Exception as e:
                print(f"Error encoding PDF: {e}")
                return None
        return None

# Example usage
if __name__ == "__main__":
    generator = AuditReportGenerator("dummy/path/index.idx")

    with open("anomaly_data.json", "r") as f:
        raw_data = json.load(f)

    # Convert to DataFrame
    generator.anomaly_data = pd.DataFrame(raw_data)

    # Convert timestamp column to datetime objects
    generator.anomaly_data["timestamp"] = pd.to_datetime(generator.anomaly_data["timestamp"])

    print("[✓] Dummy sales-related anomaly data injected.")

    context_data = generator.anomaly_data.sort_values(by="anomaly_score", ascending=False).head(20).copy()
    context_data['timestamp'] = context_data['timestamp'].astype(str)
    context_json = json.dumps(context_data.to_dict(orient="records"), indent=2)


    if generator.generate_summary_with_openai(context_json, "What are the key patterns and risks in these anomalies?"):
        print("[✓] Summary generated using Gemini.")
    else:
        print("[✗] Failed to generate summary.")

    charts = generator.create_charts()
    if charts:
        print(f"[✓] {len(charts)} charts created and saved to 'charts/' directory.")
    else:
        print("[✗] Failed to generate charts.")

    pdf_path = generator.generate_pdf_report("sales_audit_report.pdf")
    if pdf_path:
        print(f"[✓] PDF report generated at: {pdf_path}")
    else:
        print("[✗] PDF report generation failed.")