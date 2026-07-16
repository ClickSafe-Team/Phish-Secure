import { apiRequest, hasConfiguredEndpoint, sleep } from "@/lib/api-client";
import { profileData } from "@/lib/mock-data";
import type { UserProfile } from "@/types";

const profileEndpoint = process.env.NEXT_PUBLIC_PROFILE_ENDPOINT;

export async function getProfileData(): Promise<UserProfile> {
  if (profileEndpoint && hasConfiguredEndpoint(profileEndpoint)) {
    return apiRequest<UserProfile>(profileEndpoint);
  }

  await sleep(600);
  return profileData;
}
