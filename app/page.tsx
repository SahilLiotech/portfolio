import { ArrowUpRight, ArrowUp, Github, Linkedin } from "lucide-react";
import { SiteHeader } from "./site-header";
import { CopyButton } from "./copy-button";
import { ShotCarousel, type Shot } from "./shot-carousel";
import { RevealOnScroll } from "./reveal-on-scroll";
import { LINKS, NAV, SITE_URL } from "./site";

/* ─────────────────────────── Data ──────────────────────────── */

// Every number here can be checked: dates against LinkedIn, downloads on Google Play.
const STATS = [
  { value: "2+", label: "Years of Flutter in production", short: "Years of Flutter" },
  { value: "3", label: "Apps I work on, live on Google Play", short: "Live apps" },
  { value: "10K+", label: "Downloads of the ordering app", short: "Downloads" },
];

const EXPERIENCE = [
  {
    title: "Flutter Developer",
    company: "Tenacious Techies",
    type: "Full-time",
    period: "Oct 2024 – Present",
    points: [
      "Planned the MVC structure of the FoodChow Ordering app and built its ordering module, which runs takeaway, dine-in and delivery through one flow.",
      "Integrated Razorpay end to end: checkout, payment callbacks, failure handling, and verifying the payment before the order is confirmed.",
      "Added real-time order status, priority flags and per-station filtering to FoodChow KDS, and reworked its layout for large kitchen tablets.",
      "Maintain billing, table management and reporting in FoodChow POS, built on Provider and 20+ backend APIs.",
      "Built an offline layer on Hive for sessions and the cart, so staff don't lose an order when the network drops.",
      "Turn Figma designs into Flutter screens for phones and tablets, and track down crashes with Flutter DevTools and Firebase Crashlytics.",
    ],
  },
  {
    title: "Flutter Intern",
    company: "Tenacious Techies",
    type: "Internship",
    period: "Jun 2024 – Sep 2024",
    points: [
      "Shipped changes to production in FoodChow POS and the customer app within my first two weeks.",
      "Wrote API modules for order processing and data sync.",
      "Moved screens to Provider for state, and added Hive caching for data the app needs offline.",
    ],
  },
];

const PROJECTS: {
  title: string;
  kind: string;
  downloads: string;
  description: string;
  myPart: string[];
  stack: string[];
  link: string;
  landscape?: boolean;
  shots: Shot[];
}[] = [
  {
    title: "FoodChow Ordering",
    kind: "Customer app",
    downloads: "10K+ downloads",
    description:
      "Customers use it to order takeaway, dine-in or delivery from restaurants on FoodChow, and pay with Razorpay.",
    myPart: [
      "Planned the MVC module structure",
      "One ordering flow for takeaway, dine-in and delivery",
      "Razorpay checkout with post-payment verification",
      "Address and profile management",
    ],
    stack: ["Flutter", "MVC", "Razorpay", "REST"],
    link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow",
    shots: [
      { src: "/projects/ordering/1.webp", alt: "Choosing takeaway, dine-in or delivery and browsing nearby restaurants", width: 407, height: 880 },
      { src: "/projects/ordering/2.webp", alt: "Restaurant menu with filters and add-to-cart", width: 407, height: 880 },
      { src: "/projects/ordering/3.webp", alt: "Live order tracking from placed to delivered", width: 407, height: 880 },
      { src: "/projects/ordering/4.webp", alt: "Order history with per-order details", width: 407, height: 880 },
    ],
  },
  {
    title: "FoodChow POS",
    kind: "Point of sale",
    downloads: "1K+ downloads",
    description:
      "Restaurant staff use it for billing, tables, online orders and end-of-day reports. It keeps working when the internet doesn't.",
    myPart: [
      "Billing, tables and reports on Provider",
      "Offline storage and cart cache on Hive",
      "HTTP client with auth token handling",
      "20+ backend API integrations",
    ],
    stack: ["Flutter", "Provider", "Hive", "REST"],
    link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.pos",
    shots: [
      { src: "/projects/pos/1.webp", alt: "Phone billing screen for takeaway, delivery and dine-in orders", width: 405, height: 880 },
      { src: "/projects/pos/2.webp", alt: "Table layout showing available, reserved and cooking tables", width: 405, height: 880 },
      { src: "/projects/pos/3.webp", alt: "Online orders to accept or decline, with paid and unpaid status", width: 405, height: 880 },
      { src: "/projects/pos/4.webp", alt: "Operational reports: sales by item, category, hour and more", width: 405, height: 880 },
    ],
  },
  {
    title: "FoodChow KDS",
    kind: "Kitchen display",
    downloads: "100+ downloads",
    description: "Cooks see incoming orders on a tablet and mark each item as it's prepared.",
    myPart: [
      "Real-time order status tracking",
      "Priority flags for urgent orders",
      "Filtering orders by kitchen station",
      "Layout rework for large tablets",
    ],
    stack: ["Flutter", "GetX", "REST"],
    link: "https://play.google.com/store/apps/details?id=com.tenacioustechies.foodchow.kds",
    landscape: true,
    shots: [
      { src: "/projects/kds/1.webp", alt: "Kitchen orders grouped by status, with pending items in red", width: 1200, height: 675 },
      { src: "/projects/kds/2.webp", alt: "Served orders tab on a large tablet", width: 1200, height: 675 },
      { src: "/projects/kds/3.webp", alt: "Cancelled orders tab with struck-through items", width: 1200, height: 675 },
    ],
  },
];

// Each item names where it was done, so it reads as evidence rather than a sales pitch.
const CAN_BUILD = [
  {
    title: "Apps from Figma to release",
    text: "Phone and tablet Flutter apps built from Figma designs, taken all the way to a Google Play release.",
    proof: "All three FoodChow apps",
  },
  {
    title: "Payments",
    text: "Razorpay checkout with payment callbacks, failure handling and verification before an order is confirmed.",
    proof: "FoodChow Ordering",
  },
  {
    title: "Apps that work offline",
    text: "Local storage on Hive, so carts, sessions and orders survive a dropped connection.",
    proof: "FoodChow POS",
  },
  {
    title: "REST API integration",
    text: "Connecting Flutter to a backend: auth tokens, error handling, and syncing data between devices.",
    proof: "20+ APIs in FoodChow POS",
  },
  {
    title: "Live dashboards on tablets",
    text: "Screens that update as orders come in and stay readable on a large tablet across a busy kitchen.",
    proof: "FoodChow KDS",
  },
  {
    title: "Fixing existing apps",
    text: "Tracking down crashes and bugs in a running app with Flutter DevTools and Firebase Crashlytics.",
    proof: "FoodChow POS and Ordering",
  },
];

// Used every day in the production apps.
const CORE_SKILLS = ["Flutter", "Dart", "Provider", "GetX", "Hive", "Firebase", "REST APIs", "Razorpay"];

// Learned on my own time; not used at work yet.
const SELF_TAUGHT = ["BLoC / Cubit", "Riverpod", "MVVM", "Clean Architecture"];

const SKILLS = [
  { name: "UI", items: ["Responsive layouts for phone and tablet", "Figma to Flutter"] },
  { name: "Architecture", items: ["MVC", "Repository pattern", "Offline-first data"] },
  { name: "Networking", items: ["HTTP", "Dio", "JSON serialization"] },
  { name: "Data & Firebase", items: ["SQLite", "Shared Preferences", "Firestore", "Firebase Auth", "Crashlytics"] },
  { name: "Tools", items: ["Git & GitHub", "Android Studio", "Flutter DevTools", "Postman"] },
];

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sahil Pathan",
  jobTitle: "Flutter Developer",
  url: SITE_URL,
  email: `mailto:${LINKS.email}`,
  worksFor: { "@type": "Organization", name: "Tenacious Techies" },
  address: { "@type": "PostalAddress", addressLocality: "Surat", addressCountry: "IN" },
  sameAs: [LINKS.github, LINKS.linkedin],
};

/* ───────────────────────── Pieces ──────────────────────────── */

const container = "mx-auto w-full max-w-5xl px-5 sm:px-8";

// Trailing action in contact rows: one footprint for copy buttons and link arrows,
// so every row's right edge lines up.
const rowAction =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground group-hover:border-foreground/30 group-hover:text-foreground";

// Secondary actions share the primary button's height.
const outlineButton =
  "inline-flex h-12 items-center justify-center gap-1.5 rounded-md border px-5 font-medium transition-colors hover:bg-secondary";
const iconButton =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

const Section = ({
  id,
  title,
  intro,
  tinted = false,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tinted?: boolean;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    aria-labelledby={`${id}-title`}
    className={`border-t py-16 sm:py-24 ${tinted ? "bg-secondary" : ""}`}
  >
    <div className={container}>
      <div className="reveal mb-10 max-w-[40rem] sm:mb-14">
        <h2 id={`${id}-title`} className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </div>
  </section>
);

/* ═══════════════════════ PAGE ════════════════════════════════ */

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-md focus:border focus:bg-background focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <SiteHeader />
      <RevealOnScroll />

      <main id="main" tabIndex={-1} className="outline-none">
        {/* ═══════════════════════ HERO ════════════════════════════ */}
        <section id="home" className="pt-10 sm:pt-20">
          <div className={`${container} grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-14 lg:grid-cols-[minmax(0,1fr)_20rem]`}>
            {/* Centered on phones and small tablets; left-aligned beside the photo from md up */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              {/* Phones get a small photo here; the large one sits beside the text from md up */}
              <img
                src="/profile-image.jpg"
                alt="Portrait of Sahil Pathan"
                width={640}
                height={640}
                loading="eager"
                decoding="async"
                className="mb-6 h-24 w-24 rounded-full border object-cover object-top md:hidden"
              />
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground">
                Flutter developer · Surat, India
              </p>
              <h1 className="mt-7 font-display text-[clamp(3.5rem,17vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.025em] sm:mt-8 sm:text-8xl lg:text-[7rem]">
                Sahil
                <br />
                Pathan
              </h1>
              <p className="mt-6 max-w-[26rem] text-pretty text-xl leading-snug sm:mt-8 sm:max-w-[32rem] sm:text-2xl">
                I build and maintain the Flutter apps behind <span className="text-primary">FoodChow</span>: a customer
                ordering app, a restaurant POS and a kitchen display.
              </p>
              <p className="mt-4 max-w-[30rem] text-balance leading-relaxed text-muted-foreground md:max-w-[34rem]">
                At Tenacious Techies since June 2024, first as an intern and now as a developer. Looking for my next
                full-time Flutter role.
              </p>
              <div className="mt-8 flex w-full max-w-[26rem] flex-col gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row">
                <a
                  href={`mailto:${LINKS.email}?subject=Flutter%20role`}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.96]"
                >
                  Email me
                </a>
                <div className="flex gap-3">
                  <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" className={`${outlineButton} flex-1 sm:flex-none`}>
                    Resume
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={iconButton}>
                    <Github aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={iconButton}>
                    <Linkedin aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </div>

            <figure className="hidden overflow-hidden rounded-lg border bg-card md:block">
              <img
                src="/profile-image.jpg"
                alt="Portrait of Sahil Pathan"
                width={640}
                height={640}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="grid gap-1 border-t p-4">
                <span className="text-sm text-muted-foreground">Currently</span>
                <span className="text-sm font-medium">Flutter Developer at Tenacious Techies</span>
                <span className="text-sm text-muted-foreground">Surat, India · UTC+5:30</span>
              </figcaption>
            </figure>
          </div>

          <div className={`${container} mt-14 sm:mt-24`}>
            <dl className="grid grid-cols-3 border-t">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-2 py-6 text-center sm:py-8 md:items-start md:px-0 md:text-left ${i > 0 ? "border-l md:pl-8" : "md:pr-4"}`}
                >
                  <dt className="order-2 mt-1.5 text-[13px] leading-snug text-muted-foreground sm:text-sm">
                    <span className="sm:hidden">{s.short}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </dt>
                  <dd className="order-1 font-display text-[2rem] font-bold tabular-nums leading-none tracking-[-0.03em] sm:text-6xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ═══════════════════════ ABOUT ════════════════════════════ */}
        <Section id="about" title="About me" tinted>
          <div className="reveal grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <p className="font-display text-2xl font-medium leading-[1.3] tracking-[-0.015em] sm:text-[2rem]">
              My apps run in restaurants during service, so a frozen screen or a lost order costs someone real money.
              Most of my work is about making that not happen.
            </p>
            <div className="space-y-5 leading-relaxed text-muted-foreground">
              <p>
                I joined Tenacious Techies as an intern in June 2024 and had changes in production within two weeks.
                Since October 2024 I&rsquo;ve worked full-time across all three FoodChow apps.
              </p>
              <p>
                At work I use MVC with Provider or GetX, Hive for offline storage and Razorpay for payments. On my own
                time I&rsquo;ve learned BLoC, Riverpod, MVVM and Clean Architecture, which we don&rsquo;t use at work
                yet.
              </p>
            </div>
          </div>
        </Section>

        {/* ═══════════════════ EXPERIENCE ═══════════════════════════ */}
        <Section
          id="experience"
          title="Experience"
          intro="One company since June 2024: four months as an intern, then hired full-time."
        >
          <ol className="divide-y">
            {EXPERIENCE.map((e) => (
              <li key={e.title} className="reveal grid gap-x-12 gap-y-4 py-10 first:pt-0 md:grid-cols-[14rem_minmax(0,1fr)]">
                <div>
                  <p className="text-sm tabular-nums text-muted-foreground">{e.period}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">{e.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {e.company} · {e.type}
                  </p>
                </div>
                <ul className="space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="min-w-0 flex-1">{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li id="education" className="grid gap-x-12 gap-y-2 pt-10 md:grid-cols-[14rem_minmax(0,1fr)]">
              <div>
                <p className="text-sm tabular-nums text-muted-foreground">2021 – 2024</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">Education</h3>
              </div>
              <div className="md:pt-6">
                <p className="font-medium">Bachelor of Computer Applications</p>
                <p className="mt-0.5 text-muted-foreground">
                  Shree G.K. &amp; C.K. Bosmia College, Jetpur · Graduated with distinction
                </p>
              </div>
            </li>
          </ol>
        </Section>

        {/* ═══════════════════ PROJECTS ═════════════════════════════ */}
        <Section
          id="projects"
          title="Projects"
          intro="All three are live on Google Play. They're team products, so each one lists the part I built."
          tinted
        >
          <ol className="grid gap-5 sm:gap-6">
            {PROJECTS.map((p) => (
              <li key={p.title} className="reveal overflow-hidden rounded-lg border bg-background">
                <div className="p-5 sm:p-8">
                  <p className="text-sm font-medium text-primary">
                    {p.kind} <span className="text-muted-foreground">· {p.downloads}</span>
                  </p>
                  <h3 className="mt-1.5 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{p.title}</h3>
                  <p className="mt-4 max-w-[40rem] leading-relaxed text-muted-foreground">{p.description}</p>
                  <h4 className="mt-6 text-sm font-medium">My part</h4>
                  <ul className="mt-2.5 grid gap-x-8 gap-y-2.5 text-[15px] sm:grid-cols-2">
                    {p.myPart.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ShotCarousel title={p.title} shots={p.shots} landscape={p.landscape} />
                <div className="flex flex-col gap-4 border-t bg-secondary/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded-md border bg-background px-2.5 py-1 text-sm">{t}</li>
                    ))}
                  </ul>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Google Play<span className="sr-only">: {p.title}</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ═══════════════════ WHAT I CAN BUILD ═════════════════════ */}
        <Section id="build" title="What I can build" intro="Work I've already shipped, and can do again on your app.">
          <ul className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CAN_BUILD.map((c) => (
              <li key={c.title} className="reveal flex flex-col bg-background p-5 sm:p-6">
                <h3 className="font-display text-xl font-bold tracking-[-0.02em]">{c.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{c.text}</p>
                <p className="mt-4 text-sm">
                  <span className="text-muted-foreground">Shipped in </span>
                  <span className="font-medium text-primary">{c.proof}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ═══════════════════════ SKILLS ═══════════════════════════ */}
        <Section id="skills" title="Skills" intro="What I use at work every day, and what I've learned on my own." tinted>
          <div className="reveal divide-y border-y">
            <div className="grid gap-3 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
              <div>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] sm:leading-9">Daily at work</h3>
                <p className="text-sm text-muted-foreground">In the production apps</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {CORE_SKILLS.map((c) => (
                  <li
                    key={c}
                    className="inline-flex h-9 items-center rounded-md bg-primary/10 px-3 font-display text-base font-semibold text-primary"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
              <div>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] sm:leading-9">Self-taught</h3>
                <p className="text-sm text-muted-foreground">Learned on my own time</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {SELF_TAUGHT.map((c) => (
                  <li
                    key={c}
                    className="inline-flex h-9 items-center rounded-md border border-primary/40 px-3 font-display text-base font-semibold"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            {SKILLS.map((s) => (
              <div key={s.name} className="grid gap-3 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8">
                <h3 className="font-medium sm:leading-8">{s.name}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li key={it} className="inline-flex min-h-8 items-center rounded-md border px-2.5 py-1 text-sm text-muted-foreground">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </main>

      {/* ═══════════ CONTACT + FOOTER (inverted band) ═════════════ */}
      <div className="inverse dark bg-background text-foreground">
        <section id="contact" aria-labelledby="contact-title" className="py-16 sm:py-24">
          <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16`}>
            <div>
              <h2 id="contact-title" className="font-display text-[2.75rem] font-bold leading-[1] tracking-[-0.03em] sm:text-6xl">
                Hiring a Flutter developer? <span className="text-primary">Let&rsquo;s talk.</span>
              </h2>
              <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-muted-foreground">
                I&rsquo;m looking for a full-time Flutter role. Email gets the quickest reply.
              </p>
              <a
                href={`mailto:${LINKS.email}?subject=Flutter%20role`}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.96] sm:w-auto"
              >
                Email me
              </a>
            </div>

            <ul className="self-start divide-y overflow-hidden rounded-lg border bg-muted">
              <li className="flex items-center gap-4 p-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${LINKS.email}`} className="block text-sm font-medium hover:underline min-[360px]:text-[15px] sm:text-base">
                    {/* Allow a line break only after the @ on the narrowest phones */}
                    {LINKS.email.split("@")[0]}@<wbr />{LINKS.email.split("@")[1]}
                  </a>
                </div>
                <CopyButton text={LINKS.email} label="Email address" className={rowAction} />
              </li>
              <li className="flex items-center gap-4 p-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={LINKS.phoneHref} className="block text-[15px] font-medium tabular-nums hover:underline sm:text-base">
                    {LINKS.phone}
                  </a>
                </div>
                <CopyButton text={LINKS.phone} label="Phone number" className={rowAction} />
              </li>
              {[
                { label: "LinkedIn", value: "sahil-pathan", href: LINKS.linkedin },
                { label: "GitHub", value: "SahilLiotech", href: LINKS.github },
                { label: "Resume", value: "PDF on Google Drive", href: LINKS.resume },
              ].map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 transition-colors hover:bg-background/40 sm:px-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-muted-foreground">{r.label}</span>
                      <span className="block text-[15px] font-medium sm:text-base">{r.value}</span>
                    </span>
                    <span className={rowAction}>
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="border-t">
          <div className={`${container} flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between`}>
            <div>
              <p className="font-display text-xl font-bold tracking-[-0.02em]">Sahil Pathan</p>
              <p className="mt-1 text-sm text-muted-foreground">Flutter developer · Surat, India</p>
            </div>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                {NAV.slice(0, 4).map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="border-t">
            <div className={`${container} flex items-center justify-between gap-4 py-5 text-sm text-muted-foreground`}>
              <p>© {new Date().getFullYear()} Sahil Pathan</p>
              <a href="#home" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
                Back to top <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
