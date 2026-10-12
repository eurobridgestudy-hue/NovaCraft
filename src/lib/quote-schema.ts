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

// Helper to validate clean email structure with valid TLD
export function isValidEmailFormat(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) return false;

  const parts = trimmed.split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1];
  if (!domain || !domain.includes(".")) return false;

  const tld = domain.split(".").pop();
  return Boolean(tld && tld.length >= 2 && /^[a-zA-Z]+$/.test(tld));
}

// Helper to validate real name (contains letters, not pure numbers or symbols)
export function isValidNameFormat(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 1) return false;
  // Must contain at least one letter
  const hasLetter = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(trimmed);
  if (!hasLetter) return false;
  // Must not consist entirely of numbers or punctuation
  if (/^[\d\s\W_]+$/.test(trimmed)) return false;
  return true;
}

// Helper to validate website or social handle
export function isValidOnlinePresence(val: string): boolean {
  const trimmed = val.trim();
  if (!trimmed) return true;
  const v = trimmed.toLowerCase();
  if (v.startsWith("@") && v.length >= 2) return true;
  if (v.startsWith("http://") || v.startsWith("https://")) return true;
  if (v.includes(".") && v.length >= 4) return true;
  return false;
}

// Helper to validate inquiry message (meaningful text, not single character spam)
export function isValidInquiryMessage(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 5) return false;
  // Must contain letters
  const hasLetters = /[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/.test(trimmed);
  if (!hasLetters) return false;
  // Avoid repetitive spam (e.g. "aaaaaaaaaaaa")
  const stripped = trimmed.replace(/\s+/g, "").toLowerCase();
  const uniqueChars = new Set(stripped).size;
  if (stripped.length >= 10 && uniqueChars <= 2) return false;
  return true;
}

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Name must be 100 characters or fewer.")
    .refine(isValidNameFormat, "Please enter a valid contact or business name containing letters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email address is too long.")
    .refine(isValidEmailFormat, "Please enter a complete email address (e.g. name@company.com)."),
  businessName: z
    .string()
    .trim()
    .max(120, "Business name is too long.")
    .optional()
    .default("")
    .refine((val) => {
      if (!val || val.length === 0) return true;
      return /[a-zA-Z0-9\u00C0-\u024F]/.test(val);
    }, "Please enter a valid business or organisation name."),
  currentWebsiteOrProfile: z
    .string()
    .trim()
    .max(255, "Website address or profile is too long.")
    .optional()
    .default("")
    .refine(
      isValidOnlinePresence,
      "Please enter a valid website (e.g. company.com) or social profile (e.g. @yourbusiness).",
    ),
  helpNeeded: z
    .string()
    .trim()
    .min(5, "Please tell us what you need help with (at least 5 characters).")
    .max(3000, "Inquiry message is too long.")
    .refine(
      isValidInquiryMessage,
      "Please enter a clear project inquiry describing your requirements.",
    ),
  services: z.array(z.enum(serviceValues)).optional().default(["Website creation"]),
  website: z.string().max(0).optional().default(""), // Honeypot anti-spam
});

export type InquiryInput = zType.infer<typeof inquirySchema>;

// Backwards-compatible export alias
export const quoteRequestSchema = inquirySchema;
export type QuoteRequestInput = InquiryInput;
