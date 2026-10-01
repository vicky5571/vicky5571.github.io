/**
 * @file src/lib/techIcons.js
 * @description Icon mapping and authentic brand color registry for project tech stack tags.
 */

import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconDatabase,
  IconBrandStripe,
  IconShieldLock,
  IconCube,
  IconBrandFramerMotion,
  IconBrandTailwind,
  IconBrandCss3,
  IconBrandJavascript,
  IconBrandSupabase,
  IconBrandFigma,
  IconDeviceMobile,
  IconUserSearch,
  IconLayout,
  IconComponents,
  IconCamera,
  IconAdjustments,
  IconAperture,
  IconSparkles,
} from "@tabler/icons-react";

/**
 * Normalized tech stack icon mapping.
 */
const ICON_MAP = {
  // Frameworks & Core Web
  "next.js": IconBrandNextjs,
  nextjs: IconBrandNextjs,
  react: IconBrandReact,
  typescript: IconBrandTypescript,
  javascript: IconBrandJavascript,
  js: IconBrandJavascript,

  // Styling & Motion
  tailwind: IconBrandTailwind,
  tailwindcss: IconBrandTailwind,
  postcss: IconBrandCss3,
  css: IconBrandCss3,
  motion: IconBrandFramerMotion,
  "framer motion": IconBrandFramerMotion,

  // Backend, Auth & Storage
  supabase: IconBrandSupabase,
  sanity: IconDatabase,
  stripe: IconBrandStripe,
  clerk: IconShieldLock,
  zustand: IconCube,

  // UI/UX & Design Disciplines
  figma: IconBrandFigma,
  prototype: IconDeviceMobile,
  "user research": IconUserSearch,
  "landing page": IconLayout,
  "design system": IconComponents,

  // Photography & Creative Media
  photography: IconCamera,
  lightroom: IconAdjustments,
  "visual direction": IconAperture,
};

/**
 * Authentic brand colors for technology and discipline logos.
 */
const BRAND_COLOR_MAP = {
  // Frameworks & Core Web
  "next.js": "#ffffff",
  nextjs: "#ffffff",
  react: "#58c4dc",
  typescript: "#3178c6",
  javascript: "#f7df1e",
  js: "#f7df1e",

  // Styling & Motion
  tailwind: "#38bdf8",
  tailwindcss: "#38bdf8",
  postcss: "#dd3a0a",
  css: "#dd3a0a",
  motion: "#ea4c89",
  "framer motion": "#ea4c89",

  // Backend, Auth & Storage
  supabase: "#3ecf8e",
  sanity: "#f03e2f",
  stripe: "#635bff",
  clerk: "#6c47ff",
  zustand: "#ea580c",

  // UI/UX & Design Disciplines
  figma: "#f24e1e",
  prototype: "#38bdf8",
  "user research": "#3b82f6",
  "landing page": "#10b981",
  "design system": "#ec4899",

  // Photography & Creative Media
  photography: "#ff5e3a",
  lightroom: "#31a8ff",
  "visual direction": "#a855f7",
};

/**
 * Resolves a technology or discipline name to its matching Tabler icon component.
 * @param {string} name - Name of the technology (e.g. 'Next.js', 'React')
 * @returns {import('react').ComponentType<any>} The matching icon component or IconSparkles as fallback.
 */
export function getTechIcon(name) {
  if (!name || typeof name !== "string") {
    return IconSparkles;
  }

  const normalized = name.trim().toLowerCase();
  return ICON_MAP[normalized] || IconSparkles;
}

/**
 * Resolves a technology or discipline name to its authentic brand hex color.
 * @param {string} name - Name of the technology (e.g. 'Next.js', 'React')
 * @returns {string} Hex color string (e.g. '#58c4dc') or '#d5ff3f' fallback.
 */
export function getTechBrandColor(name) {
  if (!name || typeof name !== "string") {
    return "#d5ff3f";
  }

  const normalized = name.trim().toLowerCase();
  return BRAND_COLOR_MAP[normalized] || "#d5ff3f";
}
