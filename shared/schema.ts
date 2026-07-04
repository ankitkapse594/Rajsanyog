import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export const leadStatusValues = ["pending", "in_progress", "completed"] as const;

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  city: text("city"),
  state: text("state"),
  language: text("language").notNull(),
  purpose: text("purpose").notNull(),
  requirementDetails: text("requirement_details"),
  wantsMeeting: boolean("wants_meeting").notNull().default(false),
  meetingDate: text("meeting_date"),
  meetingTime: text("meeting_time"),
  meetingMode: text("meeting_mode"),
  wantsUpdates: boolean("wants_updates").notNull().default(false),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  status: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const updateLeadStatusSchema = z.object({
  status: z.enum(leadStatusValues),
});

export const chatEvents = pgTable("chat_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertChatEventSchema = createInsertSchema(chatEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertChatEvent = z.infer<typeof insertChatEventSchema>;
export type ChatEvent = typeof chatEvents.$inferSelect;
