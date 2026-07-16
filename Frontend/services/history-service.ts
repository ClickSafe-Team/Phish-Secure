import { apiRequest, hasConfiguredEndpoint, sleep } from "@/lib/api-client";
import { historyRecords } from "@/lib/mock-data";
import type { HistoryRecord } from "@/types";

const historyEndpoint = process.env.NEXT_PUBLIC_HISTORY_ENDPOINT;

export async function getHistoryRecords(): Promise<HistoryRecord[]> {
  if (historyEndpoint && hasConfiguredEndpoint(historyEndpoint)) {
    return apiRequest<HistoryRecord[]>(historyEndpoint);
  }

  await sleep(850);
  return historyRecords;
}

export async function deleteHistoryRecord(id: string) {
  if (historyEndpoint && hasConfiguredEndpoint(historyEndpoint)) {
    return apiRequest<{ success: boolean }>(`${historyEndpoint}/${id}`, {
      method: "DELETE",
    });
  }

  await sleep(350);
  const index = historyRecords.findIndex((record) => record.id === id);
  if (index >= 0) {
    historyRecords.splice(index, 1);
  }
  return { success: true };
}
