import { apiRequest, hasConfiguredEndpoint, sleep } from "@/lib/api-client";
import { featuredScan } from "@/lib/mock-data";
import type { ScanResult, UrlScanInput } from "@/types";

const scanEndpoint = process.env.NEXT_PUBLIC_SCAN_ENDPOINT;

function deriveScan(url: string): ScanResult {
  const normalized = url.toLowerCase();
  const riskySignals = [
    "verify",
    "secure",
    "reset",
    "update",
    "login",
    "alert",
    "bank",
    "wallet",
  ].filter((signal) => normalized.includes(signal)).length;

  const probability = Math.min(99, 18 + riskySignals * 16);
  const riskLevel =
    probability >= 80 ? "phishing" : probability >= 45 ? "suspicious" : "safe";

  return {
    ...featuredScan,
    id: `scan-${Date.now()}`,
    scannedUrl: url,
    phishingProbability: probability,
    confidenceScore: Math.min(99, probability + 4),
    riskLevel,
    threatLevel:
      probability >= 80
        ? "Critical"
        : probability >= 55
          ? "High"
          : probability >= 35
            ? "Medium"
            : "Low",
    domainAge:
      riskLevel === "safe" ? "4 years" : riskLevel === "suspicious" ? "7 months" : "5 days",
    sslStatus:
      riskLevel === "safe" ? "Valid" : riskLevel === "suspicious" ? "Mixed signals" : "Misconfigured",
    redirectCount: riskLevel === "safe" ? 0 : riskLevel === "suspicious" ? 2 : 4,
    aiSummary:
      riskLevel === "safe"
        ? "The scanned URL shows low-risk behavior with a stable domain footprint and healthy certificate signals."
        : riskLevel === "suspicious"
          ? "The URL shows a mix of normal and risky signals, so it deserves a closer review before a user clicks through."
          : "The URL combines multiple phishing indicators, including urgency-oriented wording and risky trust signals.",
    createdAt: new Date().toISOString(),
  };
}

export async function submitUrlScan(input: UrlScanInput): Promise<ScanResult> {
  if (scanEndpoint && hasConfiguredEndpoint(scanEndpoint)) {
    return apiRequest<ScanResult>(scanEndpoint, {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  await sleep(2400);
  return deriveScan(input.url);
}
