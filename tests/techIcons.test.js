import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getTechIcon, getTechBrandColor } from "../src/lib/techIcons.js";

const ALL_PROJECT_TAGS = [
  "Next.js",
  "React",
  "Typescript",
  "Sanity",
  "Stripe",
  "Clerk",
  "Zustand",
  "Motion",
  "Tailwind",
  "PostCSS",
  "JavaScript",
  "Supabase",
  "Figma",
  "Prototype",
  "User Research",
  "Landing Page",
  "Design System",
  "Photography",
  "Lightroom",
  "Visual Direction",
];

describe("Tech Stack Icon Mapping", () => {
  it("should return a valid icon component for every known project tag", () => {
    for (const tag of ALL_PROJECT_TAGS) {
      const icon = getTechIcon(tag);
      assert.ok(icon, `Icon for ${tag} should exist`);
      // In React 19 forwardRef components, typeof is 'object' or 'function'
      const isComponent = typeof icon === "function" || typeof icon === "object";
      assert.ok(isComponent, `Icon for ${tag} should be a valid React component`);
    }
  });

  it("should match case-insensitively and handle trimmed whitespace", () => {
    assert.equal(getTechIcon("react"), getTechIcon("React"));
    assert.equal(getTechIcon(" typescript "), getTechIcon("Typescript"));
    assert.equal(getTechIcon("next.js"), getTechIcon("Next.js"));
  });

  it("should return a fallback icon for unknown technologies", () => {
    const fallback = getTechIcon("UnknownTechX");
    assert.ok(fallback);
    const isComponent = typeof fallback === "function" || typeof fallback === "object";
    assert.ok(isComponent);
  });
});

describe("Tech Stack Brand Color Mapping", () => {
  it("should return authentic hex color for each known project tag", () => {
    for (const tag of ALL_PROJECT_TAGS) {
      const color = getTechBrandColor(tag);
      assert.ok(color, `Color for ${tag} should exist`);
      assert.match(color, /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, `Color for ${tag} must be a valid hex code`);
    }
  });

  it("should return specific authentic brand colors for major frameworks", () => {
    assert.equal(getTechBrandColor("React").toLowerCase(), "#58c4dc");
    assert.equal(getTechBrandColor("Typescript").toLowerCase(), "#3178c6");
    assert.equal(getTechBrandColor("Tailwind").toLowerCase(), "#38bdf8");
    assert.equal(getTechBrandColor("JavaScript").toLowerCase(), "#f7df1e");
    assert.equal(getTechBrandColor("Supabase").toLowerCase(), "#3ecf8e");
  });

  it("should return fallback theme color for unknown tags", () => {
    const fallback = getTechBrandColor("NonExistentTech");
    assert.equal(fallback.toLowerCase(), "#d5ff3f");
  });
});
