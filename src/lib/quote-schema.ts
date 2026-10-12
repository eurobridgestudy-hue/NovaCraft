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

export const quoteRequestSchema = z.object({
  contactName: z.string().trim().min(2, "Please enter your name.").max(100),
  businessName: z.string().trim().min(2, "Please enter your business name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  services: z.array(z.enum(serviceValues)).min(1, "Choose at least one service.").max(3),
  businessContext: z
    .string()
    .trim()
    .min(10, "Tell us a little more about your business.")
    .max(1000),
  projectDetails: z
    .string()
    .trim()
    .min(20, "Please share a little more about the project.")
    .max(3000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm before submitting." }) }),
  website: z.string().max(0).optional().default(""),
});

export type QuoteRequestInput = zType.infer<typeof quoteRequestSchema>;
