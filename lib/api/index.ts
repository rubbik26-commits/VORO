/**
 * VORO Portal API abstraction layer.
 *
 * Priority order for data sources:
 *   1. SkySlope REST API  — when SKYSLOPE_ACCESS_TOKEN is set in env
 *   2. Mock data          — local fixtures for dev / when SkySlope is not configured
 *
 * This means: once you add SKYSLOPE_ACCESS_TOKEN to your Render env vars,
 * transactions and documents will pull from SkySlope automatically.
 * No other files need to change.
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
import {
  isSkySlopeConfigured,
  fetchSkySlopeTransactions,
  fetchSkySlopeTransaction,
  fetchSkySlopeDocuments,
  mapSkySlopeTransaction,
  mapSkySlopeDocument,
} from "@/lib/skyslope";
import type {
  Agent,
  AcademySession,
  Announcement,
  CommercialRequestDraft,
  MarketingRequestDraft,
  DocumentItem,
  DocumentUpload,
  Kpi,
  Lead,
  LeadDraft,
  MarketingAsset,
  Service,
  ServiceRequestDraft,
  SupportTicket,
  SupportTicketDraft,
  Transaction,
  TransactionDraft,
} from "@/lib/types";

const delay = (ms = 0) => new Promise((r) => setTimeout(r, ms));

// ─── Reads ───────────────────────────────────────────────────────────────────

export async function getAgent(): Promise<Agent> {
  return mockAgent;
}

export async function getKpis(): Promise<Kpi[]> {
  return mockKpis;
}

/**
 * getTransactions — pulls from SkySlope if configured, otherwise mock data.
 */
export async function getTransactions(): Promise<Transaction[]> {
  if (isSkySlopeConfigured()) {
    try {
      const raw = await fetchSkySlopeTransactions();
      return raw.map(mapSkySlopeTransaction);
    } catch (err) {
      console.warn("[API] SkySlope getTransactions failed, falling back to mock:", err);
    }
  }
  return mockTransactions;
}

/**
 * getTransaction — single deal from SkySlope if configured, otherwise mock.
 */
export async function getTransaction(id: string): Promise<Transaction | null> {
  if (isSkySlopeConfigured()) {
    try {
      const raw = await fetchSkySlopeTransaction(id);
      return mapSkySlopeTransaction(raw);
    } catch (err) {
      console.warn(`[API] SkySlope getTransaction(${id}) failed, falling back to mock:`, err);
    }
  }
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

/**
 * getDocuments — pulls from SkySlope if configured, otherwise mock data.
 */
export async function getDocuments(): Promise<DocumentItem[]> {
  if (isSkySlopeConfigured()) {
    try {
      const raw = await fetchSkySlopeDocuments();
      return raw.map(mapSkySlopeDocument);
    } catch (err) {
      console.warn("[API] SkySlope getDocuments failed, falling back to mock:", err);
    }
  }
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

// ─── Mutations (stubs) ───────────────────────────────────────────────────────

export async function createTransaction(draft: TransactionDraft): Promise<Transaction> {
  await delay(400);
  const id = `t-${Date.now()}`;
  return {
    id,
    address:      draft.address,
    city:         draft.city,
    state:        draft.state,
    client:       draft.client,
    side:         draft.side,
    status:       "Attorney Review",
    listPrice:    draft.listPrice,
    salePrice:    draft.salePrice ?? 0,
    commission:   draft.commission ?? 0,
    closingDate:  draft.closingDate,
    brokerReview: "Pending",
    milestones: [
      { label: "Offer Accepted",       completed: true,  date: "Today" },
      { label: "Attorney Review",      completed: false, date: null },
      { label: "Inspection",           completed: false, date: null },
      { label: "Mortgage Commitment",  completed: false, date: null },
      { label: "Clear to Close",       completed: false, date: null },
      { label: "Closing",              completed: false, date: null },
    ],
    missingDocs: [],
  };
}

export async function createLead(draft: LeadDraft): Promise<Lead> {
  await delay(300);
  return {
    id:      `l-${Date.now()}`,
    name:    draft.name,
    type:    draft.type,
    status:  "New",
    market:  draft.market,
    phone:   draft.phone,
    email:   draft.email,
    source:  draft.source,
    notes:   draft.notes,
  };
}

export async function createSupportTicket(draft: SupportTicketDraft): Promise<SupportTicket> {
  await delay(400);
  return {
    id:         `st-${Date.now()}`,
    subject:    draft.subject,
    department: draft.department,
    priority:   draft.priority,
    status:     "Open",
    created:    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };
}

export async function updateAgentProfile(patch: Partial<Agent>): Promise<Agent> {
  await delay(250);
  return { ...mockAgent, ...patch };
}

export async function uploadDocument(upload: DocumentUpload): Promise<DocumentItem> {
  await delay(500);
  return {
    id:        `d-${Date.now()}`,
    name:      upload.name,
    category:  upload.category,
    state:     upload.state,
    format:    upload.format,
    updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };
}

export async function markAnnouncementRead(id: string): Promise<{ id: string; read: true }> {
  await delay(120);
  return { id, read: true };
}

export async function createServiceRequest(
  draft: ServiceRequestDraft,
): Promise<{ id: string; service: string; status: string }> {
  await delay(400);
  return { id: `sr-${Date.now()}`, service: draft.service, status: "Submitted" };
}

export async function createCommercialRequest(
  draft: CommercialRequestDraft,
): Promise<{ id: string; opportunity: string; status: string }> {
  await delay(500);
  return { id: `cr-${Date.now()}`, opportunity: draft.opportunity, status: "Submitted" };
}

export async function createMarketingRequest(
  draft: MarketingRequestDraft,
): Promise<{ id: string; type: string; status: string }> {
  await delay(400);
  return { id: `mr-${Date.now()}`, type: draft.type, status: "Submitted" };
}
