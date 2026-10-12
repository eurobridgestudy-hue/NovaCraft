import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP, setResponseHeader } from "@tanstack/react-start/server";

import { quoteRequestSchema } from "@/lib/quote-schema";

async function fingerprint(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => quoteRequestSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    if (data.website) return { success: true };

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    const agent = getRequestHeader("user-agent") ?? "unknown";
    const requesterHash = await fingerprint(`${ip}|${agent}`);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .eq("requester_hash", requesterHash)
      .gte("created_at", since);

    if (countError) throw new Error("Unable to check submission limit.");
    if ((count ?? 0) >= 5) throw new Error("Too many requests. Please try again later.");

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      contact_name: data.contactName,
      business_name: data.businessName,
      email: data.email,
      services: data.services,
      business_context: data.businessContext,
      project_details: data.projectDetails,
      consent: data.consent,
      requester_hash: requesterHash,
    });

    if (error) throw new Error("Unable to save your request.");
    return { success: true };
  });
