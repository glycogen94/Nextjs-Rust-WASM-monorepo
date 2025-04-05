# Next.js + Rust (WASM) Monorepo Template

[![CI Checks](https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository serves as a comprehensive template for building web applications using **Next.js** for the frontend and **Rust compiled to WebAssembly (WASM)** for performance-intensive or shared logic. The entire project is structured as a **Turborepo** monorepo for efficient management.

It comes pre-configured with a modern tech stack designed for developer experience and performance.

## Features

*   🚀 **Monorepo Ready:** Managed with Turborepo for optimized builds, testing, and development workflows.
*   ⚡ **Next.js Frontend:** Uses the Next.js App Router for modern React development.
*   🦀 **Rust & WASM Integration:** Seamlessly compile Rust code to WASM using `wasm-pack` and integrate it into the Next.js app.
*   🎨 **Modern UI Stack:** Styled with Tailwind CSS, featuring UI components from Shadcn UI and icons from Lucide React.
*   ✅ **Type Safety:** End-to-end type safety with TypeScript and Rust.
*   ✨ **Code Quality:** Consistent linting and formatting powered by Biome.
*   🧪 **Comprehensive Testing:** Includes setup for:
    *   Unit/Integration Tests (Vitest + React Testing Library) for Next.js.
    *   E2E Tests (Playwright) for the web application.
    *   Unit Tests (`cargo test`) for Rust logic.
    *   WASM Integration Tests (`wasm-bindgen-test`) for Rust bindings.
*   🔄 **CI Workflow:** GitHub Actions workflow for automated linting, testing, and building on push/pull requests.

## Tech Stack

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript, Rust (Stable)
*   **Monorepo:** Turborepo
*   **Package Manager:** pnpm (v10+)
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI, Lucide React
*   **WASM:** Rust, `wasm-bindgen`, `wasm-pack`
*   **Linting/Formatting:** Biome
*   **Testing:**
    *   Vitest + React Testing Library (Unit/Integration)
    *   Playwright (E2E)
    *   `cargo test`, `wasm-bindgen-test` (Rust/WASM)
*   **CI:** GitHub Actions

## Getting Started

Ready to use this template? Follow the detailed steps in the **[Getting Started Guide](./GETTING_STARTED.md)**.

## Core Commands

Once you have set up your project using the Getting Started Guide, these are the main commands you'll use from the **root** directory:

*   **Install Dependencies:**
    ```bash
    pnpm install
    ```
*   **Start Development Servers:** (Runs Next.js dev server and potentially other services in parallel)
    ```bash
    pnpm run dev
    ```
*   **Build All Packages:** (Builds WASM library and Next.js app for production)
    ```bash
    pnpm run build
    ```
*   **Run Linters & Formatters:**
    ```bash
    pnpm run lint  # Run linters (Biome, Cargo Clippy)
    pnpm run format # Format code with Biome and Cargo Fmt
    ```
*   **Run Tests:**
    ```bash
    pnpm run test        # Run Vitest unit/integration tests for 'web' app
    pnpm run test:wasm   # Run wasm-bindgen integration tests for 'wasm-lib'
    # Note: Rust unit tests (cargo test) are run as part of `pnpm run test:wasm` script in wasm-lib or can be run directly within the package
    pnpm run test:e2e    # Run Playwright E2E tests (builds 'web' first)
    ```
*   **Clean Build Artifacts:**
    ```bash
    pnpm run clean
    ```

## Directory Structure

```
/
├── .github/          # GitHub Actions workflows (CI)
├── apps/
│   └── web/          # Next.js application
├── packages/
│   ├── wasm-lib/     # Rust WASM library
│   ├── tsconfig/     # Shared TypeScript configs
│   └── config/       # Shared configurations (e.g., Tailwind preset)
├── biome.json        # Biome (Lint/Format) config
├── package.json      # Root dependencies & scripts
├── pnpm-workspace.yaml # pnpm workspace config
├── turbo.json        # Turborepo pipeline config
└── tsconfig.json     # Root TS config
```

## AI Coding Guidelines

To help AI coding assistants (like Claude Code) generate code that aligns with this project's structure and conventions, please refer to the **[AI Coding Guidelines](./AI_GUIDELINES.md)**.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
