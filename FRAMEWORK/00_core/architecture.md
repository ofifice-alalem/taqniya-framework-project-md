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

## 3. Universal Structural Boundaries & Separation of Concerns

Regardless of the chosen architectural style, all implementations MUST maintain explicit boundary separation:

### A. Ingress & Interface Boundaries
- **Role:** Accept incoming requests, events, CLI commands, or UI interactions; validate input payloads; delegate execution; and serialize responses.
- **Rule:** Interface handlers MUST remain focused on transport orchestration. They MUST NOT contain core business formulas, raw query executions, or domain state decisions.

### B. Domain & Core Logic Boundaries
- **Role:** Encapsulate business rules, domain invariants, workflow coordination, and state transitions.
- **Rule:** Core business logic MUST remain decoupled from low-level transport mechanisms (e.g., avoid passing raw HTTP request objects into domain functions).

### C. Infrastructure & External System Boundaries
- **Role:** Abstract persistence engines, external third-party APIs, message brokers, file systems, and hardware drivers.
- **Rule:** Isolate query construction, caching mechanics, and third-party API communication behind clear interfaces or modules.

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
