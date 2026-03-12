# Deployment & Setup Guide

This guide outlines how to set up and deploy the EduFlow Pro ERP system.

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in:
   - `JWT_SECRET`: A secure random string.
   - `GEMINI_API_KEY`: Your Google AI Studio key.

### Running Development Mode
Start both the backend server and Vite frontend:
```bash
npm start
```
The app will be available at `http://localhost:3000`.

## Production Deployment

### Build
Generate the production-ready frontend bundle:
```bash
npm run build
```

### Server Configuration
In production, the Express server serves the static files from the `dist` directory. Ensure `NODE_ENV=production` is set in your environment.

### Database Persistence
The `school.db` file is stored in the project root. For production deployments (e.g., Docker, AWS EC2), ensure this file is stored on a persistent volume.

### Process Management
It is recommended to use a process manager like **PM2** to keep the server running:
```bash
pm2 start backend/server.ts --interpreter npx tsx
```

## Security Best Practices
- Always change the default admin password immediately after setup.
- Use a strong `JWT_SECRET`.
- Ensure the server is behind a reverse proxy (like Nginx) with SSL/TLS enabled.
