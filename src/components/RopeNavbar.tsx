import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, PhoneCall, Anchor, Shield,
  Compass, FileText
} from "lucide-react";

interface RopeNavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function RopeNavbar({ onNavigate, activeSection }: RopeNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 100 for dragging rope
  const [isPulling, setIsPulling] = useState(false);
  
  const navItems = [
    { id: "hero", label: "Home", icon: Compass },
    { id: "servizi", label: "Servizi", icon: Anchor },
    { id: "calcolatore", label: "Rappelling Estimate", icon: FileText },
    { id: "progetti", label: "Masonry Gallery", icon: Compass },
    { id: "sicurezza", label: "Sicurezza & Attrezzatura", icon: Shield },
  ];

  // For drawing the horizontal rope underline bend effect
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ropePoints, setRopePoints] = useState({ x1: 0, x2: 0, bx: 0, by: 4 });

  useEffect(() => {
    if (hoveredIdx !== null && linkRefs.current[hoveredIdx]) {
      const el = linkRefs.current[hoveredIdx];
      if (el) {
        const left = el.offsetLeft;
        const width = el.offsetWidth;
        
        // Target coordinates
        setRopePoints({
          x1: left + 4,
          x2: left + width - 4,
          bx: left + width / 2,
          by: 14, // downward sag
        });
      }
    } else {
      // Default flat rope or tucked
      setRopePoints((prev) => ({ ...prev, by: 4 }));
    }
  }, [hoveredIdx]);

  // Handle dragging the vertical rope
  const handleRopeDrag = (_: any, info: any) => {
    const deltaY = info.offset.y;
    const progress = Math.min(Math.max((deltaY / 150) * 100, 0), 100);
    setPullProgress(progress);
    if (progress > 85 && !isOpen) {
      setIsOpen(true);
      setPullProgress(0); // reset after trigger
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setPullProgress(0);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-dark-bg md:bg-dark-bg/90 md:backdrop-blur-md border-b border-dark-border/60">
        <div className="w-full px-6 sm:px-10 lg:pl-[90px] lg:pr-12 h-16 md:h-28 flex items-center justify-between relative">
          
          {/* Logo */}
          <button 
            id="nav-logo-btn"
            onClick={() => onNavigate("hero")} 
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform">
              <svg width="42" height="48" viewBox="0 0 42 48" fill="none">
                <rect x="2" y="14" width="15" height="32" stroke="#D4A017" strokeWidth="1.6"/>
                <rect x="17" y="4" width="17" height="42" stroke="#D4A017" strokeWidth="1.6"/>
                <line x1="5.5" y1="21" x2="13.5" y2="21" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="5.5" y1="28" x2="13.5" y2="28" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="5.5" y1="35" x2="13.5" y2="35" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="21" y1="12" x2="30" y2="12" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="21" y1="20" x2="30" y2="20" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="21" y1="28" x2="30" y2="28" stroke="#D4A017" strokeWidth="1.2"/>
                <line x1="21" y1="36" x2="30" y2="36" stroke="#D4A017" strokeWidth="1.2"/>
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-sans font-black text-base md:text-xl tracking-wider text-slate-900 group-hover:text-[#ca8a04] transition-colors leading-none uppercase">
                LAVORINCORDA
              </span>
              <span className="block font-sans text-[8px] text-[#ca8a04] font-extrabold tracking-widest mt-1.5 leading-none uppercase">
                Edilizia Acrobatica
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 relative h-full">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  ref={(el) => { linkRefs.current[idx] = el; }}
                  onClick={() => onNavigate(item.id)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-6 py-2 rounded-lg font-display text-sm font-semibold transition-colors cursor-pointer flex items-center space-x-2 ${
                    isActive ? "text-[#ca8a04]" : "text-slate-700 hover:text-[#ca8a04]"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${hoveredIdx === idx ? 'scale-110 rotate-12 text-[#ca8a04]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Dynamic Interactive Underline Rope SVG */}
            <div className="absolute left-0 right-0 bottom-3 h-6 pointer-events-none overflow-visible">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <style>
                  {`.rope-stroke { stroke: #eab308; stroke-dasharray: 6 3; stroke-linecap: round; }`}
                </style>
                {hoveredIdx !== null && (
                  <>
                    {/* Shadow rope */}
                    <path
                      d={`M ${ropePoints.x1} 4 Q ${ropePoints.bx} ${ropePoints.by} ${ropePoints.x2} 4`}
                      fill="none"
                      stroke="#000"
                      strokeWidth="5"
                      className="opacity-40"
                    />
                    {/* Glowing active core rope */}
                    <path
                      d={`M ${ropePoints.x1} 4 Q ${ropePoints.bx} ${ropePoints.by} ${ropePoints.x2} 4`}
                      fill="none"
                      strokeWidth="2.5"
                      className="rope-stroke"
                    />
                    {/* Rope end nodes */}
                    <circle cx={ropePoints.x1} cy="4" r="3" fill="#f95d13" className="shadow" />
                    <circle cx={ropePoints.x2} cy="4" r="3" fill="#f95d13" className="shadow" />
                  </>
                )}
              </svg>
            </div>
          </nav>

          {/* Right Area: Interactive Pull-Rope Trigger + Direct CTA */}
          <div className="flex items-center space-x-6">

            {/* Quick Consultation CTA */}
            <button
              id="header-phone-cta"
              onClick={() => onNavigate("sicurezza")}
              className="hidden lg:flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-xl text-xs font-mono text-yellow-900 border border-yellow-200/50 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#ca8a04] animate-bounce" />
              <span>Sopralluogo Gratuito</span>
            </button>

            {/* The Rope Pull Trigger (Draggable/Clickable Widget) */}
            <div className="relative h-20 flex items-center select-none overflow-visible">

              {/* Hanging Rope Container */}
              <div className="relative w-10 flex flex-col items-center justify-start overflow-visible mt-10 md:-mt-4">
                
                {/* Ceiling Anchor Point */}
                <span className="w-3 h-1.5 bg-slate-300 rounded-b border border-slate-400 block shadow-sm z-10" />

                {/* Vertical Interactive Rope Path */}
                <motion.div
                  id="pull-rope-interactive"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 120 }}
                  dragElastic={0.15}
                  onDrag={handleRopeDrag}
                  onDragStart={() => setIsPulling(true)}
                  onDragEnd={() => {
                    setIsPulling(false);
                    if (pullProgress < 85) {
                      setPullProgress(0); // spring back
                    }
                  }}
                  animate={isPulling
                    ? { y: pullProgress * 1.2 }
                    : { y: [0, 8, 0] }
                  }
                  transition={isPulling
                    ? { type: "tween", duration: 0 }
                    : { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                  }
                  className="w-8 flex flex-col items-center cursor-ns-resize z-20"
                >
                  {/* Rope Shaft using layered SVG representing a climbing kernmantle braided rope */}
                  <svg className="w-2.5 h-16 pointer-events-none" viewBox="0 0 10 60" preserveAspectRatio="none">
                    <line x1="5" y1="0" x2="5" y2="60" stroke="#eab308" strokeWidth="5" strokeDasharray="3 1.5" strokeLinecap="round" />
                    <line x1="5" y1="0" x2="5" y2="60" stroke="#000000" strokeWidth="1.2" strokeDasharray="1 3" strokeLinecap="round" />
                  </svg>

                  {/* Figure-Eight Knot block and Carabiner weight */}
                  <motion.div 
                    className="w-7 h-7 bg-[#eab308] hover:bg-[#ca8a04] rounded-full border-2 border-white flex items-center justify-center shadow-lg -mt-1.5 relative group"
                    whileHover={{ scale: 1.15 }}
                    onClick={toggleMenu}
                  >
                    {/* Metal Carabiner Hook */}
                    <svg className="w-5 h-5 text-slate-950 transform rotate-12 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>

                    {/* Pull percentage splash glow effect */}
                    {pullProgress > 0 && (
                      <span 
                        className="absolute inset-0 bg-[#eab308] rounded-full opacity-30 animate-ping"
                        style={{ transform: `scale(${1 + pullProgress / 100})` }}
                      />
                    )}
                  </motion.div>
                </motion.div>
                

              </div>
            </div>


          </div>
        </div>
      </header>

      {/* Full Screen Interactive Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="tactical-menu-overlay"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 180, damping: 25 }}
            className="fixed inset-0 z-50 bg-white/99 backdrop-blur-md flex flex-col overflow-y-auto font-sans"
          >
            {/* Hanging Rope Rigging Top Accents */}
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-around pointer-events-none opacity-20">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-32 bg-[#eab308] shadow-md border-b-2 border-yellow-600 rounded-b-lg" />
              ))}
            </div>

            {/* Sticky Header inside Overlay */}
            <div className="w-full md:max-w-7xl md:mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between relative z-10 pt-4 md:pt-0 pb-2 md:pb-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-9 h-9">
                  <svg width="36" height="40" viewBox="0 0 42 48" fill="none">
                    <rect x="2" y="14" width="15" height="32" stroke="#D4A017" strokeWidth="1.6"/>
                    <rect x="17" y="4" width="17" height="42" stroke="#D4A017" strokeWidth="1.6"/>
                    <line x1="5.5" y1="21" x2="13.5" y2="21" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="5.5" y1="28" x2="13.5" y2="28" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="5.5" y1="35" x2="13.5" y2="35" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="21" y1="12" x2="30" y2="12" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="21" y1="20" x2="30" y2="20" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="21" y1="28" x2="30" y2="28" stroke="#D4A017" strokeWidth="1.2"/>
                    <line x1="21" y1="36" x2="30" y2="36" stroke="#D4A017" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <span className="block font-sans font-black text-lg tracking-wider text-slate-900 uppercase leading-none">LAVORINCORDA</span>
                  <span className="block font-sans text-[8px] text-[#ca8a04] font-extrabold tracking-widest mt-1 uppercase leading-none">Edilizia Acrobatica</span>
                </div>
              </div>

              {/* Close Button with rotate effect */}
              <button
                id="close-menu-overlay-btn"
                onClick={toggleMenu}
                className="p-3 rounded-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 cursor-pointer group hover:scale-105 transition-all"
              >
                <X className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300 text-[#ca8a04]" />
              </button>
            </div>

            {/* Menu Content Columns */}
            <div className="flex-1 w-full md:max-w-7xl md:mx-auto px-0 md:px-8 py-4 md:py-12 flex flex-col md:flex-row gap-0 md:gap-12 justify-center items-stretch relative z-10">

              {/* Column 1: Links hung on ropes structure */}
              <div className="w-full md:w-1/2 space-y-0 md:space-y-6 flex flex-col items-start">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ca8a04] font-bold flex items-center space-x-2 px-4 md:px-0 py-3 md:py-0">
                  <span className="h-1 w-6 bg-[#eab308] block" />
                  <span>Menu Di Navigazione</span>
                </span>

                <div className="w-full font-light">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        id={`menu-overlay-item-${item.id}`}
                        key={item.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        onClick={() => {
                          onNavigate(item.id);
                          setIsOpen(false);
                        }}
                        className="group flex items-center space-x-5 text-left w-full px-4 md:px-4 py-4 md:py-4 md:rounded-xl hover:bg-slate-50 border-b border-slate-100 md:border md:border-transparent hover:border-slate-200 transition-all cursor-pointer relative"
                      >
                        {/* Vertical rope indicator on focus */}
                        <span className="absolute left-0 bottom-0 top-0 w-1 bg-[#eab308] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300 rounded" />
                        
                        <div className="p-3 bg-yellow-50 group-hover:bg-[#eab308] group-hover:text-slate-950 rounded-xl text-[#ca8a04] transition-all duration-300 shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xl md:text-xl text-slate-800 group-hover:text-[#ca8a04] transition-all truncate">
                            {item.label}
                          </h4>
                          <span className="font-mono text-[10px] text-slate-500 capitalize">
                            Lavorincorda • Section {index + 1}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Tactical Info, Emergency Contacts, IRATA specs */}
              <div className="hidden md:block w-full md:w-1/2 p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 mb-2 uppercase tracking-wide">
                      Pronto Intervento & Ispezioni
                    </h3>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      Eseguiamo bonifiche urgenti e disgaggio di cornicioni franabili in tutta Italia. Calata su doppia fune conforme a normativa e tecniche certificate IRATA.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Certificazioni Team:</span>
                      <span className="text-[#ca8a04] font-bold">IRATA L3 / D.Lgs 81-08</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Sede Legale:</span>
                      <span className="text-slate-800">Genova / Milano, Italia</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Emergenza H24:</span>
                      <span className="text-yellow-600 font-bold hover:underline cursor-pointer">+39 347 1234567</span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">La Nostra Filosofia:</span>
                    <blockquote className="border-l-2 border-[#eab308] pl-4 text-slate-500 italic text-sm">
                      &ldquo;Sospesi nel vuoto per ripristinare il vostro spazio. Il ponteggio appartiene al passato; l'agilità in sicurezza è il nostro futuro.&rdquo;
                    </blockquote>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-2.5">
                    <span className="px-3 py-1 bg-yellow-50/70 text-yellow-900 text-[10px] font-mono rounded-full border border-yellow-100">#RopeAccess</span>
                    <span className="px-3 py-1 bg-yellow-50/70 text-yellow-900 text-[10px] font-mono rounded-full border border-yellow-100">#RiggerItalia</span>
                    <span className="px-3 py-1 bg-yellow-50/70 text-yellow-900 text-[10px] font-mono rounded-full border border-yellow-100">#LavoriInQuota</span>
                    <span className="px-3 py-1 bg-yellow-50/70 text-yellow-900 text-[10px] font-mono rounded-full border border-yellow-100">#D.Lgs81_08</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Tactical Footer inside Menu */}
            <div className="bg-slate-50 border-t border-slate-200 py-6 text-center text-[10px] font-mono text-slate-500 z-10">
              © {new Date().getFullYear()} Lavorincorda s.r.l. - Capitale Sociale €100.000 i.v. - P.IVA IT09121920L
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
