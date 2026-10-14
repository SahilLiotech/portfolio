"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV } from "./site";

const container = "mx-auto w-full max-w-5xl px-5 sm:px-8";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
};

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const closeMenu = () => setMenuOpen(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [marker, setMarker] = useState<number | null>(null);

  // Center the shared marker under the active link; re-measure when fonts or width change.
  useLayoutEffect(() => {
    const place = () => {
      const link = linkRefs.current[active];
      setMarker(link ? link.offsetLeft + link.offsetWidth / 2 : null);
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // Highlight the nav item for the section in the middle of the viewport.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className={`${container} relative flex h-16 items-center justify-end`}>
        <nav
          aria-label="Primary"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex"
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              ref={(el) => {
                linkRefs.current[n.id] = el;
              }}
              href={`#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              className={`py-2 text-sm transition-colors hover:text-foreground ${active === n.id ? "text-foreground" : "text-muted-foreground"}`}
            >
              {n.label}
            </a>
          ))}
          {/* One marker that glides between links, so the active section isn't shown by color alone */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-0.5 left-0 h-[3px] w-4 rounded-full bg-primary transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${marker === null ? "opacity-0" : "opacity-100"}`}
            style={{ transform: `translateX(${(marker ?? 0) - 8}px)` }}
          />
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — `hidden` when closed keeps its links out of the tab order */}
      <nav id="mobile-menu" aria-label="Mobile" className={`border-t md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <ul className={`${container} py-2`}>
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={closeMenu}
                aria-current={active === n.id ? "location" : undefined}
                className={`block py-3 text-base ${active === n.id ? "text-foreground" : "text-muted-foreground"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
