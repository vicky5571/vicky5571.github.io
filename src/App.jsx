import React, { useState } from "react";
import {
  ArrowUpRight,
  CircleDot,
  Menu,
  MousePointer2,
  Play,
  Sparkles,
  X,
  Zap,
  MessageCircleMore
} from "lucide-react";

const projects = [
  {
    name: "StealthForce E-commerce",
    type: "Front End",
    year: "",
    tone: "acid",
    image: "/img/stealthforce.png",
    link: "https://ecommerce-sanity-build-bewn7zdp2-vicky-galih-pamungas-projects.vercel.app/",
    stack: ["Next.js","React", "Typescript", "Sanity", "Stripe", "Clerk"],
    copy: ""
  },
  {
    name: "Redefined Gaming",
    type: "Front End",
    year: "",
    tone: "acid",
    image: "/img/redefined-gaming.png",
    link: "https://vt.tiktok.com/ZSQgSXXPg/",
    stack: ["React", "Motion"],
    copy: ""
  },
  {
    name: "Tomato - Online Food Ordering",
    type: "UI/UX",
    year: "",
    tone: "cyan",
    image: "/img/tomato.png",
    link: "https://www.figma.com/design/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=0-1&t=gE2WA9YVxasitwte-1",
    stack: ["Figma", "Prototype", "Research"],
    copy: ""
  },
  {
    name: "NIKE - Shoes Store",
    type: "UI/UX",
    year: "",
    tone: "acid",
    image: "/img/nike.png",
    link: "https://www.figma.com/proto/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=1170-56&t=DOxDIfp3AD9HAmod-1",
    stack: ["Figma", "Landing Page", "UI Design"],
    copy: ""
  },
  {
    name: "Library Photo Session",
    type: "Photography",
    year: "",
    tone: "flame",
    image: "/img/photo-session.png",
    link: "https://www.instagram.com/kkn.hargomulyo2025?igsh=MXI0Mm56NWpla3ozaA==",
    stack: ["Photography", "Lightroom", "Direction"],
    copy: ""
  }
];

const methods = [
  ["Jul 2025 - Nov 2025", "Wedding photographer", ""],
  ["November 2025", "disney magical runway solo paragon", ""],
  ["May 2025 - Jul 2025", "event photographer", ""],
  ["Jan 2025", "php web developer", ""],
  ["Jul 2024 - Nov 2024", "front end developer", ""],
  ["Aug 2023 - Feb 2024", "data scientist", ""],
  ["Apr 2022 - Sep 2022", "data analyst", ""]
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    ["Work", "#work"],
    ["Experience", "#method"],
    ["Contact", "#contact"]
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-milk">
          <span className="h-2.5 w-2.5 rounded-full bg-acid shadow-glow" />
          VICKY
        </a>
        <div className="hidden items-center gap-7 text-sm text-milk/72 md:flex">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-acid">{label}</a>
          ))}
        </div>
        <a href="#contact" className="hidden items-center gap-2 rounded-full border border-milk/20 px-4 py-2 text-sm text-milk transition hover:border-acid hover:text-acid md:flex">
          Let's Connect <ArrowUpRight size={16} />
        </a>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-milk transition hover:border-acid hover:text-acid md:hidden"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <div
        id="mobile-menu"
        className={`${isMenuOpen ? "max-h-80 translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 opacity-0"} overflow-hidden border-t border-white/10 px-4 shadow-2xl transition-all duration-300 ease-out md:hidden`}
      >
        <div className="mx-auto grid max-w-7xl gap-2 py-4">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="border border-white/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-milk/80 transition hover:border-acid hover:text-acid"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-1 inline-flex items-center justify-center gap-2 bg-acid px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:bg-milk"
            onClick={() => setIsMenuOpen(false)}
          >
            Let's Connect <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
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
            UI/UX Designer and Web Developer
          </div>
          <h1 className="max-w-6xl text-balance text-[clamp(2.75rem,11vw,9.7rem)] font-black uppercase leading-[0.82] tracking-normal sm:text-[clamp(3.2rem,12vw,9.7rem)] sm:leading-[0.79]">
            Designing digital experiences.
          </h1>
          <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-end">
            <p className="max-w-xl text-base leading-7 text-milk/76 md:text-xl md:leading-8">
              I'm Vicky Galih Pamungkas, a UI/UX Designer and Web Developer passionate about creating user-centered digital products through research, prototyping, and modern web technologies.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a href="https://drive.google.com/file/d/1d7PqTH9ZvvkSRnOZtJtLsHRiBDkpxLSy/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-acid px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-milk">
                curriculum vitae <ArrowUpRight size={17} />
              </a>
              <a href="#work" className="inline-flex items-center gap-2 border border-milk/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-milk transition hover:border-cyan hover:text-cyan">
                View work <Play size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 grid border-y border-white/10 text-sm text-milk/65 sm:grid-cols-3">
          {["Brand systems", "Landing pages", "Campaigns"].map((item) => (
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
            <span>UI/UX Design</span>
            <Zap size={22} />
            <span>Full Stack Creative Design</span>
            <Zap size={22} />
            {/* <span>Photography</span>
            <Zap size={22} /> */}
            <span>Web Development</span>
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
            A collection of design and development projects focused on solving real user problems through research, thoughtful design, and implementation.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-w-0"
            >
              <article key={project.name} className="project-card group min-h-[430px] min-w-0 overflow-hidden border border-ink/15 bg-ink text-milk">
                {/* <div className={`project-visual project-visual-${project.tone}`}>
                  <span className="project-index">0{index + 1}</span>
                </div> */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span 
                    className="absolute left-4 top-4 project-index drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)]"
                  >
                    0{index + 1}
                  </span>
                </div>
                <div className="space-y-5 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-milk/55">
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-milk/15 bg-milk/[0.06] px-3 py-1.5 text-[0.68rem] font-bold uppercase leading-none tracking-[0.16em] text-milk/72 transition group-hover:border-acid/45 group-hover:text-acid"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <h3 className="break-words text-3xl font-black uppercase leading-none sm:text-4xl">{project.name}</h3>
                  <p className="leading-7 text-milk/66">{project.copy}</p>
                  <a href={project.link} className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-acid">
                    Explore <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </article>
            </a>
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
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-acid">Experience</p>
          <h2 className="text-[clamp(2.2rem,6vw,5.6rem)] font-black uppercase leading-[0.88] tracking-normal">
            Light work, heavy presence.
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
          Make it memorable.
        </h2>
        <div className="space-y-6">
          <p className="text-lg leading-8 text-ink/72">
            Elevate your digital presence with modern UI/UX design and front-end development that transforms ideas into engaging, memorable experiences.
          </p>
          <a href="https://wa.me/6283144995745" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-milk transition hover:bg-milk hover:text-ink">
            contact me <MessageCircleMore size={17} />
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
