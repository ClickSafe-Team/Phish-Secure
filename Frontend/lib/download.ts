import { jsPDF } from "jspdf";
import type { HistoryRecord, ScanResult } from "@/types";

export function downloadScanReport(result: ScanResult) {
  const pdf = new jsPDF();
  pdf.setFontSize(18);
  pdf.text("Cipher Sentry Scan Report", 16, 20);
  pdf.setFontSize(11);
  pdf.text(`URL: ${result.scannedUrl}`, 16, 34);
  pdf.text(`Risk level: ${result.riskLevel}`, 16, 44);
  pdf.text(`Probability: ${result.phishingProbability}%`, 16, 54);
  pdf.text(`Confidence: ${result.confidenceScore}%`, 16, 64);
  pdf.text(`Summary: ${result.aiSummary}`, 16, 78, {
    maxWidth: 176,
  });
  pdf.save("cipher-sentry-report.pdf");
}

export function exportHistoryToCsv(records: HistoryRecord[]) {
  const header = ["URL", "Risk Level", "Probability", "Status", "Redirects", "Scanned At"];
  const rows = records.map((record) => [
    record.url,
    record.riskLevel,
    `${record.probability}%`,
    record.status,
    `${record.redirects}`,
    record.scannedAt,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "cipher-sentry-history.csv";
  link.click();
  URL.revokeObjectURL(link.href);
}
