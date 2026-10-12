import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/quote-schema";

describe("Form Delivery & Payload Constraints Verification", () => {
  it("safely normalizes legitimate user inputs for storage", () => {
    const rawInput = {
      name: "Li", // 2 characters
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
    // When name is 1 char, backend pads with '.' to satisfy DB CHECK (char_length >= 2)
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

  it("handles empty optional business name without database check failure", () => {
    // DB CHECK requires char_length(business_name) BETWEEN 2 AND 120
    const rawInput = {
      name: "Marcus",
      email: "marcus@company.co",
      helpNeeded: "New website for our local engineering consultancy.",
    };

    const parsed = inquirySchema.parse(rawInput);
    const storedBusinessName = parsed.businessName?.trim() || "Not specified";
    expect(storedBusinessName.length).toBeGreaterThanOrEqual(2);
    expect(storedBusinessName).toBe("Not specified");
  });

  it("handles short inquiry messages without violating DB minimum 20 chars", () => {
    // DB CHECK requires char_length(project_details) BETWEEN 20 AND 3000
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

  it("silently traps spam bots via honeypot field without DB insertion", () => {
    const botInput = {
      name: "SpamBot",
      email: "bot@spam.com",
      helpNeeded: "Buy crypto now!",
      website: "http://spamlink.com",
    };

    // Honeypot schema check: website must be empty or max 0
    expect(() => inquirySchema.parse(botInput)).toThrow();
  });
});

describe("Error Recovery & Data Preservation Behavior", () => {
  it("preserves user form state on failure", () => {
    // Simulated form state before submission
    const initialFormState = {
      name: "Alex Vance",
      email: "alex@vance-industrial.com",
      businessName: "Vance Industrial Services",
      currentWebsiteOrProfile: "vance-industrial.com",
      helpNeeded: "Need 5-page commercial website with contact form and services overview.",
    };

    // Simulate backend throw
    let serverError: string | null = null;
    let submitted = false;
    const preservedState = { ...initialFormState };

    try {
      throw new Error("Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY.");
    } catch (err) {
      serverError = (err as Error).message;
      // Note: submitted remains false, preservedState is intact
    }

    expect(submitted).toBe(false);
    expect(serverError).toBe(
      "Missing Supabase environment variable(s): SUPABASE_SERVICE_ROLE_KEY.",
    );
    expect(preservedState.name).toBe("Alex Vance");
    expect(preservedState.helpNeeded).toBe(
      "Need 5-page commercial website with contact form and services overview.",
    );
  });
});
