import { z } from "zod";

export const urlScanSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "Enter a URL to scan")
    .url("Enter a valid URL including https://"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Company is too short"),
});

export type UrlScanSchema = z.infer<typeof urlScanSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
