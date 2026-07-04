import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertLeadSchema,
  insertChatEventSchema,
  updateLeadStatusSchema,
} from "@shared/schema";
import { fromError } from "zod-validation-error";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat-events", async (req, res) => {
    try {
      const data = insertChatEventSchema.parse(req.body);
      const event = await storage.createChatEvent(data);
      res.status(201).json(event);
    } catch (err) {
      const message = fromError(err).toString();
      res.status(400).json({ message });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (err) {
      const message = fromError(err).toString();
      res.status(400).json({ message });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body || {};
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return res.status(500).json({
        message: "Admin password is not configured on the server.",
      });
    }
    if (password === adminPassword) {
      req.session.isAdmin = true;
      return res.json({ success: true });
    }
    return res.status(401).json({ message: "Incorrect password" });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    res.json({ isAdmin: !!req.session.isAdmin });
  });

  app.get("/api/leads", requireAdmin, async (_req, res) => {
    const leads = await storage.getLeads();
    res.json(leads);
  });

  app.patch("/api/leads/:id/status", requireAdmin, async (req, res) => {
    try {
      const { status } = updateLeadStatusSchema.parse(req.body);
      const lead = await storage.updateLeadStatus(req.params.id, status);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(lead);
    } catch (err) {
      const message = fromError(err).toString();
      res.status(400).json({ message });
    }
  });

  app.get("/api/leads/export", requireAdmin, async (_req, res) => {
    const leads = await storage.getLeads();
    const headers = [
      "Name",
      "Mobile",
      "Email",
      "Company",
      "City",
      "State",
      "Language",
      "Purpose",
      "Requirement Details",
      "Wants Meeting",
      "Meeting Date",
      "Meeting Time",
      "Meeting Mode",
      "Wants Updates",
      "Status",
      "Created At",
    ];
    const escapeCsv = (value: unknown) => {
      const str = value === null || value === undefined ? "" : String(value);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };
    const rows = leads.map((lead) =>
      [
        lead.name,
        lead.mobile,
        lead.email,
        lead.company,
        lead.city,
        lead.state,
        lead.language,
        lead.purpose,
        lead.requirementDetails,
        lead.wantsMeeting ? "Yes" : "No",
        lead.meetingDate,
        lead.meetingTime,
        lead.meetingMode,
        lead.wantsUpdates ? "Yes" : "No",
        lead.status,
        lead.createdAt.toISOString(),
      ]
        .map(escapeCsv)
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="rajsanyog-leads-${Date.now()}.csv"`,
    );
    res.send(csv);
  });

  app.get("/api/analytics", requireAdmin, async (_req, res) => {
    const leads = await storage.getLeads();
    const events = await storage.getChatEvents();

    const chatsStarted = events.filter((e) => e.type === "chat_started").length;
    const totalLeads = leads.length;
    const conversionRate =
      chatsStarted > 0 ? Math.round((totalLeads / chatsStarted) * 100) : 0;

    const purposeCounts: Record<string, number> = {};
    for (const lead of leads) {
      purposeCounts[lead.purpose] = (purposeCounts[lead.purpose] || 0) + 1;
    }
    const popularServices = Object.entries(purposeCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([purpose, count]) => ({ purpose, count }));

    const meetingsBooked = leads.filter((l) => l.wantsMeeting).length;
    const statusCounts: Record<string, number> = {
      pending: 0,
      in_progress: 0,
      completed: 0,
    };
    for (const lead of leads) {
      statusCounts[lead.status] = (statusCounts[lead.status] || 0) + 1;
    }

    res.json({
      chatsStarted,
      totalLeads,
      conversionRate,
      meetingsBooked,
      popularServices,
      statusCounts,
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
