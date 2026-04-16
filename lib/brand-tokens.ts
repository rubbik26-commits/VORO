export const brandTokens = {
  colors: {
    voroRed:      "#D02C30",   // Official VORO brand red (PMS 711 C)
    royalPurple:  "#5E42BC",
    electricPink: "#F982FF",
    darkIndigo:   "#271C4F",
    jetBlack:     "#121216",
    ghostWhite:   "#F8F7FB",
    white:        "#FFFFFF",
    success:      "#15A46B",
    warning:      "#E8A317",
    danger:       "#D84C63",
    mutedBorder:  "#E7E3F2",
    softPanel:    "#F3EFFB",
    textMuted:    "#6F6887",
  },
  gradients: {
    primary: "linear-gradient(135deg, #5E42BC 0%, #271C4F 100%)",
    accent:  "linear-gradient(135deg, #5E42BC 0%, #F982FF 100%)",
    soft:    "linear-gradient(180deg, #FFFFFF 0%, #F8F7FB 100%)",
    glow:    "radial-gradient(circle, rgba(249,130,255,0.18) 0%, transparent 70%)",
  },
  radii: {
    xs:   "10px",
    sm:   "14px",
    md:   "18px",
    lg:   "24px",
    xl:   "32px",
    pill: "999px",
  },
  shadows: {
    soft:   "0 10px 30px rgba(39, 28, 79, 0.08)",
    medium: "0 20px 50px rgba(39, 28, 79, 0.12)",
    glow:   "0 14px 34px rgba(94, 66, 188, 0.28)",
  },
  typography: {
    heading: '"Plus Jakarta Sans", "Inter", "Segoe UI", sans-serif',
    body:    '"Plus Jakarta Sans", "Inter", "Segoe UI", sans-serif',
  },
  contact: {
    phone:           "877-943-8676",
    email:           "hello@voro.com",
    corporateOffice: "5550 Glades Rd, Suite 500, Boca Raton, FL 33431",
    office:          "1129 Northern Blvd, Suite 422, Manhasset, NY 11030",
  },
  social: {
    instagram: "https://instagram.com/vororealestate",
    facebook:  "https://facebook.com/vororealestate",
    linkedin:  "https://linkedin.com/company/vororealestate",
    x:         "https://x.com/vororealestate",
    youtube:   "https://youtube.com/@vororealestate",
    tiktok:    "https://tiktok.com/@vororealestate",
  },
  nav: [
    "Dashboard",
    "Transactions",
    "Leads",
    "Academy",
    "Services",
    "Marketing",
    "Documents",
    "Profile",
    "Commercial",
    "Recruiting",
    "Revenue Share",
    "Teams",
    "Support",
    "Settings",
  ] as const,
} as const;

export type BrandTokens = typeof brandTokens;
export type NavItem = typeof brandTokens.nav[number];
