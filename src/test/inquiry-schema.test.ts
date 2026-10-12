import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/quote-schema";

describe("inquirySchema validation", () => {
  it("accepts valid inquiries with short names and without optional fields", () => {
    const input = {
      name: "Ed",
      email: "ed@example.com",
      helpNeeded: "Need a landing page for my local bakery.",
    };

    const parsed = inquirySchema.parse(input);
    expect(parsed.name).toBe("Ed");
    expect(parsed.email).toBe("ed@example.com");
    expect(parsed.businessName).toBe("");
    expect(parsed.currentWebsiteOrProfile).toBe("");
    expect(parsed.helpNeeded).toBe("Need a landing page for my local bakery.");
    expect(parsed.services).toEqual(["Website creation"]);
  });

  it("accepts legitimate 1-character names", () => {
    const input = {
      name: "T",
      email: "t@example.com",
      helpNeeded: "We need website improvements.",
    };

    const parsed = inquirySchema.parse(input);
    expect(parsed.name).toBe("T");
  });

  it("accepts social profile or website without https", () => {
    const input = {
      name: "Sarah",
      email: "sarah@crafts.com",
      businessName: "Sarah's Pottery",
      currentWebsiteOrProfile: "instagram.com/sarahspottery",
      helpNeeded: "Looking to build our first ecommerce catalog.",
    };

    const parsed = inquirySchema.parse(input);
    expect(parsed.currentWebsiteOrProfile).toBe("instagram.com/sarahspottery");
  });

  it("rejects invalid emails", () => {
    const input = {
      name: "Alex",
      email: "invalid-email-format",
      helpNeeded: "Need a quote.",
    };

    expect(() => inquirySchema.parse(input)).toThrow();
  });

  it("rejects empty name or empty help description", () => {
    expect(() =>
      inquirySchema.parse({
        name: "   ",
        email: "alex@company.com",
        helpNeeded: "Need help",
      }),
    ).toThrow();

    expect(() =>
      inquirySchema.parse({
        name: "Alex",
        email: "alex@company.com",
        helpNeeded: "   ",
      }),
    ).toThrow();
  });
});
