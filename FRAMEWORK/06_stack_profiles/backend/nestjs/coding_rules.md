# NestJS Coding Standards & TypeScript Hygiene

# Purpose
Defines coding conventions, type safety standards, naming rules, and validation practices for NestJS codebases under the Taqniya Framework.

---

## 1. Strict Typing & Anti-`any` Mandate

- **MUST:** All function parameters, return types, class properties, and DTO fields MUST have explicit TypeScript type signatures.
- **MUST NOT:** Using `any` is STRICTLY FORBIDDEN.
- **Rule:** If the shape of incoming data is unknown, use `unknown` and narrow the type using type guards or validation schemas before accessing properties.
- **Rule:** Avoid non-null assertions (`!`) unless operating on verified array lookups where bounds are proven.

```typescript
// ❌ FORBIDDEN
async findUser(id: any): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user;
}

// ✅ APPROVED
async findUser(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }
    return new UserEntity(user);
}
```

---

## 2. Naming & File Conventions

| Component | File Naming Pattern | Class / Identifier Pattern | Example |
| :--- | :--- | :--- | :--- |
| **Module** | `[name].module.ts` | `[Name]Module` (PascalCase) | `auth.module.ts` ➔ `AuthModule` |
| **Controller** | `[name].controller.ts` | `[Name]Controller` (PascalCase) | `users.controller.ts` ➔ `UsersController` |
| **Service** | `[name].service.ts` | `[Name]Service` (PascalCase) | `grades.service.ts` ➔ `GradesService` |
| **DTO** | `[action]-[name].dto.ts` | `[Action][Name]Dto` (PascalCase) | `create-user.dto.ts` ➔ `CreateUserDto` |
| **Entity** | `[name].entity.ts` | `[Name]Entity` (PascalCase) | `student.entity.ts` ➔ `StudentEntity` |
| **Guard** | `[name].guard.ts` | `[Name]Guard` (PascalCase) | `roles.guard.ts` ➔ `RolesGuard` |
| **Interceptor** | `[name].interceptor.ts` | `[Name]Interceptor` (PascalCase) | `audit.interceptor.ts` ➔ `AuditInterceptor` |
| **Pipe** | `[name].pipe.ts` | `[Name]Pipe` (PascalCase) | `parse-date.pipe.ts` ➔ `ParseDatePipe` |

---

## 3. Data Transfer Objects (DTOs) & Validation Pipe

All incoming payloads (body, query, params) MUST be validated through DTOs using `class-validator` and `class-transformer`:

### Global Validation Pipe Setup (`main.ts`):
```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,               // Strip unvalidated / extra properties
    forbidNonWhitelisted: true,    // Throw error if extra fields sent
    transform: true,               // Automatically transform primitives (e.g. string to number)
    transformOptions: {
      enableImplicitConversion: false,
    },
  }),
);
```

### DTO Implementation Pattern:
```typescript
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'ADM-1001', description: 'Institutional unique user code' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  readonly userCode: string;

  @ApiProperty({ example: 'Ahmed Ali', description: 'Full user name' })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiPropertyOptional({ example: 'user@school.edu', description: 'Official email' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
```

---

## 4. Semantic Exception Handling

- **MUST:** Throw semantic NestJS HTTP exceptions from `@nestjs/common` rather than generic `Error` objects:
  - `NotFoundException` (404) for missing entities.
  - `ConflictException` (409) for duplicate unique records.
  - `BadRequestException` (400) for business invariant violations.
  - `ForbiddenException` (403) for permission or tenancy violations.
  - `UnauthorizedException` (401) for invalid credentials or expired tokens.
- **MUST NOT:** Swallowing exceptions with empty `catch {}` blocks is strictly forbidden.

---

## 5. Verification Checklist
1. Confirm zero instances of `any` across newly authored code.
2. Confirm all DTOs use `class-validator` decorators and match `routes.md` parameter schemas.
3. Confirm global `ValidationPipe` is registered in `main.ts` with `whitelist: true`.
4. Run `npm run lint` with zero ESLint/Prettier warnings or errors.
