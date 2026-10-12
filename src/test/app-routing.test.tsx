import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches dedicated pages for /privacy and /terms", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const privacyMatches = router.matchRoutes("/privacy");
    expect(privacyMatches.at(-1)?.routeId).toBe("/privacy");

    const termsMatches = router.matchRoutes("/terms");
    expect(termsMatches.at(-1)?.routeId).toBe("/terms");
  });

  it("matches the secured /admin route", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const adminMatches = router.matchRoutes("/admin");
    expect(adminMatches.at(-1)?.routeId).toBe("/admin");
  });
});
