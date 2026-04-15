import { brandTokens, type NavItem } from "@/lib/brand-tokens";

export type { NavItem };

export const agent = {
  id: "agent-1",
  firstName: "Jordan",
  lastName: "Mills",
  role: "Licensed Real Estate Agent",
  marketArea: "Greater NYC Metro",
  email: "jordan.mills@voro.com",
  phone: "(917) 555-0182",
  website: "https://jordanmills.voro.com",
  bio: "Jordan Mills is a growth-focused residential and commercial agent based in NYC with 8 years of experience helping buyers, sellers, and investors navigate the New York metro market. Known for aggressive negotiation, deep borough knowledge, and investor-friendly deal structuring.",
  licenseState: "NY",
  licenseNumber: "10401393852",
  profileCompleteness: 86,
  rating: 4.9,
  reviews: 47,
  closedTransactions: 112,
  ytdVolume: "$6.2M",
  joinDate: "2021-03-15",
  specialties: ["Buyer Representation", "Listing Agent", "Investor Deals", "1031 Exchange", "Short Sales"],
  languages: ["English", "Spanish"],
  serviceAreas: [
    { name: "Manhattan",   activity: "High"   },
    { name: "Brooklyn",    activity: "High"   },
    { name: "Queens",      activity: "Medium" },
    { name: "Bronx",       activity: "Medium" },
    { name: "Jersey City", activity: "Low"    },
    { name: "Newark",      activity: "Low"    },
  ],
  social: {
    instagram: brandTokens.social.instagram,
    linkedin:  brandTokens.social.linkedin,
    facebook:  brandTokens.social.facebook,
  },
  completionItems: [
    { label: "Profile photo",  done: false },
    { label: "Bio",            done: true  },
    { label: "Specialties",    done: true  },
    { label: "Service areas",  done: true  },
    { label: "Social links",   done: true  },
    { label: "License upload", done: false },
    { label: "Headshot",       done: false },
  ],
};

export const kpis = [
  { id: "k1", label: "Pending Commission",  value: "$48,200",  delta: "+$5,400 this month",  trend: "up"   as const },
  { id: "k2", label: "YTD Commission",      value: "$612,400", delta: "On track for $800K",   trend: "up"   as const },
  { id: "k3", label: "Active Deals",        value: "14",       delta: "3 closing this month", trend: "up"   as const },
  { id: "k4", label: "Action Items",        value: "7",        delta: "2 urgent",              trend: "down" as const },
];

export const transactions = [
  {
    id: "t1",
    address: "142 West 72nd St, Apt 8B",
    city: "New York", state: "NY",
    client: "Marcus & Elena Soto",
    side: "Buyer",
    status: "Attorney Review",
    listPrice: 1250000, salePrice: 1210000, commission: 18150,
    closingDate: "May 14, 2026",
    brokerReview: "Approved",
    milestones: [
      { label: "Offer Accepted",      completed: true,  date: "Apr 2"  },
      { label: "Attorney Review",     completed: true,  date: "Apr 5"  },
      { label: "Inspection",          completed: false, date: null     },
      { label: "Mortgage Commitment", completed: false, date: null     },
      { label: "Clear to Close",      completed: false, date: null     },
      { label: "Closing",             completed: false, date: null     },
    ],
    missingDocs: ["Inspection Waiver", "Co-op Board Application"],
  },
  {
    id: "t2",
    address: "580 Carroll St",
    city: "Brooklyn", state: "NY",
    client: "Daniel Reyes",
    side: "Seller",
    status: "Inspection Scheduled",
    listPrice: 1875000, salePrice: 0, commission: 56250,
    closingDate: "Jun 5, 2026",
    brokerReview: "Pending",
    milestones: [
      { label: "Listed on MLS",       completed: true,  date: "Mar 28" },
      { label: "Accepted Offer",      completed: true,  date: "Apr 8"  },
      { label: "Inspection",          completed: false, date: "Apr 18" },
      { label: "Attorney Review",     completed: false, date: null     },
      { label: "Mortgage Commitment", completed: false, date: null     },
      { label: "Closing",             completed: false, date: null     },
    ],
    missingDocs: [],
  },
  {
    id: "t3",
    address: "34-12 Junction Blvd, Unit 2F",
    city: "Jackson Heights", state: "NY",
    client: "Patricia Guzmán",
    side: "Buyer",
    status: "Documents Outstanding",
    listPrice: 545000, salePrice: 530000, commission: 7950,
    closingDate: "Apr 30, 2026",
    brokerReview: "Needs Revision",
    milestones: [
      { label: "Offer Accepted",      completed: true,  date: "Mar 22" },
      { label: "Attorney Review",     completed: true,  date: "Mar 26" },
      { label: "Inspection",          completed: true,  date: "Mar 30" },
      { label: "Mortgage Commitment", completed: false, date: null     },
      { label: "Clear to Close",      completed: false, date: null     },
      { label: "Closing",             completed: false, date: null     },
    ],
    missingDocs: ["Mortgage Commitment Letter", "Proof of Funds Update", "Updated ID"],
  },
  {
    id: "t4",
    address: "2211 Grand Concourse, Suite 410",
    city: "Bronx", state: "NY",
    client: "UrbanCore Capital Group",
    side: "Buyer",
    status: "Clear to Close",
    listPrice: 3200000, salePrice: 3050000, commission: 61000,
    closingDate: "Apr 21, 2026",
    brokerReview: "Approved",
    milestones: [
      { label: "LOI Signed",          completed: true, date: "Feb 14" },
      { label: "Due Diligence",       completed: true, date: "Mar 1"  },
      { label: "Purchase Contract",   completed: true, date: "Mar 10" },
      { label: "Title Clear",         completed: true, date: "Apr 5"  },
      { label: "Clear to Close",      completed: true, date: "Apr 12" },
      { label: "Closing",             completed: false, date: "Apr 21" },
    ],
    missingDocs: [],
  },
];

export const announcements = [
  {
    id: "a1", category: "Marketing", cta: "Download",
    title: "Q2 Brand Refresh Assets Live",
    body: "New listing templates, buyer guide covers, and social media kits are now available in the asset library.",
  },
  {
    id: "a2", category: "Operations", cta: "Read more",
    title: "Updated Commission Disbursement Schedule",
    body: "Starting May 1, commission payouts will process every Wednesday instead of bi-weekly. Review the updated policy.",
  },
  {
    id: "a3", category: "Compliance", cta: "Review",
    title: "NY Fair Housing Disclosure Update Required",
    body: "All NY-licensed agents must complete the updated fair housing certification by June 30, 2026.",
  },
];

export const services = [
  { id: "s1", title: "Lending Support",      category: "Lending",    description: "Deal strategy, pre-qual coordination, lender matching, investor financing scenarios.",         eta: "Response within 4 hours",   cta: "Request Lending Help"   },
  { id: "s2", title: "Title Coordination",   category: "Title",      description: "Title order, commitment review, lien searches, and closing coordination with attorneys.",       eta: "Response within 8 hours",   cta: "Open Title Request"     },
  { id: "s3", title: "Insurance Quote",       category: "Insurance",  description: "Homeowners, flood, title, and E&O insurance quotes coordinated through VORO partners.",          eta: "Quote within 24 hours",     cta: "Get Insurance Quote"    },
  { id: "s4", title: "Research & Analytics", category: "Research",   description: "Comps, market reports, investment analysis, and neighborhood data packages.",                   eta: "Delivered within 48 hours", cta: "Request Research"       },
  { id: "s5", title: "Lead Generation",       category: "Lead Gen",   description: "Targeted buyer/seller lead campaigns, social ads, and referral pipeline management.",           eta: "Campaign launch in 5 days", cta: "Start Lead Campaign"    },
  { id: "s6", title: "Commercial Services",   category: "Commercial", description: "Office, retail, industrial, and mixed-use deal support with dedicated commercial advisors.", eta: "Response within 8 hours",   cta: "Talk to Commercial Team" },
];

export const academy = [
  { id: "ac1", title: "Mastering NYC Co-op Deals",          type: "Live Session", date: "Apr 22, 2026", time: "2:00 PM ET",  duration: "60 min",  instructor: "Maria Vasquez",     description: "Step-by-step walkthrough of co-op board packages, financials, and approval timelines.",       tags: ["Co-op","NYC","Buyer"],          enrolled: true,  completed: false },
  { id: "ac2", title: "1031 Exchange Fundamentals",          type: "Workshop",     date: "Apr 29, 2026", time: "11:00 AM ET", duration: "90 min",  instructor: "David Chen",        description: "Identification rules, timelines, qualified intermediaries, and investor strategies.",           tags: ["Investor","Tax","Exchange"],    enrolled: false, completed: false },
  { id: "ac3", title: "VORO Agent Portal Orientation",       type: "Self-Paced",   date: null,           time: null,          duration: "30 min",  instructor: "VORO Training Team", description: "Learn the portal end to end: submitting deals, using services, and managing your profile.",   tags: ["Onboarding","Portal"],          enrolled: true,  completed: true  },
  { id: "ac4", title: "Commercial Deal Structuring",         type: "Coaching",     date: "May 6, 2026",  time: "10:00 AM ET", duration: "60 min",  instructor: "James Patterson",   description: "Cap rates, NOI, deal structuring, and negotiation tactics for commercial listings.",           tags: ["Commercial","Investment"],      enrolled: false, completed: false },
  { id: "ac5", title: "Social Media for Real Estate Agents", type: "Video",        date: null,           time: null,          duration: "45 min",  instructor: "Camille Torres",    description: "Build your personal brand on Instagram, TikTok, and LinkedIn using VORO brand assets.",       tags: ["Marketing","Social","Brand"],   enrolled: false, completed: false },
  { id: "ac6", title: "Luxury Listing Strategies",           type: "Live Session", date: "May 13, 2026", time: "3:00 PM ET",  duration: "75 min",  instructor: "Sofia Reinholt",    description: "Pricing, staging, photography, and negotiation for $2M+ residential listings.",               tags: ["Luxury","Listing","Seller"],    enrolled: false, completed: false },
];

export const documents = [
  { id: "d1",  name: "Exclusive Right to Sell Agreement",    category: "Brokerage Forms", state: "NY",  format: "PDF",  updatedAt: "Mar 10, 2026" },
  { id: "d2",  name: "Buyer Agency Agreement",               category: "Brokerage Forms", state: "NY",  format: "PDF",  updatedAt: "Mar 10, 2026" },
  { id: "d3",  name: "REBNY Disclosure Form",                category: "Compliance",      state: "NY",  format: "PDF",  updatedAt: "Feb 28, 2026" },
  { id: "d4",  name: "Fair Housing Acknowledgment (2026)",   category: "Compliance",      state: "NY",  format: "PDF",  updatedAt: "Jan 15, 2026" },
  { id: "d5",  name: "Property Condition Disclosure",        category: "Disclosures",     state: "NY",  format: "PDF",  updatedAt: "Mar 1, 2026"  },
  { id: "d6",  name: "Lead Paint Disclosure",               category: "Disclosures",     state: "NY",  format: "PDF",  updatedAt: "Jan 10, 2026" },
  { id: "d7",  name: "Open House Sign-In Template",          category: "Templates",       state: "ALL", format: "DOCX", updatedAt: "Apr 1, 2026"  },
  { id: "d8",  name: "Offer Summary Template",               category: "Templates",       state: "ALL", format: "DOCX", updatedAt: "Apr 1, 2026"  },
  { id: "d9",  name: "Inspection Waiver Form",               category: "Brokerage Forms", state: "NY",  format: "PDF",  updatedAt: "Feb 20, 2026" },
  { id: "d10", name: "Jordan Mills — License Copy",          category: "Uploads",         state: "NY",  format: "PDF",  updatedAt: "Apr 14, 2026" },
];

export const leads = [
  { id: "l1", name: "Carmen Velasquez", type: "Buyer",    status: "Active",    market: "Brooklyn, NY",    phone: "(718) 555-0191", email: "cvelasquez@email.com", source: "Zillow",     notes: "Pre-approved at $850K. Looking for 3BR in Park Slope or Carroll Gardens." },
  { id: "l2", name: "Kevin Thornton",   type: "Seller",   status: "New",       market: "Manhattan, NY",   phone: "(212) 555-0144", email: "kthorn@email.com",      source: "Referral",   notes: "Considering listing 2BR condo on UES. Wants CMA first." },
  { id: "l3", name: "Priya Nair",       type: "Investor", status: "Nurturing", market: "Queens, NY",      phone: "(917) 555-0177", email: "pnair@invest.com",      source: "Website",    notes: "Looking for 4-6 unit multifamily. Cash buyer up to $2M." },
  { id: "l4", name: "Marcus White",     type: "Buyer",    status: "Contacted", market: "Bronx, NY",       phone: "(718) 555-0155", email: "mwhite@mail.com",       source: "Facebook",   notes: "First-time buyer. FHA loan. Max $450K." },
  { id: "l5", name: "Yolanda Fuentes",  type: "Renter",   status: "Active",    market: "Jersey City, NJ", phone: "(201) 555-0131", email: "yfuentes@mail.com",     source: "StreetEasy", notes: "Looking for 2BR under $3,500/mo near PATH." },
  { id: "l6", name: "James Okonkwo",    type: "Recruit",  status: "New",       market: "NYC Metro",       phone: "(646) 555-0189", email: "jokonkwo@realty.com",   source: "LinkedIn",   notes: "Experienced agent, 5 years at Compass. Open to conversation about VORO comp structure." },
  { id: "l7", name: "Sandra Birch",     type: "Seller",   status: "Active",    market: "Manhattan, NY",   phone: "(212) 555-0166", email: "sbirch@mail.com",       source: "Referral",   notes: "Ready to list in May. 3BR co-op on Central Park West. Estimated $2.4M." },
  { id: "l8", name: "Tyrone Jackson",   type: "Buyer",    status: "Lost",      market: "Brooklyn, NY",    phone: "(718) 555-0122", email: "tjackson@mail.com",     source: "Zillow",     notes: "Went with another agent. Keep for future." },
];

export const marketingAssets = [
  { id: "ma1",  name: "VORO Listing Presentation",          category: "Kit",      format: "PPTX" },
  { id: "ma2",  name: "Buyer Guide — NYC Edition",           category: "Flyer",    format: "PDF"  },
  { id: "ma3",  name: "Seller CMA Template",                 category: "Flyer",    format: "DOCX" },
  { id: "ma4",  name: "Instagram Story — Just Listed",       category: "Social",   format: "PNG"  },
  { id: "ma5",  name: "Instagram Post — Just Sold",          category: "Social",   format: "PNG"  },
  { id: "ma6",  name: "Open House Flyer Template",           category: "Flyer",    format: "PDF"  },
  { id: "ma7",  name: "Drip Email — Buyer Sequence (5pt)",   category: "Email",    format: "HTML" },
  { id: "ma8",  name: "Postcard — Just Listed",              category: "Postcard", format: "PDF"  },
  { id: "ma9",  name: "Agent Bio Template",                  category: "Kit",      format: "DOCX" },
  { id: "ma10", name: "Video Script — Neighborhood Tour",    category: "Video",    format: "PDF"  },
  { id: "ma11", name: "Facebook Ad — Buyer Lead Gen",        category: "Social",   format: "PNG"  },
  { id: "ma12", name: "Neighborhood Market Report Template", category: "Flyer",    format: "PDF"  },
];

export const supportTickets = [
  { id: "st1", subject: "Commission payment not received — T-1234", department: "Accounting",  priority: "High",   status: "In Progress", created: "Apr 10, 2026" },
  { id: "st2", subject: "Need updated fair housing cert link",        department: "Compliance",  priority: "Medium", status: "Open",        created: "Apr 12, 2026" },
  { id: "st3", subject: "Marketing asset request — listing flyer",   department: "Marketing",   priority: "Low",    status: "Resolved",    created: "Apr 5, 2026"  },
  { id: "st4", subject: "Portal login issue on mobile Safari",        department: "Technology",  priority: "Medium", status: "Waiting",     created: "Apr 13, 2026" },
];
