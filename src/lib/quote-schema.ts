import type { z as zType } from "zod";
import * as zMod from "zod";

// Safe resolver across ESM/CJS bundlers and test environments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const z = ((zMod as any).z ?? (zMod as any).default ?? zMod) as typeof zType;

export const serviceValues = [
  "Website creation",
  "Social media advice",
  "Social media management",
] as const;

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email address is too long."),
  businessName: z.string().trim().max(120).optional().default(""),
  currentWebsiteOrProfile: z.string().trim().max(255).optional().default(""),
  helpNeeded: z
    .string()
    .trim()
    .min(1, "Please tell us what you need help with.")
    .max(3000, "Inquiry is too long."),
  services: z.array(z.enum(serviceValues)).optional().default(["Website creation"]),
  website: z.string().max(0).optional().default(""), // Honeypot anti-spam
});

export type InquiryInput = zType.infer<typeof inquirySchema>;

// Backwards-compatible export alias
export const quoteRequestSchema = inquirySchema;
export type QuoteRequestInput = InquiryInput;
