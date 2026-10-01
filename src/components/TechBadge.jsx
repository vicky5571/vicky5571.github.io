import React from "react";
import { getTechIcon, getTechBrandColor } from "../lib/techIcons.js";

/**
 * Atomic Tech Badge with leading technology or discipline icon.
 * Retains clean neutral monochrome milk when idle, and lights up with authentic brand color on hover.
 * @param {{ name: string, className?: string }} props
 */
export function TechBadge({ name, className = "" }) {
  const Icon = getTechIcon(name);
  const brandColor = getTechBrandColor(name);

  return (
    <span
      style={{ "--badge-brand": brandColor }}
      className={`tech-badge inline-flex items-center gap-1.5 border border-milk/15 bg-milk/[0.06] px-2.5 py-1 text-[0.68rem] font-bold uppercase leading-none tracking-[0.14em] text-milk/80 group-hover:border-acid/35 group-hover:text-milk ${className}`}
    >
      <Icon
        size={12}
        strokeWidth={2.2}
        className="tech-badge__icon shrink-0"
        aria-hidden="true"
      />
      <span>{name}</span>
    </span>
  );
}
