export type RiskLevel = "safe" | "suspicious" | "phishing";

export interface UrlScanInput {
  url: string;
}

export interface DetectionFactor {
  label: string;
  value: string;
  tone: "positive" | "neutral" | "warning";
}

export interface ScanResult {
  id: string;
  scannedUrl: string;
  riskLevel: RiskLevel;
  phishingProbability: number;
  confidenceScore: number;
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  domainAge: string;
  sslStatus: string;
  redirectCount: number;
  aiSummary: string;
  aiExplanation: string[];
  detectionFactors: DetectionFactor[];
  createdAt: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down";
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
}

export interface HistoryRecord {
  id: string;
  url: string;
  riskLevel: RiskLevel;
  probability: number;
  status: "Resolved" | "Monitoring" | "Blocked";
  redirects: number;
  scannedAt: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  scanTrend: ChartPoint[];
  riskDistribution: ChartPoint[];
  recentScans: HistoryRecord[];
  activity: RecentActivityItem[];
}

export interface SecurityPreference {
  label: string;
  description: string;
  enabled: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  company: string;
  plan: string;
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  securityPreferences: SecurityPreference[];
  apiKeys: ApiKey[];
}
