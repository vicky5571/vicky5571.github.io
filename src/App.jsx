import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  ArrowUpRight,
  CircleDot,
  Menu,
  Play,
  Sparkles,
  X,
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
    image: "/img/stealthforce.webp",
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
    image: "/img/redefined-gaming.webp",
    link: "https://redefined-gaming.vercel.app/",
    stack: ["React", "Motion", "Tailwind"],
    copy: "High-octane gaming landing experience engineered with fluid animation sequences and interactive micro-interactions.",
  },
  {
    name: "Dyno Graphy",
    type: "Front End",
    year: "2024",
    tone: "acid",
    image: "/img/dyno-graphy.webp",
    link: "https://portfolio-dynography.vercel.app/",
    stack: ["Tailwind", "PostCSS", "JavaScript"],
    copy: "Photography portfolio showcase crafted with custom Tailwind design tokens and fluid responsive typography.",
  },
  {
    name: "SEO Project Tracker",
    type: "Full Stack",
    year: "2024",
    tone: "acid",
    image: "/img/seo-project-tracker.webp",
    link: "https://nextjs-seo-project-tracker.vercel.app/",
    stack: ["Next.js", "Supabase", "Typescript"],
    copy: "Keyword analytics dashboard with automated ranking tracking and real-time Supabase database sync.",
  },
  {
    name: "Tomato - Food Ordering",
    type: "UI/UX",
    year: "2024",
    tone: "cyan",
    image: "/img/tomato.webp",
    link: "https://www.figma.com/design/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=0-1&t=gE2WA9YVxasitwte-1",
    stack: ["Figma", "Prototype", "User Research"],
    copy: "User-centered mobile app flow designed to simplify checkout friction and enhance food discovery.",
  },
  {
    name: "NIKE - Shoes Store",
    type: "UI/UX",
    year: "2024",
    tone: "acid",
    image: "/img/nike.webp",
    link: "https://www.figma.com/proto/1trUpyy1LO4XNU1sUOHx9i/Tomato---Fast-Food-Mobile-App-Design?node-id=1170-56&t=DOxDIfp3AD9HAmod-1",
    stack: ["Figma", "Landing Page", "Design System"],
    copy: "Editorial e-commerce concept focusing on bold brand imagery, product hierarchy, and immersive storytelling.",
  },
  {
    name: "Library Photo Session",
    type: "Photography",
    year: "2025",
    tone: "flame",
    image: "/img/photo-session.webp",
    link: "https://www.instagram.com/kkn.hargomulyo2025?igsh=MXI0Mm56NWpla3ozaA==",
    stack: ["Photography", "Lightroom", "Visual Direction"],
    copy: "Editorial portraiture and visual storytelling with custom color grading and atmospheric lighting.",
  },
];

const expCategories = [
  "All",
  "Tech & Dev",
  "Corporate & IT",
  "Creative & Photo",
  "Data & Analytics",
];

const methods = [
  [
    "2026",
    "IT Capability Building\nPT Indosat Tbk",
    "Spearheaded technical capability development, IT talent enablement, and digital training programs to enhance organizational efficiency.",
    "Corporate & IT",
  ],
  [
    "2025",
    "Wedding & Event Photographer",
    "Creative visual direction, candid storytelling, and color grading for ceremonies and cultural events.",
    "Creative & Photo",
  ],
  [
    "2025",
    "Disney Magical Runway Solo Paragon",
    "Backstage and runway fashion documentation during regional promotional showcase.",
    "Creative & Photo",
  ],
  [
    "2025",
    "PHP Web Developer",
    "Built modular backend functionality, managed relational databases, and optimized query pipelines.",
    "Tech & Dev",
  ],
  [
    "2024",
    "Front End Developer",
    "Engineered performant, responsive web interfaces with React, Tailwind CSS, and modern web tooling.",
    "Tech & Dev",
  ],
  [
    "2023 - 2024",
    "Data Scientist",
    "Applied machine learning models, statistical analysis, and predictive workflows on structured data.",
    "Data & Analytics",
  ],
  [
    "2022",
    "Data Analyst",
    "Synthesized raw metrics into executive dashboards, business insights, and KPI reporting systems.",
    "Data & Analytics",
  ],
];

const categories = ["All", "UI/UX", "Full Stack", "Front End", "Photography"];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();

  // Spring-smoothed scroll progress with gentle damping for a wide friction zone
  const smoothY = useSpring(scrollY, {
    stiffness: 120,
    damping: 24,
    mass: 0.15,
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });

  useMotionValueEvent(smoothY, "change", (latest) => {
    setIsScrolled(latest > 350);
  });

  // Mid-viewport & bottom-reach scroll waypoint detector
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Bottom of page reached -> immediately activate Contact
      if (scrollPosition + windowHeight >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // 2. Middle-of-viewport focal line (45% from top)
      const focalLine = scrollPosition + windowHeight * 0.45;

      const sections = [
        { id: "contact", el: document.getElementById("contact") },
        { id: "method", el: document.getElementById("method") },
        { id: "work", el: document.getElementById("work") },
      ];

      for (const section of sections) {
        if (section.el && focalLine >= section.el.offsetTop) {
          setActiveSection(section.id);
          return;
        }
      }

      // In Hero / Top section
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Continuous frame-by-frame transforms driven by an expanded friction zone [0, 620px]
  const navWidth = useTransform(smoothY, [0, 620], ["100%", "92%"]);
  const navMaxWidth = useTransform(smoothY, [0, 620], ["100%", "56rem"]);
  const navY = useTransform(smoothY, [0, 620], [0, 14]);
  const navRadius = useTransform(smoothY, [0, 620], ["0px", "9999px"]);
  const navPaddingY = useTransform(smoothY, [0, 620], ["14px", "10px"]);
  const navPaddingX = useTransform(smoothY, [0, 620], ["0px", "16px"]);

  // Inner nav container aligns with Hero max-w-7xl at top, and fills 100% of island on scroll
  const innerMaxWidth = useTransform(smoothY, [0, 620], ["80rem", "100%"]);
  const innerPaddingX = useTransform(smoothY, [0, 620], ["24px", "0px"]);

  const navLinks = [
    ["Work", "#work", "work"],
    ["Experience", "#method", "method"],
    ["Contact", "#contact", "contact"],
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        style={{
          width: navWidth,
          maxWidth: navMaxWidth,
          y: navY,
          borderRadius: navRadius,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
        }}
        className={`relative pointer-events-auto border backdrop-blur-2xl ${
          isScrolled
            ? "border-white/20 bg-ink/90 shadow-[0_16px_40px_rgba(0,0,0,0.7)]"
            : "border-white/10 bg-ink/80 border-t-0 border-x-0"
        }`}
      >
        <motion.nav
          style={{
            maxWidth: innerMaxWidth,
            paddingLeft: innerPaddingX,
            paddingRight: innerPaddingX,
          }}
          className="mx-auto flex w-full items-center justify-between"
        >
          <a
            href="#top"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.28em] text-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-acid shadow-glow transition-transform duration-300 group-hover:scale-125" />
            VICKY
          </a>

          {/* Desktop Nav Links with Sliding Active Pill */}
          <div className="hidden items-center gap-1.5 md:flex">
            {navLinks.map(([label, href, sectionId]) => {
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  className={`relative px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                    isActive ? "text-acid" : "text-milk/75 hover:text-milk"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] border border-acid/40 shadow-glow"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`inline-flex items-center gap-2 rounded-full border text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                isScrolled
                  ? "bg-acid px-3.5 py-1.5 text-ink hover:bg-milk border-transparent"
                  : "border-milk/20 px-4 py-2 text-milk hover:border-acid hover:text-acid"
              }`}
            >
              Let's Connect <ArrowUpRight size={14} />
            </motion.a>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-milk transition hover:border-acid hover:text-acid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid md:hidden"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.nav>

        {/* Dynamic Island Scroll Progress Indicator Bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-6 right-6 h-[2px] origin-left rounded-full bg-acid/80"
        />

        {/* Mobile Menu Drawer with Active State */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-ink/95 px-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="grid gap-2 py-4">
                {navLinks.map(([label, href, sectionId]) => {
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={href}
                      href={href}
                      className={`border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                        isActive
                          ? "border-acid bg-acid/10 text-acid font-black"
                          : "border-white/10 text-milk/80 hover:border-acid hover:text-acid"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  className="mt-1 inline-flex items-center justify-center gap-2 bg-acid px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:bg-milk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Let's Connect <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
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
  const [activeExpCategory, setActiveExpCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filteredMethods =
    activeExpCategory === "All"
      ? methods
      : methods.filter(([, , , cat]) => cat === activeExpCategory);

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

          {/* Brutalist Hard-Shadow Active Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {expCategories.map((category) => {
              const isActive = activeExpCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveExpCategory(category)}
                  className={`relative px-3.5 py-2 text-xs font-black uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                    isActive
                      ? "text-ink font-black"
                      : "border border-white/15 bg-white/[0.02] text-milk/70 hover:border-acid/60 hover:text-milk"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExpPill"
                      className="absolute inset-0 -z-10 border border-ink bg-acid shadow-[3px_3px_0px_#f5f1e8]"
                      transition={{
                        type: "spring",
                        stiffness: 480,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filteredMethods.map(([period, role, desc, cat], i) => (
              <motion.article
                layout
                key={role}
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 26,
                }}
                whileHover={{
                  borderColor: "rgba(213, 255, 63, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  transition: { duration: 0.2 },
                }}
                className="grid gap-4 border border-white/12 bg-white/[0.035] p-5 transition-colors sm:grid-cols-[130px_1fr] sm:p-7"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-acid">
                    {period}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-milk/40">
                    {cat}
                  </span>
                </div>
                <div>
                  <h3 className="whitespace-pre-line text-xl font-black uppercase leading-snug sm:text-2xl">
                    {role}
                  </h3>
                  <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-milk/75">
                    {desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
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
      <Work />
      <Method />
      <Contact />
      <Footer />
    </main>
  );
}
