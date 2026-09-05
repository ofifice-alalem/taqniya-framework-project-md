# NestJS Stack Specifications & Runtime Governance

# Purpose
Defines runtime environments, engine versions, package managers, and toolchains for NestJS applications under the Taqniya Framework.

---

## 1. Runtime & Ecosystem Baseline

| Dimension | Specification | Approved Values |
| :--- | :--- | :--- |
| **Node Runtime** | Active LTS | Node.js `>= 20.x LTS` (Node 20 or Node 22) |
| **Framework Version** | NestJS | NestJS `10.x` |
| **Language** | TypeScript | TypeScript `>= 5.x` |
| **Package Manager** | Deterministic | `npm` (with `package-lock.json`) or `pnpm` (with `pnpm-lock.yaml`) |
| **HTTP Platform Engine** | Dual Supported | `@nestjs/platform-express` (Default) or `@nestjs/platform-fastify` |
| **Build & Bundler** | CLI Compiler | `@nestjs/cli` using `swc` (high performance) or `tsc` |
| **Configuration** | Centralized | `@nestjs/config` with typed schemas and validation |

---

## 2. Compiler & TypeScript Standards (`tsconfig.json`)

All NestJS projects MUST maintain strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## 3. Standard Project Directory Topology

NestJS applications MUST organize code into feature-driven modular domains:

```text
src/
├── app.module.ts              # Root Application Module
├── main.ts                    # Bootstrap entrypoint (CORS, Global Pipes, Swagger, Helmet)
│
├── common/                    # Shared Cross-Cutting Utilities
│   ├── decorators/            # Custom decorators (@CurrentUser, @Roles, @Public)
│   ├── filters/               # Global exception filters (HttpExceptionFilter)
│   ├── guards/                # Global / Shared guards (JwtAuthGuard, RolesGuard)
│   ├── interceptors/          # Global interceptors (LoggingInterceptor, TransformInterceptor)
│   ├── middleware/            # Global middleware (CorrelationIdMiddleware)
│   └── pipes/                 # Global validation pipes
│
├── config/                    # Environment & configuration modules
│   ├── configuration.ts       # Typed config loader
│   └── validation.schema.ts   # Joi / Zod validation schema for .env
│
├── database/                  # Database persistence layer
│   ├── prisma.service.ts      # Prisma client lifecycle management (or TypeORM)
│   └── prisma.module.ts       # Global database module
│
└── modules/                   # Feature Domains (1 Module per Functional Subsystem)
    ├── auth/                  # Authentication & Identity module
    ├── users/                 # Users management module
    └── [feature]/             # Domain feature module
        ├── [feature].module.ts
        ├── [feature].controller.ts
        ├── [feature].service.ts
        ├── dto/
        │   ├── create-[feature].dto.ts
        │   └── update-[feature].dto.ts
        └── entities/
            └── [feature].entity.ts
```

---

## 4. Verification Checklist
1. Verify `node -v` outputs Node.js 20.x or 22.x.
2. Confirm `tsconfig.json` enforces `noImplicitAny: true` and `strictNullChecks: true`.
3. Confirm `@nestjs/config` validates environment variables on application bootstrap.
4. Verify lockfiles (`package-lock.json` or `pnpm-lock.yaml`) are committed.
