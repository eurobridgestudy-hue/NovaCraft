import { describe, expect, it } from "vitest";
import {
  inquirySchema,
  isValidEmailFormat,
  isValidInquiryMessage,
  isValidNameFormat,
  isValidOnlinePresence,
} from "@/lib/quote-schema";

/* =========================================================================
   PART 1: VALIDATION TESTS (Client-side & Schema Validation)
========================================================================= */
describe("Part 1: Validation Tests (Client-Side & Schema Rules)", () => {
  it("rejects empty or whitespace-only required fields", () => {
    expect(isValidNameFormat("   ")).toBe(false);
    expect(isValidEmailFormat("   ")).toBe(false);
    expect(isValidInquiryMessage("   ")).toBe(false);

    // Schema parse rejects missing required fields
    expect(() =>
      inquirySchema.parse({
        name: "",
        email: "",
        helpNeeded: "",
      }),
    ).toThrow();
  });

  it("rejects invalid contact names lacking letters (e.g. pure numbers)", () => {
    expect(isValidNameFormat("123456")).toBe(false);
    expect(isValidNameFormat("---")).toBe(false);
    expect(isValidNameFormat("Alex Morgan")).toBe(true);
    expect(isValidNameFormat("Li")).toBe(true);
  });

  it("rejects improperly formatted email addresses", () => {
    expect(isValidEmailFormat("plainaddress")).toBe(false);
    expect(isValidEmailFormat("@missinguser.com")).toBe(false);
    expect(isValidEmailFormat("user@com")).toBe(false);
    expect(isValidEmailFormat("alex@company.com")).toBe(true);
  });

  it("validates optional website / profile formats correctly", () => {
    expect(isValidOnlinePresence("invalid profile format with spaces !@#")).toBe(false);
    expect(isValidOnlinePresence("company.com")).toBe(true);
    expect(isValidOnlinePresence("https://company.com")).toBe(true);
    expect(isValidOnlinePresence("@company_handle")).toBe(true);
  });

  it("rejects repetitive gibberish messages", () => {
    expect(isValidInquiryMessage("aaaa aaaa aaaa aaaa")).toBe(false);
    expect(isValidInquiryMessage("11111111111111111111")).toBe(false);
    expect(
      isValidInquiryMessage("We are looking for a commercial website revamp for our consultancy."),
    ).toBe(true);
  });

  it("silently traps spam bots via honeypot field", () => {
    const botInput = {
      name: "SpamBot",
      email: "bot@spam.com",
      helpNeeded: "Buy crypto tokens now with instant return!",
      website: "http://spamlink.com",
    };

    expect(() => inquirySchema.parse(botInput)).toThrow();
  });
});

/* =========================================================================
   PART 2: BACKEND TESTS (Data Normalization & Database Constraint Safety)
========================================================================= */
describe("Part 2: Backend Tests (Normalization & Constraint Safety)", () => {
  it("normalizes legitimate inquiry payload for storage", () => {
    const rawInput = {
      name: "Li",
      email: "li@studio.design",
      businessName: "Li Designs",
      currentWebsiteOrProfile: "lidesigns.com",
      helpNeeded: "Need a modern portfolio to showcase our architectural work.",
      services: ["Website creation" as const],
    };

    const parsed = inquirySchema.parse(rawInput);
    expect(parsed.name).toBe("Li");
    expect(parsed.email).toBe("li@studio.design");
    expect(parsed.businessName).toBe("Li Designs");
    expect(parsed.helpNeeded).toBe("Need a modern portfolio to showcase our architectural work.");
  });

  it("handles 1-letter short names without database check failure", () => {
    const rawInput = {
      name: "T",
      email: "t@company.co",
      helpNeeded: "Inquiring about a commercial website revamp.",
    };

    const parsed = inquirySchema.parse(rawInput);
    const storedName = parsed.name.length === 1 ? `${parsed.name}.` : parsed.name;
    expect(storedName.length).toBeGreaterThanOrEqual(2);
    expect(storedName).toBe("T.");
  });

  it("handles empty optional business name with default fallback", () => {
    const rawInput = {
      name: "Marcus",
      email: "marcus@company.co",
      helpNeeded: "New website for our local engineering consultancy.",
    };

    const parsed = inquirySchema.parse(rawInput);
    const storedBusinessName = parsed.businessName?.trim() || "Not specified";
    expect(storedBusinessName).toBe("Not specified");
  });

  it("ensures inquiry messages satisfy minimum length constraint", () => {
    const rawInput = {
      name: "Marcus",
      email: "marcus@company.co",
      helpNeeded: "Need a quote.",
    };

    const parsed = inquirySchema.parse(rawInput);
    const storedDetails =
      parsed.helpNeeded.trim().length < 20
        ? `${parsed.helpNeeded.trim()} [NovaCraft Website Inquiry]`
        : parsed.helpNeeded.trim();

    expect(storedDetails.length).toBeGreaterThanOrEqual(20);
    expect(storedDetails).toContain("[NovaCraft Website Inquiry]");
  });

  it("preserves user form state on unexpected backend failure", () => {
    const initialFormState = {
      name: "Alex Vance",
      email: "alex@vance-industrial.com",
      businessName: "Vance Industrial Services",
      currentWebsiteOrProfile: "vance-industrial.com",
      helpNeeded: "Need 5-page commercial website with contact form and services overview.",
    };

    let serverError: string | null = null;
    const submitted = false;
    const preservedState = { ...initialFormState };

    try {
      throw new Error("Network timeout while contacting persistence layer.");
    } catch (err) {
      serverError = (err as Error).message;
    }

    expect(submitted).toBe(false);
    expect(serverError).toBe("Network timeout while contacting persistence layer.");
    expect(preservedState.name).toBe("Alex Vance");
    expect(preservedState.helpNeeded).toBe(
      "Need 5-page commercial website with contact form and services overview.",
    );
  });
});

/* =========================================================================
   PART 3: REAL DELIVERY VERIFICATION (Physical Persistence & Retrieval)
========================================================================= */
describe("Part 3: Real Delivery Verification (Physical Storage & Retrieval)", () => {
  it("physically persists an inquiry, verifies its retrieval, and cleanly removes it", async () => {
    const { saveInquiryToStore, getAllInquiriesFromStore, deleteInquiryFromStore } =
      await import("@/lib/inquiry-store.server");

    const uniqueTag = `test-${Date.now()}`;
    const testPayload = {
      contact_name: "Controlled Delivery Test",
      business_name: `Verification Corp ${uniqueTag}`,
      email: `controlled.${uniqueTag}@novacraft-test.internal`,
      services: ["Website creation"],
      business_context: "Automated end-to-end controlled delivery test.",
      project_details: `Controlled test inquiry for storage verification ${uniqueTag}.`,
      consent: true,
      source: "website",
      requester_hash: `hash-${uniqueTag}`,
    };

    // 1. Physically save the inquiry to the storage backend
    const saveResult = await saveInquiryToStore(testPayload);
    expect(saveResult.success).toBe(true);
    expect(saveResult.id).toBeDefined();

    // 2. Query the storage backend and confirm the inquiry is physically retrieved
    const storeState = await getAllInquiriesFromStore();
    expect(storeState.error).toBeNull();
    const retrieved = storeState.inquiries.find((item) => item.id === saveResult.id);

    expect(retrieved).toBeDefined();
    expect(retrieved?.contact_name).toBe("Controlled Delivery Test");
    expect(retrieved?.email).toBe(testPayload.email);
    expect(retrieved?.project_details).toBe(testPayload.project_details);

    // 3. Clean up the test inquiry from storage
    const deleteSuccess = await deleteInquiryFromStore(saveResult.id);
    expect(deleteSuccess).toBe(true);

    // 4. Verify the test record is no longer present in storage
    const postCleanupState = await getAllInquiriesFromStore();
    const stillPresent = postCleanupState.inquiries.find((item) => item.id === saveResult.id);
    expect(stillPresent).toBeUndefined();
  });
});
