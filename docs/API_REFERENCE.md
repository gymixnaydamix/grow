# API Documentation

The EduFlow Pro API is organized around REST. All requests should be made to `/api`.

## Authentication
All protected routes require a `Bearer` token in the `Authorization` header.

### `POST /api/auth/login`
Authenticates a user and returns a JWT.
**Body:** `{ "email": "...", "password": "..." }`

### `GET /api/auth/me`
Returns the profile of the currently authenticated user.

## Users & Students

### `GET /api/users`
Returns all users for the school (Admin only).

### `GET /api/students`
Returns all students enrolled in the school.

## Admissions

### `GET /api/inquiries`
Lists all prospective student inquiries.

### `GET /api/applications`
Lists all student applications and their current status.

### `POST /api/enrollment`
Converts an applicant into a student record.

## Finance

### `GET /api/invoices`
Lists all invoices (Sent, Received, Overdue).

### `POST /api/invoices`
Creates a new invoice for a student.

## Academics

### `GET /api/courses`
Lists all courses offered by the school.

### `GET /api/classes`
Lists all active class sessions, schedules, and room assignments.

### `GET /api/assignments`
Lists all assignments across courses.

## Concierge AI

### `POST /api/concierge/chat`
Sends a message to the AI concierge.
**Body:** `{ "message": "..." }`

### `POST /api/concierge/ingest`
Ingests a document to be used as context for the AI.
**Body:** `{ "title": "...", "content": "...", "type": "..." }`

## System

### `GET /api/overview`
Returns aggregated metrics for the dashboard (Active Users, Revenue, etc.).

### `GET /api/filter?q=...`
Global search across multiple entities (Users, Students, Courses).
