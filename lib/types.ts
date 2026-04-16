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

export type Agent = typeof mockAgent;
export type Kpi = (typeof mockKpis)[number];
export type Transaction = (typeof mockTransactions)[number];
export type TransactionMilestone = Transaction["milestones"][number];
export type Announcement = (typeof mockAnnouncements)[number];
export type Service = (typeof mockServices)[number];
export type AcademySession = (typeof mockAcademy)[number];
export type DocumentItem = (typeof mockDocuments)[number];
export type Lead = (typeof mockLeads)[number];
export type MarketingAsset = (typeof mockMarketingAssets)[number];
export type SupportTicket = (typeof mockSupportTickets)[number];

export type Role =
  | "agent"
  | "team_lead"
  | "commercial_advisor"
  | "broker"
  | "admin";

export type ModuleKey =
  | "commercial"
  | "recruiting"
  | "revenue_share"
  | "teams";

export type ToastKind = "success" | "error" | "info" | "warning";

export type TransactionDraft = {
  address: string;
  city: string;
  state: string;
  client: string;
  side: Transaction["side"];
  listPrice: number;
  salePrice?: number;
  commission?: number;
  closingDate: string;
};

export type LeadDraft = {
  name: string;
  type: Lead["type"];
  market: string;
  phone: string;
  email: string;
  source: string;
  notes: string;
};

export type SupportTicketDraft = {
  subject: string;
  department: string;
  priority: SupportTicket["priority"];
  description: string;
};

export type DocumentUpload = {
  name: string;
  category: DocumentItem["category"];
  state: DocumentItem["state"];
  format: DocumentItem["format"];
};
