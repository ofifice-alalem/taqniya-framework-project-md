# NestJS Testing Strategy & Verification Standards

# Purpose
Establishes testing guidelines, test isolation practices, unit testing patterns, and end-to-end (E2E) verification for NestJS applications under the Taqniya Framework.

---

## 1. Test Categorization in NestJS

```text
               / \
              / E2E \             ◄── Supertest + INestApplication (Full HTTP Lifecycles)
             /-------\
            / Feature \           ◄── Integration tests with test database / container
           /-----------\
          /  Unit Tests \         ◄── Service & Logic isolation via Test.createTestingModule
         /---------------\
```

---

## 2. Unit Testing Services (`*.service.spec.ts`)

Services MUST be tested in isolation by mocking external dependencies (`PrismaService`, external APIs):

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../database/prisma.service';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should throw ConflictException if user code already exists', async () => {
    // Arrange
    mockPrisma.user.findUnique.mockResolvedValue({ id: 1, userCode: 'ADM-1001' });

    // Act & Assert
    await expect(
      service.createUser({ userCode: 'ADM-1001', fullName: 'Test Admin' }),
    ).rejects.toThrow(ConflictException);
  });
});
```

---

## 3. End-to-End (E2E) Testing (`test/*.e2e-spec.ts`)

E2E tests verify the complete HTTP request lifecycle using `supertest`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/auth/login (POST) - Valid credentials return tokens', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ userCode: 'ADM-1001', password: 'ValidPassword123!' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toHaveProperty('accessToken');
        expect(res.body.data).toHaveProperty('user');
      });
  });

  it('/api/v1/auth/login (POST) - Invalid credentials return 401', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ userCode: 'ADM-1001', password: 'WrongPassword' })
      .expect(401);
  });
});
```

---

## 4. Test Quality Guidelines
- **AAA Pattern:** Structure tests clearly into `Arrange`, `Act`, `Assert`.
- **Determinism:** Tests must pass in any order without inter-test dependencies or shared mutable state.
- **Mocking Boundaries:** Never make actual external network calls (payment gateways, external SMS) in automated test runs.
- **Fast Execution:** Unit test suites should execute in seconds.

---

## 5. Verification Checklist
1. Run `npm run test` with 100% passing tests.
2. Confirm new business rules have unit tests covering success, failure, and edge cases.
3. Run `npm run test:e2e` for critical auth and data mutation workflows.
