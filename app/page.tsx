"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Calendar,
  GraduationCap,
  Briefcase,
  Code,
  Smartphone,
  Database,
  Globe,
  Menu,
  X,
  ExternalLink,
  Play,
  Target,
  ChevronDown,
  Rocket,
  Heart,
  Check,
  Copy,
  Layers,
  Terminal,
  CheckCircle,
  Sun,
  Moon,
  Shield,
  Cpu,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────── Hooks ─────────────────────────── */

const useScrollReveal = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return [ref, visible] as const;
};

/* ─────────────────────── Reveal Wrapper ────────────────────── */

const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─────────────────── Theme Toggle Button ───────────────────── */

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-border/60 bg-muted/40 hover:bg-muted transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-blue-400" />
    </button>
  );
};

/* ───────────────── Flame Icon (Firebase) ───────────────────── */

const FlameIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

/* ═══════════════════════ MAIN COMPONENT ════════════════════════ */

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const titles = [
    "Flutter Developer",
    "Cross-Platform Engineer",
    "Mobile App Architect",
  ];

  // Rotating hero titles
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((p) => (p + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Navbar bg toggle — rAF-throttled boolean. Same-value setState bails out,
  // so this no longer re-renders the whole tree on every scroll frame.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);
        // Scroll-progress bar — mutate DOM directly, no React re-render.
        if (progressRef.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver — no per-scroll loop.
  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "projects", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, []);

  // Clipboard
  const copyText = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") { setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }
      else { setCopiedPhone(true); setTimeout(() => setCopiedPhone(false), 2000); }
    } catch { }
  };

  /* ─── Original Links (preserved from prior version) ─── */
  const LINKS = {
    github: "https://github.com/SahilLiotech",
    linkedin: "https://www.linkedin.com/in/sahil-pathan-a23a94249/",
    email: "pathansahil1800@gmail.com",
    resume: "https://drive.google.com/file/d/1_1y655pInBSfzZJCrhiwy7D8Zr9Tafbj/view?usp=sharing",
    resumeAlt: "https://drive.google.com/file/d/1i5T4c5mx1b203QcafTk_lNTk-K8SoJhc/view?usp=sharing",
  };

  /* ─── Data from resume ─── */

  const skillCategories = [
    { name: "Mobile Development", icon: Smartphone, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-500/10", skills: ["Flutter (Dart)", "Widget Lifecycle", "Custom Animations", "Responsive UI", "Platform Channels"] },
    { name: "State Management", icon: Layers, color: "text-violet-500 dark:text-violet-400", bg: "bg-violet-500/10", skills: ["BLoC / Cubit", "Riverpod", "Provider", "GetX"] },
    { name: "Architecture", icon: Cpu, color: "text-cyan-500 dark:text-cyan-400", bg: "bg-cyan-500/10", skills: ["MVC", "MVVM", "Clean Architecture", "Repository Pattern", "Dependency Injection"] },
    { name: "API & Payments", icon: Globe, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10", skills: ["RESTful APIs", "HTTP & DIO", "Razorpay Gateway", "JSON Serialization"] },
    { name: "Firebase", icon: FlameIcon, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-500/10", skills: ["Authentication", "Firestore", "Cloud Storage", "Crashlytics", "Analytics"] },
    { name: "Databases", icon: Database, color: "text-rose-500 dark:text-rose-400", bg: "bg-rose-500/10", skills: ["Hive (NoSQL)", "SQLite", "Shared Preferences"] },
    { name: "Dev Tools", icon: Terminal, color: "text-indigo-500 dark:text-indigo-400", bg: "bg-indigo-500/10", skills: ["Git & GitHub", "VS Code", "Android Studio", "Postman", "Flutter DevTools"] },
    { name: "Testing & QA", icon: Shield, color: "text-teal-500 dark:text-teal-400", bg: "bg-teal-500/10", skills: ["Unit Testing", "Widget Testing", "Debugging", "Crash Analysis"] },
  ];

  const experiences = [
    {
      title: "Flutter Developer",
      company: "Tenacious Techies",
      period: "Oct 2024 – Present",
      type: "Full-time",
      points: [
        "Owned architecture planning for the FoodChow Ordering App using MVC, ensuring clean separation, scalable structure, and multi-modal ordering workflows.",
        "Engineered a multi-method ordering module supporting takeaway, dine-in, and home delivery flows with complex state transitions and address management.",
        "Integrated Razorpay Payment Gateway end-to-end secure checkout, payment callbacks, failure handling, and order confirmation flows.",
        "Developed and maintained FoodChow KDS with real-time order display enhancements that improved kitchen throughput and reduced communication errors.",
        "Maintained and scaled FoodChow POS with Provider state management and HTTP-based API integrations across billing, table management, and reporting.",
        "Designed offline-first data layer using Hive for session persistence and cart caching, ensuring zero-downtime during network disruptions.",
        "Collaborated cross-functionally to translate Figma mockups into pixel-perfect, responsive Flutter interfaces for tablet and mobile.",
        "Improved stability through systematic debugging using Flutter DevTools and Firebase Crashlytics across production deployments.",
      ],
    },
    {
      title: "Flutter Intern",
      company: "Tenacious Techies",
      period: "Jun 2024 – Sep 2024",
      type: "Internship",
      points: [
        "Contributed to production on FoodChow POS and Customer App within the first two weeks, delivering UI enhancements and module-level features.",
        "Developed and integrated API modules for order processing and data synchronization, improving backend communication reliability.",
        "Implemented Provider for state management across multiple screens for predictable and maintainable data flow.",
        "Introduced Hive-based local storage for critical data caching, reducing dependency on network availability.",
      ],
    },
  ];

  const projects = [
    {
      title: "FoodChow Ordering App",
      description: "Production-ready restaurant ordering application with multi-method ordering (takeaway, dine-in, home delivery), Razorpay payment gateway, and full customer journey coverage.",
      tech: ["Flutter", "Dart", "MVVM", "Riverpod", "Razorpay", "REST APIs"],
      highlights: ["MVC architecture for scalable modules", "Unified takeaway, dine-in & delivery flows", "Razorpay post-payment verification", "Address & profile management"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow&pcampaignid=web_share",
      accent: "from-blue-500 to-indigo-500",
      accentLight: "blue",
    },
    {
      title: "FoodChow POS",
      description: "Production Point-of-Sale system handling real-time restaurant orders, table mapping, billing, offline caching, and comprehensive reporting across live deployments.",
      tech: ["Flutter", "Dart", "MVC", "Provider", "Hive", "HTTP"],
      highlights: ["Offline-capable Hive data layer", "Provider session management", "Structured HTTP client with auth tokens", "20+ backend API integrations"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.pos&pcampaignid=web_share",
      accent: "from-purple-500 to-pink-500",
      accentLight: "purple",
    },
    {
      title: "FoodChow KDS",
      description: "Kitchen Display System redesigned for high-volume restaurant environments, optimized for readability on large tablets with real-time order tracking and priority flagging.",
      tech: ["Flutter", "Dart", "GetX", "REST APIs"],
      highlights: ["Real-time order status tracking", "Multi-station order filtering", "Large tablet interface overhaul", "Firebase-backed order sync"],
      link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.kds&pcampaignid=web_share",
      accent: "from-cyan-500 to-teal-500",
      accentLight: "cyan",
    },
  ];

  const stats = [
    { value: "2+", label: "Years Experience", icon: Briefcase },
    { value: "3", label: "Production Apps", icon: Rocket },
    { value: "4", label: "State Paradigms", icon: Layers },
    { value: "500+", label: "Daily Transactions", icon: Target },
  ];

  const navItems = ["home", "about", "skills", "experience", "projects", "education", "contact"];

  return (
    <div className="min-h-screen bg-background text-foreground grain">

      {/* ═══════════════════ SCROLL PROGRESS ══════════════════════ */}
      <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-transparent pointer-events-none">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 will-change-transform"
        />
      </div>

      {/* ═══════════════════ AMBIENT BACKGROUND ═══════════════════ */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.06] dark:bg-blue-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.06] dark:bg-purple-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/[0.04] dark:bg-cyan-500/[0.02] rounded-full blur-[150px]" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* ═══════════════════════ NAVBAR ═══════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled || mobileMenuOpen
          ? "py-3 glass shadow-sm shadow-black/[0.03] dark:shadow-black/[0.1]"
          : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
              SP
            </div>
            <span className="font-semibold text-sm text-foreground hidden sm:inline">
              Sahil Pathan
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 p-1 rounded-2xl bg-muted/50 border border-border/40">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${activeSection === item
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl border border-border/60 bg-muted/40 hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
              <Github className="w-4 h-4" />
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl border border-border/60 bg-muted/40 hover:bg-muted transition-all text-muted-foreground hover:text-foreground">
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border/60 bg-muted/40 text-muted-foreground"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-5 py-3 space-y-1 border-t border-border/40 mt-3">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === item ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <div className="flex gap-2 pt-2 px-4">
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground ml-4">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════ HERO ════════════════════════════ */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Right — Profile (renders first on mobile, right on desktop) */}
            <Reveal delay={300} className="w-full flex justify-center order-first lg:order-last">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl scale-110" />
                {/* Image container */}
                <div className="relative">
                  {/* Rotating conic gradient ring */}
                  <div
                    className="absolute -inset-[5px] rounded-full animate-[spin_8s_linear_infinite] opacity-80 blur-[1px]"
                    style={{ backgroundImage: "conic-gradient(from 0deg, #3b82f6, #a855f7, #22d3ee, #3b82f6)" }}
                  />
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-[3px] border-background overflow-hidden bg-muted shadow-2xl">
                    <img
                      src="/profile-image.jpg"
                      alt="Sahil Pathan"
                      width={640}
                      height={640}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Floating badges */}
                  <div className="absolute -right-1 sm:-right-2 top-8 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full surface-card text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-1.5 animate-in" style={{ animationDelay: "0.8s" }}>
                    <Code className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" /> Flutter
                  </div>
                  <div className="absolute -left-1 sm:-left-4 bottom-12 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full surface-card text-[10px] sm:text-xs font-medium shadow-lg flex items-center gap-1.5 animate-in" style={{ animationDelay: "1s" }}>
                    <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" /> Firebase
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Left (renders last on mobile, left on desktop) */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start order-last lg:order-first w-full">


              <Reveal delay={100}>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                  <span className="text-foreground">Hi, I'm </span>
                  <span className="text-gradient">Sahil Pathan</span>
                </h1>
              </Reveal>

              <Reveal delay={200} className="w-full">
                <div className="relative h-8 sm:h-9 flex items-center justify-center lg:justify-start w-full">
                  {titles.map((t, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 flex items-center justify-center lg:justify-start text-base sm:text-xl md:text-2xl font-semibold text-muted-foreground transition-all duration-700 ease-in-out ${i === titleIndex
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                      <span>{t}</span>

                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-justify">
                  Results-driven Flutter Developer with 2+ years of experience architecting and shipping production-grade mobile applications. Specialized in POS, KDS, and ordering systems with clean architecture, payment integration, and offline-first design.
                </p>
              </Reveal>

              <Reveal delay={400} className="w-full flex justify-center lg:justify-start">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button
                    onClick={() => scrollTo("contact")}
                    className="rounded-full px-6 h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-[1.02] group w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let's Connect
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-6 h-11 border-border/60 bg-background/50 hover:bg-muted font-medium transition-all hover:scale-[1.02] w-full sm:w-auto"
                    asChild
                  >
                    <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Surat, Gujarat</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {LINKS.email}</span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hidden lg:flex justify-center mt-16">
            <button onClick={() => scrollTo("about")} className="text-muted-foreground/50 hover:text-muted-foreground transition-colors animate-bounce">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ABOUT ════════════════════════════ */}
      <section id="about" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2">About</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Professional Journey</h2>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Narrative */}
            <div className="lg:col-span-3 space-y-6">
              <Reveal>
                <p className="text-muted-foreground leading-relaxed text-left sm:text-justify">
                  I'm a dedicated Flutter Developer with a proven track record of designing and architecting mobile systems from the ground up. Working in the restaurant technology space, I've managed multiple production products delivering POS systems, real-time Kitchen Display Systems, and client-facing ordering applications that handle 500+ daily transactions.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-muted-foreground leading-relaxed text-left sm:text-justify">
                  My expertise spans MVC/MVVM architectures, reactive state management (BLoC, Riverpod, Provider, GetX), end-to-end Razorpay payment integration, and offline-first data layers using Hive. I prioritize clean, scalable code design that ensures high availability a critical requirement in fast-paced commercial environments.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-muted/30">
                  <h3 className="font-semibold text-sm flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-500" /> Objective
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left sm:text-justify">
                    To leverage my expertise in Flutter development to build high-performance, scalable, and user-friendly mobile applications. Seeking opportunities to contribute innovative solutions while continuously enhancing my skills in clean architecture, state management, and payment integrations.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card hover:border-border transition-all group h-full">
                    <s.icon className="w-5 h-5 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SKILLS ═══════════════════════════ */}
      <section id="skills" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-500 mb-2">Skills</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Core Competencies</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={i} delay={i * 60}>
                  <div className="p-4 sm:p-5 rounded-2xl border border-border/60 bg-card hover:border-border hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/[0.08] transition-all duration-300 group h-full">
                    <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-3">{cat.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, j) => (
                        <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EXPERIENCE ═══════════════════════════ */}
      <section id="experience" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-cyan-500 mb-2">Experience</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Professional Timeline</h2>
          </Reveal>

          <div className="max-w-4xl mx-auto relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-border hidden sm:block" />

            {experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="relative sm:pl-10">
                  {/* Dot */}
                  <div className="absolute left-0 top-2 w-[23px] h-[23px] rounded-full border-[3px] border-blue-500 bg-background hidden sm:flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>

                  <div className="p-5 sm:p-8 rounded-2xl border border-border/60 border-l-4 border-l-blue-500 sm:border-l-border/60 bg-card hover:border-border hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/[0.08] transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">
                          {exp.type}
                        </span>
                        <h3 className="text-xl font-bold mt-2">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          <span className="font-medium text-foreground">{exp.company}</span> · Surat, Gujarat
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full w-fit">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </div>
                    </div>

                    {/* Points */}
                    <ul className="space-y-3">
                      {exp.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed text-left sm:text-justify">
                          <span className="mt-2 w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═════════════════════════════ */}
      <section id="projects" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2">Projects</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Production Applications</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col h-full p-5 sm:p-6 rounded-2xl border border-border/60 bg-card hover:border-border hover:shadow-xl hover:shadow-black/[0.04] dark:hover:shadow-black/[0.1] transition-all duration-400 group">
                  {/* Top gradient bar */}
                  <div className={`w-full h-1 rounded-full bg-gradient-to-r ${p.accent} mb-5 opacity-60 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <Badge variant="secondary" className="text-[10px] font-medium shrink-0 gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Live
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow text-left sm:text-justify">
                    {p.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map((t, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/40 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-6">
                    {p.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button size="sm" className={`w-full rounded-xl bg-gradient-to-r ${p.accent} text-white hover:opacity-90 transition-all font-medium`} asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      View on Play Store
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ EDUCATION ═════════════════════════════ */}
      <section id="education" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-purple-500 mb-2">Education</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Academic Background</h2>
          </Reveal>

          <Reveal className="max-w-3xl mx-auto">
            <div className="p-5 sm:p-8 rounded-2xl border border-border/60 bg-card hover:border-border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/10">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Bachelor of Computer Applications (BCA)</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">Shree G.K. & C.K. Bosmia College, Jetpur</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400">✓ Completed</Badge>
                    <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-600 dark:text-purple-400">★ Distinction</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                2021 – 2024
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ══════════════════════════════ */}
      <section id="contact" className="py-16 sm:py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              Open for opportunities, freelance projects, and engineering discussions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Contact cards */}
            <div className="space-y-3">
              {/* Email */}
              <Reveal delay={50}>
                <div className="p-4 rounded-2xl border border-border/60 bg-card hover:border-border transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Mail className="w-4.5 h-4.5 text-blue-500" /></div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
                      <p className="text-sm font-medium select-all">{LINKS.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => copyText(LINKS.email, "email")} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => window.open(`mailto:${LINKS.email}?subject=Portfolio Inquiry&body=Hi Sahil,%0D%0A%0D%0AI found your portfolio and would like to discuss...`)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Phone */}
              <Reveal delay={100}>
                <div className="p-4 rounded-2xl border border-border/60 bg-card hover:border-border transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Phone className="w-4.5 h-4.5 text-purple-500" /></div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium select-all">+91-7874443558</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => copyText("+91-7874443558", "phone")} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => window.open("tel:+917874443558")} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* LinkedIn */}
              <Reveal delay={150}>
                <div className="p-4 rounded-2xl border border-border/60 bg-card hover:border-border transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Linkedin className="w-4.5 h-4.5 text-indigo-500" /></div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                      <p className="text-sm font-medium">Connect with me</p>
                    </div>
                  </div>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Reveal>

              {/* GitHub */}
              <Reveal delay={200}>
                <div className="p-4 rounded-2xl border border-border/60 bg-card hover:border-border transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-500/10 flex items-center justify-center"><Github className="w-4.5 h-4.5" /></div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">GitHub</p>
                      <p className="text-sm font-medium">View my repositories</p>
                    </div>
                  </div>
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* CTA Panel */}
            <Reveal delay={150} className="h-full">
              <div className="p-5 sm:p-8 rounded-2xl border border-border/60 bg-card h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to collaborate?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-left sm:text-justify">
                    Whether you need a new mobile app or want to improve an existing one, I'm here to help bring your vision to life with clean, production-ready Flutter code.
                  </p>
                </div>
                <div className="space-y-3 mt-8">
                  <Button
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all group"
                    onClick={() => window.open(`mailto:${LINKS.email}?subject=Project Collaboration&body=Hi Sahil,%0D%0A%0D%0AI have a project idea and would like to collaborate...`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let's Talk
                    <ExternalLink className="w-3.5 h-3.5 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl border-border/60 font-medium transition-all" asChild>
                    <a href={LINKS.resumeAlt} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════════════════ */}
      <footer className="py-10 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">SP</div>
            <span className="text-sm font-medium">Pathan Sahil A.</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> and lots of ☕
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
