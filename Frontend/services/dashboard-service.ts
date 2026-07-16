import { apiRequest, hasConfiguredEndpoint, sleep } from "@/lib/api-client";
import { dashboardData } from "@/lib/mock-data";
import type { DashboardData } from "@/types";

const dashboardEndpoint = process.env.NEXT_PUBLIC_DASHBOARD_ENDPOINT;

export async function getDashboardData(): Promise<DashboardData> {
  if (dashboardEndpoint && hasConfiguredEndpoint(dashboardEndpoint)) {
    return apiRequest<DashboardData>(dashboardEndpoint);
  }

  await sleep(900);
  return dashboardData;
}
