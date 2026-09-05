# NestJS Security, Authentication & Defense-in-Depth Standards

# Purpose
Establishes enterprise security benchmarks, authentication strategies, role-based access control (RBAC), and injection prevention for NestJS applications under the Taqniya Framework.

---

## 1. Authentication Architecture (JWT & Passport)

NestJS applications implement stateless authentication using `@nestjs/passport` and `passport-jwt`:

```text
[ Client Request with Header: Authorization: Bearer <token> ]
                          │
                          ▼
              [ JwtAuthGuard (CanActivate) ]
                          │
                          ▼
            [ JwtStrategy (PassportStrategy) ]
       (Verifies signature, expiration & extracts payload)
                          │
                          ▼
         Attaches payload to Request: `req.user`
```

### Password Hashing Standards:
- **MUST:** Hash passwords using `argon2id` (via `argon2` package) or `bcrypt` (minimum 12 salt rounds).
- **MUST NOT:** Plaintext, MD5, or SHA-1 hashes are STRICTLY FORBIDDEN.

---

## 2. Authorization & Role-Based Access Control (RBAC)

All endpoints default to **"Access Denied"** unless explicitly authorized by guards:

### A. Roles Decorator (`common/decorators/roles.decorator.ts`):
```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

### B. Roles Guard (`common/guards/roles.guard.ts`):
```typescript
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles restricted
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: User identity not found');
    }

    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(`Access denied: Requires one of [${requiredRoles.join(', ')}]`);
    }

    return true;
  }
}
```

### C. IDOR Defense (Insecure Direct Object References):
- When a user accesses an entity by `:id`, the service MUST verify that the entity belongs to the authenticated tenant, user, or authorized relationship:
  - **Teacher:** Can only access classes and subjects assigned to their `teacherId`.
  - **Student:** Can only view their own grades and enrolled section.
  - **Parent:** Can only view data of children linked to their `guardianId`.

---

## 3. Perimeter Defenses & Rate Limiting

### A. Helmet & CORS (`main.ts`):
```typescript
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(helmet());

  // Strict CORS Policy
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
```

### B. Rate Limiting (`@nestjs/throttler`):
Protect sensitive endpoints (e.g. login, password reset) from brute-force attacks:
```typescript
// In AppModule:
ThrottlerModule.forRoot([
  {
    name: 'short',
    ttl: 60000, // 1 minute
    limit: 10,   // max 10 requests per minute on sensitive endpoints
  },
]);
```

---

## 4. Secrets Management

- **MUST NOT:** Never commit `.env` or hardcode API keys, database credentials, or JWT secrets in source code.
- **MUST:** Load secrets via `@nestjs/config` with validation on startup.

---

## 5. Verification Checklist
1. Verify all private endpoints are protected by `JwtAuthGuard` and appropriate `RolesGuard`.
2. Verify rate limiting is enabled on `/api/v1/auth/login`.
3. Confirm passwords are hashed with `argon2` or `bcrypt` (12+ rounds).
4. Verify helmet is loaded in `main.ts`.
