import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function MimoHero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Exact Xiaomi MiMo Waterpaint Drop Canvas Algorithm
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MASK = "16, 16, 15"; // #10100f (Dark Ink Theme)
    const R_START = 8; // ink dot starts small
    const R_END = 135; // expands to a per-dot random max
    const R_VARY = 0.45; // size randomness for lively organic variation
    const LIFETIME = 540; // ms — ink dot expands and fades over this time
    const STAMP_STEP = 12; // distance between ink dots along cursor path
    const MAX_STAMPS = 180; // cap on simultaneous living ink dots
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;

    function resize() {
      const rect = hero.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // Fill initial solid mask
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgb(" + MASK + ")";
      ctx.fillRect(0, 0, w, h);
      setIsReady(true);
    }

    resize();
    window.addEventListener("resize", resize);

    // Living ink drops
    const stamps = [];
    let lastX = null;
    let lastY = null;
    let running = false;

    function addStamp(x, y, customLifetime, customRmax, isTeaser = false) {
      if (stamps.length >= MAX_STAMPS) stamps.shift();
      stamps.push({
        x: x,
        y: y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: customRmax || R_END * (1 - R_VARY + Math.random() * R_VARY),
        lifetime: customLifetime || LIFETIME,
        isTeaser: isTeaser,
      });
    }

    function stampAlong(x, y) {
      if (lastX === null) {
        addStamp(x, y);
      } else {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
        for (let i = 1; i <= steps; i++) {
          addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
        }
      }
      lastX = x;
      lastY = y;
    }

    // Carve one organic, wobbling waterpaint drop (exact MiMo harmonic formula)
    function carveInk(cx, cy, r, alpha, seed) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
      g.addColorStop(0, "rgba(0, 0, 0, " + 0.96 * alpha + ")");
      g.addColorStop(0.55, "rgba(0, 0, 0, " + 0.88 * alpha + ")");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      const segs = 32;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        // Harmonic wobble simulating liquid surface tension & waterpaint dispersion
        const wob =
          0.78 +
          0.14 * Math.sin(a * 3 + seed) +
          0.08 * Math.sin(a * 7 + seed * 2.1) +
          0.05 * Math.sin(a * 13 + seed * 0.7);
        const rr = r * wob;
        const px = cx + Math.cos(a) * rr;
        const py = cy + Math.sin(a) * rr;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }

    function loop() {
      const now = performance.now();

      // Repaint solid mask
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgb(" + MASK + ")";
      ctx.fillRect(0, 0, w, h);

      // Carve every living waterpaint dot back out with destination-out
      ctx.globalCompositeOperation = "destination-out";
      for (let i = stamps.length - 1; i >= 0; i--) {
        const s = stamps[i];
        const duration = s.lifetime || LIFETIME;
        const t = (now - s.born) / duration;
        if (t >= 1) {
          stamps.splice(i, 1);
          continue;
        }

        let r;
        let alpha;

        if (s.isTeaser) {
          // Seamless, uninterrupted expansion from R_START to grand dispersion size:
          const ease = 1 - Math.pow(1 - t, 3);
          r = R_START + (s.rmax * 2.5 - R_START) * ease;

          // Looses transparency faster: begins fading earlier and drops off briskly
          if (t <= 0.18) {
            alpha = 1;
          } else {
            const p = (t - 0.18) / 0.82;
            alpha = Math.max(0, Math.pow(Math.cos(p * Math.PI * 0.5), 1.6));
          }
        } else {
          // Normal interactive cursor trail
          const ease = 1 - Math.pow(1 - t, 3);
          r = R_START + (s.rmax - R_START) * ease;
          alpha = 1 - t * t;
        }

        carveInk(s.x, s.y, r, alpha, s.seed);
      }

      if (stamps.length > 0) {
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    function startLoop() {
      if (!running) {
        running = true;
        requestAnimationFrame(loop);
      }
    }

    // Auto-bloom teaser sequence on load (Option 2)
    const teaserTimer = setTimeout(() => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width * 0.5;
      const cy = rect.height * 0.47;

      // Primary central bloom directly over Vicky's portrait (faster, swifter dissipation)
      addStamp(cx, cy, 2000, 260, true);
      // Organic satellite blooms creating a full watercolor cloud
      addStamp(cx - 48, cy + 26, 1850, 205, true);
      addStamp(cx + 52, cy - 22, 1850, 200, true);
      addStamp(cx - 10, cy - 36, 1700, 175, true);

      startLoop();
    }, 400);

    const handleMouseEnter = (e) => {
      setHasInteracted(true);
      const rect = hero.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      stampAlong(lastX, lastY);
      startLoop();
    };

    const handleMouseMove = (e) => {
      setHasInteracted(true);
      const rect = hero.getBoundingClientRect();
      stampAlong(e.clientX - rect.left, e.clientY - rect.top);
      startLoop();
    };

    const handleMouseLeave = () => {
      lastX = null;
      lastY = null;
    };

    hero.addEventListener("mouseenter", handleMouseEnter);
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(teaserTimer);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mouseenter", handleMouseEnter);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className={`coder-hero relative w-full h-[100vh] min-h-[100vh] bg-ink overflow-hidden ${
        isReady ? "is-ready" : ""
      }`}
    >
      {/* 1. Underlying Watercolor Relief Background (Revealed by Waterpaint Drops) */}
      <div className="coder-hero__bg" aria-hidden="true" />

      {/* 2. Solid Mask Canvas Erased by Organic Waterpaint Drops */}
      <canvas ref={canvasRef} className="coder-hero__mask" aria-hidden="true" />

      {/* 3. Architectural HUD & Viewfinder Frame (Option 3) */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle technical background grid with increased visibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,241,232,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,241,232,0.10)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_85%)]" />

        {/* Top Metadata Header Strip */}
        <div className="absolute top-24 inset-x-0 px-6 sm:px-10 lg:px-12 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-white/85 uppercase">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_10px_#d5ff3f]" />
            <span className="text-white/95 font-semibold">WEB DEV // PORTFOLIO 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-white/80">SURAKARTA, INDONESIA [7°34&apos;S · 110°49&apos;E]</span>
            <span className="text-acid">•</span>
            <span className="text-acid font-semibold flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-acid animate-pulse shadow-[0_0_8px_#d5ff3f]" />
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        {/* Corner Viewfinder Crop Marks [+] */}
        <div className="absolute top-28 left-6 sm:left-10 lg:left-12 font-mono text-sm text-white/85 select-none font-bold">
          ┌
        </div>
        <div className="absolute top-28 right-6 sm:right-10 lg:right-12 font-mono text-sm text-white/85 select-none font-bold">
          ┐
        </div>
        <div className="absolute bottom-28 left-6 sm:left-10 lg:left-12 font-mono text-sm text-white/85 select-none font-bold">
          └
        </div>
        <div className="absolute bottom-28 right-6 sm:right-10 lg:right-12 font-mono text-sm text-white/85 select-none font-bold">
          ┘
        </div>

        {/* Faint Center Reticle Crosshairs */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 font-mono text-xs text-white/80 select-none font-bold">
          +
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 font-mono text-xs text-white/80 select-none font-bold">
          +
        </div>
      </div>

      {/* 4. Interactive Cue Badge (Option 2 - Dissolves on user interaction) */}
      <div
        className={`pointer-events-none absolute bottom-36 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          hasInteracted
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="inline-flex items-center gap-3.5 rounded-full border border-acid/40 bg-ink/85 px-6 py-2.5 sm:px-8 sm:py-3.5 shadow-[0_0_35px_rgba(213,255,63,0.25)] backdrop-blur-xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-acid" />
          </span>
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-acid">
            Brush canvas to illuminate
          </span>
        </div>
      </div>

      {/* 5. Bottom Corners: Name (Left) & CV Button (Right) — Center is 100% Unobstructed */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full px-6 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
          {/* Bottom Left: Tag & Uppercase Name */}
          <div className="pointer-events-auto">
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.24em] text-acid">
              Full Stack Web Developer
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-milk drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] sm:text-4xl md:text-5xl lg:text-6xl">
              VICKY GALIH PAMUNGKAS
            </h1>
          </div>

          {/* Bottom Right: Curriculum Vitae Button */}
          <div className="pointer-events-auto flex items-center">
            <a
              href="https://drive.google.com/file/d/1M8Tze7CDaDFWaORncTuWwVnmo6Exxxtk/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-ink transition-all duration-200 hover:scale-105 hover:bg-milk hover:text-ink shadow-glow sm:text-sm"
            >
              Curriculum Vitae <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
