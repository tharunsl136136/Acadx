# ACADSHIELD CORE (PROJECT A)
> **Digital Trust Infrastructure for Education, Skills, and Employment**

ACADSHIELD CORE is the independent credential infrastructure layer of the **ACADSHIELD X** platform. It provides enterprise-grade, cryptographically verifiable issuance, decentralized identity management (DID), IPFS-anchored document hashing, Polygon blockchain provenance, and instant public verification.

---

## Architecture Overview

```
+-----------------------------------------------------------------------------------+
|                            CLIENT & VERIFIER INTERFACES                           |
|                                                                                   |
|  - Institution Portal     - Student Credential Locker     - Zero-Login Verifier   |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                        EXPRESS / TYPESCRIPT REST API                              |
|                                                                                   |
|  - EIP-4361 Nonce Auth   - Multi-tenant RBAC              - Append-only Audit Log |
|  - Zod Validation        - Rate Limiting & Helmet         - Project B Service API |
+------------------+-----------------------+-----------------------+----------------+
                   |                       |                       |
                   v                       v                       v
      +------------------------+   +---------------+   +------------------------+
      |  PostgreSQL + Prisma   |   | IPFS Storage  |   | Polygon Amoy / Hardhat |
      | (Off-chain relational) |   | (CIDs & Docs) |   | (Smart Contracts)      |
      +------------------------+   +---------------+   +------------------------+
```

### Core Product Principle
**Blockchain is NOT the entire database.**
- **PostgreSQL**: Stores relational enterprise models, user identities, draft credentials, status transitions, and audit trails.
- **IPFS**: Stores canonical W3C credential metadata payloads and certificate documents.
- **Polygon Amoy**: Stores immutable tamper-resistant proofs: credential ID, institution ID, document SHA-256 hash, and current lifecycle state.
- **QR Codes & REST API**: Provides seamless zero-login public verification for employers and external systems (such as **Project B: AcadShield Trust**).

---

## Directory Structure

```
acadshield-core/
├── backend/          # Node.js + Express + Prisma + Ethers.js REST API
├── frontend/         # Next.js 14 + React + TypeScript + Tailwind CSS portal
├── contracts/        # Solidity (OpenZeppelin) + Hardhat + Typechain testnet deployment
├── docker/           # PostgreSQL initialization scripts and container configs
├── docs/             # Full system architecture, API specs, and integration contracts
├── scripts/          # Automation, deployment, and test seeding utilities
├── tests/            # End-to-end integration test suite
├── docker-compose.yml# Container orchestration
└── .env.example      # Master environment variable template
```

---

## Quickstart

### Prerequisites
- Node.js `>= 20.x`
- npm `>= 10.x`
- Docker & Docker Compose (or local PostgreSQL 16)

### 1. Environment Configuration
Copy `.env.example` to `.env` at the root and inside `backend/`:
```bash
cp .env.example .env
cp .env.example backend/.env
```

### 2. Running via Docker Compose
To start PostgreSQL, Backend, and Frontend in unified containers:
```bash
docker-compose up -d
```

### 3. Local Development Setup

#### Contracts
```bash
cd contracts
npm install
npm run compile
npm test
```

#### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## API & Integration
- **OpenAPI Documentation**: Accessible at `http://localhost:4000/api/docs`
- **Zero-Login Public Verification**: Accessible at `http://localhost:3000/verify/:credentialId`
- **Project B Machine Verification Endpoint**: `POST /api/v1/internal/verify-credential` (Protected by `X-API-Key`)

---

## License
MIT (c) 2026 AcadShield Engineering Team
