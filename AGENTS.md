# AGENTS.md

## Project Overview

Personal portfolio and blog site built with **Next.js 15** (canary, App Router), **React 19**, **TypeScript** (strict mode), **Sanity CMS**, and **Tailwind CSS 3**. Deployed on Vercel.

## Build / Lint / Test Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run test         # Jest (all tests)
npm run test:watch   # Jest in watch mode
npm run test:ci      # Jest with --ci --coverage
npm run typegen      # Regenerate Sanity types from schema
```

Run a single test file:

```bash
npx jest path/to/file.test.ts
npx jest --testPathPattern="filename"
```

Note: `npm ci --legacy-peer-deps` is required for clean installs (peer dep conflicts exist). The CI pipeline uses this flag.

## Path Aliases

`@/*` maps to `./src/*` (defined in `tsconfig.json`). Always prefer `@/` imports over deep relative paths like `../../../`.

## Code Style Guidelines

### Formatting (Prettier)

- Double quotes (`"`)
- Semicolons required
- Trailing commas: ES5
- Tab width: 2 spaces
- Run Prettier before committing

### ESLint

Extends `next/core-web-vitals` and `next/typescript`. No additional plugins.

### Import Order

Follow this order (no auto-enforced sorting, but maintain consistency):

1. `"use client"` directive (always first line when needed)
2. React/Next.js framework imports
3. Third-party library imports
4. Internal imports using `@/` alias
5. Relative imports (avoid when `@/` alias works)
6. Side-effect imports (e.g., CSS)

Prefer named imports. Only use `import * as React` when needed for `React.forwardRef` or `React.useState` patterns.

### File Naming

- **All source files**: `kebab-case.tsx` / `kebab-case.ts`
- **Directories**: lowercase or kebab-case
- **No PascalCase or camelCase filenames**

### Component Naming & Patterns

- **PascalCase** for all component names
- **Page components**: `export default function PageName()` (function declaration)
- **Async server pages**: `export default async function PageName()`
- **Custom components**: Either `export default function Name()` or `export const Name = () => {}`
- **shadcn/ui primitives**: `React.forwardRef` pattern with `displayName` set
- Components using browser APIs or React hooks must have `"use client"` at line 1

### Types & Interfaces

- Prefer `type` for component props and simple shapes
- Use `interface` only when extending other types (e.g., `extends React.HTMLProps<HTMLDivElement>`)
- Props type naming: `{ComponentName}Props` (e.g., `CommandBlockProps`, `ShareButtonProps`)
- Page props can be typed inline in the function signature
- Auto-generated Sanity types live in `src/lib/sanity.types.ts` -- do NOT edit manually; run `npm run typegen`
- Query result types follow: `{QUERY_NAME}Result`

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Files | kebab-case | `scroll-to-top.tsx` |
| Components | PascalCase | `ScrollToTop` |
| Functions/variables | camelCase | `estimateReadTime` |
| Constants | SCREAMING_SNAKE_CASE | `POSTS_PER_PAGE` |
| Types/Interfaces | PascalCase | `BlogListProps` |
| GROQ queries | SCREAMING_SNAKE_CASE | `INDIVIDUAL_POST_QUERY` |

### Error Handling

- Use `try/catch` with `instanceof` checks for specific error types
- Use `notFound()` from `next/navigation` for missing resources in server components
- Use `assertValue()` pattern (throw on undefined) for required env vars (see `src/sanity/env.ts`)
- Use optional chaining (`?.`) defensively for nested data access
- Use `toast.error()` from Sonner for user-facing error messages in client components

### State Management

- **No external state library** -- use React `useState` for local state
- Server components fetch data directly (no client-side state for server data)
- Use React `cache()` for request deduplication across `generateMetadata` and page component
- Use `useChat` from `ai/react` for AI chat state
- Use `useTheme` from `next-themes` for theme state

### Styling

- Use Tailwind CSS utility classes; no CSS modules or styled-components
- Use `cn()` from `@/lib/utils` to merge/conditionally apply class names
- Dark mode via CSS variables and `dark:` Tailwind prefix (class strategy)
- Component variants via `class-variance-authority` (CVA) -- see `button.tsx` for pattern
- Animation: Framer Motion `motion.*` components with `variants` / `useAnimation`

## Project Structure

```
src/
  app/                    # Next.js App Router (pages, layouts, API routes)
    api/chat/route.ts     # Streaming AI chat endpoint
    blog/                 # Blog pages (server-rendered)
    contact/              # Contact page
    studio/               # Embedded Sanity Studio
  components/             # All components (flat, no subdirectories except ui/)
    ui/                   # shadcn/ui primitives (auto-generated via CLI)
  lib/                    # Utilities, constants, queries, generated types
  sanity/                 # Sanity CMS config, schemas, client
  actions/                # Server actions (currently empty)
```

## Key Patterns

### Server vs Client Components

Server components are the default. Add `"use client"` only when the component uses:
- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs (`window`, `navigator`, etc.)
- Event handlers (`onClick`, `onChange`, etc.)
- Third-party client-only libraries (Framer Motion, next-themes, etc.)

### Partial Pre-Rendering (PPR)

Enabled per-page with `export const experimental_ppr = true`. Use `<Suspense>` boundaries to stream dynamic content (e.g., view counts) while serving static shells instantly.

### Sanity CMS

- Schema types defined in `src/sanity/schemaTypes/`
- GROQ queries in `src/lib/sanity.queries.ts`
- Types auto-generated: `npm run typegen` after schema changes
- Client singleton in `src/sanity/lib/client.ts`
- Always type `client.fetch<ResultType>(QUERY, params)` calls

### Environment Variables

Required variables are listed in `.env.example`. Sanity env vars are validated at startup via `assertValue()` in `src/sanity/env.ts`. Never commit `.env.local`.
