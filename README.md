<img width="100%" alt="hero-image" src="./assets/readme/hero.gif">

## 📑 Table of Contents
- [About](#about) — what PingBay does and why it exists
- [Key Features](#key-features) — main functionalities
- [Tech Stack](#tech-stack) — tools and technologies used
- [Quick Start](#quick-start-recommended---docker) — how to run the demo locally
- [Architecture](#architecture) — system structure and flow
- [Environment Variables](#note-on-environment-variables) — configuration info
- [Data Collection & Cron Jobs](#data-collection--cron-jobs) — monitoring mechanics
- [Future Roadmap / Improvements](#future-roadmap--improvements) — planned improvements

## 📌 About

Never miss a site outage again. PingBay transforms raw site metrics into actionable insights by continuously monitoring uptime, latency, and response errors for your websites. It provides developers, teams, and site owners with real-time dashboards that highlight trends, anomalies, and potential issues before they escalate. This full-stack project showcases automated background jobs, interactive data visualization, an automatic data aggregation pipeline, a sleek and modern UI, and a Docker-powered environment that can be launched locally in a single command, making it both demo-friendly and production-ready.

## ✨ Key Features

### Sleek Dashboard
Easily monitor all your tracked websites in one view. The dashboard shows each site’s uptime status, check frequency, and last ping time with real-time updates.  
&nbsp;
<img width="100%" alt="dashboard" src="./assets/readme/dashboard.png">
&nbsp;

### Overall Analytics
Get a high-level overview of all monitored sites — including aggregated uptime, downtime events, and average latency trends. Interactive charts visualize performance changes over time.  
&nbsp;
<img width="100%" alt="analytics" src="./assets/readme/analytics.png">
&nbsp;

### Single Site Analytics
Dive deep into the performance of individual sites. Each page displays historical uptime, latency, and incident counts with smooth visual charts for clear trend insights.  
&nbsp;
<img width="100%" alt="single-site-analytics" src="./assets/readme/ssa.png">
&nbsp;

### Secure Authentication
PingBay includes a full authentication system powered by **HTTP-only cookies** and **access tokens**, ensuring all protected routes are securely managed without exposing sensitive credentials to the browser.  
&nbsp;
<img width="100%" alt="auth-flow" src="./assets/readme/auth.png">
&nbsp;


## 🛠️ Tech Stack

**Frontend:**  ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
**Backend:**  ![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)  
**Database:**  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)  
**Scheduling:**  ![Node-Cron](https://img.shields.io/badge/Cron-Jobs-green?logo=clockify&logoColor=white)  
**Package Manager:**  ![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)  
**Containerization:**  ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

## ⚡ Quick Start (Recommended — Docker)

This demo is designed for simplicity: with Docker installed, you can run the full PingBay website (frontend, backend, cron jobs, and PostgreSQL) locally with one command. The frontend will be available at http://localhost:5173.

Requirements:
- Docker & Docker Compose installed
- pnpm installed (for the convenience scripts below)

Clone the repository:

```bash
git clone https://github.com/yourusername/pingbay.git
cd pingbay
```

Run the full application:

```bash
pnpm start
```

This command spins up the frontend, backend, cron job, and PostgreSQL instances automatically using Docker.

**If a full experience is desired, please go to the settings and hit the populate data button to add simulated data for the last month.**

---

Once finished testing out PingBay, run the following command to wipe everything (database and containers):

```bash
pnpm delete
```

## 🏗️ Architecture

PingBay is built with a **modular, service-based architecture** designed for clarity, scalability, and maintainability. The system runs as a **four-service Docker composition**, each handling a distinct layer of responsibility:

1. **Frontend Service** — A React + Vite + TypeScript client served on port `5173`, responsible for user interaction, real-time visualization, and dashboard management.
2. **Backend API Service** — A Node.js + Express server managing authentication, data routing, and data aggregation.
3. **Database Service** — A PostgreSQL instance storing site metadata, ping results, and aggregated statistics for analytics.
4. **Cron Service** — A lightweight scheduler that periodically triggers background jobs on the API.

These services communicate seamlessly within Docker’s shared network, ensuring full isolation from the host machine and easy reproducibility across environments.

### System Overview
Below is a high-level overview of how PingBay’s components interact.

```mermaid
flowchart TB
    %% ========= Nodes =========
    ES[External Sites]
    FE[Frontend - React App]

    subgraph INFRASTRUCTURE
        direction TB
        CR[Cron Poller - every 1m]
        DB[(Postgres Database)]

        subgraph API_Service
            direction TB
            AGG[Data Aggregation]
            AUTH[Auth Module]
            CRUD[CRUD - Site Management]
            READS[GET Data Endpoints]
        end
    end

    %% ========= Flows =========
    CR -->|POST /cron/handle-pings| AGG
    AGG <-->|HTTP checks| ES
    AGG -->|Insert raw pings| DB

    AUTH -->|User tables| DB
    CRUD -->|Add or remove sites| DB
    READS -->|Fetch dashboard data| DB

    FE <-->|Login / Auth| AUTH
    FE -->|Manage sites| CRUD
    FE <-->|Dashboard data| READS

    %% ========= Styles =========
    classDef frontend fill:#61dafb,stroke:#0b5f74,stroke-width:2px,color:#000,font-weight:bold
    classDef api fill:#ffd580,stroke:#cc9a00,stroke-width:1.5px,color:#000
    classDef infra fill:#d5e8d4,stroke:#82b366,stroke-width:1.5px,color:#000
    classDef db fill:#d0e0f0,stroke:#4a90e2,stroke-width:2px,color:#000
    classDef external fill:#f5c6cb,stroke:#a71d2a,stroke-width:2px,color:#000

    class FE frontend
    class AGG,AUTH,CRUD,READS api
    class CR infra
    class DB db
    class ES external

```

**Flow Summary:**
- The **Frontend** sends authenticated requests to the API.
- The **Backend** processes site checks, retrieves analytics data, and exposes REST endpoints.
- The **Database** stores both raw ping results and aggregated metrics for visualization.

### Data Flow
PingBay automates the process of uptime monitoring through a continuous data loop:

1. **Scheduler** triggers pings at defined intervals.
2. **Ping Results** are recorded in PostgreSQL, with latency, uptime, and failure details.
3. **Aggregator** jobs compute summaries for analytics charts.
4. **Frontend UI** consumes this data to render real-time graphs and tables.

### Docker Composition
Each service runs as an isolated container managed by Docker Compose (simplified file):

```yaml
services:
  web:
    build: ./web
    ports:
      - "5173:5173"
  api:
    build: ./api
    ports:
      - "5000:5000"
    depends_on:
      - db
  db:
    image: postgres:15
    ports:
      - "5432:5432"
```

## ⚙️ Note on Environment Variables

For this demo, two files have been provided: .env.api.example and .env.web.example, which have been filled out with the appropriate variable for the demo. The contents of these files are cloned into newly made .env files when the docker demo is run. 

## 📚 Future Roadmap / Improvements

* Email / SMS notifications for downtime.
* Weekly reports sent via email.
* Real-time updates using WebSockets.

## 👤 Author
**Ethan Snyder**  
[LinkedIn](https://www.linkedin.com/in/ethan-snyder30) • [Portfolio](https://ethansnyder.dev) • [Email](mailto:edsnyder1@geneva.edu)

## 🧾 License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.