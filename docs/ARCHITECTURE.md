# Architecture Overview

EduFlow Pro is a full-stack SaaS ERP designed for schools, built with modern technologies to ensure scalability, security, and a seamless user experience.

## Tech Stack

### Frontend
- **React 18+**: For building the component-based UI.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: For a consistent and scalable icon system.
- **React Router**: For client-side routing and protected routes.
- **TanStack Query (React Query)**: For server state management, caching, and data synchronization.
- **Axios**: Centralized API client with JWT interceptors.

### Backend
- **Node.js & Express**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Ensuring type safety across the entire application.
- **Better-SQLite3**: High-performance, synchronous SQLite driver for Node.js.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Bcryptjs**: For secure password hashing.
- **Winston & Morgan**: For comprehensive logging and request monitoring.

### AI Integration
- **Google Generative AI (Gemini 1.5 Flash)**: Powering the School Concierge AI.
- **RAG (Retrieval-Augmented Generation)**: Using internal school documents to ground AI responses.

## Core Architectural Patterns

### Multi-tenancy
The application uses a logical multi-tenancy model. All tables include a `school_id` column, and all database queries are scoped by the `school_id` extracted from the authenticated user's JWT.

### Role-Based Access Control (RBAC)
User permissions are managed via roles (e.g., `admin`, `teacher`, `student`, `parent`). Middleware protects routes and restricts actions based on the user's role.

### API First Design
The frontend communicates exclusively via a RESTful API, allowing for potential future expansions to mobile or third-party integrations.

### Global Error Handling
A centralized error handling middleware in the backend ensures consistent error responses and logs critical failures to `error.log`.
