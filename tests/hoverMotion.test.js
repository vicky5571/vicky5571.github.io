import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getBezierPoint,
  generateRandomStroke,
  generateRandomBloom,
} from "../src/lib/hoverMotion.js";

describe("Hover Motion Simulation Helpers", () => {
  describe("getBezierPoint", () => {
    const p0 = { x: 0, y: 0 };
    const p1 = { x: 50, y: 100 };
    const p2 = { x: 100, y: 0 };

    it("should return start point at t = 0", () => {
      const pt = getBezierPoint(p0, p1, p2, 0);
      assert.equal(pt.x, 0);
      assert.equal(pt.y, 0);
    });

    it("should return end point at t = 1", () => {
      const pt = getBezierPoint(p0, p1, p2, 1);
      assert.equal(pt.x, 100);
      assert.equal(pt.y, 0);
    });

    it("should return mid curve point at t = 0.5", () => {
      const pt = getBezierPoint(p0, p1, p2, 0.5);
      // B(0.5) = 0.25*0 + 0.5*50 + 0.25*100 = 25 + 25 = 50
      // y = 0.25*0 + 0.5*100 + 0.25*0 = 50
      assert.equal(pt.x, 50);
      assert.equal(pt.y, 50);
    });
  });

  describe("generateRandomStroke", () => {
    it("should generate valid stroke points within canvas bounds", () => {
      const width = 800;
      const height = 600;
      const stroke = generateRandomStroke(width, height);

      assert.equal(stroke.type, "stroke");
      assert.ok(typeof stroke.duration === "number" && stroke.duration >= 700);

      // p0, p1, p2 should all be within canvas dimensions
      assert.ok(stroke.p0.x >= 0 && stroke.p0.x <= width);
      assert.ok(stroke.p0.y >= 0 && stroke.p0.y <= height);
      assert.ok(stroke.p1.x >= 0 && stroke.p1.x <= width);
      assert.ok(stroke.p1.y >= 0 && stroke.p1.y <= height);
      assert.ok(stroke.p2.x >= 0 && stroke.p2.x <= width);
      assert.ok(stroke.p2.y >= 0 && stroke.p2.y <= height);
    });
  });

  describe("generateRandomBloom", () => {
    it("should generate a valid bloom config near the focal center", () => {
      const width = 800;
      const height = 600;
      const bloom = generateRandomBloom(width, height);

      assert.equal(bloom.type, "bloom");
      assert.ok(bloom.x > width * 0.2 && bloom.x < width * 0.8);
      assert.ok(bloom.y > height * 0.2 && bloom.y < height * 0.8);
      assert.ok(bloom.radius > 50 && bloom.radius < 400);
      assert.ok(bloom.lifetime > 1000);
    });
  });
});
