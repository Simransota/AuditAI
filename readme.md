# AI-Powered Sales Auditing System

## 🚀 Overview

Traditional auditing struggles with detecting complex, context-rich anomalies in large-scale sales operations. Our AI-driven system leverages Retrieval-Augmented Generation (RAG) and machine learning to intelligently audit structured sales data, flag high-risk anomalies, and generate contextual audit reports — driving business accuracy, compliance, and strategic decision-making.

---

## 📸 Demo Vid

https://github.com/user-attachments/assets/1abfe5e1-b6b3-4dc3-9217-92408faf25ab

 
---

## 📊 Problem Statement

Sales datasets often contain:
- Unauthorized discounts
- Tax miscalculations
- Price overrides
- Fraudulent or suspicious transactions

Manual or rule-based validation is error-prone, slow, and unscalable. Our system solves this by **automating anomaly detection and contextual reasoning** using AI.

---

## 🎯 Key Objectives

- **Contextual Anomaly Detection**: Identify human-error anomalies (not just raw data errors).
- **Severity-Based Classification**: Classify anomalies by risk level for prioritization.
- **Audit Reporting**: Auto-generate detailed audit reports with corrective action insights.
- **User Feedback Loop**: Human-in-the-loop (HITL) validations to retrain and improve.

---

## 💼 Business Impact

| Benefit | Impact |
|--------|--------|
| ✅ Fraud Detection | Save millions in losses via early anomaly detection |
| ⏱️ Operational Efficiency | 70% faster audits, reduced manual work |
| 📈 Compliance Assurance | Ensure tax, price, and regulatory compliance |
| 💡 Strategic Insights | Understand behavior behind sales anomalies |
| 🔄 Feedback-Driven Accuracy | Improves over time with human validation |

---

## 🧠 Technical Architecture

- **Backend**: Python, FastAPI
- **Frontend**: React.js (with Human Review UI)
- **ML Models**:
  - Anomaly Detection (Isolation Forest / Autoencoder / XGBoost)
  - Severity Classification (Multi-Class Classifier)
- **RAG Pipeline**: Combines LLM with anomaly metadata to generate contextual reasoning
- **MLOps**: Model feedback loop + retraining for continuous learning


---

## 🧪 Features

- Upload and audit structured sales data (CSV/Excel)
- Human Review dashboard to verify anomalies
- RAG-based reasoning for context-rich explanations
- Severity score for prioritization
- Auto-generated audit reports
- Multi-tier pricing model (Free, Premium Basic, Premium Pro)

---

## 📁 Getting Started

1. Clone this repo
2. Run `pip install -r requirements.txt`
3. Upload your dataset via frontend
4. View flagged anomalies with context and severity
5. (Optional) Validate anomalies via "Human Review"

---

## 🧑‍💼 Contact

Developed by: The Horcruxes


---
