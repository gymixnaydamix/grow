# Gap Analysis: School ERP System - Towards a "Real-World" Ready State

This document outlines the missing components, architectural pieces, and features required to transition this project from a high-fidelity prototype to a production-ready SaaS application.

## 1. Core Architecture & Infrastructure

### Frontend
- [ ] **Data Fetching Layer:** Transition from static mocks to **TanStack Query (React Query)** for caching, synchronization, and optimistic updates.
- [ ] **State Management:** Formalize global state (User session, Theme, Notifications) beyond local `useState`.
- [ ] **Routing:** Implement **React Router** (or similar) to handle URL-based navigation, deep linking, and protected routes. Currently, navigation is tied to internal state.
- [ ] **API Client:** A centralized Axios/Fetch instance with interceptors for auth headers and global error handling.
- [ ] **Form Handling:** Integration of **React Hook Form** and **Zod** for robust client-side validation across all modules.

### Backend
- [ ] **Real Route Logic:** 90%+ of current routes are stubs returning `{ message: '...' }`. These need full implementation (CRUD logic).
- [ ] **Database Integration:** Implementation of the data access layer (DAL) using either **Firestore** or **Better-SQLite3** with proper schemas.
- [ ] **Middleware:**
    - Authentication (JWT Verification).
    - Authorization (Role-Based Access Control - RBAC).
    - Request Validation (Zod/Joi).
    - Global Error Handling.
- [ ] **Multi-tenancy:** Logic to scope all data queries by `school_id` or `tenant_id`.

## 2. Missing Components & UI/UX

- [ ] **Authentication Pages:** Login, Signup, Password Reset, Multi-factor Authentication (MFA) screens.
- [ ] **User Profile & Settings:** Dedicated pages for users to manage their own data, notification preferences, and security settings.
- [ ] **Feedback Systems:**
    - Global Toast notifications (e.g., `react-hot-toast`).
    - Skeleton loaders for all data-heavy views.
    - Specialized Error Boundaries for individual widgets.
- [ ] **Advanced Data Displays:**
    - Server-side pagination, sorting, and filtering for all tables.
    - Export functionality (PDF/CSV) for reports and logs.
- [ ] **File Management:** A proper media gallery and upload manager with progress indicators.

## 3. Module-Specific Missing Parts

### Concierge AI (RAG)
- [ ] **Document Ingestion:** Background workers to process uploaded PDFs/Docs, chunk them, and generate embeddings.
- [ ] **Vector Database:** Integration with a vector store (e.g., Pinecone, Weaviate, or Firestore vector search) to support RAG.
- [ ] **Streaming Responses:** UI support for streaming AI responses for a "ChatGPT-like" experience.

### Finance
- [ ] **Payment Gateway:** Integration with **Stripe** or **PayPal** for invoice processing.
- [ ] **Accounting Logic:** Double-entry bookkeeping backend logic.

### Admissions & Student Portal
- [ ] **Workflow Engine:** State machine to handle application stages (Inquiry -> Applicant -> Interview -> Accepted -> Enrolled).
- [ ] **Real-time Notifications:** Socket.io or Firebase Cloud Messaging for instant updates on grades/attendance.

## 4. DevOps & Security

- [ ] **Environment Configuration:** Robust `.env` management for different stages (dev, staging, prod).
- [ ] **Logging & Monitoring:** Integration with tools like **Sentry** (frontend errors) and **Winston/Morgan** (backend logs).
- [ ] **Security Auditing:** Implementation of CORS, Helmet, Rate Limiting, and SQL Injection/NoSQL Injection protection.
- [ ] **Automated Testing:**
    - Unit tests for utils and business logic.
    - Integration tests for API endpoints.
    - E2E tests for critical flows (Login, Enrollment).

## 5. Summary of Recommended Tech Stack Additions
- **TanStack Query:** For server state.
- **Zod:** For schema validation (Shared between FE/BE).
- **React Router:** For navigation.
- **Lucide React:** (Already present, continue using).
- **Shadcn/UI:** (Optional) To accelerate building complex UI components like DatePickers and Command Palettes.
