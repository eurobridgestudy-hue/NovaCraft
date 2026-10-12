import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP, setResponseHeader } from "@tanstack/react-start/server";

import { inquirySchema } from "@/lib/quote-schema";

async function fingerprint(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
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
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Rate-limiting check: max 5 inquiries per hour per fingerprint
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("requester_hash", requesterHash)
      .gte("created_at", since);

    if (countError) {
      console.error("[Inquiry] Rate limit check error:", countError);
      throw new Error("Unable to check submission limit. Please try again or reach out directly.");
    }
    if ((count ?? 0) >= 5) {
      throw new Error(
        "Too many recent inquiries. Please try again later or contact us directly via email.",
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

    const { error: insertError } = await supabaseAdmin.from("quote_requests").insert({
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

    if (insertError) {
      console.error("[Inquiry] Database insert error:", insertError);
      throw new Error(
        "Unable to save your inquiry. Please try again or reach out directly via email.",
      );
    }

    return { success: true };
  });

// Backwards-compatible export alias
export const submitQuoteRequest = submitInquiry;
