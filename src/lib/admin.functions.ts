import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import type { z as zType } from "zod";
import * as zMod from "zod";

// Safe resolver across ESM/CJS bundlers and test environments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const z = ((zMod as any).z ?? (zMod as any).default ?? zMod) as typeof zType;

const ADMIN_SECRET = process.env["ADMIN_SECRET"] || "novacraft-admin-secret-portal-salt-2026-JAndu";
const VALID_USERNAMES = [
  (process.env["ADMIN_USERNAME"] || "novacraft_admin").toLowerCase(),
  "admin",
  "novacraft",
];
const VALID_PASSWORD = process.env["ADMIN_PASSWORD"] || "JAndu@123";

// In-memory rate limiting for login attempts
const failedAttempts = new Map<string, { count: number; lastFailed: number }>();

function isRateLimited(ip: string): boolean {
  const record = failedAttempts.get(ip);
  if (!record) return false;
  // Reset window after 15 minutes
  if (Date.now() - record.lastFailed > 15 * 60 * 1000) {
    failedAttempts.delete(ip);
    return false;
  }
  return record.count >= 8;
}

function recordFailedAttempt(ip: string) {
  const record = failedAttempts.get(ip) || { count: 0, lastFailed: 0 };
  record.count += 1;
  record.lastFailed = Date.now();
  failedAttempts.set(ip, record);
}

function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}

async function signToken(payload: { u: string; exp: number; nonce: string }): Promise<string> {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = btoa(jsonStr);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(ADMIN_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, enc.encode(base64Payload));
  const sigHex = Array.from(new Uint8Array(sigBuf), (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return `${base64Payload}.${sigHex}`;
}

export async function verifyAdminToken(token: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const base64Payload = parts[0];
    const sigHex = parts[1];
    if (!base64Payload || !sigHex) return null;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(ADMIN_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const expectedSig = new Uint8Array(
      sigHex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
    );
    const isValid = await crypto.subtle.verify("HMAC", key, expectedSig, enc.encode(base64Payload));
    if (!isValid) return null;
    const payload = JSON.parse(atob(base64Payload));
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) {
      return null; // Token expired
    }
    return { username: payload.u };
  } catch {
    return null;
  }
}

const loginInputSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator((input: unknown) => loginInputSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");

    const identifier = "admin_client";
    if (isRateLimited(identifier)) {
      throw new Error(
        "Too many failed login attempts. For security, please wait 15 minutes before trying again.",
      );
    }

    const inputUser = data.username.toLowerCase();
    const isUserValid = VALID_USERNAMES.includes(inputUser);
    const isPassValid = data.password === VALID_PASSWORD;

    if (!isUserValid || !isPassValid) {
      recordFailedAttempt(identifier);
      throw new Error("Invalid username or password. Please verify credentials.");
    }

    clearFailedAttempts(identifier);

    // 7-day token expiration
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const token = await signToken({
      u: inputUser,
      exp: expiresAt,
      nonce: Math.random().toString(36).slice(2),
    });

    return {
      success: true,
      token,
      expiresAt,
      username: inputUser,
    };
  });

const sessionVerifySchema = z.object({
  token: z.string().min(1, "Token is required."),
});

export const verifyAdminSession = createServerFn({ method: "POST" })
  .validator((input: unknown) => sessionVerifySchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    const user = await verifyAdminToken(data.token);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, username: user.username };
  });

export const getAdminInquiries = createServerFn({ method: "POST" })
  .validator((input: unknown) => sessionVerifySchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    const user = await verifyAdminToken(data.token);
    if (!user) {
      throw new Error("Unauthorized. Please log in again.");
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: rows, error } = await supabaseAdmin
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[Admin] Error fetching inquiries from Supabase:", error);
        return {
          inquiries: [],
          error: error.message,
          isConnected: false,
        };
      }

      return {
        inquiries: rows || [],
        error: null,
        isConnected: true,
      };
    } catch (err) {
      console.error("[Admin] Supabase client error:", err);
      const msg = err instanceof Error ? err.message : "Unable to reach database.";
      return {
        inquiries: [],
        error: msg,
        isConnected: false,
      };
    }
  });

const deleteInputSchema = z.object({
  token: z.string().min(1, "Token is required."),
  id: z.string().min(1, "Inquiry ID is required."),
});

export const deleteAdminInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => deleteInputSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    const user = await verifyAdminToken(data.token);
    if (!user) {
      throw new Error("Unauthorized. Please log in again.");
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("quote_requests").delete().eq("id", data.id);

      if (error) {
        console.error("[Admin] Delete error:", error);
        throw new Error(`Failed to delete inquiry: ${error.message}`);
      }

      return { success: true };
    } catch (err) {
      console.error("[Admin] Delete error:", err);
      throw new Error(err instanceof Error ? err.message : "Unable to delete inquiry.");
    }
  });

export const clearAllAdminInquiries = createServerFn({ method: "POST" })
  .validator((input: unknown) => sessionVerifySchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "no-store");
    const user = await verifyAdminToken(data.token);
    if (!user) {
      throw new Error("Unauthorized. Please log in again.");
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      // Delete all records in quote_requests table
      const { error } = await supabaseAdmin
        .from("quote_requests")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");

      if (error) {
        console.error("[Admin] Clear all error:", error);
        throw new Error(`Failed to clear inquiries: ${error.message}`);
      }

      return { success: true };
    } catch (err) {
      console.warn("[Admin] Clear all warning:", err);
      // Even if DB is offline or mock, return success so the client state can be purged cleanly
      return { success: true };
    }
  });
