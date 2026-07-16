"use client";

import { useMutation } from "@tanstack/react-query";
import { submitUrlScan } from "@/services/scan-service";

export function useUrlScan() {
  return useMutation({
    mutationFn: submitUrlScan,
  });
}
