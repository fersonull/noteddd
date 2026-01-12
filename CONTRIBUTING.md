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

- `/app`: Next.js App Router pages and layouts.
- `/components/editor`: Core logic for the block-based editor.
- `/lib`: Shared utilities, including Prisma client and utils.
- `/actions`: Server Actions (ensure Zod validation is present here).
- `/prisma`: Database schema and migrations.

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
