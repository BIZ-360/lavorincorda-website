import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 500, suffix: "+", label: "Edifici Puliti" },
  { target: 15,  suffix: "+", label: "Anni di Esperienza" },
  { target: 98,  suffix: "%", label: "Clienti Soddisfatti" },
  { target: 24,  suffix: "h", label: "Tempo Medio di Risposta" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval>;
    const run = () => {
      const dur = 1600, t0 = Date.now();
      timer = setInterval(() => {
        const x = Math.min(1, (Date.now() - t0) / dur);
        setP(1 - Math.pow(1 - x, 3));
        if (x >= 1) clearInterval(timer);
      }, 1000 / 60);
    };
    const io = new IntersectionObserver(
      (e) => { if (e.some((x) => x.isIntersecting)) { run(); io.disconnect(); } },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);

  // Never display 0: until the count-up advances, show final values.
  const shown = p > 0 ? p : 1;

  return (
    <div ref={ref} className="hero-stats">
      <style>{`
        .hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 26px 30px; margin-top: 34px; max-width: 600px; }
        .hero-stat { display: flex; flex-direction: column; align-items: flex-start; }
        .hero-stat-num { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 44px; line-height: 1; color: #D4A017; letter-spacing: -.5px; text-shadow: 0 3px 8px rgba(100,116,139,.55); }
        .hero-stat-label { margin-top: 8px; font-size: 12px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; line-height: 1.3; }
        @media (max-width: 768px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 24px 16px; max-width: 100%; }
          .hero-stat-num { font-size: 38px; }
          .hero-stat-label { font-size: 11px; letter-spacing: 1.4px; }
        }
      `}</style>
      {STATS.map((s, i) => (
        <div className="hero-stat" key={i}>
          <span className="hero-stat-num">{Math.ceil(s.target * shown)}{s.suffix}</span>
          <span className="hero-stat-label hero-badge">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
