# Enterprise-Grade Block Notebook

![Block Notebook App Screenshot](image_1.png)

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-000000?style=for-the-badge&logo=authdotjs&logoColor=white)](https://authjs.dev/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

A modern, secure, and scalable block-based notebook application built with the latest Next.js App Router features. This application allows users to create rich documents composed of various block types, similar to Notion, featuring a robust editor and a paginated dashboard.

The architecture emphasizes secure coding practices, strict type safety, and enterprise-grade patterns for state management and data fetching.

## Key Features

- **Block-Based Editor:** Create documents using modular blocks, currently supporting rich Text and Code blocks with syntax highlighting.
- **Intuitive UI:** Features a hover-menu interface to easily insert new blocks between existing content.
- **Robust State Management:** Editor state is managed using React Context and a `useReducer` pattern for predictability and scalability.
- **Secure Authentication:** Implements Auth.js (v5) with GitHub and Google providers, ensuring secure user sessions.
- **Paginated Dashboard:** A performant dashboard view with server-side pagination, search capabilities, and a "sliding window" pagination UI.
- **Type-Safe API:** Server Actions use Zod for strict runtime validation of inputs (e.g., pagination limits, search queries) to prevent database stress and security vulnerabilities.
- **Database Integration:** Uses Prisma ORM for efficient and type-safe database operations.

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (or compatible URL)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/yourusername/your-repo.git](https://github.com/yourusername/your-repo.git)
    cd your-repo
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your database connection string and Auth.js secrets.

    ```env
    DATABASE_URL="postgresql://..."
    AUTH_SECRET="your-generated-secret"
    AUTH_GITHUB_ID="..."
    AUTH_GITHUB_SECRET="..."
    AUTH_GOOGLE_ID="..."
    AUTH_GOOGLE_SECRET="..."
    ```

4.  **Run Database Migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
