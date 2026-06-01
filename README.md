# Priomed-AI
# 🧬 PRIOMED AI: Autonomous Healthcare Orchestration OS

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Infra-Docker-2496ED.svg?logo=docker)](https://www.docker.com/)

**PRIOMED AI** is an intelligent, enterprise-grade middleware designed to revolutionize pathology laboratories and hospitals. It replaces outdated First-In-First-Out (FIFO) sample processing with a dynamic, AI-driven priority queue that calculates biological degradation risks in real-time, preventing sample spoilage and saving critical patient lives.

---

## 🚀 The Business ROI

Traditional labs face immense operational bottlenecks due to manual queueing and sample expiration. PRIOMED AI introduces a completely autonomous workflow.

| Metric | Legacy Lab Systems | PRIOMED AI Engine |
| :--- | :--- | :--- |
| **Queue Logic** | First Come, First Serve (FIFO) | AI Risk & Degradation Based |
| **Data Ingestion** | Manual Data Entry | HL7 Interoperability + Manual |
| **Emergency Handling** | Manual escalation via calls | Automated WhatsApp Alerts via Twilio |
| **Fleet Tracking** | Blind transit | Live Cold-Chain IoT Mapping |
| **Sample Spoilage** | ~5-8% Daily | Near 0% |

---

## 🧠 System Architecture & Data Flow

PRIOMED AI is built on a distributed microservice architecture. It ingests data, calculates mathematical risk probabilities, stores records permanently, and broadcasts changes to the dashboard instantaneously.

```text
       [Legacy Sysmex/Roche]         [Lab Staff Input]
           (HL7 APIs)                 (React Portal)
               │                            │
               ▼                            ▼
      ┌───────────────────────────────────────────────┐
      │         FastAPI Central API Gateway           │
      └──────────────────────┬────────────────────────┘
                             │
               ┌─────────────▼─────────────┐
               │   AI Orchestration Core   │
               │  • Degradation Agent      │
               │  • Emergency Escalation   │
               └─────────────┬─────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │ PostgreSQL  │    │ WebSockets  │    │   Twilio    │
   │  Database   │    │  Live Sync  │    │ SMS/WhatsApp│
   └─────────────┘    └─────────────┘    └─────────────┘
          │                  │                  │
          └──────────┬───────┴──────────┬───────┘
                     ▼                  ▼
            ┌────────────────────────────────────┐
            │   React.js Enterprise Dashboard    │
            │  (Live Map + AI Priority Matrix)   │
            └────────────────────────────────────┘
```

## ⚡ Core Enterprise Features

### Algorithmic Triage
Automatically recalculates processing queues based on transit time, temperature exposure, and medical urgency.

### Live Cold-Chain Tracking
Maps phlebotomists (collection agents) in real-time using simulated IoT telemetry.

### Automated Crisis Escalation
Integrates with the Twilio API to instantly message Lab Managers on WhatsApp when a highly degradable or critical sample enters the system.

### Persistent Medical Storage
Fully integrated with a transactional PostgreSQL database for auditable healthcare records.

### Zero-Latency Sync
Utilizes pure WebSockets to update the laboratory command center without ever refreshing the page.

---

## 🛠️ Technology Stack

### Backend Interface
Python, FastAPI, SQLAlchemy, WebSockets

### Frontend Command Center
React.js, Vite, Tailwind CSS, React-Leaflet

### Database Infrastructure
PostgreSQL 15

### Automation
Twilio API (WhatsApp/SMS)

### Deployment
Docker & Docker Compose

---

## ⚙️ Local Development & Deployment

The entire architecture can be deployed locally using a single Docker command.

### 1. Prerequisites

Docker Desktop installed and running.

A free Twilio Account for WhatsApp automation.

### 2. Environment Setup

Create a .env file inside the /backend directory and add your secure API keys:

```env
# Database
DATABASE_URL=postgresql://priomed_user:lab123password@db:5432/priomed_db

# Twilio Automation
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_FROM_NUMBER=whatsapp:+14155238886
TARGET_WHATSAPP_NUMBER=whatsapp:+91XXXXXXXXXX
```

### 3. Spin Up the Infrastructure

Navigate to the root directory priomed-ai and run:

```bash
docker-compose up --build
```

### 4. Access the Ecosystem

Frontend Dashboard:
http://localhost:5173

Backend API Docs (Swagger):
http://localhost:8000/docs

---

## 🔒 Security & Compliance

PRIOMED AI handles simulated Protected Health Information (PHI). The codebase is structured with healthcare compliance in mind:

- Strict .gitignore implementations to prevent credential leakage.
- Decoupled database environment variables.
- Future readiness for JWT-based Role Access Control (RBAC) and HIPAA-compliant data masking.

---

## 🌍 Vision

Built to bring operational intelligence and autonomous governance to the future of healthcare.

PRIOMED AI transforms laboratory operations through AI-driven sample prioritization, real-time risk prediction, automated escalation systems, intelligent queue management, live cold-chain monitoring, and autonomous healthcare workflow orchestration.


**© 2026 PRIOMED AI. All Rights Reserved.**

*This is a proprietary and closed-source software. Unauthorized copying, distribution, modification, or commercial usage of this codebase, via any medium, is strictly prohibited.*
