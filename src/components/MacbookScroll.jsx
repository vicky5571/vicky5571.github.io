import React, { useEffect, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "../lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

export function MacbookScroll({
  src = "/img/stealthforce.webp",
  showGradient = false,
  title,
  badge,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Spring-smoothed scroll progress prevents jerky, heavy wheel/trackpad ticks
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    mass: 0.1,
  });

  // Tiered viewport support: "mobile", "tablet-portrait", "tablet-landscape", "desktop"
  const [deviceTier, setDeviceTier] = useState("desktop");

  useEffect(() => {
    const updateDeviceTier = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isPortrait = h >= w;

      if (w < 640) {
        setDeviceTier("mobile");
      } else if (w <= 1024 && isPortrait) {
        setDeviceTier("tablet-portrait");
      } else if (w < 1024) {
        setDeviceTier("tablet-landscape");
      } else {
        setDeviceTier("desktop");
      }
    };
    updateDeviceTier();
    window.addEventListener("resize", updateDeviceTier);
    window.addEventListener("orientationchange", updateDeviceTier);
    return () => {
      window.removeEventListener("resize", updateDeviceTier);
      window.removeEventListener("orientationchange", updateDeviceTier);
    };
  }, []);

  const isDesktop = deviceTier === "desktop";
  const isTabletPortrait = deviceTier === "tablet-portrait";
  const isTabletLandscape = deviceTier === "tablet-landscape";

  const scaleX = useTransform(
    smoothProgress,
    [0, isDesktop ? 0.45 : isTabletPortrait ? 0.5 : isTabletLandscape ? 0.48 : 0.48],
    [1.15, isDesktop ? 1.45 : isTabletPortrait ? 1.2 : isTabletLandscape ? 1.25 : 1],
  );
  const scaleY = useTransform(
    smoothProgress,
    [0, isDesktop ? 0.45 : isTabletPortrait ? 0.5 : isTabletLandscape ? 0.48 : 0.48],
    [0.65, isDesktop ? 1.45 : isTabletPortrait ? 1.2 : isTabletLandscape ? 1.25 : 1],
  );
  const translate = useTransform(
    smoothProgress,
    isDesktop
      ? [0, 0.45, 0.9, 1]
      : isTabletPortrait
        ? [0, 0.5, 0.92, 1]
        : isTabletLandscape
          ? [0, 0.48, 0.92, 1]
          : [0, 0.48, 0.9, 1],
    isDesktop
      ? [0, 600, 1550, 1850]
      : isTabletPortrait
        ? [0, 1200, 3600, 4200]
        : isTabletLandscape
          ? [0, 1100, 3100, 3600]
          : [0, 1200, 2900, 3400],
  );
  const rotate = useTransform(
    smoothProgress,
    [0.02, isDesktop ? 0.45 : isTabletPortrait ? 0.5 : isTabletLandscape ? 0.48 : 0.48],
    [-28, 0],
  );
  const textTransform = useTransform(
    smoothProgress,
    [0, isDesktop ? 0.32 : isTabletPortrait ? 0.35 : isTabletLandscape ? 0.34 : 0.35],
    [0, 80],
  );
  const textOpacity = useTransform(
    smoothProgress,
    [0, isDesktop ? 0.24 : isTabletPortrait ? 0.25 : isTabletLandscape ? 0.25 : 0.25],
    [1, 0],
  );

  return (
    <div
      ref={ref}
      className="relative flex min-h-[200vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 md:py-72"
    >
      <m.div
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-16 text-center"
      >
        <span className="mb-3 inline-block text-xs font-black uppercase tracking-[0.24em] text-acid">
          Craft & Architecture
        </span>
        <h2 className="text-balance text-3xl font-black uppercase tracking-normal text-milk sm:text-5xl">
          {title || (
            <span>
              Engineered to perform. <br /> From database to pixel.
            </span>
          )}
        </h2>
      </m.div>

      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />

      {/* Base area */}
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#1e1e21] shadow-2xl border border-white/10">
        {/* Above keyboard bar */}
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-[80%]">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%] overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-ink via-ink to-transparent" />
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
}

export function Lid({ scaleX, scaleY, rotate, translate, src }) {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        />
      </div>
      <m.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2 shadow-2xl [transform:translateZ(0)]"
      >
        <div className="absolute inset-0 rounded-lg bg-[#141416]" />
        <img
          src={src}
          alt="Macbook display preview"
          decoding="async"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top [transform:translateZ(0)]"
        />
      </m.div>
    </div>
  );
}

export function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000030 inset",
      }}
    />
  );
}

export function Keypad() {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F9</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* Sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KBtn({
  className,
  children,
  childrenClassName,
  backlit = true,
}) {
  return (
    <div
      className={cn("rounded-[4px] p-[0.5px]", backlit && "bg-white/[0.15]")}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D] border border-white/5",
          className,
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-300",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
}

export function OptionKey({ className }) {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
}
