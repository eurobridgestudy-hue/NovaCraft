import * as fs from "node:fs";
import * as path from "node:path";

export type StoredInquiry = {
  id: string;
  created_at: string;
  contact_name: string;
  business_name: string;
  email: string;
  services: string[];
  business_context: string;
  project_details: string;
  consent: boolean;
  source: string;
  requester_hash?: string;
};

// Global in-memory map to survive hot reloads / function invocations within the process
const fallbackInquiries = new Map<string, StoredInquiry>();
let diskLoaded = false;

function getStoreFilePath(): string {
  const tmpDir = process.env["TMPDIR"] || process.env["TEMP"] || "/tmp";
  return path.join(tmpDir, "novacraft_inquiries_store.json");
}

function persistToDisk() {
  try {
    const list = Array.from(fallbackInquiries.values());
    fs.writeFileSync(getStoreFilePath(), JSON.stringify(list, null, 2), "utf-8");
  } catch {
    // Disk write may be unsupported in read-only edge runtimes; in-memory map serves as primary
  }
}

function ensureLoadedFromDisk() {
  if (diskLoaded) return;
  diskLoaded = true;
  try {
    const filePath = getStoreFilePath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const list = JSON.parse(content) as StoredInquiry[];
      if (Array.isArray(list)) {
        for (const item of list) {
          if (item?.id) {
            fallbackInquiries.set(item.id, item);
          }
        }
      }
    }
  } catch {
    // Ignore read errors
  }
}

export function isSupabaseConfigured(): boolean {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  return Boolean(url && key && url.trim().length > 0 && key.trim().length > 0);
}

export async function saveInquiryToStore(data: {
  contact_name: string;
  business_name: string;
  email: string;
  services: string[];
  business_context: string;
  project_details: string;
  consent: boolean;
  source: string;
  requester_hash: string;
}): Promise<{ success: boolean; id: string }> {
  ensureLoadedFromDisk();

  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  const record: StoredInquiry = {
    id,
    created_at,
    ...data,
  };

  // 1. Always retain in resilient local store
  fallbackInquiries.set(id, record);
  persistToDisk();

  // 2. If Supabase credentials are provided in the environment, also write to Supabase
  if (isSupabaseConfigured()) {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("quote_requests").insert({
        contact_name: data.contact_name,
        business_name: data.business_name,
        email: data.email,
        services: data.services,
        business_context: data.business_context,
        project_details: data.project_details,
        consent: data.consent,
        source: data.source,
        requester_hash: data.requester_hash,
      });

      if (error) {
        console.warn(
          "[Inquiry Store] Supabase sync notice (persisted in fallback):",
          error.message,
        );
      } else {
        console.info("[Inquiry Store] Saved inquiry to Supabase cloud table.");
      }
    } catch (err) {
      console.warn("[Inquiry Store] Supabase unreachable (persisted in fallback):", err);
    }
  } else {
    console.info(
      `[Inquiry Store] Inquiry for ${data.contact_name} (${data.email}) stored safely in resilient store.`,
    );
  }

  return { success: true, id };
}

export async function getAllInquiriesFromStore(): Promise<{
  inquiries: StoredInquiry[];
  isConnected: boolean;
  error: string | null;
}> {
  ensureLoadedFromDisk();

  if (isSupabaseConfigured()) {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: rows, error } = await supabaseAdmin
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && rows) {
        // Merge cloud rows with any fallback entries
        const seenIds = new Set(rows.map((r) => r.id));
        const merged: StoredInquiry[] = [...(rows as StoredInquiry[])];

        for (const [id, localInq] of fallbackInquiries.entries()) {
          if (!seenIds.has(id)) {
            merged.push(localInq);
          }
        }

        merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return {
          inquiries: merged,
          isConnected: true,
          error: null,
        };
      } else if (error) {
        console.warn("[Inquiry Store] Error fetching cloud inquiries:", error.message);
      }
    } catch (err) {
      console.warn("[Inquiry Store] Supabase error:", err);
    }
  }

  // Return fallback store if Supabase is unconfigured or offline
  const localList = Array.from(fallbackInquiries.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return {
    inquiries: localList,
    isConnected: isSupabaseConfigured(),
    error: null,
  };
}

export async function deleteInquiryFromStore(id: string): Promise<boolean> {
  ensureLoadedFromDisk();
  fallbackInquiries.delete(id);
  persistToDisk();

  if (isSupabaseConfigured()) {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("quote_requests").delete().eq("id", id);
    } catch (err) {
      console.warn("[Inquiry Store] Delete notice from Supabase:", err);
    }
  }

  return true;
}

export async function clearAllInquiriesFromStore(): Promise<boolean> {
  ensureLoadedFromDisk();
  fallbackInquiries.clear();
  persistToDisk();

  if (isSupabaseConfigured()) {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("quote_requests")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
    } catch (err) {
      console.warn("[Inquiry Store] Clear all notice from Supabase:", err);
    }
  }

  return true;
}
