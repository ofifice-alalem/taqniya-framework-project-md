# Project Context & Architecture — [PROJECT_NAME]

# 1. Project Overview
- **Project Name:** `[PROJECT_NAME]`
- **Domain / Industry:** `[DOMAIN_INDUSTRY]`
- **Project Type:** `[e.g., Web App | API Service | CLI Tool | Mobile Client | Desktop App | Serverless / Cloud Functions | Library / SDK | Data System | Custom]`
- **Purpose & Vision:** `[BRIEF_PROJECT_PURPOSE]`
- **Target Audience:** `[PRIMARY_USERS_OR_CLIENTS]`
- **Repository URL:** `[GIT_REPOSITORY_URL]`

---

## 2. Technology Stack & Profile Declaration (Reference stack.yaml)
*Note: Authoritative technology, framework, and tooling declarations are maintained in `PROJECT/MD/stack.yaml`.*

- **Stack Configuration File:** `[PROJECT/MD/stack.yaml]`
- **Active Technology Profile(s):** `[e.g., 06_stack_profiles/backend/laravel/ | 06_stack_profiles/backend/fastapi/ | None (Core Only)]`
- **Primary Runtime & Framework:** `[Summary from stack.yaml]`
- **Storage / Data Engine:** `[Summary from stack.yaml (if applicable)]`
- **Testing Tools:** `[Summary from stack.yaml]`

---

## 3. Environments & Deployment (Where Applicable)

| Environment | Host / Endpoint | Branch | Storage Target |
| :--- | :--- | :--- | :--- |
| **Local (Dev)** | `[http://localhost:PORT / local path]` | `[feature/*]` | `[local_storage / local_db]` |
| **Staging** | `[https://staging.example.com]` | `[develop / staging]` | `[staging_storage / staging_db]` |
| **Production** | `[https://app.example.com]` | `[main]` | `[production_storage / production_db]` |

---

## 4. Project Architecture

- **Selected Architecture Style:** `[e.g., Layered (N-Tier) | Clean / Hexagonal | Modular Monolith | Event-Driven / CQRS | Microservices | Serverless | Functional | Custom]`
- **Architectural Boundaries:** `[Define subsystem/module boundaries and ingress points]`
- **Dependency Direction:** `[Define dependency flow, e.g., Ingress -> Core Domain -> Infrastructure]`
- **Major Components / Modules:** `[List principal modules, packages, or services]`
- **Key Architectural Constraints:** `[Specific project constraints, invariants, or performance requirements]`
