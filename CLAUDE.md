# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start              # Serve on localhost:4200
ng test                # Unit tests (Karma)
ng build --configuration=production  # Production build to dist/

# Docker
make build             # Build Docker image (tgkaiser/financ-angular:1.5.0, linux/amd64)
make push              # Push image to registry
make deploy            # build + push
```

There is no lint script configured.

## Architecture

**Personal finance tracker** (categories, accounts, expenses) with a Spring REST backend. Angular module-based (non-standalone), locale pt-BR.

### Module / Routing Structure

```
AppModule (root)
├── SharedModule (forRoot) — shared components, interceptors, services
├── DashboardModule — layout shell (header, menu, body, footer)
└── Lazy-loaded feature modules (all routes under loggedInGuard):
    ├── /financ → FinancModule  — Categoria, Conta, Despesa CRUD
    ├── /security → SecurityModule — Login, register, profile (no auth guard)
    └── /admin → AdminModule — User management (loggedInGuard)
```

Default redirect is `/financ/home`. Unmatched routes go to `NotFoundComponent`.

### CRUD Pattern

All entity services extend `CrudService<T>` ([src/app/financ/shared/crud.service.ts](src/app/financ/shared/crud.service.ts)), which provides `list()`, `loadByID()`, `create()`, `update()`, `save()`, `remove()`. Feature services add entity-specific endpoints on top.

Each entity has four route variants (`/`, `/novo`, `/editar/:id`, `/detalhe/:id`) and a corresponding **Resolver Guard** that pre-fetches data before the route activates — returning an empty object for new records and fetching the entity for edits/details.

### Authentication

- JWT stored in `localStorage` as `sessionToken`; decoded via `jwt-decode`
- `AuthInterceptor` attaches `Authorization: Bearer <token>` to every request and manages the global loading spinner
- `ApplicationErrorHandler` (custom `ErrorHandler`) auto-logs out on 401/403 and maps HTTP errors to Portuguese user messages
- `LoginService.isAdmin()` drives role-based UI visibility (menu items); no route guard enforces admin role beyond `loggedInGuard`

### Global Services

| Service | Purpose |
|---|---|
| `LoadingService` | BehaviorSubject powering the global progress spinner |
| `NotificationService` | EventEmitter → snackbar toasts |
| `ApplicationErrorHandler` | Catches HTTP errors, translates to Portuguese, handles 401/403 logout |

### Environment / Backend

- **Dev:** `http://localhost:8080/`
- **Prod:** `https://backend.thiagokaiser.com.br/`

Switched via `fileReplacements` in [angular.json](angular.json). No proxy config.

### Styles

- Angular Material (indigo-pink theme)
- Bootstrap 3 + jQuery + jQuery UI (legacy)
- AdminLTE dashboard CSS (in `src/app/dashboard/dist/`)
- Font Awesome icons

Templates use Angular's newer control-flow syntax (`@if`, `@else`, `@for`).
