# Contributing to Noteddd

First off, thanks for taking the time to contribute! 🎉

**Noteddd** is built with strict adherence to secure coding practices and enterprise-grade patterns. To maintain the quality and security of the codebase, please review the following guidelines before submitting a Pull Request.

## 🏗️ Architectural Standards

### 1. Security First

- **Server Actions:** All Server Actions **must** validate inputs using **Zod** schemas. Never trust client-side data.
- **Authentication:** Ensure all protected routes check the user session via Auth.js before rendering or mutating data.

### 2. Type Safety

- **TypeScript:** We maintain strict type safety. Avoid using `any`.
- **Prisma:** Utilize Prisma's generated types to ensure database consistency.

### 3. State Management

- **Editor State:** The editor relies on a `useReducer` pattern. When adding new block types or editor features, ensure actions are dispatched through the central reducer rather than local component state.

## 💻 Development Workflow

### Prerequisite Setup

Ensure you have Node.js 18+ and a local PostgreSQL instance running.

1.  **Fork and Clone** the repository.
2.  **Create a Branch** for your feature or fix:
    ```bash
    git checkout -b feature/amazing-block
    ```
3.  **Install Dependencies** and sync the database:
    ```bash
    npm install
    npx prisma generate
    ```

### Making Changes

- **Components:** Use `shadcn/ui` components for UI consistency.
- **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS files unless absolutely necessary.
- **Linting:** Run the linter before committing to ensure code style compliance:
  ```bash
  npm run lint
  ```

## 📂 Project Structure

Noteddd follows a **Feature-Driven Architecture**. We prioritize domain encapsulation over technical layers. This means code is organized by **what it does** (the feature) rather than **what it is** (component, hook, or action).

### High-Level Overview

- **`/app`**: Contains **only** the routing logic (pages, layouts) and entry points. These files should remain "thin" and primarily import feature modules.
- **`/features`**: The core business logic lives here. Each directory represents a distinct domain of the application.
- **`/components/ui`**: Shared, agnostic design system components (Shadcn UI primitives). These components contain **no business logic**.
- **`/lib`**: Core infrastructure, database clients (Prisma), and universal utilities.

### Feature Directory Layout (`/features`)

When working on a specific domain (e.g., the Editor), all related code should be colocated within its feature folder:

```text
/features
  ├── /editor              # Domain: Document Editing
  │     ├── /components    # Editor-specific UI (e.g., BlockWrapper, Toolbar)
  │     ├── /actions.ts    # Server Actions specific to the editor (validated w/ Zod)
  │     ├── /hooks.ts      # Editor-specific hooks (e.g., useEditorState)
  │     ├── /types.ts      # Local type definitions
  │     └── /utils.ts      # Helper functions for this feature
  │
  ├── /auth                # Domain: Authentication
  │     ├── /components    # SignInForm, SignOutButton
  │     └── /actions.ts    # Login/Register server actions
  │
  └── /dashboard           # Domain: Document Management
        ├── /components    # DocumentGrid, PaginationControls
        └── /data.ts       # Data fetching logic

## 🚀 Submitting a Pull Request

1.  Push your changes to your fork.
2.  Open a Pull Request against the `main` branch.
3.  **Description:** Clearly describe the problem you are solving.
4.  **Screenshots:** If you changed the UI, please include screenshots.
5.  **Tests:** If you added complex logic, ensure existing tests pass.

## 📝 Commit Convention

We follow a basic semantic commit message convention:

- `feat`: A new feature (e.g., `feat: add image block support`)
- `fix`: A bug fix (e.g., `fix: pagination offset calculation`)
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature

---

Thank you for helping make Noteddd better!
```
