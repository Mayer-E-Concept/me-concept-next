import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/* Unser Team — CEO, dann Team, dann freie Mitarbeiter, pyramidenförmig.
   Fotos kommen nach public/uploads/echipa/<datei> — falls die Datei noch
   nicht existiert, zeigt die Karte automatisch den Platzhalter-Avatar statt
   eines kaputten Bildes. */

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  tag?: string;
  img?: string;
}

const CEO: TeamMember = {
  name: "Martin Mayer",
  role: "CEO, Elektroplaner, BIM-Koordinator",
  bio: "Über 20 Jahre Erfahrung in der Planung von Elektroinstallationen.",
  img: "/uploads/echipa/ceo.jpg",
};

const TEAM: TeamMember[] = [
  {
    name: "Ioan Chindea",
    role: "Ingenieur für Gebäudeinstallationen",
    bio: "Vollständige Planung von Elektroinstallationen in AutoCAD und Revit MEP, mit Liebe zum Detail und präziser Koordination.",
    img: "/uploads/echipa/worker1.jpg",
  },
  {
    name: "Raul Orban",
    role: "Technischer Zeichner",
    bio: "Erstellt präzise technische Pläne für jedes Projekt.",
    img: "/uploads/echipa/worker2.jpg",
  },
  {
    name: "Marius Poenar",
    role: "Projektmanager",
    bio: "Koordiniert Projekte und überwacht die Einhaltung der Termine.",
    img: "/uploads/echipa/worker3.jpg",
  },
  {
    name: "Stefan Picu",
    role: "Technischer Zeichner, Front-/Backend-Entwickler",
    bio: "Erstellt technische Pläne und entwickelt interne Softwarelösungen.",
    img: "/uploads/echipa/worker4.jpg",
  },
];

const COLLABORATORS: TeamMember[] = [
  {
    name: "Iulia Mayer",
    role: "Wirtschaftsmanagement",
    tag: "Freie Mitarbeiterin",
    bio: "Verwaltet Budgets und die wirtschaftliche Abwicklung der Projekte.",
    img: "/uploads/echipa/iulia.jpg",
  },
  {
    name: "Vadim Roșca",
    role: "Planungsingenieur, BIM-Spezialist",
    tag: "Freier Mitarbeiter",
    bio: "Planung und technische Prüfung von Elektroinstallationen.",
  },
];

function hasPhoto(img?: string): img is string {
  if (!img) return false;
  return fs.existsSync(path.join(process.cwd(), "public", img));
}

function TeamCard({ member, large = false }: { member: TeamMember; large?: boolean }) {
  const photoSize = large ? 220 : 184;
  const photoRadius = large ? 26 : 22;
  const photoAvailable = hasPhoto(member.img);
  return (
    <div
      style={{
        background: "#D9EAEC",
        border: "1px solid rgba(14,50,61,0.08)",
        borderRadius: 14,
        padding: "28px 18px 22px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 8px 28px rgba(14,50,61,0.08)",
        height: "100%",
      }}
    >
      {photoAvailable ? (
        <div
          style={{
            position: "relative",
            width: photoSize,
            height: photoSize,
            borderRadius: photoRadius,
            overflow: "hidden",
            marginBottom: 18,
            flexShrink: 0,
          }}
        >
          <Image
            src={member.img as string}
            alt={member.name}
            fill
            sizes={`${photoSize}px`}
            style={{ objectFit: "cover", objectPosition: "50% 18%" }}
          />
        </div>
      ) : (
        <div
          aria-hidden
          style={{
            width: photoSize,
            height: photoSize,
            borderRadius: photoRadius,
            background: "linear-gradient(135deg, #0E323D, #335058)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            flexShrink: 0,
          }}
        >
          <svg width="46%" height="46%" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.55)" />
            <path
              d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: large ? 18 : 15.5,
          color: "#0E323D",
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {member.name}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "#56707A", lineHeight: 1.4 }}>
        {member.role}
      </div>
      {member.tag && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#56707A",
            marginTop: 4,
          }}
        >
          {member.tag}
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontStyle: "italic",
          color: "#7C97A0",
          lineHeight: 1.45,
          marginTop: 10,
        }}
      >
        {member.bio}
      </div>
    </div>
  );
}

export function TeamSectionDe() {
  return (
    <section
      style={{
        background: "#0E323D",
        paddingTop: "clamp(72px, 9vw, 120px)",
        paddingBottom: "clamp(72px, 9vw, 120px)",
      }}
    >
      <style>{`
        .team-row-all {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 220px)) auto repeat(2, minmax(0, 220px));
          justify-content: center;
          align-items: stretch;
          gap: 20px;
        }
        .team-divider-v {
          width: 1px;
          background: rgba(197,137,91,0.35);
        }
        @media (max-width: 900px) {
          .team-row-all { grid-template-columns: repeat(2, minmax(0, 220px)); }
          .team-divider-v { display: none; }
        }
        @media (max-width: 520px) {
          .team-row-all { grid-template-columns: minmax(0, 240px); }
        }
      `}</style>

      <div style={{ maxWidth: "1560px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 60px)" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C5895B",
              marginBottom: 16,
            }}
          >
            Unser Team
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 3.2vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "#F4F2EC",
              margin: "0 auto",
              maxWidth: "26ch",
            }}
          >
            Die Menschen hinter den Projekten
          </h2>
        </div>

        {/* CEO — allein an der Spitze der Pyramide */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div style={{ width: "100%", maxWidth: 272 }}>
            <TeamCard member={CEO} large />
          </div>
        </div>

        {/* Team + freie Mitarbeiter — eine Reihe, getrennt durch eine vertikale Linie */}
        <div className="team-row-all">
          {TEAM.map((m, i) => (
            <TeamCard key={i} member={m} />
          ))}
          <div className="team-divider-v" aria-hidden />
          {COLLABORATORS.map((m, i) => (
            <TeamCard key={i} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
