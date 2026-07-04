import {
  type User,
  type InsertUser,
  type Lead,
  type InsertLead,
  type ChatEvent,
  type InsertChatEvent,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;

  createChatEvent(event: InsertChatEvent): Promise<ChatEvent>;
  getChatEvents(): Promise<ChatEvent[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private chatEvents: Map<string, ChatEvent>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.chatEvents = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      id,
      name: insertLead.name,
      mobile: insertLead.mobile,
      email: insertLead.email,
      company: insertLead.company ?? null,
      city: insertLead.city ?? null,
      state: insertLead.state ?? null,
      language: insertLead.language,
      purpose: insertLead.purpose,
      requirementDetails: insertLead.requirementDetails ?? null,
      wantsMeeting: insertLead.wantsMeeting ?? false,
      meetingDate: insertLead.meetingDate ?? null,
      meetingTime: insertLead.meetingTime ?? null,
      meetingMode: insertLead.meetingMode ?? null,
      wantsUpdates: insertLead.wantsUpdates ?? false,
      status: "pending",
      createdAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;
    const updated = { ...lead, status };
    this.leads.set(id, updated);
    return updated;
  }

  async createChatEvent(insertEvent: InsertChatEvent): Promise<ChatEvent> {
    const id = randomUUID();
    const event: ChatEvent = {
      id,
      type: insertEvent.type,
      createdAt: new Date(),
    };
    this.chatEvents.set(id, event);
    return event;
  }

  async getChatEvents(): Promise<ChatEvent[]> {
    return Array.from(this.chatEvents.values());
  }
}

export const storage = new MemStorage();
