import type {
  DashboardData,
  HistoryRecord,
  ScanResult,
  UserProfile,
} from "@/types";

export const testimonials = [
  {
    name: "Maya Chen",
    role: "Security Operations Lead, NovaBank",
    review:
      "Cipher Sentry gave our analysts a faster first read on suspicious links without drowning them in noise.",
  },
  {
    name: "Jordan Patel",
    role: "IT Director, ClearPath Health",
    review:
      "The signal quality feels premium. We can explain risk to non-technical teams in seconds now.",
  },
  {
    name: "Elena Brooks",
    role: "Founder, StackHorizon",
    review:
      "The dashboard is sharp, the scan history is usable, and the AI summaries help us act instead of guess.",
  },
] as const;

export const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "/month",
    description: "For solo founders and lightweight link triage.",
    features: ["50 scans per month", "AI verdicts", "Basic history"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$39",
    cadence: "/seat",
    description: "For growing teams that need continuous phishing defense.",
    features: [
      "Unlimited scans",
      "Threat analytics",
      "CSV export",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For security teams with custom workflows and compliance needs.",
    features: [
      "Dedicated onboarding",
      "API access",
      "Advanced controls",
      "Success manager",
    ],
    featured: false,
  },
] as const;

export const featureCards = [
  {
    title: "Real-Time Detection",
    copy:
      "Surface suspicious redirects, risky domains, and SSL anomalies as soon as the scan starts.",
  },
  {
    title: "Explainable AI Analysis",
    copy:
      "Translate threat signals into clear language your analysts and stakeholders can trust.",
  },
  {
    title: "Machine Learning Scoring",
    copy:
      "Blend model confidence with security indicators for a crisp phishing probability score.",
  },
  {
    title: "Threat Intelligence View",
    copy:
      "Spot clusters of malicious behavior with richer context around domains and link patterns.",
  },
  {
    title: "Browser Protection Insights",
    copy:
      "Use scan outcomes as a fast preview layer before risky links reach the wider team.",
  },
  {
    title: "Fast Detection Workflow",
    copy:
      "Keep teams moving with quick scan actions, saved history, and high-clarity UI feedback.",
  },
] as const;

export const dashboardData: DashboardData = {
  metrics: [
    { label: "URLs Scanned", value: "18.4K", delta: "+12.4%", direction: "up" },
    { label: "Threats Prevented", value: "1,286", delta: "+8.1%", direction: "up" },
    { label: "Model Accuracy", value: "98.7%", delta: "+0.9%", direction: "up" },
    { label: "Active Users", value: "3,942", delta: "-1.2%", direction: "down" },
  ],
  scanTrend: [
    { label: "Mon", value: 30 },
    { label: "Tue", value: 42 },
    { label: "Wed", value: 37 },
    { label: "Thu", value: 55 },
    { label: "Fri", value: 62 },
    { label: "Sat", value: 48 },
    { label: "Sun", value: 58 },
  ],
  riskDistribution: [
    { label: "Safe", value: 62 },
    { label: "Suspicious", value: 24 },
    { label: "Phishing", value: 14 },
  ],
  recentScans: [
    {
      id: "scan-01",
      url: "https://verify-microsoft-auth.live",
      riskLevel: "phishing",
      probability: 96,
      status: "Blocked",
      redirects: 4,
      scannedAt: "2026-07-14T08:18:00.000Z",
    },
    {
      id: "scan-02",
      url: "https://cdn-notice-payments.com",
      riskLevel: "suspicious",
      probability: 68,
      status: "Monitoring",
      redirects: 2,
      scannedAt: "2026-07-14T07:52:00.000Z",
    },
    {
      id: "scan-03",
      url: "https://openai.com",
      riskLevel: "safe",
      probability: 5,
      status: "Resolved",
      redirects: 0,
      scannedAt: "2026-07-14T06:35:00.000Z",
    },
  ],
  activity: [
    {
      id: "activity-01",
      title: "Phishing attempt blocked",
      detail: "A high-risk Microsoft-themed credential lure was flagged and blocked.",
      timestamp: "4 minutes ago",
    },
    {
      id: "activity-02",
      title: "CSV export completed",
      detail: "Risk team exported the last 30 days of scan history.",
      timestamp: "28 minutes ago",
    },
    {
      id: "activity-03",
      title: "API key rotated",
      detail: "Workspace integration key was refreshed successfully.",
      timestamp: "2 hours ago",
    },
  ],
};

export const historyRecords: HistoryRecord[] = [
  ...dashboardData.recentScans,
  {
    id: "scan-04",
    url: "https://client-portal-update.info",
    riskLevel: "phishing",
    probability: 91,
    status: "Blocked",
    redirects: 3,
    scannedAt: "2026-07-13T22:11:00.000Z",
  },
  {
    id: "scan-05",
    url: "https://docs.company-secure.co",
    riskLevel: "safe",
    probability: 12,
    status: "Resolved",
    redirects: 0,
    scannedAt: "2026-07-13T20:42:00.000Z",
  },
  {
    id: "scan-06",
    url: "https://invoice-view-urgent.com",
    riskLevel: "suspicious",
    probability: 59,
    status: "Monitoring",
    redirects: 1,
    scannedAt: "2026-07-13T17:30:00.000Z",
  },
  {
    id: "scan-07",
    url: "https://banking-secure-login.link",
    riskLevel: "phishing",
    probability: 98,
    status: "Blocked",
    redirects: 5,
    scannedAt: "2026-07-13T15:04:00.000Z",
  },
];

export const profileData: UserProfile = {
  name: "Avery Morgan",
  email: "avery@cipher-sentry.ai",
  role: "Security Administrator",
  company: "Cipher Sentry",
  plan: "Pro",
  notificationsEnabled: true,
  darkModeEnabled: false,
  securityPreferences: [
    {
      label: "Require MFA for all members",
      description: "Protect dashboard access with an additional verification step.",
      enabled: true,
    },
    {
      label: "Alert on critical scans",
      description: "Trigger urgent notifications when a scan crosses the phishing threshold.",
      enabled: true,
    },
    {
      label: "Weekly summary email",
      description: "Send a weekly digest of scans, detections, and team activity.",
      enabled: false,
    },
  ],
  apiKeys: [
    {
      id: "key-01",
      name: "Primary Integration",
      prefix: "cs_live_91AX",
      createdAt: "2026-06-09T14:00:00.000Z",
      lastUsed: "2 minutes ago",
    },
    {
      id: "key-02",
      name: "SIEM Sync",
      prefix: "cs_live_33QK",
      createdAt: "2026-05-27T10:12:00.000Z",
      lastUsed: "6 hours ago",
    },
  ],
};

export const featuredScan: ScanResult = {
  id: "scan-preview",
  scannedUrl: "https://secure-password-reset-alert.com",
  riskLevel: "phishing",
  phishingProbability: 94,
  confidenceScore: 98,
  threatLevel: "Critical",
  domainAge: "3 days",
  sslStatus: "Misconfigured",
  redirectCount: 4,
  aiSummary:
    "The link imitates an account recovery flow and combines a young domain with suspicious redirects.",
  aiExplanation: [
    "The domain was registered very recently, which is common in short-lived phishing campaigns.",
    "The page path and copy imitate a trusted recovery experience but send users to a mismatched host.",
    "Multiple redirects and SSL issues raise the likelihood that the destination is attempting credential theft.",
  ],
  detectionFactors: [
    { label: "Brand impersonation", value: "Detected", tone: "warning" },
    { label: "Domain trust", value: "Low", tone: "warning" },
    { label: "SSL posture", value: "Weak", tone: "warning" },
    { label: "Redirect chain", value: "4 hops", tone: "neutral" },
  ],
  createdAt: "2026-07-14T08:18:00.000Z",
};
