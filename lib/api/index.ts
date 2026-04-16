/**
 * VORO Portal API abstraction layer.
 *
 * Every portal page SHOULD read from this module instead of importing from
 * `@/data/mock-data` directly. The current implementation wraps the local
 * mock data in async resolvers so that swapping in a real backend (REST,
 * GraphQL, or RPC) later is a one-file change — the call sites won't move.
 *
 * Mutations return the object that would be persisted; the in-memory mock
 * store is intentionally NOT mutated so that navigating between pages still
 * shows the stable fixtures the rest of the portal is built around.
 */
import {
  agent as mockAgent,
  kpis as mockKpis,
  transactions as mockTransactions,
  announcements as mockAnnouncements,
  services as mockServices,
  academy as mockAcademy,
  documents as mockDocuments,
  leads as mockLeads,
  marketingAssets as mockMarketingAssets,
  supportTickets as mockSupportTickets,
} from "@/data/mock-data";
import type {
  Agent,
  AcademySession,
  Announcement,
  DocumentItem,
  DocumentUpload,
  Kpi,
  Lead,
  LeadDraft,
  MarketingAsset,
  Service,
  SupportTicket,
  SupportTicketDraft,
  Transaction,
  TransactionDraft,
} from "@/lib/types";

const delay = (ms = 0) => new Promise((r) => setTimeout(r, ms));

// ─── Reads ──────────────────────────────────────────────────────────────────
export async function getAgent(): Promise<Agent> {
  return mockAgent;
}

export async function getKpis(): Promise<Kpi[]> {
  return mockKpis;
}

export async function getTransactions(): Promise<Transaction[]> {
  return mockTransactions;
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  return mockTransactions.find((t) => t.id === id) ?? null;
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return mockAnnouncements;
}

export async function getServices(): Promise<Service[]> {
  return mockServices;
}

export async function getAcademySessions(): Promise<AcademySession[]> {
  return mockAcademy;
}

export async function getDocuments(): Promise<DocumentItem[]> {
  return mockDocuments;
}

export async function getLeads(): Promise<Lead[]> {
  return mockLeads;
}

export async function getMarketingAssets(): Promise<MarketingAsset[]> {
  return mockMarketingAssets;
}

export async function getSupportTickets(): Promise<SupportTicket[]> {
  return mockSupportTickets;
}

// ─── Mutations (stubs) ──────────────────────────────────────────────────────
export async function createTransaction(
  draft: TransactionDraft,
): Promise<Transaction> {
  await delay(400);
  const id = `t-${Date.now()}`;
  const created: Transaction = {
    id,
    address: draft.address,
    city: draft.city,
    state: draft.state,
    client: draft.client,
    side: draft.side,
    status: "Attorney Review",
    listPrice: draft.listPrice,
    salePrice: draft.salePrice ?? 0,
    commission: draft.commission ?? 0,
    closingDate: draft.closingDate,
    brokerReview: "Pending",
    milestones: [
      { label: "Offer Accepted", completed: true, date: "Today" },
      { label: "Attorney Review", completed: false, date: null },
      { label: "Inspection", completed: false, date: null },
      { label: "Mortgage Commitment", completed: false, date: null },
      { label: "Clear to Close", completed: false, date: null },
      { label: "Closing", completed: false, date: null },
    ],
    missingDocs: [],
  };
  return created;
}

export async function createLead(draft: LeadDraft): Promise<Lead> {
  await delay(300);
  return {
    id: `l-${Date.now()}`,
    name: draft.name,
    type: draft.type,
    status: "New",
    market: draft.market,
    phone: draft.phone,
    email: draft.email,
    source: draft.source,
    notes: draft.notes,
  };
}

export async function createSupportTicket(
  draft: SupportTicketDraft,
): Promise<SupportTicket> {
  await delay(400);
  return {
    id: `st-${Date.now()}`,
    subject: draft.subject,
    department: draft.department,
    priority: draft.priority,
    status: "Open",
    created: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export async function updateAgentProfile(
  patch: Partial<Agent>,
): Promise<Agent> {
  await delay(250);
  return { ...mockAgent, ...patch };
}

export async function uploadDocument(
  upload: DocumentUpload,
): Promise<DocumentItem> {
  await delay(500);
  return {
    id: `d-${Date.now()}`,
    name: upload.name,
    category: upload.category,
    state: upload.state,
    format: upload.format,
    updatedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  };
}

export async function markAnnouncementRead(id: string): Promise<{ id: string; read: true }> {
  await delay(120);
  return { id, read: true };
}
