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
  IconShieldCheck,
  IconDroplets,
  IconUserSearch,
  IconLayout,
  IconComponents,
  IconCamera,
  IconAdjustments,
  IconAperture,
  IconSparkles,
  IconBrandPhp,
  IconFlame,
  IconMail,
  IconBrandLaravel,
  IconBrandInertia,
  IconBrandMysql,
  IconBrandNodejs,
  IconBrandPrisma,
  IconMapPin,
  IconMasksTheater,
  IconChartBar,
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
  php: IconBrandPhp,
  laravel: IconBrandLaravel,
  "codeigniter 4": IconFlame,
  codeigniter: IconFlame,
  ci4: IconFlame,
  inertia: IconBrandInertia,
  "inertia.js": IconBrandInertia,
  "inertia.js v2": IconBrandInertia,
  inertiajs: IconBrandInertia,

  // Styling & Motion
  tailwind: IconBrandTailwind,
  tailwindcss: IconBrandTailwind,
  postcss: IconBrandCss3,
  css: IconBrandCss3,
  motion: IconBrandFramerMotion,
  "framer motion": IconBrandFramerMotion,
  "framer-motion": IconBrandFramerMotion,
  shadcn: IconComponents,
  "shadcn ui": IconComponents,
  "shadcn/ui": IconComponents,

  // Backend, Auth & Storage
  supabase: IconBrandSupabase,
  sanity: IconDatabase,
  mariadb: IconDatabase,
  mysql: IconBrandMysql,
  sqlite: IconDatabase,
  prisma: IconBrandPrisma,
  "node.js": IconBrandNodejs,
  nodejs: IconBrandNodejs,
  node: IconBrandNodejs,
  "transactional email (smtp)": IconMail,
  "transactional email": IconMail,
  smtp: IconMail,
  email: IconMail,
  stripe: IconBrandStripe,
  clerk: IconShieldLock,
  zustand: IconCube,

  // Geospatial, Testing & Analytics
  leaflet: IconMapPin,
  playwright: IconMasksTheater,
  "chart.js": IconChartBar,
  chartjs: IconChartBar,

  // Mobile, Type Safety & Modern Data
  zod: IconShieldCheck,
  "drizzle orm": IconDroplets,
  drizzle: IconDroplets,
  capacitor: IconDeviceMobile,

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
  php: "#777bb4",
  laravel: "#ff2d20",
  "codeigniter 4": "#ee4623",
  codeigniter: "#ee4623",
  ci4: "#ee4623",
  inertia: "#9553e9",
  "inertia.js": "#9553e9",
  "inertia.js v2": "#9553e9",
  inertiajs: "#9553e9",

  // Styling & Motion
  tailwind: "#38bdf8",
  tailwindcss: "#38bdf8",
  postcss: "#dd3a0a",
  css: "#dd3a0a",
  motion: "#ea4c89",
  "framer motion": "#ea4c89",
  "framer-motion": "#ea4c89",
  shadcn: "#ffffff",
  "shadcn ui": "#ffffff",
  "shadcn/ui": "#ffffff",

  // Backend, Auth & Storage
  supabase: "#3ecf8e",
  sanity: "#f03e2f",
  mariadb: "#c0765a",
  mysql: "#4479a1",
  sqlite: "#0f80cc",
  prisma: "#16a394",
  "node.js": "#5fa04e",
  nodejs: "#5fa04e",
  node: "#5fa04e",
  "transactional email (smtp)": "#38bdf8",
  "transactional email": "#38bdf8",
  smtp: "#38bdf8",
  email: "#38bdf8",
  stripe: "#635bff",
  clerk: "#6c47ff",
  zustand: "#ea580c",

  // Geospatial, Testing & Analytics
  leaflet: "#79c02c",
  playwright: "#45ba4b",
  "chart.js": "#ff6384",
  chartjs: "#ff6384",

  // Mobile, Type Safety & Modern Data
  zod: "#3068b7",
  "drizzle orm": "#c5f74f",
  drizzle: "#c5f74f",
  capacitor: "#119eff",

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
