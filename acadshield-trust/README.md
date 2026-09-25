# ACADSHIELD TRUST (PROJECT B)
> **Employer Trust Intelligence, AI Risk Analysis & Enterprise Verification Platform**

ACADSHIELD TRUST is the employer-facing intelligence layer of the **ACADSHIELD X** digital trust infrastructure. It consumes raw cryptographic credentials from **ACADSHIELD CORE (Project A)** via decoupled REST providers, synthesizes verified candidate **Trust Passports**, builds relational **Trust Graphs**, and provides auxiliary **AI Anomaly Detection** without compromising deterministic cryptographic proofs.

---

## Architectural Principles

1. **Deterministic Cryptographic Verification vs AI Anomaly Detection:**
   - Cryptographic verification proves: signature validity, document hash integrity, issuer status, and blockchain provenance.
   - AI anomaly analysis assesses: issuance velocity spikes, duplication patterns, and metadata inconsistencies.
2. **Provider Isolation Pattern:**
   - Business logic depends on `ICredentialProvider`.
   - `MockCredentialProvider` operates offline during development with deterministic fixtures.
   - `ProjectACredentialProvider` communicates with Project A over authenticated REST APIs (`POST /api/v1/internal/verify-credential`).
3. **Resilience & Graceful Degradation:**
   - If AI service is down: Cryptographic verification passes normally; risk level is flagged `UNAVAILABLE`.
   - If Project A is down: Status returns `SOURCE_UNAVAILABLE`.

---

## Directory Structure

```
acadshield-trust/
├── backend/          # Node.js + Express + Prisma + TypeScript API
├── frontend/         # Next.js 14 + Tailwind CSS Employer & Public Passport Portal
├── ai-service/       # Python FastAPI + Scikit-Learn Anomaly Detection Service
├── docker/           # PostgreSQL initialization scripts
├── docs/             # Full system architecture, API specifications, and integration contracts
├── mocks/            # Deterministic Project A and AI risk mock fixtures
├── tests/            # Integration and unit test suites
├── docker-compose.yml# Container orchestration
└── .env.example      # Master environment template
```

---

## Quickstart

### 1. Environment Configuration
```bash
cp .env.example .env
cp .env.example backend/.env
```

### 2. Standalone Docker Compose Setup
Starts PostgreSQL (Port 5433), AI Service (Port 8000), Backend (Port 5000), and Frontend (Port 3001):
```bash
docker-compose up -d
```

### 3. Local Development

#### AI Service (Python FastAPI)
```bash
cd ai-service
python -m venv .venv
# On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### Backend (Node.js / Express)
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

#### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## Testing & Verification
- **Health Check Probe**: `GET http://localhost:5000/health`
- **Swagger Documentation**: `GET http://localhost:5000/api/docs`
- **Candidate Public Passport**: `GET http://localhost:3001/p/:shareToken`
- **Enterprise Verification API**: `POST http://localhost:5000/api/v1/verify/credential` (Header: `X-API-Key`)

---

## License
MIT (c) 2026 AcadShield Engineering Team
