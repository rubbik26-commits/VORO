export type NavItem =
  | "Dashboard"
  | "Transactions"
  | "Leads"
  | "Academy"
  | "Services"
  | "Marketing"
  | "Documents"
  | "Profile"
  | "Support"
  | "Settings";

export type Kpi = {
  label: string;
  value: string;
  delta?: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  category: "Operations" | "Training" | "Marketing" | "Compliance";
  ctaLabel?: string;
};

export type Transaction = {
  id: string;
  address: string;
  client: string;
  side: "Buy" | "Sell" | "Lease";
  status: string;
  closingDate: string;
  commission: string;
};

export type ServiceCard = {
  title: string;
  description: string;
  eta: string;
};

export type AcademySession = {
  title: string;
  time: string;
  format: string;
};

export type DocumentRow = {
  name: string;
  state: string;
  category: string;
  updated: string;
};

export const agent = {
  firstName: "Daniel",
  lastName: "Shamooil",
  role: "Broker / CEO",
  market: "New York & Florida",
  profileCompleteness: 86,
};

export const kpis: Kpi[] = [
  { label: "Pending Commission", value: "$48,200", delta: "+12% this month" },
  { label: "YTD Earnings", value: "$612,400", delta: "+18% vs last year" },
  { label: "Active Deals", value: "14", delta: "3 need attention" },
  { label: "Action Items", value: "7", delta: "2 urgent today" },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Spring marketing push is live",
    body: "Download updated listing and recruiting assets from the Marketing section.",
    category: "Marketing",
    ctaLabel: "Open Brand Kit",
  },
  {
    id: "a2",
    title: "New onboarding pathway published",
    body: "New agents can now complete account setup, document upload, and profile activation in one flow.",
    category: "Operations",
    ctaLabel: "View Workflow",
  },
  {
    id: "a3",
    title: "Compliance reminder",
    body: "Review your profile disclosures and marketing disclaimers before launching new campaigns.",
    category: "Compliance",
    ctaLabel: "Review Now",
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    address: "1609 Noyac Road, Southampton, NY",
    client: "North Shore Seller",
    side: "Sell",
    status: "Attorney Review",
    closingDate: "May 24",
    commission: "$27,000",
  },
  {
    id: "t2",
    address: "66 Essex Rd, Great Neck, NY",
    client: "Relocation Buyer",
    side: "Buy",
    status: "Inspection Scheduled",
    closingDate: "May 31",
    commission: "$18,400",
  },
  {
    id: "t3",
    address: "1320 Clay Ave, Bronx, NY",
    client: "Rental Placement",
    side: "Lease",
    status: "Documents Outstanding",
    closingDate: "Apr 22",
    commission: "$4,900",
  },
];

export const services: ServiceCard[] = [
  {
    title: "Lending",
    description: "Connect your client to financing support and scenario review.",
    eta: "Typical response: same day",
  },
  {
    title: "Title",
    description: "Start title coordination and keep the file moving cleanly.",
    eta: "Typical response: 1 business day",
  },
  {
    title: "Insurance",
    description: "Request quotes and coverage support for buyers, owners, and investors.",
    eta: "Typical response: same day",
  },
  {
    title: "Research & Analytics",
    description: "Pull market comps, investor views, and neighborhood insights.",
    eta: "Typical response: 1–2 business days",
  },
];

export const academy: AcademySession[] = [
  { title: "Investor lead conversion", time: "Tuesday • 1:00 PM", format: "Live Zoom" },
  { title: "Luxury listing positioning", time: "Wednesday • 11:00 AM", format: "Workshop" },
  { title: "Agent onboarding sprint", time: "Thursday • 10:00 AM", format: "Self-paced + live Q&A" },
];

export const documents: DocumentRow[] = [
  { name: "Exclusive Listing Agreement", state: "NY", category: "Brokerage Forms", updated: "Apr 11" },
  { name: "Buyer Representation Agreement", state: "FL", category: "Brokerage Forms", updated: "Apr 13" },
  { name: "Marketing Disclaimer Pack", state: "All States", category: "Compliance", updated: "Apr 14" },
  { name: "Open House Checklist", state: "All States", category: "Templates", updated: "Apr 09" },
];
