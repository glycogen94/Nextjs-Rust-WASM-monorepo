# AI Coding Assistant Guidelines

This document provides context for AI coding assistants (like Claude Code, ChatGPT, etc.) to help them generate code that aligns with the structure, conventions, and "vibe" of this project.

## Purpose

The goal is to ensure that AI-generated code is consistent with the existing codebase, follows established patterns, and utilizes the chosen technology stack correctly.

## Core Principles & Project Vibe

*   **Modularity:** Code should be organized into logical modules and components within the `apps/` and `packages/` structure.
*   **Type Safety:** Leverage TypeScript and Rust's type systems. Avoid `any` where possible. Use explicit types.
*   **Readability:** Write clear, understandable code with meaningful variable names and comments where necessary.
*   **Consistency:** Follow the established linting, formatting, and architectural patterns.
*   **Performance:** Utilize Rust/WASM for computationally intensive tasks where appropriate, keeping frontend bundles lean.

## Technology Stack & Conventions

Please adhere to the following conventions when generating code:

1.  **Package Manager:**
    *   Use **`pnpm` (v10+ recommended)**.
    *   Manage dependencies within workspaces defined in `pnpm-workspace.yaml`.
    *   Add dependencies to specific packages using `pnpm add <dependency> -F <package-name> [--save-dev]`.
    *   Add root dev dependencies using `pnpm add <dependency> -w --save-dev`.
    *   Reference internal workspace packages using the `workspace:*` protocol (e.g., `"my-app": "workspace:*"`).

2.  **Monorepo:**
    *   Managed by **`Turborepo`**. Configuration is in `turbo.json`.
    *   **`apps/`**: Contains runnable applications (e.g., `apps/web` for the Next.js app).
    *   **`packages/`**: Contains shared libraries, utilities, or logic (e.g., `packages/wasm-lib`, `packages/tsconfig`).

3.  **Linting & Formatting:**
    *   **`Biome`** is the single source of truth for JavaScript/TypeScript linting and formatting. Configuration is in `biome.json`.
    *   **`rustfmt`** and **`clippy`** are used for Rust code.
    *   **Always** ensure generated code conforms to Biome rules. Run `pnpm run format` and `pnpm run lint` to check/fix.

4.  **Frontend Framework:**
    *   **`Next.js`** (using the **App Router**).
    *   Code resides primarily in `apps/web/app/`.
    *   Clearly distinguish between **Server Components** (default) and **Client Components** (using the `"use client";` directive at the top of the file). Reserve Client Components for interactive UI that needs browser APIs or React hooks like `useState`, `useEffect`.
    *   Use file-based routing within the `app/` directory.

5.  **Styling:**
    *   **`Tailwind CSS`**. Use utility classes directly in JSX/TSX.
    *   Configuration is in `apps/web/tailwind.config.ts`.
    *   Shared Tailwind presets can be placed in `packages/config/`.

6.  **UI Components:**
    *   Use **`Shadcn UI`**. Components are **not** installed as a library but added directly as source code into `apps/web/components/ui/` via the Shadcn CLI (`pnpm dlx shadcn-ui@latest add ...`).
    *   Import components from `@/components/ui/...`.
    *   Use **`Lucide React`** for icons. Import icons directly: `import { IconName } from 'lucide-react';`.

7.  **Rust / WebAssembly (WASM):**
    *   Rust code intended for WASM resides in `packages/wasm-lib/src/`.
    *   Use **`wasm-bindgen`** attributes (`#[wasm_bindgen]`) to expose functions and types to JavaScript.
    *   Rust dependencies are managed in `packages/wasm-lib/Cargo.toml`.
    *   Build WASM using **`wasm-pack`** (`wasm-pack build --target web`). The output goes to `packages/wasm-lib/pkg/`.
    *   Load the WASM module **dynamically** on the **client-side** within the Next.js app (typically inside a `"use client";` component or `useEffect`) using `import('your-wasm-package-name')`. See `apps/web/lib/wasmLoader.ts`.

8.  **Testing:**
    *   **React Unit/Integration:** Use **`Vitest`** and **`React Testing Library`**. Test files are typically located in `apps/web/__tests__` or colocated with components (`*.test.tsx`). Configuration: `apps/web/vitest.config.ts`.
    *   **End-to-End (E2E):** Use **`Playwright`**. Test files are in `apps/web/tests/`. Configuration: `apps/web/playwright.config.ts`.
    *   **Rust Unit Tests:** Use standard `#[test]` functions within `packages/wasm-lib/src/`. Run with `cargo test` inside `packages/wasm-lib`.
    *   **WASM Integration Tests:** Use **`wasm-bindgen-test`**. Test files are in `packages/wasm-lib/tests/`. Run with `wasm-pack test --headless ...` inside `packages/wasm-lib`.

9.  **TypeScript:**
    *   Use **strict** TypeScript settings (see `packages/tsconfig/base.json`).
    *   Minimize the use of `any`. Define interfaces or types where possible.
    *   Utilize path aliases configured in `tsconfig.json` (e.g., `@/*` maps to `apps/web/*`).

10. **State Management:**
    *   This template does **not** include a global state management library by default.
    *   Prefer standard React state management (`useState`, `useReducer`, `Context API`) for local or moderately shared state.
    *   If global state is needed, consider adding libraries like Zustand or Jotai, ensuring consistency if one is chosen.

11. **Commit Messages:**
    *   Follow the **Conventional Commits** specification (e.g., `feat:`, `fix:`, `chore:`, `docs:`, `test:`).

## Key Configuration Files

When modifying or understanding the project setup, refer to these files:

*   `/turbo.json`: Monorepo task pipeline configuration.
*   `/biome.json`: Linter and formatter rules.
*   `/pnpm-workspace.yaml`: Defines the workspaces (apps and packages).
*   `/packages/tsconfig/base.json`: Base TypeScript configuration.
*   `/apps/web/next.config.mjs`: Next.js configuration (including WASM webpack setup).
*   `/apps/web/tailwind.config.ts`: Tailwind CSS configuration.
*   `/apps/web/tsconfig.json`: Next.js specific TypeScript configuration.
*   `/packages/wasm-lib/Cargo.toml`: Rust crate definition and dependencies.
*   `/packages/wasm-lib/package.json`: NPM package definition for the WASM library, build scripts.

By following these guidelines, AI assistants can be more effective partners in developing this project.
