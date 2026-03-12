# Database Schema

EduFlow Pro uses a relational SQLite database (`school.db`). All tables are designed to support a multi-tenant school environment.

## Primary Tables

### `users`
- `id` (PK): UUID
- `email`: Unique email
- `password`: Hashed password
- `role`: admin, teacher, etc.
- `school_id`: FK for multi-tenancy

### `students`
- `id` (PK): UUID
- `name`: Student full name
- `grade`: Current grade level
- `school_id`: FK

### `documents` (AI Context)
- `id` (PK): UUID
- `title`: Document title
- `content`: Text content for RAG
- `type`: Category (policies, schedule, etc.)

### `invoices`
- `id` (PK): UUID
- `student_id`: FK to students
- `amount`: REAL
- `status`: paid, pending, overdue
- `due_date`: DATETIME

## Academic Tables

### `courses`
- `id` (PK): UUID
- `name`: Course name
- `code`: Unique code (e.g., CS101)

### `classes`
- `id` (PK): UUID
- `course_id`: FK to courses
- `room`: Room assignment
- `schedule`: Text representation (e.g., Mon/Wed 10 AM)

### `assignments`
- `id` (PK): UUID
- `course_id`: FK to courses
- `title`: Assignment name
- `due_date`: DATETIME

## HR & Operations

### `payroll`
- `id` (PK): UUID
- `user_id`: FK to users
- `amount`: REAL
- `status`: paid, pending
- `pay_period`: Text

### `inventory`
- `id` (PK): UUID
- `item_name`: Name
- `quantity`: Current stock level
- `status`: in-stock, low-stock, out-of-stock

## System

### `settings`
- `key` (PK): String
- `value`: Text
- `school_id`: FK

### `audit_logs`
- `id` (PK): UUID
- `user_id`: FK to users
- `action`: Description
- `created_at`: DATETIME
