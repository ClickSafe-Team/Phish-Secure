"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteHistoryRecord, getHistoryRecords } from "@/services/history-service";

export function useHistoryData() {
  return useQuery({
    queryKey: ["history-data"],
    queryFn: getHistoryRecords,
  });
}

export function useDeleteHistoryRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHistoryRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history-data"] });
    },
  });
}
