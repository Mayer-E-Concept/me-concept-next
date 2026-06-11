"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  ink:      0x8BBDC8,   // light petrol — visible on dark #051E27 hero
  accent:   0x4AABB8,
  hover:    0xC5895B,
  warm:     0xF2D7B6,
  solar:    0x5ABCCA,
};

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.WebGLRenderingContext) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── Canvas ── */
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
    container.appendChild(canvas);

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 2, 0.1, 100);
    scene.add(new THREE.AmbientLight(0xffffff, 0.95));

    /* ── Helpers ── */
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    // Polylines are resampled to ~SEG vertices so setDrawRange can trace them
    // progressively during the draw-in; original corner points are preserved.
    const resamplePts = (pts: THREE.Vector3[], SEG = 24): THREE.Vector3[] => {
      const lens: number[] = [];
      let total = 0;
      for (let i = 1; i < pts.length; i++) {
        const l = pts[i].distanceTo(pts[i - 1]);
        lens.push(l);
        total += l;
      }
      if (total === 0) return pts.slice();
      const out: THREE.Vector3[] = [pts[0].clone()];
      for (let i = 1; i < pts.length; i++) {
        const k = Math.max(1, Math.round((lens[i - 1] / total) * SEG));
        for (let j = 1; j <= k; j++) {
          out.push(new THREE.Vector3().lerpVectors(pts[i - 1], pts[i], j / k));
        }
      }
      return out;
    };
    const mkLine = (pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) =>
      new THREE.Line(new THREE.BufferGeometry().setFromPoints(resamplePts(pts)), mat);

    /* ── Draw-in choreography — phase windows in seconds from mount ── */
    const PH = { WALLS: 0, FLOORS: 1, ROOF: 2, SURF: 3, ELEC: 4 } as const;
    const PHASE_TIME: [number, number][] = [
      [0.0, 1.2], // WALLS  — wall edges trace in
      [0.8, 1.8], // FLOORS — slabs + partitions
      [1.4, 2.2], // ROOF   — ridge + rafters
      [2.0, 2.8], // SURF   — face fills, gables, solar panels fade
      [2.4, 3.2], // ELEC   — panel, meter, wiring, filament tubes
    ];
    const LIVE_START = 3.2, LIVE_END = 3.8; // sparks/pulses/bulbs ramp in last
    // Labels: sequential fade + slide-up, top to bottom, after the house exists
    const LABEL_START = 3.0, LABEL_STAGGER = 0.3, LABEL_DUR = 0.6;
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

    /* ── Materials ── */
    const matWall      = new THREE.LineBasicMaterial({ color: COLORS.ink,   transparent: true, opacity: 0.88 });
    const matWallSoft  = new THREE.LineBasicMaterial({ color: COLORS.ink,   transparent: true, opacity: 0.40 });
    const matWallFaint = new THREE.LineBasicMaterial({ color: COLORS.ink,   transparent: true, opacity: 0.18 });
    const matWiring    = new THREE.LineBasicMaterial({ color: COLORS.hover, transparent: true, opacity: 0.90 });
    const matWiringDim = new THREE.LineBasicMaterial({ color: COLORS.hover, transparent: true, opacity: 0.55 });
    const matAccent    = new THREE.LineBasicMaterial({ color: COLORS.accent, transparent: true, opacity: 0.90 });
    const matFill      = new THREE.MeshBasicMaterial({ color: COLORS.accent, transparent: true, opacity: 0.07, side: THREE.DoubleSide });
    const matSolar     = new THREE.MeshBasicMaterial({ color: COLORS.solar, transparent: true, opacity: 0.55, side: THREE.DoubleSide });
    const matSolarLine = new THREE.LineBasicMaterial({ color: COLORS.solar, transparent: true, opacity: 0.85 });
    const matPad       = new THREE.MeshBasicMaterial({ color: COLORS.hover });

    /* ─────────────────────────────────────────────────────────────────────
       1) HOUSE
    ───────────────────────────────────────────────────────────────────── */
    const house = new THREE.Group();
    scene.add(house);

    // Tags every child added since the previous call with a draw-in phase.
    // Key is `drawPhase` — pulses already use userData.phase for their own timing.
    let phaseMark = 0;
    const markPhase = (phase: number) => {
      for (let i = phaseMark; i < house.children.length; i++) {
        house.children[i].userData.drawPhase = phase;
      }
      phaseMark = house.children.length;
    };

    const W = 3.0, D = 2.0, Hw = 3.0, Hr = 1.0, FLOORS = 3;
    const PER = Hw / FLOORS;
    const yWallBottom = -Hw / 2;
    const yWallTop    =  Hw / 2;
    const yApex       =  Hw / 2 + Hr;

    // 12 wall edges
    const c = [
      V(-W/2, yWallBottom, -D/2), V( W/2, yWallBottom, -D/2),
      V( W/2, yWallBottom,  D/2), V(-W/2, yWallBottom,  D/2),
      V(-W/2, yWallTop,    -D/2), V( W/2, yWallTop,    -D/2),
      V( W/2, yWallTop,     D/2), V(-W/2, yWallTop,     D/2),
    ];
    ([
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
    ] as [number,number][]).forEach(([a, b]) => house.add(mkLine([c[a], c[b]], matWall)));
    markPhase(PH.WALLS);

    // Floor slabs
    for (let f = 0; f <= FLOORS; f++) {
      const y = yWallBottom + f * PER;
      house.add(mkLine([
        V(-W/2, y, -D/2), V( W/2, y, -D/2),
        V( W/2, y,  D/2), V(-W/2, y,  D/2), V(-W/2, y, -D/2),
      ], f === 0 || f === FLOORS ? matWall : matWallSoft));
    }
    markPhase(PH.FLOORS);

    // Face fills
    const facePlane = new THREE.PlaneGeometry(W, Hw);
    const backMesh  = new THREE.Mesh(facePlane, matFill); backMesh.position.z  = -D/2; house.add(backMesh);
    const frontMesh = new THREE.Mesh(facePlane, matFill); frontMesh.position.z =  D/2 - 0.001; house.add(frontMesh);
    markPhase(PH.SURF);

    // Pitched roof
    const ridgeBack  = V(0, yApex, -D/2);
    const ridgeFront = V(0, yApex,  D/2);
    house.add(mkLine([ridgeBack, ridgeFront], matWall));
    house.add(mkLine([c[4], ridgeBack],  matWall));
    house.add(mkLine([c[5], ridgeBack],  matWall));
    house.add(mkLine([c[7], ridgeFront], matWall));
    house.add(mkLine([c[6], ridgeFront], matWall));
    markPhase(PH.ROOF);
    const gableGeo = (z: number) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute([
        -W/2, yWallTop, z,  W/2, yWallTop, z,  0, yApex, z,
      ], 3));
      g.setIndex([0, 1, 2]);
      return g;
    };
    house.add(new THREE.Mesh(gableGeo( D/2), matFill));
    house.add(new THREE.Mesh(gableGeo(-D/2), matFill));
    markPhase(PH.SURF);

    // Internal partitions
    for (let f = 0; f < FLOORS; f++) {
      const yLo = yWallBottom + f * PER;
      const yHi = yLo + PER;
      const xSplit = (f % 2 === 0) ? -W/5 : W/6;
      house.add(mkLine([V(xSplit, yLo, -D/2), V(xSplit, yHi, -D/2)], matWallSoft));
      house.add(mkLine([V(xSplit, yLo,  D/2), V(xSplit, yHi,  D/2)], matWallSoft));
      house.add(mkLine([V(xSplit, yLo, -D/2), V(xSplit, yLo,  D/2)], matWallFaint));
    }
    markPhase(PH.FLOORS);

    /* ── Distribution panel ── */
    const panel = new THREE.Group();
    house.add(panel);
    const pW = 0.40, pH = 0.65, pD = 0.10;
    const pX = -W/2 - pD/2, pY = yWallBottom + PER * 0.5, pZ = D/2 - 0.55;
    panel.position.set(pX, pY, pZ);
    const pc = [
      V(-pD/2, -pH/2, -pW/2), V( pD/2, -pH/2, -pW/2),
      V( pD/2, -pH/2,  pW/2), V(-pD/2, -pH/2,  pW/2),
      V(-pD/2,  pH/2, -pW/2), V( pD/2,  pH/2, -pW/2),
      V( pD/2,  pH/2,  pW/2), V(-pD/2,  pH/2,  pW/2),
    ];
    ([
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
    ] as [number,number][]).forEach(([a, b]) => panel.add(mkLine([pc[a], pc[b]], matAccent)));
    const panelFace = new THREE.Mesh(
      new THREE.PlaneGeometry(pW, pH),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
    );
    panelFace.rotation.y = Math.PI / 2;
    panelFace.position.x = -pD/2 - 0.001;
    panel.add(panelFace);
    for (let r = 0; r < 5; r++) {
      const ry = -pH/2 + 0.08 + r * 0.11;
      panel.add(mkLine([
        V(-pD/2 - 0.003, ry, -pW/2 + 0.05),
        V(-pD/2 - 0.003, ry,  pW/2 - 0.05),
      ], matAccent));
    }
    panel.add(mkLine([
      V(-pD/2 - 0.003, pH/2 - 0.04, -pW/2 + 0.04),
      V(-pD/2 - 0.003, pH/2 - 0.04,  pW/2 - 0.04),
    ], matWall));
    markPhase(PH.ELEC);

    /* ── Smart meter ── */
    const meter = new THREE.Group();
    house.add(meter);
    const mW = 0.20, mH = 0.20, mDm = 0.08;
    meter.position.set(-W/2 - mDm/2, yWallBottom + PER * 0.35, pZ - 0.45);
    const mc = [
      V(-mDm/2, -mH/2, -mW/2), V( mDm/2, -mH/2, -mW/2),
      V( mDm/2, -mH/2,  mW/2), V(-mDm/2, -mH/2,  mW/2),
      V(-mDm/2,  mH/2, -mW/2), V( mDm/2,  mH/2, -mW/2),
      V( mDm/2,  mH/2,  mW/2), V(-mDm/2,  mH/2,  mW/2),
    ];
    ([
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
    ] as [number,number][]).forEach(([a, b]) => meter.add(mkLine([mc[a], mc[b]], matAccent)));
    meter.add(mkLine([V(-mDm/2 - 0.001, -0.03, -0.06), V(-mDm/2 - 0.001,  0.03, -0.06)], matWiring));
    meter.add(mkLine([V(-mDm/2 - 0.001, -0.03,  0.06), V(-mDm/2 - 0.001,  0.03,  0.06)], matWiring));
    meter.add(mkLine([V(-mDm/2 - 0.001, -0.03, -0.06), V(-mDm/2 - 0.001, -0.03,  0.06)], matWiring));
    meter.add(mkLine([V(-mDm/2 - 0.001,  0.03, -0.06), V(-mDm/2 - 0.001,  0.03,  0.06)], matWiring));
    markPhase(PH.ELEC);

    /* ── Solar panels ── */
    const solarGroup = new THREE.Group();
    house.add(solarGroup);
    const slopeAng = Math.atan2(Hr, W / 2);
    const slopeLen = Math.sqrt((W/2) ** 2 + Hr ** 2);
    const SOLAR_ROWS = 2, SOLAR_COLS = 4;
    const panelW = 0.40, panelH = 0.80, sMargin = 0.10, zMarginS = 0.15;

    [-1, 1].forEach((xSign) => {
      const slopeNormal = new THREE.Vector3(xSign * Math.sin(slopeAng), Math.cos(slopeAng), 0);
      const alongSlope  = new THREE.Vector3(-xSign * Math.cos(slopeAng), Math.sin(slopeAng), 0);
      const alongDepth  = new THREE.Vector3(0, 0, -xSign);
      const basis = new THREE.Matrix4().makeBasis(alongDepth, alongSlope, slopeNormal);
      const orientation = new THREE.Quaternion().setFromRotationMatrix(basis);
      const wallCorner = new THREE.Vector3(xSign * (W/2), yWallTop, 0);

      for (let r = 0; r < SOLAR_ROWS; r++) {
        for (let col = 0; col < SOLAR_COLS; col++) {
          const s  = sMargin + ((r + 0.5) / SOLAR_ROWS) * (slopeLen - 2 * sMargin);
          const z  = -D/2 + zMarginS + ((col + 0.5) / SOLAR_COLS) * (D - 2 * zMarginS);
          const pos = wallCorner.clone()
            .add(alongSlope.clone().multiplyScalar(s))
            .add(new THREE.Vector3(0, 0, z))
            .add(slopeNormal.clone().multiplyScalar(0.012));

          const sp = new THREE.Mesh(new THREE.PlaneGeometry(panelW, panelH), matSolar);
          sp.position.copy(pos);
          sp.quaternion.copy(orientation);
          solarGroup.add(sp);

          const edgeGroup = new THREE.Group();
          const edges: [THREE.Vector3, THREE.Vector3][] = [
            [V(-panelW/2, -panelH/2, 0), V( panelW/2, -panelH/2, 0)],
            [V( panelW/2, -panelH/2, 0), V( panelW/2,  panelH/2, 0)],
            [V( panelW/2,  panelH/2, 0), V(-panelW/2,  panelH/2, 0)],
            [V(-panelW/2,  panelH/2, 0), V(-panelW/2, -panelH/2, 0)],
            [V(0, -panelH/2, 0), V(0, panelH/2, 0)],
            [V(-panelW/2, 0, 0), V(panelW/2, 0, 0)],
          ];
          edges.forEach(([a, b]) => edgeGroup.add(mkLine([a, b], matSolarLine)));
          edgeGroup.position.copy(pos);
          edgeGroup.quaternion.copy(orientation);
          solarGroup.add(edgeGroup);
        }
      }
    });
    markPhase(PH.SURF);

    /* ── Interior label sprites ── */
    function makeSmallLabel(text: string, color = "#0E323D") {
      const cv = document.createElement("canvas");
      cv.width = 260; cv.height = 56;
      const ctx = cv.getContext("2d")!;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, cv.width - 2, cv.height - 2);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(11, 11, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.font = "bold 22px Manrope, Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, cv.width / 2, cv.height / 2 + 3);
      const tex = new THREE.CanvasTexture(cv);
      tex.anisotropy = 8;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(1.0, 0.215, 1);
      return sprite;
    }

    const BOX_DEFS = [
      { text: "REVIT · BIM",      color: "#1A6F7A", local: V(-0.65,  Hw/2 - PER * 0.5, 0.55) },
      { text: "SMART HOME",       color: "#C5895B", local: V( 0.75,  Hw/2 - PER * 0.5, 0.55) },
      { text: "ISO 9001:2015",    color: "#1A6F7A", local: V( 0.30,  0,                0.55) },
      { text: "HOAI · DIN · VDE", color: "#0E323D", local: V( 0.30, -Hw/2 + PER * 0.5, 0.55) },
    ];
    const labelObjects = BOX_DEFS.map((def) => {
      const sprite = makeSmallLabel(def.text, def.color);
      sprite.userData.def = def;
      (sprite.material as THREE.SpriteMaterial).opacity = 0; // revealed sequentially in tick
      scene.add(sprite);
      return { sprite, def };
    });

    function layoutLabels() {
      const sX = house.scale.x || 1;
      const hX = house.position.x;
      const hY = house.position.y;
      labelObjects.forEach(({ sprite, def }) => {
        const baseY = hY + def.local.y * sX;
        sprite.userData.baseY = baseY;
        sprite.position.set(
          hX + def.local.x * sX,
          baseY,
          def.local.z * sX,
        );
      });
    }

    /* ── Lamp post ── */
    const lamp = new THREE.Group();
    house.add(lamp);
    lamp.position.set(W/2 + 0.65, 0, D/2 - 0.4);
    lamp.add(mkLine([V(0, yWallBottom, 0), V(0, yWallBottom + 1.8, 0)], matWall));
    lamp.add(mkLine([V(0, yWallBottom + 1.8, 0), V(-0.35, yWallBottom + 1.95, 0)], matWall));
    const lampHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.10, 18, 18),
      new THREE.MeshBasicMaterial({ color: COLORS.warm, transparent: true, opacity: 0.80 }),
    );
    lampHead.position.set(-0.35, yWallBottom + 1.92, 0);
    lamp.add(lampHead);
    const lampHalo = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 18, 18),
      new THREE.MeshBasicMaterial({ color: COLORS.warm, transparent: true, opacity: 0.18 }),
    );
    lampHalo.position.copy(lampHead.position);
    lamp.add(lampHalo);
    markPhase(PH.ELEC);

    /* ── Outlets + ceiling lights ── */
    const ceilingLights: THREE.Mesh[] = [];
    for (let f = 0; f < FLOORS; f++) {
      const yFloorBase = yWallBottom + f * PER;
      const yCeil    = yFloorBase + PER - 0.05;
      const yOutlet  = yFloorBase + 0.20;
      [-W/4, W/4].forEach((x) => {
        house.add(mkLine([V(x, yCeil, 0), V(x, yCeil - 0.25, 0)], matWallFaint));
        const bulb = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 16, 16),
          new THREE.MeshBasicMaterial({ color: COLORS.warm, transparent: true, opacity: 0.85 }),
        );
        bulb.position.set(x, yCeil - 0.30, 0);
        house.add(bulb);
        ceilingLights.push(bulb);
      });
      [-W/3, W/3].forEach((x) => {
        const pad = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 14), matPad);
        pad.position.set(x, yOutlet, -D/2 + 0.015);
        house.add(pad);
      });
    }
    markPhase(PH.ELEC);

    /* ── Wiring tree ── */
    const riserX = -W/2 + 0.08;
    const riserZ = pZ;
    house.add(mkLine([V(riserX, yWallBottom + 0.05, riserZ), V(riserX, yWallTop - 0.10, riserZ)], matWiring));
    for (let f = 0; f < FLOORS; f++) {
      const fy = yWallBottom + (f + 0.5) * PER;
      house.add(mkLine([V(riserX, fy, riserZ), V(W/4, fy, riserZ)], matWiringDim));
      const outY = yWallBottom + f * PER + 0.20;
      house.add(mkLine([V(W/4, fy, riserZ), V(W/4, outY, riserZ)], matWiringDim));
    }
    house.add(mkLine([V(riserX, yWallTop - 0.10, riserZ), V(0, yApex - 0.1, riserZ)], matWiringDim));
    house.add(mkLine([V(0, yApex - 0.1, riserZ), V(W/3, yApex - 0.6, D/2 + 0.02)], matWiringDim));
    markPhase(PH.ELEC);

    /* ─────────────────────────────────────────────────────────────────────
       2b) CATMULL-ROM FILAMENTS — inside house, routes follow wiring tree
    ───────────────────────────────────────────────────────────────────── */
    type SparkDef = { mesh: THREE.Mesh; curve: THREE.Curve<THREE.Vector3>; speed: number; phase: number; offset: number };
    const sparkMeshes: SparkDef[] = [];

    const filRoutes: THREE.Vector3[][] = [
      // Route A — vertical riser, bottom → top
      [V(riserX, yWallBottom + 0.05, riserZ), V(riserX, yWallBottom + PER, riserZ), V(riserX, yWallTop - 0.10, riserZ)],
      // Route B — ground-floor horizontal branch
      [V(riserX, yWallBottom + PER * 0.5, riserZ), V(0, yWallBottom + PER * 0.5, riserZ), V(W / 4, yWallBottom + PER * 0.5, riserZ)],
      // Route C — 2nd-floor horizontal branch
      [V(riserX, yWallBottom + PER * 1.5, riserZ), V(0, yWallBottom + PER * 1.5, riserZ), V(W / 4, yWallBottom + PER * 1.5, riserZ)],
      // Route D — top → apex → solar lead
      [V(riserX, yWallTop - 0.10, riserZ), V(0, yApex - 0.12, 0), V(W / 3, yApex - 0.6, D / 2)],
    ];

    const filMat = new THREE.MeshBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0.22, side: THREE.DoubleSide });

    filRoutes.forEach((pts, ci) => {
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
      // Thin tube following the route
      house.add(new THREE.Mesh(
        new THREE.TubeGeometry(curve, 80, 0.0055, 5, false),
        filMat,
      ));
      // 2 sparks per route travelling along the curve
      for (let si = 0; si < 2; si++) {
        const spark = new THREE.Mesh(
          new THREE.SphereGeometry(0.022, 7, 7),
          new THREE.MeshBasicMaterial({ color: COLORS.warm, transparent: true, opacity: 0.75 }),
        );
        house.add(spark);
        sparkMeshes.push({ mesh: spark, curve, speed: 0.10 + ci * 0.018, phase: ci * 0.25, offset: si * 0.5 });
      }
    });
    markPhase(PH.ELEC);

    /* ── Pulsing nodes ── */
    const buildingPulses: THREE.Mesh[] = [];
    const pulseGeo = new THREE.SphereGeometry(0.07, 18, 18);
    const pulsePoints: THREE.Vector3[] = [];
    for (let f = 0; f < FLOORS; f++) {
      const fy = yWallBottom + (f + 0.5) * PER;
      pulsePoints.push(V(riserX, fy, riserZ));
      pulsePoints.push(V(W/4, fy, riserZ));
    }
    pulsePoints.forEach((p, idx) => {
      const m = new THREE.Mesh(
        pulseGeo,
        new THREE.MeshBasicMaterial({ color: COLORS.hover, transparent: true, opacity: 0.85 }),
      );
      m.position.copy(p);
      m.userData = { phase: idx * 0.5 };
      house.add(m);
      buildingPulses.push(m);
    });
    markPhase(PH.ELEC);

    /* ─────────────────────────────────────────────────────────────────────
       1b) DRAW-IN — collect traceable lines + fadeable materials
    ───────────────────────────────────────────────────────────────────── */
    // Live elements (sparks, pulses, bulbs, lamp glow) already set their
    // opacity every frame — they are gated by liveGate, not faded here.
    const liveSet = new Set<THREE.Object3D>([
      ...sparkMeshes.map((s) => s.mesh),
      ...buildingPulses,
      ...ceilingLights,
      lampHead,
      lampHalo,
    ]);
    const drawLines: { geo: THREE.BufferGeometry; total: number; phase: number; idx: number }[] = [];
    const phaseCounts = [0, 0, 0, 0, 0];
    const drawMats = new Map<THREE.MeshBasicMaterial, { target: number; phase: number }>();
    house.children.forEach((child) => {
      const phase = child.userData.drawPhase as number | undefined;
      if (phase === undefined) return;
      child.traverse((obj) => {
        if ((obj as THREE.Line).isLine) {
          const geo = (obj as THREE.Line).geometry as THREE.BufferGeometry;
          geo.setDrawRange(0, 0);
          drawLines.push({ geo, total: geo.getAttribute("position").count, phase, idx: phaseCounts[phase]++ });
        } else if ((obj as THREE.Mesh).isMesh && !liveSet.has(obj)) {
          const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (!drawMats.has(mat)) {
            drawMats.set(mat, { target: mat.opacity, phase });
            mat.transparent = true;
            mat.opacity = 0;
          }
        }
      });
    });

    let drawDone = false;
    let labelsDone = false;
    const applyLabelsIn = (t: number) => {
      if (labelsDone) return;
      let allDone = true;
      labelObjects.forEach(({ sprite }, i) => {
        const p = Math.min(Math.max((t - (LABEL_START + i * LABEL_STAGGER)) / LABEL_DUR, 0), 1);
        if (p < 1) allDone = false;
        const e = easeOutCubic(p);
        (sprite.material as THREE.SpriteMaterial).opacity = e;
        const baseY = (sprite.userData.baseY as number) ?? sprite.position.y;
        sprite.position.y = baseY - (1 - e) * 0.16 * (house.scale.x || 1);
      });
      if (allDone) labelsDone = true;
    };
    const applyDrawIn = (t: number) => {
      if (drawDone) return;
      for (const dl of drawLines) {
        const [s, e] = PHASE_TIME[dl.phase];
        const span = e - s;
        const n = phaseCounts[dl.phase];
        const start = s + (n > 1 ? (dl.idx / (n - 1)) * span * 0.5 : 0);
        const p = Math.min(Math.max((t - start) / (span * 0.5), 0), 1);
        dl.geo.setDrawRange(0, Math.round(easeOutCubic(p) * dl.total));
      }
      for (const [mat, info] of drawMats) {
        const [s, e] = PHASE_TIME[info.phase];
        const p = Math.min(Math.max((t - s) / (e - s), 0), 1);
        mat.opacity = info.target * easeOutCubic(p);
      }
      // All phase windows end at or before LIVE_END — final values are exact.
      if (t >= LIVE_END) drawDone = true;
    };

    /* ─────────────────────────────────────────────────────────────────────
       2) MOUSE PARALLAX
    ───────────────────────────────────────────────────────────────────── */
    const mouseTarget = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouseTarget.x = (e.clientX - r.left) / r.width  - 0.5;
      mouseTarget.y = (e.clientY - r.top)  / r.height - 0.5;
    };
    const onMouseLeave = () => { mouseTarget.x = 0; mouseTarget.y = 0; };
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const baseRotY = -0.35, baseRotX = -0.10;

    /* ─────────────────────────────────────────────────────────────────────
       3) RESPONSIVE CAMERA + LAYOUT
    ───────────────────────────────────────────────────────────────────── */
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.aspect = aspect;

      let dist: number, fov: number, scale: number, houseX: number, baseHouseY: number, lookXFactor: number;
      if (aspect >= 2.4) {
        dist = 12;   fov = 32; scale = 1.35; houseX = 6.0; baseHouseY = -0.10; lookXFactor = 0.15;
      } else if (aspect >= 2.0) {
        dist = 12.5; fov = 36; scale = 1.25; houseX = 5.0; baseHouseY = -0.10; lookXFactor = 0.25;
      } else if (aspect >= 1.5) {
        dist = 13;   fov = 40; scale = 1.05; houseX = 3.6; baseHouseY = -0.10; lookXFactor = 0.40;
      } else if (aspect >= 1.1) {
        dist = 13.5; fov = 48; scale = 0.85; houseX = 2.4; baseHouseY = -0.20; lookXFactor = 0.55;
      } else {
        dist = 14;   fov = 58; scale = 0.72; houseX = 0.5; baseHouseY = -0.30; lookXFactor = 1.0;
      }

      const lookY = baseHouseY + 0.5;
      camera.position.set(0, 0.2, dist);
      camera.fov = fov;
      camera.lookAt(houseX * lookXFactor, lookY, 0);
      camera.updateProjectionMatrix();

      house.scale.setScalar(scale);
      house.position.x = houseX;
      house.position.y = baseHouseY;
      house.userData.baseY = baseHouseY;
      layoutLabels();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    /* ─────────────────────────────────────────────────────────────────────
       4) ANIMATION LOOP
    ───────────────────────────────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let frameId: number | null = null;
    let visible = true;

    function tick() {
      if (!visible) { frameId = null; return; }
      frameId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      applyDrawIn(t);
      applyLabelsIn(t);
      // 0 → 1 after the wiring is drawn: current only flows through built cables
      const liveGate = Math.min(Math.max((t - LIVE_START) / (LIVE_END - LIVE_START), 0), 1);

      const tgtY = baseRotY + mouseTarget.x * 0.12 + t * 0.04;
      const tgtX = baseRotX + mouseTarget.y * 0.08;
      house.rotation.y += (tgtY - house.rotation.y) * 0.045;
      house.rotation.x += (tgtX - house.rotation.x) * 0.05;

      const baseY = (house.userData.baseY as number) ?? -0.4;
      house.position.y = baseY + Math.sin(t * 0.5) * 0.04;

      buildingPulses.forEach((p) => {
        const s = 0.7 + Math.sin(t * 2.2 + (p.userData.phase as number)) * 0.5;
        p.scale.setScalar(s);
        (p.material as THREE.MeshBasicMaterial).opacity =
          (0.45 + Math.sin(t * 2.2 + (p.userData.phase as number)) * 0.45) * liveGate;
      });

      ceilingLights.forEach((b, i) => {
        const ph = i * 0.9;
        const flicker = Math.sin(t * 1.3 + ph) > 0.7 ? 0.6 + Math.random() * 0.4 : 1;
        (b.material as THREE.MeshBasicMaterial).opacity = (0.65 + Math.sin(t * 1.3 + ph) * 0.25) * flicker * liveGate;
        b.scale.setScalar(0.85 + Math.sin(t * 1.3 + ph) * 0.15);
      });

      (lampHead.material as THREE.MeshBasicMaterial).opacity = (0.65 + Math.sin(t * 1.0) * 0.25) * liveGate;
      (lampHalo.material as THREE.MeshBasicMaterial).opacity = (0.14 + Math.sin(t * 1.0) * 0.10) * liveGate;
      lampHalo.scale.setScalar(1 + Math.sin(t * 1.0) * 0.12);


      // Sparks flowing along internal filament routes
      sparkMeshes.forEach((s) => {
        const progress = ((t * s.speed + s.phase + s.offset) % 1 + 1) % 1;
        s.mesh.position.copy(s.curve.getPoint(progress));
        (s.mesh.material as THREE.MeshBasicMaterial).opacity =
          (0.30 + Math.sin(t * 5 + s.phase * 9) * 0.30) * liveGate;
        s.mesh.scale.setScalar(0.7 + Math.sin(t * 3.5 + s.offset * 4) * 0.35);
      });

      renderer.render(scene, camera);
    }
    tick();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting;
          if (visible && !frameId) tick();
        });
      },
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    /* ── Cleanup ── */
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      // Dispose all Three.js GPU resources to prevent VRAM leaks
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            (mesh.material as THREE.Material)?.dispose();
          }
        }
        if ((obj as THREE.Line).isLine) {
          const line = obj as THREE.Line;
          line.geometry?.dispose();
          (line.material as THREE.Material)?.dispose();
        }
      });
      labelObjects.forEach(({ sprite }) => {
        (sprite.material as THREE.SpriteMaterial).map?.dispose();
        sprite.material.dispose();
      });
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}
