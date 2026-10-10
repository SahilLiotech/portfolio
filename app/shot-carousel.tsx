"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Shot = { src: string; alt: string; width: number; height: number };

const AUTOPLAY_MS = 4000;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Signed distance from the focused slide, wrapping so the carousel loops.
// Fractional while dragging, so slides follow the finger.
const offsetOf = (i: number, pos: number, n: number) => {
  let d = (((i - pos) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const glassButton =
  "absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-background/40 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-background/75 sm:flex";

export function ShotCarousel({ title, shots, landscape }: { title: string; shots: Shot[]; landscape?: boolean }) {
  const n = shots.length;
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const go = (step: number) => setIndex((i) => (((i + step) % n) + n) % n);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  // Only autoplay while the carousel is actually on screen.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = visible && !hovered && !dragging && !reduced;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, index, n]);

  // Pixels of drag that equal one slide.
  const unit = () => (stage.current?.offsetWidth ?? 800) * (landscape ? 0.4 : 0.28);
  const pos = index - (dragging ? drag / unit() : 0);
  const spread = landscape ? 46 : 70;

  const endDrag = () => {
    const p = pointer.current;
    pointer.current = null;
    if (!p?.moved) return;
    const steps = Math.round(-drag / unit()) || (Math.abs(drag) > 40 ? -Math.sign(drag) : 0);
    go(steps);
    setDrag(0);
    setDragging(false);
    justDragged.current = true;
    setTimeout(() => (justDragged.current = false), 0);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="px-5 pb-5 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-8 sm:pb-8"
    >
      <div
        ref={stage}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          pointer.current = { x: e.clientX, moved: false };
        }}
        onPointerMove={(e) => {
          const p = pointer.current;
          if (!p) return;
          const dx = e.clientX - p.x;
          if (!p.moved && Math.abs(dx) > 6) {
            p.moved = true;
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
          }
          if (p.moved) setDrag(dx);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (justDragged.current) e.stopPropagation();
        }}
        className={`relative cursor-grab touch-pan-y select-none overflow-hidden rounded-xl bg-secondary/60 active:cursor-grabbing sm:bg-transparent ${
          landscape ? "aspect-[1.6/1] sm:aspect-[2.3/1]" : "h-[24rem] sm:h-[32rem]"
        }`}
      >
        {/* Ambient glow: a heavily blurred copy of the focused shot tints the stage.
            Skipped on phones, where large blur layers make scrolling stutter on low-end devices. */}
        {shots.map((shot, i) => (
          <img
            key={`glow-${shot.src}`}
            src={shot.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ opacity: i === index ? 0.45 : 0, transition: `opacity 900ms ${EASE}` }}
            className="pointer-events-none absolute inset-0 hidden h-full w-full scale-125 object-cover blur-3xl saturate-150 sm:block"
          />
        ))}

        <div className="absolute inset-0" style={{ perspective: "1400px" }}>
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {shots.map((shot, i) => {
              const d = offsetOf(i, pos, n);
              const a = Math.abs(d);
              const focused = i === index;
              return (
                <img
                  key={shot.src}
                  src={shot.src}
                  alt={focused ? shot.alt : ""}
                  aria-hidden={!focused}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onClick={!focused && a < 1.5 ? () => go(Math.round(d)) : undefined}
                  style={{
                    transform: `translate(-50%, -50%) translateX(${d * spread}%) translateZ(${-a * 160}px) rotateY(${clamp(-d, -1, 1) * 24}deg) scale(${1 - Math.min(a, 1.5) * 0.12})`,
                    filter: `blur(${Math.min(a, 1.5) * 4}px) brightness(${1 - Math.min(a, 1) * 0.3})`,
                    opacity: clamp((1.5 - a) / 0.5, 0, 1),
                    zIndex: Math.round(100 - a * 10),
                    transition: dragging
                      ? "none"
                      : `transform 750ms ${EASE}, filter 750ms ${EASE}, opacity 500ms ${EASE}`,
                  }}
                  className={`absolute left-1/2 top-1/2 rounded-lg border border-white/10 bg-background ${
                    landscape ? "h-auto w-[84%] sm:w-[62%]" : "h-[90%] w-auto"
                  } ${focused ? "shadow-2xl shadow-black/30" : "cursor-pointer shadow-lg"}`}
                />
              );
            })}
          </div>
        </div>

        <button onClick={() => go(-1)} aria-label="Previous screenshot" className={`${glassButton} left-3`}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button onClick={() => go(1)} aria-label="Next screenshot" className={`${glassButton} right-3`}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* Dots: the active one fills up while autoplay counts down */}
      <div className="mt-4 flex justify-center gap-1">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${i + 1} of ${n}`}
            aria-current={i === index}
            className="flex h-6 items-center justify-center px-1"
          >
            <span
              className={`relative block h-1.5 overflow-hidden rounded-full bg-foreground/20 transition-[width] duration-500 ${
                i === index ? "w-8" : "w-1.5"
              }`}
            >
              {i === index && (
                <span
                  key={`${index}-${playing}`}
                  className="absolute inset-0 origin-left rounded-full bg-primary"
                  style={playing ? { animation: `carousel-progress ${AUTOPLAY_MS}ms linear both` } : undefined}
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <p aria-live={playing ? "off" : "polite"} className="mt-1 text-center text-sm text-muted-foreground">
        {shots[index].alt}
      </p>
    </div>
  );
}
