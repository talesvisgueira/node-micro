# AGENTS.md

## Monorepo — pnpm workspace

- **Manager**: pnpm v11.8.0
- **Install**: `pnpm install` at root
- **Workspace**: `libs/*`, `apps/*` (in `pnpm-workspace.yaml`)
- **Local deps**: `@myorg/core` → `libs/core/`, `@myorg/events` → `libs/events/` (linked via `"link:"` in root `package.json`)
- **No root tsconfig** — each package manages its own
- **No CI/CD** — no GitHub Actions workflows

## Commands

Run from root or filtered to a package:
```sh
pnpm start                              # starts all services in parallel (gateway, users, payments, products, checkouts, loggers, web, filial)
pnpm start:dev                          # starts gateway + users + loggers only
pnpm --filter <name> start              # single service (e.g. pnpm --filter gateway start)
pnpm build                              # builds all (pnpm recursive run build)
pnpm test                               # tests all (pnpm recursive run test)
pnpm --filter <name> test               # single package tests
pnpm --filter <name> test:unit          # unit tests only
pnpm --filter <name> test:e2e           # e2e tests only
pnpm --filter <name> test:cov           # coverage
pnpm run stop                           # kills all node processes
```

## Architecture

| Directory | Type | Framework | Port | Notes |
|-----------|------|-----------|------|-------|
| `apps/gateway/` | NestJS backend | NestJS 11 / Express | 3000 | API gateway, auth, proxy, circuit-breaker, Swagger |
| `apps/users/` | NestJS backend | NestJS 11 / Express | — | User mgmt, TypeORM + PostgreSQL, bcrypt, JWT, RabbitMQ |
| `apps/products/` | NestJS backend | NestJS 11 / Express | — | Products CRUD |
| `apps/payments/` | NestJS backend | NestJS 11 / Express | — | Payments |
| `apps/checkouts/` | NestJS backend | NestJS 11 / Express | — | Checkout/cart |
| `apps/loggers/` | NestJS backend | NestJS 11 / Express | — | Audit log, TypeORM + PostgreSQL, RabbitMQ consumer |
| `apps/web/` | Next.js frontend | Next.js 16 / React 19 | 4201 | Tailwind CSS v4 |
| `apps/filial/` | Angular frontend | Angular 22 | 4200 | Bootstrap 5, ng-bootstrap, **standalone components** |
| `apps/observability/` | Docker Compose | Prometheus + Grafana | — | Monitoring infra |
| `apps/brokers/` | Docker Compose | RabbitMQ 4 | — | Message broker |
| `libs/core/` | NestJS library | NestJS 11 | — | Shared decorators (JWT, Passport, Config) |
| `libs/events/` | NestJS library | NestJS 11 | — | AMQP event publish/subscribe layer |

## Testing — vitest (v4.x)

- All NestJS apps and both libs use vitest directly — **no vitest config file** (all CLI flags)
- Run `vitest run --dir tests` from the package directory
- Sub-commands: `test:unit`, `test:e2e`, `test:ui`, `test:cov`
- Angular (`apps/filial/`): test via `ng test` (uses `@angular/build:unit-test` with jsdom)

## Angular conventions (`apps/filial/`)

See `apps/filial/.github/copilot-instructions.md` (also mirrored in `.gemini/GEMINI.md`). Key rules:
- Standalone components only (default in Angular 22) — do **not** set `standalone: true`
- `OnPush` change detection is default — do **not** set it explicitly
- Use signals (`input()`, `output()`, `computed()`, signal forms)
- Use `@Service` decorator for singletons (Angular 22+)
- Use `inject()` instead of constructor injection
- Native control flow (`@if`, `@for`, `@switch`) — no `*ngIf`, `*ngFor`
- No `ngClass`/`ngStyle` — use `class`/`style` bindings
- No `@HostBinding`/`@HostListener` — use `host` object in decorator

## Infrastructure (Docker Compose)

- `apps/observability/`: `docker compose up` for Prometheus + Grafana
- `apps/brokers/`: `docker compose up` for RabbitMQ 4 (management UI on port 15672)
- No Dockerfiles for the NestJS apps themselves

## Notes

- `.env` files are git-ignored; each app may have its own `.env` for local dev
- `apps/gateway/.env.exampe` has a typo in the filename (should be `.env.example`)
- Prettier + ESLint v9 configured per NestJS package (no root config)
