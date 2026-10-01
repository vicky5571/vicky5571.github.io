/**
 * @file src/lib/hoverMotion.js
 * @description Autonomous hover simulation and trajectory generation for touch / no-mouse devices.
 */

/**
 * Calculates a point on a quadratic Bezier curve at parameter t in [0, 1].
 * @param {{ x: number, y: number }} p0 - Start point
 * @param {{ x: number, y: number }} p1 - Control point
 * @param {{ x: number, y: number }} p2 - End point
 * @param {number} t - Progress between 0 and 1
 * @returns {{ x: number, y: number }}
 */
export function getBezierPoint(p0, p1, p2, t) {
  const clampedT = Math.max(0, Math.min(1, t));
  const mt = 1 - clampedT;
  const mt2 = mt * mt;
  const t2 = clampedT * clampedT;
  const twoMtT = 2 * mt * clampedT;

  return {
    x: mt2 * p0.x + twoMtT * p1.x + t2 * p2.x,
    y: mt2 * p0.y + twoMtT * p1.y + t2 * p2.y,
  };
}

/**
 * Generates an organic, curved stroke path centered around a focal region (e.g. portrait).
 * @param {number} width - Canvas width in pixels
 * @param {number} height - Canvas height in pixels
 * @param {{ x: number, y: number }} [focalRatio={ x: 0.5, y: 0.47 }] - Relative focal center
 * @returns {{
 *   type: 'stroke',
 *   p0: { x: number, y: number },
 *   p1: { x: number, y: number },
 *   p2: { x: number, y: number },
 *   duration: number
 * }}
 */
export function generateRandomStroke(width, height, focalRatio = { x: 0.5, y: 0.47 }) {
  const cx = width * focalRatio.x;
  const cy = height * focalRatio.y;

  const maxRx = Math.min(width * 0.32, 220);
  const maxRy = Math.min(height * 0.28, 190);

  const theta0 = Math.random() * Math.PI * 2;
  const dist0 = 0.25 + Math.random() * 0.75;
  const p0 = {
    x: Math.max(20, Math.min(width - 20, cx + Math.cos(theta0) * maxRx * dist0)),
    y: Math.max(20, Math.min(height - 20, cy + Math.sin(theta0) * maxRy * dist0)),
  };

  // Traverse across the focal area
  const angleDelta = Math.PI * (0.65 + Math.random() * 0.7);
  const theta2 = theta0 + (Math.random() > 0.5 ? angleDelta : -angleDelta);
  const dist2 = 0.25 + Math.random() * 0.75;
  const p2 = {
    x: Math.max(20, Math.min(width - 20, cx + Math.cos(theta2) * maxRx * dist2)),
    y: Math.max(20, Math.min(height - 20, cy + Math.sin(theta2) * maxRy * dist2)),
  };

  // Organic control point offset
  const midX = (p0.x + p2.x) * 0.5;
  const midY = (p0.y + p2.y) * 0.5;
  const chordLength = Math.hypot(p2.x - p0.x, p2.y - p0.y) || 100;
  const normalScale = (Math.random() - 0.5) * chordLength * 0.6;
  const nx = -(p2.y - p0.y) / chordLength;
  const ny = (p2.x - p0.x) / chordLength;

  const p1 = {
    x: Math.max(20, Math.min(width - 20, midX + nx * normalScale)),
    y: Math.max(20, Math.min(height - 20, midY + ny * normalScale)),
  };

  const duration = Math.round(800 + Math.random() * 600); // 800ms - 1400ms

  return {
    type: "stroke",
    p0,
    p1,
    p2,
    duration,
  };
}

/**
 * Generates an ambient water droplet bloom centered near the focal region.
 * @param {number} width - Canvas width in pixels
 * @param {number} height - Canvas height in pixels
 * @param {{ x: number, y: number }} [focalRatio={ x: 0.5, y: 0.47 }] - Relative focal center
 * @returns {{
 *   type: 'bloom',
 *   x: number,
 *   y: number,
 *   radius: number,
 *   lifetime: number
 * }}
 */
export function generateRandomBloom(width, height, focalRatio = { x: 0.5, y: 0.47 }) {
  const cx = width * focalRatio.x;
  const cy = height * focalRatio.y;

  const offsetX = (Math.random() - 0.5) * Math.min(width * 0.35, 180);
  const offsetY = (Math.random() - 0.5) * Math.min(height * 0.28, 150);

  return {
    type: "bloom",
    x: Math.max(30, Math.min(width - 30, cx + offsetX)),
    y: Math.max(30, Math.min(height - 30, cy + offsetY)),
    radius: Math.round(150 + Math.random() * 90),
    lifetime: Math.round(1500 + Math.random() * 600),
  };
}

/**
 * Detects whether the current device lacks a fine hover cursor (e.g. mobile/tablet touch).
 * @returns {boolean}
 */
export function hasNoMousePointer() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  return !hasFinePointer;
}
