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
  "PHP",
  "Laravel",
  "Inertia.js v2",
  "CodeIgniter 4",
  "MariaDB",
  "MySQL",
  "SQLite",
  "Chart.js",
  "Transactional Email (SMTP)",
  "Shadcn",
  "framer-motion",
  "Framer Motion",
  "Node.js",
  "Prisma",
  "Leaflet",
  "Playwright",
  "Zod",
  "Drizzle ORM",
  "Capacitor",
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
    assert.equal(getTechIcon(" php "), getTechIcon("PHP"));
    assert.equal(getTechIcon("codeigniter 4"), getTechIcon("CodeIgniter 4"));
    assert.equal(getTechIcon("mariadb"), getTechIcon("MariaDB"));
    assert.equal(getTechIcon("laravel"), getTechIcon("Laravel"));
    assert.equal(getTechIcon("inertia.js v2"), getTechIcon("Inertia.js v2"));
    assert.equal(getTechIcon("mysql"), getTechIcon("MySQL"));
    assert.equal(getTechIcon("node.js"), getTechIcon("Node.js"));
    assert.equal(getTechIcon("prisma"), getTechIcon("Prisma"));
    assert.equal(getTechIcon("leaflet"), getTechIcon("Leaflet"));
    assert.equal(getTechIcon("playwright"), getTechIcon("Playwright"));
    assert.equal(getTechIcon("sqlite"), getTechIcon("SQLite"));
    assert.equal(getTechIcon("chart.js"), getTechIcon("Chart.js"));
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
    assert.equal(getTechBrandColor("PHP").toLowerCase(), "#777bb4");
    assert.equal(getTechBrandColor("Laravel").toLowerCase(), "#ff2d20");
    assert.equal(getTechBrandColor("Inertia.js v2").toLowerCase(), "#9553e9");
    assert.equal(getTechBrandColor("CodeIgniter 4").toLowerCase(), "#ee4623");
    assert.equal(getTechBrandColor("MariaDB").toLowerCase(), "#c0765a");
    assert.equal(getTechBrandColor("MySQL").toLowerCase(), "#4479a1");
    assert.equal(getTechBrandColor("Transactional Email (SMTP)").toLowerCase(), "#38bdf8");
    assert.equal(getTechBrandColor("Shadcn").toLowerCase(), "#ffffff");
    assert.equal(getTechBrandColor("Node.js").toLowerCase(), "#5fa04e");
    assert.equal(getTechBrandColor("Prisma").toLowerCase(), "#16a394");
    assert.equal(getTechBrandColor("Leaflet").toLowerCase(), "#79c02c");
    assert.equal(getTechBrandColor("Playwright").toLowerCase(), "#45ba4b");
    assert.equal(getTechBrandColor("Zod").toLowerCase(), "#3068b7");
    assert.equal(getTechBrandColor("Drizzle ORM").toLowerCase(), "#c5f74f");
    assert.equal(getTechBrandColor("Capacitor").toLowerCase(), "#119eff");
    assert.equal(getTechBrandColor("SQLite").toLowerCase(), "#0f80cc");
    assert.equal(getTechBrandColor("Chart.js").toLowerCase(), "#ff6384");
  });

  it("should return fallback theme color for unknown tags", () => {
    const fallback = getTechBrandColor("NonExistentTech");
    assert.equal(fallback.toLowerCase(), "#d5ff3f");
  });
});
