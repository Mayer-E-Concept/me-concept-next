"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { val: "100", suffix: "+", lbl: "Proiecte finalizate",     isNum: true  },
  { val: "ISO", suffix: "",  lbl: "9001:2015 Certificat",    isNum: false },
  { val: "BIM", suffix: "",  lbl: "Revit · AutoCAD · Dialux",isNum: false },
];

function AnimatedNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1400; // ms

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    function tick(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(ease * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent(target);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target]);

  return <>{current}{suffix}</>;
}

export function HeroStatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .hero-stats-strip {
            display: grid !important;
            grid-template-columns: repeat(2, auto) !important;
            justify-content: center !important;
            gap: 20px 32px !important;
          }
          .hero-stats-strip > div:nth-child(3) {
            grid-column: 1 / -1;
            justify-self: center;
          }
        }
      `}</style>
    <div
      ref={ref}
      className="hero-stats-strip"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "clamp(14px, 2.2vw, 30px)",
        marginTop: "clamp(6px, 1vw, 14px)",
        paddingTop: 12,
        borderTop: "1px solid rgba(143,224,232,0.14)",
      }}
    >
      {STATS.map((s) => (
        <div key={s.lbl} style={{ display: "flex", flexDirection: "column", minWidth: 60 }}>
          <span
            style={{
              fontFamily: "var(--font-oxanium)",
              fontSize: "clamp(16px, 1.8vw, 24px)",
              fontWeight: 700,
              color: "#8FE0E8",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              marginBottom: 5,
            }}
          >
            {s.isNum ? (
              <AnimatedNumber target={Number(s.val)} suffix={s.suffix} active={triggered} />
            ) : (
              <>{s.val}</>
            )}
          </span>
          <span
            style={{
              fontFamily: "var(--font-plex-mono)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "#7FA2A6",
              lineHeight: 1.4,
            }}
          >
            {s.lbl}
          </span>
        </div>
      ))}
    </div>
    </>
  );
}
