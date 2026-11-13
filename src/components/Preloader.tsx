import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── layout constants (window grid + worker travel path) ──
const BUILDING = { x: 27, y: 112, w: 321, h: 470 };
const HAND_OFFSET = 30;
const ROWS = 5;
const COLS = 3;
const PAD_X = 20;
const PAD_TOP = 24;
const PAD_BOTTOM = 16;
const GAP_X = 13;
const GAP_Y = 14;
const WIN_W = (BUILDING.w - PAD_X * 2 - (COLS - 1) * GAP_X) / COLS;
const WIN_H = (BUILDING.h - PAD_TOP - PAD_BOTTOM - (ROWS - 1) * GAP_Y) / ROWS;
const DROPLET_COUNT = 10;
const SPARKLE_COUNT = 10;

function rowCenterY(r: number) {
  return BUILDING.y + PAD_TOP + r * (WIN_H + GAP_Y) + WIN_H / 2;
}
function rowTopY(r: number) {
  return BUILDING.y + PAD_TOP + r * (WIN_H + GAP_Y);
}
function colX(c: number) {
  return BUILDING.x + PAD_X + c * (WIN_W + GAP_X);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

type WindowCell = {
  x: number;
  y: number;
  w: number;
  h: number;
  shine: string;
  fp1x: number;
  fp1y: number;
  fp2x: number;
  fp2y: number;
};

const WINDOWS: WindowCell[] = (() => {
  const list: WindowCell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = colX(c);
      const y = rowTopY(r);
      const i = r * COLS + c;
      list.push({
        x,
        y,
        w: WIN_W,
        h: WIN_H,
        shine: `${x + WIN_W * 0.12},${y} ${x + WIN_W * 0.4},${y} ${x},${y + WIN_H * 0.55} ${x},${y + WIN_H * 0.28}`,
        fp1x: x + 18 + (i % 3) * 8,
        fp1y: y + 20 + (i % 4) * 6,
        fp2x: x + WIN_W - 22 - (i % 2) * 6,
        fp2y: y + WIN_H - 24 - (i % 3) * 5,
      });
    }
  }
  return list;
})();

const SPARKLE_META = Array.from({ length: SPARKLE_COUNT }, (_, i) => {
  const rowIndex = i % ROWS;
  return {
    x: BUILDING.x + 34 + ((i * 53) % (BUILDING.w - 68)),
    y: rowCenterY(rowIndex) + (i % 2 ? -16 : 14),
  };
});

const DROPLET_META = Array.from({ length: DROPLET_COUNT }, (_, i) => ({
  xFrac: 0.08 + (i / DROPLET_COUNT) * 0.86,
  phase: (i * 0.31) % 1,
}));

type SegmentBase =
  | { type: "descend"; from: number; to: number; dur: number }
  | { type: "celebrate"; y: number; dur: number };

type Segment = SegmentBase & { start: number };

const { SEGMENTS, TOTAL_DUR } = (() => {
  const startY = 140;
  const bottomY = BUILDING.y + BUILDING.h - HAND_OFFSET - 24;

  const raw: SegmentBase[] = [
    // One continuous eased descent, top to bottom — no per-row stop.
    { type: "descend", from: startY, to: bottomY, dur: 3.2 },
    // Hold the celebrate beat (fully cleaned, shine pulsing) well past the
    // preloader's ~4.6s max lifetime instead of looping back to dirty.
    { type: "celebrate", y: bottomY, dur: 6 },
  ];

  let acc = 0;
  const segs = raw.map((s) => {
    const seg = { ...s, start: acc } as Segment;
    acc += s.dur;
    return seg;
  });
  return { SEGMENTS: segs, TOTAL_DUR: acc };
})();

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  const workerGroupRef = useRef<SVGGElement>(null);
  const ropePathRef = useRef<SVGPathElement>(null);
  const dirtClipRectRef = useRef<SVGRectElement>(null);
  const dirtGroupRef = useRef<SVGGElement>(null);
  const shineStreakRef = useRef<SVGRectElement>(null);
  const bucketPivotRef = useRef<SVGGElement>(null);
  const armToolRef = useRef<SVGGElement>(null);
  const dropletRefs = useRef<(SVGCircleElement | null)[]>([]);
  const sparkleRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    // Lock scroll — works on iOS Safari too
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    html.style.overflow = 'hidden';

    const unlock = () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      html.style.overflow = '';
      window.scrollTo(0, scrollY);
    };

    const t = setTimeout(() => {
      setVisible(false);
      unlock();
    }, 3800);

    return () => {
      clearTimeout(t);
      unlock();
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    function tick(now: number) {
      const elapsed = ((now - t0) / 1000) % TOTAL_DUR;
      let seg: Segment = SEGMENTS[SEGMENTS.length - 1];
      for (const s of SEGMENTS) {
        if (elapsed >= s.start && elapsed < s.start + s.dur) {
          seg = s;
          break;
        }
      }
      const p = clamp((elapsed - seg.start) / seg.dur, 0, 1);

      let y: number;
      let celebratePulse = 0;

      if (seg.type === "descend") {
        y = lerp(seg.from, seg.to, easeInOutCubic(p));
      } else {
        y = seg.y;
        celebratePulse = 0.55 + 0.45 * Math.sin(p * Math.PI * 4);
      }
      const wipeActive = seg.type === "descend";

      const swayX = Math.sin(elapsed * 1.3) * 3.2;
      const bobY = Math.sin(elapsed * 2.6) * 1.4;
      const wx = BUILDING.x + BUILDING.w / 2 + swayX;
      const wy = y + bobY;

      workerGroupRef.current?.setAttribute("transform", `translate(${wx.toFixed(2)},${wy.toFixed(2)})`);

      const anchorX = BUILDING.x + BUILDING.w / 2;
      const anchorY = 100;
      const midX = (anchorX + wx) / 2 + swayX * 1.6;
      const midY = (anchorY + wy) / 2;
      ropePathRef.current?.setAttribute(
        "d",
        `M ${anchorX},${anchorY} Q ${midX.toFixed(2)},${midY.toFixed(2)} ${wx.toFixed(2)},${(wy - 6).toFixed(2)}`
      );

      const bucketAngle = Math.sin(elapsed * 1.8 + 1) * 8 + (wipeActive ? Math.sin(elapsed * 6) * 3 : 0);
      bucketPivotRef.current?.setAttribute("transform", `rotate(${bucketAngle.toFixed(2)},-24,50)`);
      const armAngle = wipeActive ? Math.sin(elapsed * 10) * 10 : Math.sin(elapsed * 1.5) * 2;
      armToolRef.current?.setAttribute("transform", `rotate(${armAngle.toFixed(2)},15,26)`);

      let cutY = clamp(y + HAND_OFFSET, BUILDING.y, BUILDING.y + BUILDING.h);
      if (seg.type === "celebrate") cutY = BUILDING.y + BUILDING.h;
      dirtClipRectRef.current?.setAttribute("y", cutY.toFixed(2));
      dirtClipRectRef.current?.setAttribute("height", Math.max(0, BUILDING.y + BUILDING.h - cutY).toFixed(2));
      dirtGroupRef.current?.setAttribute("opacity", "1");

      if (seg.type === "celebrate") {
        shineStreakRef.current?.setAttribute("y", (BUILDING.y - 8).toFixed(2));
        shineStreakRef.current?.setAttribute("opacity", (0.5 + 0.4 * celebratePulse).toFixed(2));
      } else {
        shineStreakRef.current?.setAttribute("y", (cutY - 8).toFixed(2));
        shineStreakRef.current?.setAttribute("opacity", "0.85");
      }

      dropletRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = DROPLET_META[i];
        const ph = wipeActive ? (elapsed * 1.2 + m.phase) % 1 : 0;
        el.setAttribute("cx", (BUILDING.x + m.xFrac * BUILDING.w).toFixed(2));
        el.setAttribute("cy", (cutY + ph * 22).toFixed(2));
        el.setAttribute("opacity", wipeActive ? ((1 - ph) * 0.75).toFixed(2) : "0");
      });

      sparkleRefs.current.forEach((el, i) => {
        if (!el) return;
        const m = SPARKLE_META[i];
        const intensity = seg.type === "celebrate" ? celebratePulse : 0;
        const scale = 0.5 + intensity * 0.9;
        const rot = (elapsed * 50 + i * 40) % 360;
        el.setAttribute("transform", `translate(${m.x},${m.y}) rotate(${rot.toFixed(1)}) scale(${scale.toFixed(2)})`);
        el.setAttribute("opacity", intensity.toFixed(2));
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "#F8FAFC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
          `}</style>

          <div style={{ width: "min(88vw, 360px)" }}>
            <svg viewBox="0 0 375 680" style={{ width: "100%", height: "auto", display: "block", userSelect: "none" }}>
              <defs>
                <linearGradient id="pl-cleanGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F2F9FD" />
                  <stop offset="45%" stopColor="#D3E8F5" />
                  <stop offset="100%" stopColor="#9FCBE8" />
                </linearGradient>
                <linearGradient id="pl-dirtyGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4A5A78" stopOpacity={0.88} />
                  <stop offset="100%" stopColor="#2E3D57" stopOpacity={0.82} />
                </linearGradient>
                <linearGradient id="pl-shineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
                </linearGradient>
                <pattern id="pl-dustPattern" width={7} height={7} patternUnits="userSpaceOnUse">
                  <circle cx={1.2} cy={1.2} r={0.7} fill="rgba(255,255,255,0.32)" />
                  <circle cx={4.6} cy={3.6} r={0.5} fill="rgba(255,255,255,0.22)" />
                  <circle cx={2.6} cy={5.4} r={0.4} fill="rgba(255,255,255,0.2)" />
                </pattern>
                <clipPath id="pl-dirtClip">
                  <rect ref={dirtClipRectRef} x={BUILDING.x} y={BUILDING.y} width={BUILDING.w} height={BUILDING.h} />
                </clipPath>
              </defs>

              <rect width={375} height={680} fill="#F8FAFC" />

              {/* header — real site logo (matches RopeNavbar) */}
              <g>
                <g transform="translate(27,8) scale(0.95)">
                  <rect
                      x={2}
                      y={14}
                      width={15}
                      height={32}
                      fill="#FFFFFF"
                      stroke="#D4A017"
                      strokeWidth={2}
                  />

                  <rect
                      x={17}
                      y={4}
                      width={17}
                      height={42}
                      fill="#FFFFFF"
                      stroke="#D4A017"
                      strokeWidth={2}
                  />

                  <line x1={5.5} y1={21} x2={13.5} y2={21} stroke="#D4A017" strokeWidth={1.5} />
                  <line x1={5.5} y1={28} x2={13.5} y2={28} stroke="#D4A017" strokeWidth={1.5} />
                  <line x1={5.5} y1={35} x2={13.5} y2={35} stroke="#D4A017" strokeWidth={1.5} />

                  <line x1={21} y1={12} x2={30} y2={12} stroke="#D4A017" strokeWidth={1.5} />
                  <line x1={21} y1={20} x2={30} y2={20} stroke="#D4A017" strokeWidth={1.5} />
                  <line x1={21} y1={28} x2={30} y2={28} stroke="#D4A017" strokeWidth={1.5} />
                  <line x1={21} y1={36} x2={30} y2={36} stroke="#D4A017" strokeWidth={1.5} />
                </g>

                <text
                    x={64}
                    y={38}
                    fontFamily="'Space Grotesk',sans-serif"
                    fontWeight={700}
                    fontSize={19}
                    letterSpacing={-0.3}
                    fill="#0B2233"
                >
                  LAVORINCORDA
                </text>

                <text
                    x={64}
                    y={52}
                    fontFamily="'Space Mono',monospace"
                    fontWeight={400}
                    fontSize={9}
                    letterSpacing={2}
                    fill="#ca8a04"
                >
                  EDILIZIA ACROBATICA
                </text>

                <line x1={27} y1={70} x2={348} y2={70} stroke="#D9A916" strokeOpacity={0.35} strokeWidth={1} />
              </g>

              {/* rooftop + pulley */}
              <rect x={155} y={90} width={65} height={24} rx={2} fill="#0B2233" />
              <circle cx={187.5} cy={94} r={6.5} fill="#D9A916" />

              {/* rope */}
              <path
                ref={ropePathRef}
                d="M187.5,100 Q187.5,140 187.5,150"
                fill="none"
                stroke="#D9A916"
                strokeWidth={2.6}
                strokeLinecap="round"
              />

              {/* building */}
              <rect x={BUILDING.x} y={BUILDING.y} width={BUILDING.w} height={BUILDING.h} rx={6} fill="#0F2B4C" />

              <g>
                {WINDOWS.map((w, i) => (
                  <g key={i}>
                    <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={4} fill="url(#pl-cleanGlass)" />
                    <polygon points={w.shine} fill="#FFFFFF" opacity={0.3} />
                  </g>
                ))}
              </g>

              <g ref={dirtGroupRef} clipPath="url(#pl-dirtClip)">
                {WINDOWS.map((w, i) => (
                  <g key={i}>
                    <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={4} fill="url(#pl-dirtyGlass)" />
                    <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={4} fill="url(#pl-dustPattern)" opacity={0.45} />
                    <ellipse cx={w.fp1x} cy={w.fp1y} rx={7.5} ry={9} fill="rgba(8,16,30,0.26)" />
                    <ellipse cx={w.fp2x} cy={w.fp2y} rx={5} ry={6.5} fill="rgba(8,16,30,0.2)" />
                  </g>
                ))}
              </g>

              <rect ref={shineStreakRef} x={27} y={0} width={321} height={18} fill="url(#pl-shineGrad)" opacity={0} />

              {DROPLET_META.map((_, i) => (
                <circle
                  key={i}
                  ref={(el) => {
                    dropletRefs.current[i] = el;
                  }}
                  cx={0}
                  cy={0}
                  r={2.2}
                  fill="#EAF4FB"
                  opacity={0}
                />
              ))}

              {SPARKLE_META.map((_, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    sparkleRefs.current[i] = el;
                  }}
                  d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6 Z"
                  fill="#FFE9A8"
                  opacity={0}
                  transform="translate(-100,-100)"
                />
              ))}

              {/* worker */}
              <g ref={workerGroupRef} transform="translate(187.5,70)">
                <g ref={bucketPivotRef}>
                  <line x1={-24} y1={50} x2={-24} y2={60} stroke="#D9A916" strokeWidth={2} />
                  <path d="M -31,60 L -17,60 L -19,79 L -29,79 Z" fill="#DCE3E8" stroke="#8FA0AE" strokeWidth={1} />
                  <ellipse cx={-24} cy={62} rx={6} ry={1.6} fill="#B9C8D2" />
                </g>

                <line x1={-15} y1={28} x2={-24} y2={50} stroke="#0F2B4C" strokeWidth={7} strokeLinecap="round" />
                <circle cx={-24} cy={50} r={4} fill="#C98A5B" />

                <line x1={-7} y1={52} x2={-10} y2={77} stroke="#0F2B4C" strokeWidth={8} strokeLinecap="round" />
                <line x1={7} y1={52} x2={10} y2={77} stroke="#0F2B4C" strokeWidth={8} strokeLinecap="round" />
                <rect x={-15} y={74} width={9} height={6} rx={2} fill="#0B2233" />
                <rect x={6} y={74} width={9} height={6} rx={2} fill="#0B2233" />

                <rect x={-15} y={24} width={30} height={28} rx={8} fill="#0F2B4C" />
                <line x1={-15} y1={26} x2={8} y2={50} stroke="#D9A916" strokeWidth={2.4} />
                <line x1={15} y1={26} x2={-8} y2={50} stroke="#D9A916" strokeWidth={2.4} />
                <line x1={-15} y1={50} x2={15} y2={50} stroke="#D9A916" strokeWidth={3} />
                <circle cx={0} cy={38} r={3.4} fill="#D9A916" />

                <ellipse cx={0} cy={10} rx={13} ry={11} fill="#FFFFFF" />
                <rect x={-11} y={13} width={22} height={7} rx={3.5} fill="#16233B" />
                <rect x={-4} y={19} width={8} height={6} fill="#C98A5B" />

                <g ref={armToolRef}>
                  <line x1={15} y1={28} x2={30} y2={42} stroke="#0F2B4C" strokeWidth={7} strokeLinecap="round" />
                  <circle cx={30} cy={42} r={4} fill="#C98A5B" />
                  <line x1={30} y1={42} x2={40} y2={48} stroke="#C9971A" strokeWidth={3} strokeLinecap="round" />
                  <rect x={36} y={45.5} width={15} height={5} rx={1.5} fill="#E7EDF2" stroke="#8FA0AE" strokeWidth={1} />
                </g>
              </g>

              {/* progress dots + caption */}
              <circle cx={172} cy={617} r={4.5} fill="#D9A916" />
              <circle cx={187.5} cy={617} r={4.5} fill="#D9A916" opacity={0.5} />
              <circle cx={203} cy={617} r={4.5} fill="none" stroke="#D9A916" strokeWidth={1.5} opacity={0.6} />
              <text
                x={187.5}
                y={646}
                textAnchor="middle"
                fontFamily="'Space Mono',monospace"
                fontSize={11}
                letterSpacing={3}
                fill="#8A94A0"
              >
                CARICAMENTO...
              </text>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
