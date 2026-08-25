import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CircleDot,
  Menu,
  Play,
  Sparkles,
  X,
  Zap,
  MessageCircleMore,
  Github,
  Linkedin,
  Figma,
  Mail,
  ArrowUp,
} from "lucide-react";

const projects = [
  {
    name: "StealthForce E-commerce",
    type: "Full Stack",
    year: "2025",
    tone: "acid",
    image: "/img/stealthforce.png",
    link: "https://ecommerce-sanity-build-bewn7zdp2-vicky-galih-pamungas-projects.vercel.app/",
    stack: [
      "Next.js",
      "React",
      "Typescript",
      "Sanity",
      "Stripe",
      "Clerk",
      "Zustand",
    ],
    copy: "Full-stack headless commerce platform with Sanity CMS, Stripe checkout integration, and real-time inventory management.",
  },
  {
    name: "Redefined Gaming",
    type: "Front End",
    year: "2024",
    tone: "acid",
    image: "/img/redefined-gaming.png",
    link: "https://redefined-gaming.vercel.app/",
    stack: ["React", "Motion", "Tailwind"],
    copy: "High-octane gaming landing experience engineered with fluid animation sequences and interactive micro-interactions.",
  },
  {
    name: "Dyno Graphy",
    type: "Front End",
    year: "2024",
    tone: "acid",
    image: "/img/dyno-graphy.png",
    link: "https://portfolio-dynography.vercel.app/",
    stack: ["Tailwind", "PostCSS", "JavaScript"],
    copy: "Photography portfolio showcase crafted with custom Tailwind design tokens and fluid responsive typography.",
  },
  {
    name: "SEO Project Tracker",
    type: "Full Stack",
    year: "2024",
    tone: "acid",
    image: "/img/seo-project-tracker.png",
    link: "https://nextjs-seo-project-tracker.vercel.app/",
    stack: ["Next.js", "Supabase", "Typescript"],
    copy: "Keyword analytics dashboard with automated ranking tracking and real-time Supabase database sync.",
  },
  {
    name: "Tomato - Food Ordering",
    type: "UI/UX",
    year: "2024",
    tone: "cyan",
    image: "/img/tomato.png",
    link: "https://www.figma.com/design/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=0-1&t=gE2WA9YVxasitwte-1",
    stack: ["Figma", "Prototype", "User Research"],
    copy: "User-centered mobile app flow designed to simplify checkout friction and enhance food discovery.",
  },
  {
    name: "NIKE - Shoes Store",
    type: "UI/UX",
    year: "2024",
    tone: "acid",
    image: "/img/nike.png",
    link: "https://www.figma.com/proto/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=1170-56&t=DOxDIfp3AD9HAmod-1",
    stack: ["Figma", "Landing Page", "Design System"],
    copy: "Editorial e-commerce concept focusing on bold brand imagery, product hierarchy, and immersive storytelling.",
  },
  {
    name: "Library Photo Session",
    type: "Photography",
    year: "2025",
    tone: "flame",
    image: "/img/photo-session.png",
    link: "https://www.instagram.com/kkn.hargomulyo2025?igsh=MXI0Mm56NWpla3ozaA==",
    stack: ["Photography", "Lightroom", "Visual Direction"],
    copy: "Editorial portraiture and visual storytelling with custom color grading and atmospheric lighting.",
  },
];

const methods = [
  [
    "2025",
    "Wedding & Event Photographer",
    "Creative visual direction, candid storytelling, and color grading for ceremonies and cultural events.",
  ],
  [
    "2025",
    "Disney Magical Runway Solo Paragon",
    "Backstage and runway fashion documentation during regional promotional showcase.",
  ],
  [
    "2025",
    "PHP Web Developer",
    "Built modular backend functionality, managed relational databases, and optimized query pipelines.",
  ],
  [
    "2024",
    "Front End Developer",
    "Engineered performant, responsive web interfaces with React, Tailwind CSS, and modern web tooling.",
  ],
  [
    "2023 - 2024",
    "Data Scientist",
    "Applied machine learning models, statistical analysis, and predictive workflows on structured data.",
  ],
  [
    "2022",
    "Data Analyst",
    "Synthesized raw metrics into executive dashboards, business insights, and KPI reporting systems.",
  ],
];

const categories = ["All", "UI/UX", "Full Stack", "Front End", "Photography"];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    ["Work", "#work"],
    ["Experience", "#method"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-acid shadow-glow transition-transform duration-300 group-hover:scale-125" />
          VICKY
        </a>
        <div className="hidden items-center gap-7 text-sm text-milk/80 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="transition duration-200 hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {label}
            </a>
          ))}
        </div>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="hidden items-center gap-2 rounded-full border border-milk/20 px-4 py-2 text-sm font-medium text-milk transition-colors hover:border-acid hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid md:flex"
        >
          Let's Connect <ArrowUpRight size={16} />
        </motion.a>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-milk transition hover:border-acid hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid md:hidden"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 px-4 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2 py-4">
              {navLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="border border-white/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-milk/80 transition hover:border-acid hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-1 inline-flex items-center justify-center gap-2 bg-acid px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-ink transition hover:bg-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                onClick={() => setIsMenuOpen(false)}
              >
                Let's Connect <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 280, damping: 24 },
    },
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-milk"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,15,0.98)_0%,rgba(16,16,15,0.86)_45%,rgba(16,16,15,0.36)_100%)]" />
      <HeroPoster />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-7 pt-28 sm:px-6 lg:px-8 lg:pb-10">
        <motion.div
          className="max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-5 inline-flex items-center gap-2 border border-milk/15 bg-milk/5 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-milk/85 backdrop-blur"
          >
            <Sparkles size={14} className="text-acid" />
            UI/UX Designer & Web Developer
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="max-w-6xl text-balance text-[clamp(2.75rem,11vw,9.7rem)] font-black uppercase leading-[0.82] tracking-normal sm:text-[clamp(3.2rem,12vw,9.7rem)] sm:leading-[0.79]"
          >
            Designing digital experiences.
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-end"
          >
            <p className="max-w-xl text-base leading-7 text-milk/80 md:text-xl md:leading-8">
              I'm Vicky Galih Pamungkas, a UI/UX Designer and Web Developer
              passionate about crafting intuitive, high-impact digital products
              through user research, prototyping, and modern front-end
              technologies.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                href="https://drive.google.com/file/d/1M8Tze7CDaDFWaORncTuWwVnmo6Exxxtk/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-acid px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
              >
                Curriculum Vitae <ArrowUpRight size={17} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                href="#work"
                className="inline-flex items-center gap-2 border border-milk/20 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-milk transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                View Work <Play size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 grid border-y border-white/10 text-sm text-milk/75 sm:grid-cols-3"
        >
          {[
            "Design Systems & UI",
            "Landing Pages & Apps",
            "Prototypes & Code",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 border-white/10 py-4 sm:border-r sm:px-5 last:sm:border-r-0"
            >
              <CircleDot size={15} className="text-acid" />
              {item}
            </div>
          ))}
        </motion.div>
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
            <span>Web Development</span>
            <Zap size={22} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.type === activeCategory);

  return (
    <section id="work" className="bg-milk py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.24em] text-ink/70">
              Selected Projects
            </span>
            <h2 className="text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.86] tracking-normal">
              Work that feels like a magazine cover.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink/75">
            A curated collection of design and development projects solving real
            user challenges through strategic research, responsive design
            systems, and clean code.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-ink/15 pb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                  isActive
                    ? "text-ink font-black"
                    : "text-ink/65 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-acid -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.name}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: 0.35,
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                  delay: index * 0.05,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        },
                      }
                }
                className="group flex flex-col justify-between overflow-hidden border border-ink/15 bg-ink text-milk shadow-md transition-shadow hover:shadow-2xl"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-ink/40">
                    <img
                      src={project.image}
                      alt={`${project.name} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="project-index absolute left-4 top-4 select-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-milk/75">
                      <span className="text-acid">{project.type}</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="border border-milk/15 bg-milk/[0.06] px-2.5 py-1 text-[0.68rem] font-bold uppercase leading-none tracking-[0.14em] text-milk/80 transition-colors group-hover:border-acid/45 group-hover:text-acid"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <h3 className="break-words text-2xl font-black uppercase leading-tight sm:text-3xl">
                      {project.name}
                    </h3>

                    <p className="text-sm leading-relaxed text-milk/75">
                      {project.copy}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Explore ${project.name} (opens in a new tab)`}
                    className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-acid transition-all duration-200 hover:text-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function Method() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="method" className="bg-ink py-20 text-milk sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-acid">
            Career Journey
          </p>
          <h2 className="text-[clamp(2.2rem,6vw,5.6rem)] font-black uppercase leading-[0.88] tracking-normal">
            Light work, heavy presence.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-milk/75">
            A track record of blending creative design intuition with analytical
            rigor across front-end engineering, visual media, and data
            intelligence.
          </p>
        </div>

        <div className="grid gap-3">
          {methods.map(([period, role, desc], i) => (
            <motion.article
              key={role}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.08,
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              whileHover={{
                borderColor: "rgba(213, 255, 63, 0.6)",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                transition: { duration: 0.2 },
              }}
              className="grid gap-4 border border-white/12 bg-white/[0.035] p-5 transition-colors sm:grid-cols-[130px_1fr] sm:p-7"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-acid">
                {period}
              </span>
              <div>
                <h3 className="text-xl font-black uppercase leading-snug sm:text-2xl">
                  {role}
                </h3>
                <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-milk/75">
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-flame py-20 text-ink sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          <span className="mb-3 block text-xs font-black uppercase tracking-[0.24em] text-ink/75">
            Let's Collaborate
          </span>
          <h2 className="text-[clamp(2.6rem,8vw,7rem)] font-black uppercase leading-[0.84] tracking-normal">
            Make it memorable.
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-lg leading-8 text-ink/85">
            Have a project in mind or looking to hire? Elevate your digital
            product with modern UI/UX design and front-end craftsmanship.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              href="https://wa.me/6283144995745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-milk transition-colors hover:bg-milk hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              Contact via WhatsApp <MessageCircleMore size={18} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              href="mailto:vickypamungkas557@gmail.com"
              className="inline-flex items-center gap-2 border-2 border-ink px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              Email Me <Mail size={18} />
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-ink/20">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-ink/75 mb-3">
              Connect Across Platforms
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/vicky5571"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vicky on GitHub (opens in new tab)"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vicky on LinkedIn (opens in new tab)"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://www.figma.com/@vickygalih"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vicky on Figma (opens in new tab)"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <Figma size={16} /> Figma
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-10 text-milk/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Vicky Galih Pamungkas. All rights
          reserved.
        </p>
        <motion.a
          href="#top"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-acid transition-colors hover:text-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
        >
          Back to Top <ArrowUp size={14} />
        </motion.a>
      </div>
    </footer>
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
      <Footer />
    </main>
  );
}
