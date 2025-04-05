# Getting Started with the Template

This guide details how to use this template to start your own project with customized names.

## Prerequisites

Ensure you have the following installed:

*   **Node.js:** v18 or later (check with `node -v`)
*   **pnpm:** v10 or later recommended (check with `pnpm -v`). If not installed, run `npm install -g pnpm`.
*   **Rust Toolchain:** (check with `rustc --version`). Install via [rustup.rs](https://rustup.rs/). Includes `cargo`, `rustfmt`, `clippy`.
*   **wasm-pack:** (check with `wasm-pack --version`). Install via `cargo install wasm-pack` or follow [official instructions](https://rustwasm.github.io/wasm-pack/installer/).

## Step 1: Create Your Repository

1.  Navigate to the main page of the template repository: `https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo`
2.  Click the "**Use this template**" button.
3.  Choose "**Create a new repository**".
4.  Select an owner (you or an organization) and enter your desired **Repository name** (e.g., `my-awesome-project`).
5.  Choose visibility (Public or Private).
6.  Click "**Create repository from template**".
7.  Clone your newly created repository:
    ```bash
    git clone git@github.com:YOUR_USERNAME/YOUR_NEW_REPOSITORY_NAME.git
    cd YOUR_NEW_REPOSITORY_NAME
    ```
    Replace `YOUR_USERNAME` and `YOUR_NEW_REPOSITORY_NAME` accordingly.

## Step 2: Rename Placeholders

This template uses placeholder names (`Nextjs-Rust-WASM-monorepo`, `web`, `wasm-lib`). You should replace these with names relevant to your project. Using your code editor's "Find and Replace in Files" feature is highly recommended.

**1. Define Your Names:**

*   **Project Scope/Name:** Choose a name for the overall project or organization scope (e.g., `my-awesome-project` or `@my-org`).
*   **Web App Package Name:** Choose a name for the Next.js application package (e.g., `app`, `frontend`, `website`). Let's use `my-app` as an example.
*   **WASM Library Package Name:** Choose a name for the Rust WASM library NPM package (e.g., `core-logic`, `image-processor`, `my-wasm-utils`). Let's use `my-wasm-utils` as an example.
*   **WASM Crate Name:** Choose a name for the Rust crate itself (often similar to the package name, using underscores, e.g., `my_wasm_utils`). Let's use `my_wasm_utils` as an example.

**2. Perform Replacements:**

*   **a) Root `package.json`:**
    *   Open `/package.json`.
    *   Change the `"name"` field from `"nextjs-rust-wasm-monorepo"` to your chosen **Project Scope/Name** (e.g., `"my-awesome-project"`).

*   **b) Web App `package.json`:**
    *   Open `apps/web/package.json`.
    *   Change the `"name"` field from `"web"` to your chosen **Web App Package Name** (e.g., `"my-app"` or `"@my-org/my-app"`).

*   **c) WASM Library `package.json`:**
    *   Open `packages/wasm-lib/package.json`.
    *   Change the `"name"` field from `"wasm-lib"` to your chosen **WASM Library Package Name** (e.g., `"my-wasm-utils"` or `"@my-org/my-wasm-utils"`). **Remember this exact name for step (e).**

*   **d) WASM Crate `Cargo.toml` & Update `package.json`:**
    *   Open `packages/wasm-lib/Cargo.toml`.
    *   Under `[package]`, change the `name` from `"wasm-lib"` to your chosen **WASM Crate Name** (e.g., `"my_wasm_utils"`).
        ```toml
        [package]
        name = "my_wasm_utils" # <-- CHANGE THIS
        version = "0.1.0"
        edition = "2021"
        # ...
        ```
    *   **Critical:** Changing the crate name changes `wasm-pack`'s output filenames. Immediately update the `main` and `types` fields in `packages/wasm-lib/package.json` to match the **WASM Crate Name**:
        ```json
        // packages/wasm-lib/package.json
        {
          "name": "my-wasm-utils", // Or @my-org/my-wasm-utils
          "version": "0.1.0",
          // 👇 Update these to match the 'name' in Cargo.toml (with .js/.d.ts) 👇
          "main": "./pkg/my_wasm_utils.js",
          "types": "./pkg/my_wasm_utils.d.ts",
          "files": [ "pkg" ],
          // ... scripts
        }
        ```

*   **e) Update WASM Import in Web App:**
    *   Open `apps/web/lib/wasmLoader.ts` (or your WASM loading utility).
    *   Change the dynamic `import()` path and the type import to use the **WASM Library Package Name** you set in step (c):
        ```typescript
        // apps/web/lib/wasmLoader.ts
        // 👇 Update this import path to your WASM Library Package Name 👇
        import type * as Wasm from 'my-wasm-utils';

        let wasmModule: typeof Wasm | null = null;

        export const loadWasm = async (): Promise<typeof Wasm> => {
          if (wasmModule) {
            return wasmModule;
          }
          // 👇 Update the string inside import() to your WASM Library Package Name 👇
          const loaded = await import('my-wasm-utils');

          // Optional: If wasm-pack requires an init, ensure it's called.
          // await loaded.default(); // Or specific init function if generated

          wasmModule = loaded;
          return loaded;
        };

        // Update other wasm function getters if you have them
        export const getWasmAdd = async () => (await loadWasm()).add; // Example
        export const getWasmGreet = async () => (await loadWasm()).greet; // Example
        ```
    *   Update any other `import ... from 'wasm-lib'` statements across the `apps/web` codebase to use your new **WASM Library Package Name**.

*   **f) Global Search (Recommended):**
    *   Perform a project-wide search for any remaining instances of `Nextjs-Rust-WASM-monorepo`, `wasm-lib`, or `web` in comments, documentation (like this file!), or example code and replace them appropriately.

## Step 3: Install Dependencies

Navigate back to the root directory of your project and run `pnpm install`. This will install all dependencies and correctly link the workspace packages (`my-app` and `my-wasm-utils`) according to their new names.

```bash
pnpm install
```

## Step 4: Verify Setup

Run the core checks from the root directory to ensure the renaming and installation were successful:

```bash
# Check formatting & linting adheres to rules
pnpm run format
pnpm run lint

# Build WASM and Next.js app
pnpm run build

# Run all tests (Unit, Integration, WASM)
pnpm run test
pnpm run test:wasm

# Optional: Run E2E tests (ensure app builds and runs)
# pnpm run test:e2e

# Start the development server
pnpm run dev
```

Open your browser to `http://localhost:3000` (or the configured port). Verify that the application loads correctly and any features using WASM functions work as expected.

## Step 5: Commit Your Changes

Stage all the modified files and commit them to your repository's history.

```bash
git add .
git commit -m "feat: Initialize project from template and rename packages"
git push origin main # Or your default branch name
```

**Congratulations!** Your new project is set up and ready for development. Refer back to the main `README.md` for common development commands.
