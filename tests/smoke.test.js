import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cn } from "../src/lib/utils.js";
import {
  PROJECT_CATEGORIES,
  EXPERIENCE_CATEGORIES,
  isValidProject,
  isValidExperienceItem,
} from "../src/types/index.js";

describe("Smoke & Unit Test Suite — Portfolio Core", () => {
  describe("Utility: cn (classnames helper)", () => {
    it("should join multiple class strings with space", () => {
      const result = cn("flex", "items-center", "justify-between");
      assert.equal(result, "flex items-center justify-between");
    });

    it("should filter out falsy conditions", () => {
      const isHidden = false;
      const isActive = true;
      const result = cn("btn", isHidden && "hidden", isActive && "btn-active", null, undefined);
      assert.equal(result, "btn btn-active");
    });

    it("should handle empty or no arguments cleanly", () => {
      assert.equal(cn(), "");
      assert.equal(cn("", null, undefined, false), "");
    });
  });

  describe("SSOT Domain Types & Schema Validators", () => {
    it("should contain standard project categories", () => {
      assert.ok(PROJECT_CATEGORIES.includes("All"));
      assert.ok(PROJECT_CATEGORIES.includes("UI/UX"));
      assert.ok(PROJECT_CATEGORIES.includes("Full Stack"));
      assert.ok(PROJECT_CATEGORIES.includes("Front End"));
      assert.ok(PROJECT_CATEGORIES.includes("Photography"));
      assert.equal(Object.isFrozen(PROJECT_CATEGORIES), true);
    });

    it("should contain standard experience categories", () => {
      assert.ok(EXPERIENCE_CATEGORIES.includes("All"));
      assert.ok(EXPERIENCE_CATEGORIES.includes("Tech & Dev"));
      assert.ok(EXPERIENCE_CATEGORIES.includes("Corporate & IT"));
      assert.ok(EXPERIENCE_CATEGORIES.includes("Creative & Photo"));
      assert.ok(EXPERIENCE_CATEGORIES.includes("Data & Analytics"));
      assert.equal(Object.isFrozen(EXPERIENCE_CATEGORIES), true);
    });

    it("should validate a conforming Project object", () => {
      const sampleProject = {
        name: "StealthForce E-commerce",
        type: "Full Stack",
        year: "2025",
        tone: "acid",
        image: "/img/stealthforce.webp",
        width: 1600,
        height: 829,
        link: "https://example.com",
        stack: ["Next.js", "React", "Typescript"],
        copy: "Full-stack headless commerce platform.",
      };
      assert.equal(isValidProject(sampleProject), true);

      const woodInventoryProject = {
        name: "Wood Inventory",
        type: "Full Stack",
        year: "2026",
        tone: "acid",
        image: "/img/wood-inventory.webp",
        width: 3360,
        height: 2100,
        link: null,
        stack: [
          "Next.js",
          "React",
          "Typescript",
          "Tailwind",
          "Supabase",
          "SQLite",
          "Chart.js",
        ],
        copy: "Production-grade timber and lumber inventory management platform.",
      };
      assert.equal(isValidProject(woodInventoryProject), true);
    });

    it("should reject an invalid Project object missing required fields", () => {
      assert.equal(isValidProject(null), false);
      assert.equal(isValidProject({ name: "Incomplete" }), false);
      assert.equal(isValidProject({ name: "", type: "UI/UX" }), false);
    });

    it("should validate a conforming Experience item tuple", () => {
      const sampleExperience = [
        "2026",
        "IT Capability Building\nPT Indosat Tbk",
        "Technical capability development programs.",
        "Corporate & IT",
      ];
      assert.equal(isValidExperienceItem(sampleExperience), true);

      const woodExperience = [
        "2026",
        "Full Stack Web Developer\nPT Brilliant Jaya Wood Industry",
        "Architected and developed internal inventory management systems, production tracking workflows, and operational database solutions.",
        "Tech & Dev",
      ];
      assert.equal(isValidExperienceItem(woodExperience), true);
    });

    it("should reject an invalid Experience item tuple", () => {
      assert.equal(isValidExperienceItem([]), false);
      assert.equal(isValidExperienceItem(["2026"]), false);
      assert.equal(isValidExperienceItem(null), false);
    });
  });
});
