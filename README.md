# Noteddd

![Block Notebook App Screenshot](public/noteddd-landing.png)

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge&logo=authdotjs&logoColor=white)](https://authjs.dev/)

**Noteddd** is a modern, secure, and enterprise-grade block-based notebook application. Built on the Next.js App Router, it provides a notion-style editing experience where documents are composed of modular blocks.

The architecture prioritizes security, strict type safety, and scalability, utilizing Zod for runtime validation and React Context for robust state management.

## 🚀 Key Features

### 📝 Block-Based Editor

- **Modular Content:** Create documents using distinct blocks (Text, Code, etc.).
- **Syntax Highlighting:** Integrated support for code blocks with rich syntax highlighting.
- **Intuitive Insertion:** Custom hover-menu interface for seamless block insertion between content.
- **Robust State:** Powered by React Context and `useReducer` for predictable editor behavior.

### 🛡️ Enterprise-Grade Security

- **Authentication:** Secure sessions via **Auth.js (v5)** supporting GitHub and Google OAuth.
- **Input Validation:** All Server Actions utilize **Zod** for strict runtime validation to prevent vulnerabilities and database stress.
- **Type Safety:** End-to-end TypeScript integration ensures reliability from the database to the client.

### ⚡ Performance & Dashboard

- **Paginated Dashboard:** Server-side pagination with search functionality.
- **Sliding Window UI:** A clean, user-friendly pagination interface.
- **Optimized Data:** Efficient database queries using Prisma ORM.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Shadcn UI
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Auth.js (NextAuth v5)
- **Validation:** Zod

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/fersonull/noteddd.git](https://github.com/fersonull/noteddd.git)
    cd noteddd
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/noteddd"
    AUTH_SECRET="your-generated-secret"
    AUTH_GITHUB_ID="your-github-id"
    AUTH_GITHUB_SECRET="your-github-secret"
    AUTH_GOOGLE_ID="your-google-id"
    AUTH_GOOGLE_SECRET="your-google-secret"
    ```

4.  **Database Migration**

    ```bash
    npx prisma migrate dev
    ```

5.  **Start Development Server**
    ```bash
    npm run dev
    ```
