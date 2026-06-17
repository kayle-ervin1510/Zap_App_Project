# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this app is

**Zap App** — a parental screen-time management SPA. Parents register, add child profiles, and configure per-app time restrictions (time-restricted, time-unlimited, unauthorized). The backend is a Supabase Postgres project; credentials live in `.env`.

## Commands

```bash
npm run dev        # start Vite dev server (localhost:5173)
npm run build      # production build → dist/
npm run preview    # serve the dist/ build locally
npm run lint       # ESLint
```

No test runner is configured yet. Playwright is installed (`playwright` in devDependencies) but no test files exist.

## Architecture

### Routing (`src/App.jsx`)
React Router DOM v7. Two wrapper components gate every route:
- `PublicRoute` — redirects authenticated users to `/dashboard`
- `ProtectedRoute` — redirects unauthenticated users to `/login`

Auth routes (public): `/login`, `/signup`, `/terms`, `/confirm`, `/forgot-password`

Protected routes: `/dashboard`, `/dashboard/new-child`, `/dashboard/:childId/overview`, `/dashboard/:childId/apps`, `/dashboard/:childId/edit/:appName`, `/contact`, `/profile`, `/biometrics`

### Global state (`src/context/AppContext.jsx`)
Single React context (`AppContext`) wraps the entire tree. `useApp()` is the only way components access shared state. The context owns:
- `currentUser` — the logged-in `Users` row (or `null`), restored from Supabase Auth session on page load
- `children` — array of child objects loaded from Supabase, each containing `apps`, `devices`, `stoppedApps`, and `screenTimeHistory`
- `activityLog` — in-memory log of parent actions (not persisted)
- `parentScreenTime` / child `screenTimeHistory` — **mock data** hardcoded in the context; no history table exists in the schema

`buildChildObject()` in the context merges `Parent_Profile`, `Children_Profile`, app rows, device rows, and `App_Restrictions` into a single in-memory child object that the UI works with.

`configuredRestrictions` is a `useRef<Set>` storing `"childId:appName"` strings. It controls activity-log phrasing: first call → "You set X's restrictions to…", subsequent calls → "You added an additional…". It resets on logout.

### Transport layer
Two separate transports are used — never mix them:
- **`src/lib/supabase.js`** — Supabase JS client. Used by `AppContext` directly for all Auth operations (`signInWithPassword`, `signOut`, `updateUser`, `resetPasswordForEmail`, `rpc`).
- **`src/services/api.js`** — Axios instance pointed at the Supabase REST endpoint, injects the session JWT on every request. Used by all service files for table CRUD.

### Service layer (`src/services/`)
All table interactions go through domain services — pages and the context never call `api.js` directly:

| File | Responsibility |
|---|---|
| `userService.js` | `createUser`, `findUser`, `fetchUserById`, `findUserByEmail`, `updateUser`, `deleteUser` |
| `childService.js` | `fetchChildren`, `createChild`, `updateChildName`, `deleteChild` |
| `appService.js` | CRUD for `Time_Restricted_Apps`, `Time_Unlimited_Apps`, `Unauthorized_Apps`, and `App_Restrictions` (upsert) |
| `deviceService.js` | `fetchDevicesForChild`, `addDevice`, `removeDevice` |

**Column naming gotcha:** `Time_Restricted_Apps.Edit_Time` stores the daily limit in **minutes** (not a timestamp). Default on create is 60.

### Components
`src/components/Navbar.jsx` is the only shared component. Pages import it directly — there is no layout route wrapping it.

### Pages (`src/pages/`)
One file per route. Pages call `useApp()` for data and mutations; they do not call services directly.

### Styling
Global CSS in `src/index.css` and `src/App.css`. Color scheme is derived from the Netflix show *BNA (Brand New Animal)*. No CSS framework.

## Known intentional limitations

- `screenTimeHistory` and `parentScreenTime` are hardcoded mock data — no history table exists in the schema.
- `dailyGoalMinutes` on a child is session-only (the schema stores a boolean `screen_time_goal`, not a minute count).
- `activityLog` is in-memory only and resets on page reload.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project REST URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |

Both must be prefixed `VITE_` to be exposed by Vite. Place in `Client/.env` (not committed).
