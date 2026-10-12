import { describe, expect, it } from "vitest";
import { verifyAdminToken } from "@/lib/admin.functions";

describe("Admin Authentication & Security", () => {
  it("rejects malformed or tampered tokens", async () => {
    const invalidToken = "not.a.valid.token";
    const result = await verifyAdminToken(invalidToken);
    expect(result).toBeNull();
  });

  it("rejects token with invalid signature", async () => {
    const fakePayload = btoa(
      JSON.stringify({ u: "admin", exp: Date.now() + 100000, nonce: "123" }),
    );
    const tamperedToken = `${fakePayload}.invalidHexSignature1234567890`;
    const result = await verifyAdminToken(tamperedToken);
    expect(result).toBeNull();
  });

  it("rejects expired tokens", async () => {
    // Manually construct token with past expiration
    const expiredPayload = {
      u: "novacraft_admin",
      exp: Date.now() - 5000, // expired 5 seconds ago
      nonce: "expired-nonce",
    };
    const jsonStr = JSON.stringify(expiredPayload);
    const base64Payload = btoa(jsonStr);

    const ADMIN_SECRET =
      process.env["ADMIN_SECRET"] || "novacraft-admin-secret-portal-salt-2026-JAndu";
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
    const expiredToken = `${base64Payload}.${sigHex}`;

    const result = await verifyAdminToken(expiredToken);
    expect(result).toBeNull();
  });

  it("verifies properly signed non-expired token", async () => {
    const validPayload = {
      u: "novacraft_admin",
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days in future
      nonce: "valid-nonce",
    };
    const jsonStr = JSON.stringify(validPayload);
    const base64Payload = btoa(jsonStr);

    const ADMIN_SECRET =
      process.env["ADMIN_SECRET"] || "novacraft-admin-secret-portal-salt-2026-JAndu";
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
    const validToken = `${base64Payload}.${sigHex}`;

    const result = await verifyAdminToken(validToken);
    expect(result).not.toBeNull();
    expect(result?.username).toBe("novacraft_admin");
  });
});
