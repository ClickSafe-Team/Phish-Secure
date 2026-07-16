"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "@/services/profile-service";

export function useProfileData() {
  return useQuery({
    queryKey: ["profile-data"],
    queryFn: getProfileData,
  });
}
