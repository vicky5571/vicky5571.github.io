import React from "react";
import {
  ArrowUpRight,
  CircleDot,
  Menu,
  MousePointer2,
  Play,
  Sparkles,
  Zap
} from "lucide-react";

const projects = [
  {
    name: "Quiet Voltage",
    type: "Brand System",
    year: "2026",
    tone: "acid",
    copy: "Identity, launch page, dan motion language untuk studio teknologi iklim."
  },
  {
    name: "Northline",
    type: "Commerce",
    year: "2026",
    tone: "cyan",
    copy: "Editorial e-commerce dengan ritme katalog, art cards, dan fast checkout story."
  },
  {
    name: "After Hours",
    type: "Culture",
    year: "2025",
    tone: "flame",
    copy: "Microsite festival dengan poster system, schedule, dan visual direction."
  }
];

const methods = [
  ["01", "Visual hook dulu", "First viewport dibuat seperti poster kampanye: cepat terbaca, punya mood, dan kuat untuk screenshot."],
  ["02", "Motion hemat", "Interaksi memakai CSS transform, hover, dan marquee ringan. Tidak ada WebGL, tidak ada canvas berat."],
  ["03", "Konten tetap jualan", "CTA, proof, dan penawaran tetap jelas meski tampilannya eksperimental."],
  ["04", "Mobile sebagai panggung", "Layout tidak hanya mengecil di mobile, tapi disusun ulang supaya tetap terasa mahal."]
];

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-milk">
          <span className="h-2.5 w-2.5 rounded-full bg-acid shadow-glow" />
          Vanta
        </a>
        <div className="hidden items-center gap-7 text-sm text-milk/72 md:flex">
          <a href="#work" className="transition hover:text-acid">Work</a>
          <a href="#method" className="transition hover:text-acid">Method</a>
          <a href="#contact" className="transition hover:text-acid">Contact</a>
        </div>
        <a href="#contact" className="hidden items-center gap-2 rounded-full border border-milk/20 px-4 py-2 text-sm text-milk transition hover:border-acid hover:text-acid md:flex">
          Start project <ArrowUpRight size={16} />
        </a>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-milk md:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
      </nav>
    </header>
  );
}

function HeroPoster() {
  return (
    <div className="hero-poster" aria-hidden="true">
      <div className="poster-frame poster-frame-one" />
      <div className="poster-frame poster-frame-two" />
      <div className="poster-mark poster-mark-a" />
      <div className="poster-mark poster-mark-b" />
      <div className="poster-noise" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink text-milk">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,15,0.98)_0%,rgba(16,16,15,0.86)_45%,rgba(16,16,15,0.36)_100%)]" />
      <HeroPoster />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-7 pt-28 sm:px-6 lg:px-8 lg:pb-10">
        <div className="max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 border border-milk/15 bg-milk/5 px-3 py-2 text-xs uppercase tracking-[0.24em] text-milk/75 backdrop-blur">
            <Sparkles size={14} className="text-acid" />
            Awwwards-inspired, zero WebGL
          </div>
          <h1 className="max-w-6xl text-balance text-[clamp(3.2rem,12vw,9.7rem)] font-black uppercase leading-[0.79] tracking-normal">
            Sharp sites for strange brands.
          </h1>
          <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-end">
            <p className="max-w-xl text-lg leading-8 text-milk/76 md:text-xl">
              Landing page cepat, dramatis, dan terasa kurasi studio kreatif: poster-led layout, motion ringan, dan struktur konversi yang tetap jelas.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="#contact" className="inline-flex items-center gap-2 bg-acid px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-milk">
                Book a sprint <ArrowUpRight size={17} />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-milk/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-milk transition hover:border-cyan hover:text-cyan">
                View work <Play size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 grid border-y border-white/10 text-sm text-milk/65 sm:grid-cols-3">
          {["Brand systems", "Landing pages", "Launch campaigns"].map((item) => (
            <div key={item} className="flex items-center gap-3 border-white/10 py-4 sm:border-r sm:px-5 last:sm:border-r-0">
              <CircleDot size={15} className="text-acid" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/15 bg-acid py-4 text-ink">
      <div className="marquee-track flex w-max items-center gap-8 text-xl font-black uppercase tracking-[0.18em] sm:text-2xl">
        {Array.from({ length: 8 }).map((_, index) => (
          <React.Fragment key={index}>
            <span>Fast load</span>
            <Zap size={22} />
            <span>Editorial motion</span>
            <Zap size={22} />
            <span>No 3D</span>
            <Zap size={22} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="bg-milk py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <h2 className="text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.86] tracking-normal">
            Work that feels like a magazine cover.
          </h2>
          <p className="max-w-2xl text-lg leading-8 text-ink/68">
            Referensinya dari website Awwwards yang kuat secara art direction: bukan berat karena teknologi, tapi berkesan karena komposisi, timing, dan detail.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article key={project.name} className="project-card group min-h-[430px] overflow-hidden border border-ink/15 bg-ink text-milk">
              <div className={`project-visual project-visual-${project.tone}`}>
                <span className="project-index">0{index + 1}</span>
              </div>
              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-milk/55">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-4xl font-black uppercase leading-none">{project.name}</h3>
                <p className="leading-7 text-milk/66">{project.copy}</p>
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-acid">
                  Explore <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="method" className="bg-ink py-20 text-milk sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-acid">Method</p>
          <h2 className="text-[clamp(2.2rem,6vw,5.6rem)] font-black uppercase leading-[0.88] tracking-normal">
            Light code, heavy presence.
          </h2>
        </div>
        <div className="grid gap-3">
          {methods.map(([number, title, text]) => (
            <article key={title} className="grid gap-6 border border-white/12 bg-white/[0.035] p-5 transition hover:border-acid/50 hover:bg-white/[0.055] sm:grid-cols-[90px_1fr] sm:p-7">
              <span className="text-sm font-bold text-acid">{number}</span>
              <div>
                <h3 className="text-2xl font-black uppercase leading-tight">{title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-milk/66">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-flame py-16 text-ink sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <h2 className="text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.84] tracking-normal">
          Make it fast. Make it memorable.
        </h2>
        <div className="space-y-6">
          <p className="text-lg leading-8 text-ink/72">
            Cocok untuk brand, produk, portfolio, event, dan campaign page yang ingin terlihat premium tanpa beban 3D.
          </p>
          <a href="mailto:hello@vanta.test" className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-milk transition hover:bg-milk hover:text-ink">
            hello@vanta.test <MousePointer2 size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-ink font-body">
      <Header />
      <Hero />
      <Marquee />
      <Work />
      <Method />
      <Contact />
    </main>
  );
}
