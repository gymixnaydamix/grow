import express from "express";
import { createServer as createViteServer } from "vite";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import systemRouter from "./routes/system";
import announcementsRouter from "./routes/announcements";
import facilitiesRouter from "./routes/facilities";
import transportationRouter from "./routes/transportation";
import inventoryRouter from "./routes/inventory";
import budgetRouter from "./routes/budget";
import invoicesRouter from "./routes/invoices";
import payrollRouter from "./routes/payroll";
import reportsRouter from "./routes/reports";
import directoryRouter from "./routes/directory";
import attendanceRouter from "./routes/attendance";
import leaveRouter from "./routes/leave";
import recruitmentRouter from "./routes/recruitment";
import applicationsRouter from "./routes/applications";
import documentsRouter from "./routes/documents";
import enrollmentRouter from "./routes/enrollment";
import inquiriesRouter from "./routes/inquiries";
import academicsRouter from "./routes/academics";
import coursesRouter from "./routes/courses";
import gradesRouter from "./routes/grades";
import scheduleRouter from "./routes/schedule";
import classesRouter from "./routes/classes";
import assignmentsRouter from "./routes/assignments";
import gradingRouter from "./routes/grading";
import messagesRouter from "./routes/messages";
import certificatesRouter from "./routes/certificates";
import verificationRouter from "./routes/verification";
import badgesRouter from "./routes/badges";
import approvalsRouter from "./routes/approvals";
import objectivesRouter from "./routes/objectives";
import kpisRouter from "./routes/kpis";
import progressRouter from "./routes/progress";
import milestonesRouter from "./routes/milestones";
import allLogsRouter from "./routes/allLogs";
import recentRouter from "./routes/recent";
import filterRouter from "./routes/filter";
import exportsRouter from "./routes/exports";
import generalRouter from "./routes/general";
import securityRouter from "./routes/security";
import dataRouter from "./routes/data";
import localizationRouter from "./routes/localization";
import overviewRouter from "./routes/overview";
import metricsRouter from "./routes/metrics";
import analyticsRouter from "./routes/analytics";
import conciergeRouter from "./routes/concierge";
import { errorHandler } from "./utils/error-handler";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/system", systemRouter);
  app.use("/api/announcements", announcementsRouter);
  app.use("/api/facilities", facilitiesRouter);
  app.use("/api/transportation", transportationRouter);
  app.use("/api/inventory", inventoryRouter);
  app.use("/api/budget", budgetRouter);
  app.use("/api/invoices", invoicesRouter);
  app.use("/api/payroll", payrollRouter);
  app.use("/api/reports", reportsRouter);
  app.use("/api/directory", directoryRouter);
  app.use("/api/attendance", attendanceRouter);
  app.use("/api/leave", leaveRouter);
  app.use("/api/recruitment", recruitmentRouter);
  app.use("/api/applications", applicationsRouter);
  app.use("/api/documents", documentsRouter);
  app.use("/api/enrollment", enrollmentRouter);
  app.use("/api/inquiries", inquiriesRouter);
  app.use("/api/academics", academicsRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/grades", gradesRouter);
  app.use("/api/schedule", scheduleRouter);
  app.use("/api/classes", classesRouter);
  app.use("/api/assignments", assignmentsRouter);
  app.use("/api/grading", gradingRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/api/certificates", certificatesRouter);
  app.use("/api/verification", verificationRouter);
  app.use("/api/badges", badgesRouter);
  app.use("/api/approvals", approvalsRouter);
  app.use("/api/objectives", objectivesRouter);
  app.use("/api/kpis", kpisRouter);
  app.use("/api/progress", progressRouter);
  app.use("/api/milestones", milestonesRouter);
  app.use("/api/all-logs", allLogsRouter);
  app.use("/api/recent", recentRouter);
  app.use("/api/filter", filterRouter);
  app.use("/api/exports", exportsRouter);
  app.use("/api/general", generalRouter);
  app.use("/api/security", securityRouter);
  app.use("/api/data", dataRouter);
  app.use("/api/localization", localizationRouter);
  app.use("/api/overview", overviewRouter);
  app.use("/api/metrics", metricsRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/concierge", conciergeRouter);

  // Error handler
  app.use(errorHandler);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from the dist directory
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
