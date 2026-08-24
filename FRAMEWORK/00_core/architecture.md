# Universal Architecture Principles & Structural Governance

# Purpose
This document defines the universal architectural principles, boundary rules, and coupling constraints governing all applications under the Taqniya Framework. It enforces maintainability, high cohesion, low coupling, and clear separation of concerns across any chosen architectural style.

# Scope
Applies to backend, frontend, CLI, distributed, serverless, and cloud architectures across all programming languages. The specific architectural style for a project is a **Project Decision**, documented in `PROJECT/MD/README.md` and `PROJECT/MD/business_rules.md`.

---

## 1. Universal Architectural Principles

Regardless of whether a project adopts a Layered, Clean/Hexagonal, Modular Monolith, Event-Driven, Microservices, Serverless, Functional, or Custom architectural style, all codebases MUST adhere to these universal engineering principles:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   UNIVERSAL ARCHITECTURAL PRINCIPLES                   │
├────────────────────────────────────────────────────────────────────────┤
│  1. Explicit Boundaries: Clear isolation between distinct subsystems   │
│  2. Separation of Concerns: Distinct responsibilities across modules  │
│  3. Dependency Direction: High-level policies decoupled from I/O       │
│  4. Clear Ownership: Single, cohesive responsibility per component    │
│  5. Controlled Coupling: Minimized direct inter-module dependencies    │
│  6. High Testability: Domain logic isolated from external side-effects │
│  7. Security Boundaries: Authentication & authorization at perimeter   │
│  8. Appropriate Abstraction: Anti-overengineering (YAGNI & KISS)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Pluggable Architectural Styles (Project-Defined)

Taqniya Core does NOT mandate a single architectural pattern. Projects choose and document their preferred architecture:

| Architecture Style | Core Structural Concept | Typical Use Cases |
| :--- | :--- | :--- |
| **Layered (N-Tier)** | Interface ➔ Domain / Application ➔ Persistence ➔ Storage | Traditional web apps, standard CRUD services |
| **Clean / Hexagonal** | Domain Core (Entities & Use Cases) surrounded by Ports & Adapters | Complex enterprise domain logic, decoupled I/O |
| **Modular Monolith** | Bounded context modules with explicit public interface contracts | Monorepos and single-deploy scaling systems |
| **Event-Driven / CQRS** | Asynchronous message queues, event emitters, separate read/write models | High-throughput, reactive, or distributed apps |
| **Microservices / Serverless** | Decentralized, autonomous services or cloud functions | Distributed cloud-native systems |
| **Functional / Dataflow** | Pure domain functions, immutable data structures, pipelines | Data pipelines, CLI utilities, reactive UI trees |
| **Custom / Hybrid** | Tailored architectural boundaries meeting unique project constraints | Domain-specific or specialized platforms |

---

## 3. System Communication Modes & Transport Architecture

How the frontend and backend communicate is an authoritative architectural decision declared in `PROJECT/MD/stack.yaml` (`architecture.communication.mode`). The AI Agent MUST strictly adhere to the operational rules of the declared mode:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SYSTEM COMMUNICATION ARCHITECTURE MODES                         │
├─────────────────┬───────────────────────────────┬──────────────────────────────────────┤
│ Mode            │ Data Transport Mechanism      │ State, Auth & AI Implementation Rule │
├─────────────────┼───────────────────────────────┼──────────────────────────────────────┤
│ 1. DIRECT       │ In-process context / props    │ • Session cookies & CSRF tokens      │
│ (Monolith /     │ (Blade views, Inertia props,  │ • Zero redundant REST API endpoints  │
│  Inertia)       │  Server Actions, SSR context) │ • Direct Controller-to-View rendering│
├─────────────────┼───────────────────────────────┼──────────────────────────────────────┤
│ 2. API-FIRST    │ Decoupled network transport   │ • Stateless Bearer Tokens / OAuth2   │
│ (SPA / Mobile / │ (REST JSON endpoints, GraphQL,│ • Contractual JSON Resources & Schemas│
│  Microservices) │  gRPC, OpenAPI 3.1)           │ • Strict CORS & HTTP Error Envelopes │
├─────────────────┼───────────────────────────────┼──────────────────────────────────────┤
│ 3. HYBRID       │ Dual-channel architecture     │ • Web: Direct Controllers + Sessions │
│ (Direct Web +   │ (Direct web channel + formal  │ • API: /api/v1 Controllers + Tokens  │
│  Mobile/API)    │  REST API for mobile/partners)│ • Shared Actions/Services logic layer │
└─────────────────┴───────────────────────────────┴──────────────────────────────────────┘
```

### Detailed Operational Rules by Mode:

#### A. Direct Mode (`mode: "direct"`)
* **When Used:** Monolithic server-rendered frameworks (e.g., Laravel Blade, Django templates) or Monolith-to-SPA bridges (e.g., Laravel + Inertia.js with React/Vue, Next.js Server Components/Actions).
* **Data Flow:** The backend controller directly passes models, view-models, or typed props to the view.
* **Authentication:** Stateful session cookies, CSRF protection, and session-based access guards.
* **Mandatory AI Rule:** The AI Agent **MUST NOT** generate redundant REST API controllers, API Resource classes, or stateless Bearer Token boilerplate for web views when `mode: direct` is declared.

#### B. API-First Mode (`mode: "api_first"`)
* **When Used:** Fully decoupled architectures (e.g., Node.js + Vue SPA, FastAPI + React SPA, Go API + Svelte, mobile apps).
* **Data Flow:** All client data fetching occurs via explicit, contractual HTTP endpoints delivering JSON/Protobuf payloads.
* **Authentication:** Stateless authentication (Bearer Tokens, JWTs, API Keys, OAuth2) with explicit CORS origin policies.
* **Mandatory AI Rule:** All endpoints MUST use structured resource transformers (e.g., `JsonResource`, Pydantic serializers) and return standardized HTTP status codes and error envelopes.

#### C. Hybrid Mode (`mode: "hybrid"`)
* **When Used:** Multi-channel platforms (e.g., Laravel serving web directly via Blade/Inertia, alongside dedicated REST API endpoints for Mobile Apps or third-party partners).
* **Data Flow & Routing:** Strict separation between Web and API ingress:
  * `/web` routes ➔ Direct Presentation Controllers (Session Auth, CSRF, direct view/props rendering).
  * `/api/v1` routes ➔ Dedicated API Controllers (Bearer Token Auth, Rate Limiting, JSON Resources).
* **Mandatory AI Rule:** The AI Agent **MUST** share the underlying Domain & Application layer (Actions, Services, Repositories), but **MUST NOT** mix Web Controllers with API Controllers or pollute web sessions with stateless API logic.

---

## 4. Universal Structural Boundaries & Backend Layer Flow

Regardless of the chosen architectural style, all backend implementations MUST maintain explicit boundary separation across these canonical layers:

```text
[ Incoming Request / Event / Client Payload ]
                   │
                   ▼
┌────────────────────────────────────────────────────────┐
│ 1. Ingress, Routing & Perimeter Security               │
│    (Routes, Perimeter Middleware, Auth Token Guard)    │
└──────────────────┬─────────────────────────────────────┘
                   │ Validates input payload
                   ▼
┌────────────────────────────────────────────────────────┐
│ 2. Input Validation & DTO Boundary                     │
│    (Form Requests, Schemas, Validated Typed DTOs)      │
└──────────────────┬─────────────────────────────────────┘
                   │ Passes validated DTO to
                   ▼
┌────────────────────────────────────────────────────────┐
│ 3. Presentation Layer (Thin Controllers / Handlers)    │
│    (HTTP Controllers, RPC Handlers, Resolvers)         │
└──────────────────┬─────────────────────────────────────┘
                   │ Invokes Action / Service
                   ▼
┌────────────────────────────────────────────────────────┐
│ 4. Domain & Application Layer (Actions / Services)     │
│    (Business Logic, Transaction Management, Events)    │
└──────────────────┬─────────────────────────────────────┘
                   │ Queries / Persists via
                   ▼
┌────────────────────────────────────────────────────────┐
│ 5. Data Access Layer (Repositories / Query Handlers)   │
│    (Data Abstraction, Persistence Mechanics)          │
└──────────────────┬─────────────────────────────────────┘
                   │ Reads / Writes
                   ▼
┌────────────────────────────────────────────────────────┐
│ 6. Storage Engine, Models & Schemas                    │
│    (Entities, Models, DB Tables, Documents)           │
└────────────────────────────────────────────────────────┘
```

### A. Ingress, Routing & Input Validation
- **Role:** Accept incoming transport requests; enforce perimeter authentication/authorization; and parse/validate raw inputs into strongly-typed Data Transfer Objects (DTOs).
- **Rule:** Input validation MUST happen before domain logic execution. Invalid inputs must fail fast with standard error payloads.

### B. Presentation Layer (Thin Controllers / Handlers)
- **Role:** Transport orchestration ONLY (HTTP status codes, header parsing, DTO instantiation, response formatting, and view rendering).
- **Rules:**
  - **MUST:** Remain thin and focused on HTTP/transport concerns.
  - **MUST NOT:** Execute direct database queries (`SQL`, raw queries, ORM builder chains) inside controllers or handlers.
  - **MUST NOT:** Contain core business formulas, financial calculations, or domain state decisions.

### C. Domain & Application Layer (Actions & Services)
- **Role:** Encapsulate core business logic, status transitions, calculations, and external side-effects.
- **Rules:**
  - **MUST:** Wrap multi-entity or multi-table mutations in atomic database transactions (`ACID`).
  - **SHOULD:** Prefer single-purpose Action classes/functions (`CreateOrder`, `CancelSubscription`) over massive multi-thousand-line monolithic service files.
  - **SHOULD:** Dispatch domain events for asynchronous side-effects (notifications, webhooks, audit logs).

### D. Data Access Layer (Repositories & Query Builders)
- **Role:** Encapsulate querying, filtering, and persistence mechanics behind clear interface contracts.
- **Rules:**
  - **MUST:** Isolate persistence details (ORM syntax, SQL generation) from domain services.
  - **MUST NOT:** Contain business decision logic (e.g., checking discount eligibility).

### E. Infrastructure & External System Boundaries
- **Role:** Abstract external third-party APIs, payment gateways, message brokers, file systems, and hardware drivers.
- **Rule:** Isolate third-party SDKs behind internal adapters/interfaces to prevent vendor lock-in and enable deterministic test mocking.

---

## 4. Dependency Direction & Modularity Rules
- **MUST:** Avoid circular dependencies between modules or packages.
- **MUST NOT:** Allow external transport details (e.g., specific HTTP header names) to leak into core domain entities.
- **SHOULD:** Depend on stable abstractions or explicit interface contracts at subsystem boundaries.

---

## 5. Anti-Overengineering Mandate (YAGNI & Simplicity)
- **MUST NOT:** Introduce complex architectural patterns (e.g., full CQRS or deep multi-layer adapter hierarchies) for simple, straightforward tasks without documented necessity.
- **MUST NOT:** Speculate on theoretical future requirements.
- **SHOULD:** Choose the simplest robust architecture that satisfies the active project requirements.

# Verification
1. Audit modified files against the project's declared architectural style in `PROJECT/MD/`.
2. Confirm interface handlers remain thin and delegate to domain logic.
3. Verify zero circular dependencies exist between modified modules.
4. Verify domain logic is decoupled from external transport payloads.
