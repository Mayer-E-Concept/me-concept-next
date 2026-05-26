"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { val: "20",  suffix: "+", lbl: "Ani experiență",          isNum: true  },
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
        @media (max-width: 560px) {
          .hero-stats-strip {
            flex-wrap: wrap !important;
            gap: 20px 32px !important;
          }
          .hero-stats-strip > div { min-width: calc(50% - 16px) !important; }
        }
      `}</style>
    <div
      ref={ref}
      className="hero-stats-strip"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "clamp(16px, 2.8vw, 40px)",
        marginTop: "clamp(28px, 4vw, 52px)",
        paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {STATS.map((s) => (
        <div key={s.lbl} style={{ display: "flex", flexDirection: "column", minWidth: 60 }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(22px, 2.4vw, 32px)",
              fontWeight: 800,
              color: "#C5895B",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 7,
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
              fontFamily: "var(--font-sans)",
              fontSize: "10.5px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.45,
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
