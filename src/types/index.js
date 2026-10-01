/**
 * @file src/types/index.js
 * @description Single Source of Truth (SSOT) domain contracts, schemas, and type definitions for the Portfolio application.
 */

/**
 * @typedef {'UI/UX' | 'Full Stack' | 'Front End' | 'Photography'} ProjectType
 */

/**
 * @typedef {'acid' | 'cyan' | 'flame' | 'plum'} ThemeTone
 */

/**
 * @typedef {Object} Project
 * @property {string} name - Title of the project
 * @property {ProjectType} type - Categorical discipline
 * @property {string} year - Year of creation or delivery (e.g., '2025')
 * @property {ThemeTone} tone - Visual accent accent color token key
 * @property {string} image - Path to the optimized asset in public/
 * @property {number} width - Intrinsic image pixel width
 * @property {number} height - Intrinsic image pixel height
 * @property {string} link - Outbound target URL or prototype link
 * @property {string[]} stack - Array of technology/tool tags
 * @property {string} copy - Concise project description or narrative
 */

/**
 * @typedef {'Tech & Dev' | 'Corporate & IT' | 'Creative & Photo' | 'Data & Analytics'} ExperienceCategoryType
 */

/**
 * @typedef {[year: string, roleAndCompany: string, description: string, category: ExperienceCategoryType]} ExperienceTuple
 */

/**
 * Valid project categories for filter views.
 * @type {readonly string[]}
 */
export const PROJECT_CATEGORIES = Object.freeze([
  "All",
  "UI/UX",
  "Full Stack",
  "Front End",
  "Photography",
]);

/**
 * Valid experience categories for timeline filters.
 * @type {readonly string[]}
 */
export const EXPERIENCE_CATEGORIES = Object.freeze([
  "All",
  "Tech & Dev",
  "Corporate & IT",
  "Creative & Photo",
  "Data & Analytics",
]);

/**
 * Validates a Project entity against the domain contract.
 * @param {any} project
 * @returns {boolean} True if project conforms to the schema.
 */
export function isValidProject(project) {
  if (!project || typeof project !== "object") return false;
  return (
    typeof project.name === "string" &&
    project.name.trim().length > 0 &&
    typeof project.type === "string" &&
    typeof project.year === "string" &&
    typeof project.image === "string" &&
    Array.isArray(project.stack) &&
    typeof project.copy === "string"
  );
}

/**
 * Validates an Experience item tuple against the domain contract.
 * @param {any} item
 * @returns {boolean} True if item conforms to [year, title, desc, category].
 */
export function isValidExperienceItem(item) {
  if (!Array.isArray(item) || item.length < 4) return false;
  const [year, title, desc, category] = item;
  return (
    typeof year === "string" &&
    typeof title === "string" &&
    typeof desc === "string" &&
    typeof category === "string"
  );
}
