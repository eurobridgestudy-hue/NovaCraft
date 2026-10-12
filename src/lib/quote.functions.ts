import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP, setResponseHeader } from "@tanstack/react-start/server";

import { inquirySchema } from "@/lib/quote-schema";

async function fingerprint(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// In-memory rate limiting tracker (max 5 inquiries per hour per fingerprint)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(requesterHash: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const timestamps = (rateLimitMap.get(requesterHash) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= 5) {
    return false;
  }
  timestamps.push(now);
  rateLimitMap.set(requesterHash, timestamps);
  return true;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    // Silent discard for spam bots triggering honeypot
    if (data.website) return { success: true };

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const agent = getRequestHeader("user-agent") ?? "unknown";
    const requesterHash = await fingerprint(`${ip}|${agent}`);

    if (!checkRateLimit(requesterHash)) {
      throw new Error(
        "Too many recent inquiries. Please wait a few moments or contact us directly via email.",
      );
    }

    // Safely format fields to satisfy database table constraints without fabricating claims
    const rawName = data.name.trim();
    const contactName = rawName.length === 1 ? `${rawName}.` : rawName;
    const businessName = data.businessName?.trim() || "Not specified";

    const currentPresence = data.currentWebsiteOrProfile?.trim();
    const businessContext = currentPresence
      ? `Current online presence: ${currentPresence}`
      : "Direct inquiry for NovaCraft services.";

    const rawInquiry = data.helpNeeded.trim();
    const projectDetails =
      rawInquiry.length < 20 ? `${rawInquiry} [NovaCraft Website Inquiry]` : rawInquiry;

    const services =
      data.services && data.services.length > 0 ? data.services : ["Website creation"];

    // Delegate to resilient storage handler with automatic Supabase sync
    const { saveInquiryToStore } = await import("./inquiry-store.server");

    await saveInquiryToStore({
      contact_name: contactName,
      business_name: businessName,
      email: data.email.trim().toLowerCase(),
      services,
      business_context: businessContext,
      project_details: projectDetails,
      consent: true,
      source: "website",
      requester_hash: requesterHash,
    });

    return { success: true };
  });

// Backwards-compatible export alias
export const submitQuoteRequest = submitInquiry;
