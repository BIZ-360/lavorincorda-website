import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight, ShieldCheck, Clock, Award, Hammer,
  HelpCircle, ChevronDown, Anchor, Minimize2, Check,
  Sparkles, ShieldAlert, Trees, Compass, AlertCircle, CheckCircle2,
  ChevronLeft, ChevronRight, X
} from "lucide-react";
import heroTower from "./assets/images/hero-tower.png";
import heroFacade from "./assets/images/hero-facade.jpg";
import teamPhoto from "./assets/images/rope_rigger_1782127171843.jpg";
import restauroFune from "./assets/images/restauro_fune_1782129803225.jpg";

// Components
import RopeNavbar from "./components/RopeNavbar";
import StatsBand from "./components/StatsBand";
import MasonryGallery from "./components/MasonryGallery";
import RappellingCalculator from "./components/RappellingCalculator";
import SafetyShowcase from "./components/SafetyShowcase";
import ContactForm from "./components/ContactForm";
import CookieBanner from "./components/CookieBanner";
import Preloader from "./components/Preloader";

// Data
import { SERVICES_DATA } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("restauro");
  const [faqOpenId, setFaqOpenId] = useState<number | null>(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewHoverStars, setReviewHoverStars] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Carousel indices (mobile only — desktop shows the full grid)
  const [servicesIdx, setServicesIdx] = useState(0);
  const [testimonialsIdx, setTestimonialsIdx] = useState(0);

  // Lock body scroll when review modal is open (works on iOS too)
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    if (reviewModalOpen) {
      const scrollY = window.scrollY;
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      html.style.overflow = 'hidden';
      return () => {
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        html.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [reviewModalOpen]);

  // Monitor screen scroll to update active menu link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "servizi", "calcolatore", "progetti", "sicurezza", "contatti"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleProjectQuoteRequest = (category: string) => {
    // Seek matching service ID from category
    const found = SERVICES_DATA.find(s => s.id === category || s.id.includes(category));
    if (found) {
      setSelectedServiceId(found.id);
    }
    handleNavigation("calcolatore");
  };

  const faqs = [
    {
      q: "Come avviene il lavoro su doppia fune in piena sicurezza?",
      a: "La tecnica acrobatica si basa sull'utilizzo di due funi ben distinte ancorate in modo indipendente sulla sommità del fabbricato: una fune di lavoro per lo spostamento verticale e una fune di sicurezza munita di dispositivo anticaduta automatico (Petzl ASAP). Ogni fune è testata per carichi di rottura superiori a 30 kN (circa 3 tonnellate), garantendo ridondanza assoluta in qualsiasi frazione di secondo."
    },
    {
      q: "Quali sono i vantaggi economici concreti rispetto al ponteggio?",
      a: "Scegliendo Lavorincorda s.r.l., elimini istantaneamente il costo di noleggio e montaggio dei ponteggi, la tassa di occupazione del suolo pubblico dovuto alle palificazioni stradali e gli antifurti perimetrali. Inoltre, l'assenza di scivoli d'allestimento riduce i tempi complessivi di cantiere fino al 60% e azzera il rischio di intrusioni malavitose dalle finestre."
    },
    {
      q: "Cosa succede se il condominio o l'edificio non presenta punti di ancoraggio sul tetto?",
      a: "Nessun problema. In assenza di anelli di ancoraggio fissi o linee vita (EN 795), le nostre squadre trasportano e collaudano zavorre mobili e contrappesi appositamente calibrati per l'edilizia acrobatica, oppure installano piastre di aggancio temporanee riutilizzabili sui solai interni, operando in rigorosa sicurezza senza intaccare la impermeabilizzazione."
    },
    {
      q: "Chi risponde in caso di controlli dell'Ispettorato del Lavoro?",
      a: "Tutti i nostri interventi sono regolati dall'Art. 116 del D.Lgs. 81/08. Prima dell'apertura del cantiere, il nostro preposto deposita all'organo di controllo il POS (Piano Operativo di Sicurezza) e l'elaborato tecnico con il calcolo dei tiranti d'ancoraggio. Tutta la responsabilità dei lavori su fune ricade civilmente e penalmente sulla nostra direzione tecnica."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-slate-800 flex flex-col justify-between">

      {/* Full-screen loading animation */}
      <Preloader />

      {/* Cookie consent banner */}
      <CookieBanner />

      {/* Decorative Interactive Navigation Drawer System */}
      <RopeNavbar onNavigate={handleNavigation} activeSection={activeSection} />

      <main className="flex-1">
        
        {/* SECTION 1: HERO */}
        <section
          id="hero"
          className="relative min-h-screen md:h-screen w-full overflow-hidden flex flex-col"
          style={{ background: '#F7F4EF', fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
            @keyframes heroUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
            @keyframes floatIn { from { opacity:0; transform:translateY(26px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
            .hero-lead { color: #1E293B; }
            .hero-title { color: #0F172A; }
            .hero-badge { color: #0F172A; }
            .hero-numbers { display: flex; justify-content: flex-start;  position: relative; z-index: 20; margin-top: -18px; }
            @media (max-width: 767px) {
              .hero-lead { color: #F1F5F9; text-shadow: 0 1px 14px rgba(15,23,42,.6); }
              .hero-title { color: #fff; text-shadow: 0 2px 22px rgba(15,23,42,.5); }
              .hero-badge { color: #F1F5F9; text-shadow: 0 1px 10px rgba(15,23,42,.6); }
            }
          `}</style>

          {/* Full-bleed background photo — workers on facade for mobile */}
          <div
            className="absolute md:hidden"
            style={{
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${heroFacade})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scale(1.04)',
            }}
          />
          {/* Full-bleed background photo — tower for desktop */}
          <div
            className="absolute hidden md:block"
            style={{
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${heroTower})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scale(1.04)',
            }}
          />

          {/* Golden glow */}
          <div className="absolute pointer-events-none" style={{ top: '34%', right: '18%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,160,23,.42) 0%, rgba(212,160,23,0) 68%)', filter: 'blur(20px)' }} />

          {/* Left gradient scrim — desktop only, light veil so the photo stays visible */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background: 'linear-gradient(96deg, rgba(247,244,239,.5) 0%, rgba(247,244,239,.22) 24%, rgba(247,244,239,0) 46%)' }} />
          {/* Top scrim — desktop only */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background: 'linear-gradient(180deg, rgba(247,244,239,.38) 0%, rgba(247,244,239,0) 14%)' }} />
          {/* Mobile-only readability overlay — keeps the photo visible */}
          <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: 'linear-gradient(180deg, rgba(15,23,42,.35) 0%, rgba(15,23,42,.18) 32%, rgba(15,23,42,.22) 62%, rgba(15,23,42,.55) 100%)' }} />

          {/* Main content */}
          <div
            className="relative flex-1 flex flex-col justify-center md:justify-start px-6 pb-16 pt-8 sm:px-10 sm:pb-20 md:pb-24 md:pt-4 lg:pl-[90px] lg:pr-12"
            style={{ zIndex: 20, maxWidth: 720, animation: 'heroUp .85s ease both' }}
          >
            <h1 className="hero-title" style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: .99, letterSpacing: '-1px', fontSize: 'clamp(30px, 5vw, 56px)' }}>
              Lavori su edifici<br />
              <span style={{ color: '#D4A017' }}>Senza ponteggio.</span>
            </h1>

            <div style={{ width: 78, height: 1.5, background: '#C7BBA5', margin: '22px 0 18px' }} />

            <p className="hero-lead" style={{ margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.55 }}>
              Specialisti nell'accesso su fune per manutenzione, restauro e pulizia di facciate, coperture e superfici esterne in tutta Italia — senza ponteggi.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 24 }}>
              <button
                onClick={() => handleNavigation("calcolatore")}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 26px', background: '#0F172A', color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: '1.6px', border: 'none', cursor: 'pointer', transition: 'all .22s', boxShadow: '0 16px 34px -16px rgba(15,23,42,.7)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1E293B'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0F172A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                RICHIEDI PREVENTIVO <ArrowRight size={19} color="#fff" strokeWidth={1.6} />
              </button>
              <button
                onClick={() => handleNavigation("progetti")}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 26px', border: '1.4px solid #A99C84', background: 'rgba(255,255,255,.45)', color: '#0F172A', fontSize: 13, fontWeight: 600, letterSpacing: '1.6px', cursor: 'pointer', transition: 'all .22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0F172A'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.75)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#A99C84'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.45)'; }}
              >
                I NOSTRI LAVORI <ArrowRight size={19} color="#0F172A" strokeWidth={1.6} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 24 }}>
              {['Oltre 15 anni di esperienza', 'Interventi in tutta Italia', 'Tecnologie certificate', 'Assicurazione completa'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={22} color="#D4A017" strokeWidth={1.5} />
                  <span className="hero-badge" style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Hero stats — numbers in their own separate container */}
            <div className="hero-numbers">
              <StatsBand />
            </div>
          </div>

          {/* Floating location pill — hidden on mobile to avoid overlap */}
          <div className="hidden sm:flex" style={{ position: 'absolute', zIndex: 25, top: '22%', right: '7%', alignItems: 'center', gap: 12, padding: '13px 22px', background: 'rgba(255,255,255,.62)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,.7)', borderRadius: 44, boxShadow: '0 18px 40px -18px rgba(15,23,42,.4)', animation: 'floatIn .9s .25s ease both' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#D4A017', boxShadow: '0 0 0 4px rgba(212,160,23,.25)', display: 'inline-block' }} />
            <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '.3px', color: '#0F172A' }}>Operiamo in tutta Italia</span>
          </div>


        </section>
        <section id="servizi" className="py-24 bg-white border-t border-yellow-400 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="px-3.5 py-1.5 rounded-full bg-yellow-100 border border-yellow-200 text-[#ca8a04] font-mono text-[10px] uppercase font-bold tracking-widest inline-block">
                #ServiziQuota
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 mt-4 tracking-tight">
                Cosa Facciamo ad Alta Quota
              </h2>
              <p className="text-slate-600 mt-4 text-base leading-relaxed font-light">
                Interventi mirati progettati per riqualificare superfici monumentali e residenziali senza causare disagi logistici agli inquilini.
              </p>
            </div>

            {/* Grid of Service Blocks — carousel on mobile, grid on md+ */}
            <div className="relative">
              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {SERVICES_DATA.map((srv, idx) => {
                return (
                  <div
                    id={`srv-home-block-${srv.id}`}
                    key={srv.id}
                    className={`${idx !== servicesIdx ? 'hidden md:flex' : 'flex'} shrink-0 w-full md:w-auto flex-col p-6 bg-slate-50 border border-slate-200 rounded-2xl justify-between group hover:border-[#eab308] hover:shadow-xl hover:shadow-yellow-500/5 transition-all hover:scale-[1.01]`}
                  >
                    <div>
                      {/* Building logo icon */}
                      <div className="h-12 w-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#eab308] group-hover:border-[#eab308] transition-all duration-300 shadow-sm">
                        <svg width="28" height="32" viewBox="0 0 42 48" fill="none">
                          <rect x="2" y="14" width="15" height="32" stroke="#D4A017" strokeWidth="1.8" className="group-hover:stroke-slate-950 transition-all"/>
                          <rect x="17" y="4" width="17" height="42" stroke="#D4A017" strokeWidth="1.8" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="5.5" y1="21" x2="13.5" y2="21" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="5.5" y1="28" x2="13.5" y2="28" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="5.5" y1="35" x2="13.5" y2="35" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="21" y1="12" x2="30" y2="12" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="21" y1="20" x2="30" y2="20" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="21" y1="28" x2="30" y2="28" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                          <line x1="21" y1="36" x2="30" y2="36" stroke="#D4A017" strokeWidth="1.3" className="group-hover:stroke-slate-950 transition-all"/>
                        </svg>
                      </div>

                      <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight mb-2 group-hover:text-[#ca8a04] transition-colors">
                        {srv.title}
                      </h3>
                      <span className="block font-mono text-[10px] text-amber-600 font-semibold mb-3 uppercase tracking-wider">
                        {srv.subtitle}
                      </span>
                      <p className="text-slate-600 font-sans text-xs leading-relaxed font-light mb-6">
                        {srv.description}
                      </p>

                      {/* Tick details list */}
                      <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-4">
                        {srv.fullDetails.slice(0, 3).map((det, dIdx) => (
                          <li key={dIdx} className="flex items-start space-x-2 text-[11px] text-slate-650">
                             <Check className="w-3.5 h-3.5 text-[#ca8a04] shrink-0 mt-0.5" />
                            <span className="font-sans">{det}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card bottom CTA */}
                    <button
                      id={`srv-estimate-cta-${srv.id}`}
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        handleNavigation("calcolatore");
                      }}
                      className="w-full py-3 bg-white group-hover:bg-[#eab308] text-slate-700 group-hover:text-slate-950 border border-slate-200 group-hover:border-[#eab308] transition-all duration-300 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      Calcola Preventivo
                    </button>
                  </div>
                );
              })}
            </div>
              {/* Mobile carousel nav buttons */}
              <div className="flex md:hidden justify-center items-center gap-4 mt-5">
                <button
                  onClick={() => setServicesIdx(i => Math.max(0, i - 1))}
                  className={`${servicesIdx === 0 ? 'opacity-30 pointer-events-none' : ''} w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setServicesIdx(i => Math.min(SERVICES_DATA.length - 1, i + 1))}
                  className={`${servicesIdx === SERVICES_DATA.length - 1 ? 'opacity-30 pointer-events-none' : ''} w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: CHI SIAMO - AL TUO SERVIZIO */}
        <section id="chi-siamo" className="py-24 bg-[#2E5090] border-t border-yellow-400 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Graphic Column Left with generated rigger image */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur opacity-10" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3] sm:aspect-square lg:aspect-[4/5] bg-white">
                  <img 
                    src={restauroFune}
                    alt="I nostri ragazzi al tuo servizio" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-6 text-white text-left">
                    <span className="block font-mono text-[10px] tracking-widest text-yellow-400 font-bold uppercase mb-1">Squadra Certificata</span>
                    <h4 className="font-display font-bold text-lg leading-tight text-white">Operatori su corda abilitati a doppia fune D.Lgs 81/08</h4>
                  </div>
                </div>
              </div>

              {/* Informational Column Right */}
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3.5 py-1.5 rounded-full bg-yellow-100 border border-yellow-250 text-[#ca8a04] font-mono text-[10px] uppercase font-bold tracking-widest inline-block">
                  #ChiSiamo
                </span>
                <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-2 tracking-tight">
                  I Nostri Ragazzi, al Tuo Servizio
                </h2>
                <div className="h-1.5 w-16 bg-[#eab308] rounded-full mb-6" />
                <p className="text-slate-300 text-base leading-relaxed font-light">
                  Lavorincorda s.r.l. nasce con l&apos;obiettivo di rivoluzionare l&apos;edilizia acrobatica in Italia. Abbandonando definitivamente i ponteggi a favore della doppia fune, la nostra squadra formata da tecnici specializzati esegue ripristini facciate, manutenzioni e interventi d&apos;urgenza ad alta quota.
                </p>
                <p className="text-slate-300 text-base leading-relaxed font-light">
                  Ogni singolo operatore possiede l&apos;attestato ministeriale per lavori in quota su fune e segue rigorosamente i protocolli di sicurezza nazionali ed europei. Questo ci permette di offrire un servizio rapido, silenzioso ed economico.
                </p>

                {/* Grid stats points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-yellow-400/10 text-[#eab308] rounded-lg border border-yellow-400/20">
                      <Check className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Professionalità Assoluta</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Operatori qualificati con patentino ministeriale.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 p-2 bg-yellow-400/10 text-[#eab308] rounded-lg border border-yellow-400/20">
                      <Check className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-sm">Pronto Intervento</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Messa in sicurezza entro 24/48 ore dalla chiamata.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleNavigation("calcolatore")}
                    className="bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-mono font-bold tracking-wider uppercase py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center space-x-2 border border-yellow-400"
                  >
                    <span>Calcola Costo Preventivo</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: THE ESTIMATE CALCULATION PANEL */}
        <RappellingCalculator />

        {/* SECTION 4: THE MASONRY IMAGE PORTFOLIO */}
        <MasonryGallery onQuoteRequested={handleProjectQuoteRequest} />

        {/* SECTION 5: SAFETY AND EQUIPMENT RIG DECK */}
        <SafetyShowcase />

        {/* SECTION 6: THE INSPECTION REGISTRATION FORM */}
        <ContactForm initialServiceId={selectedServiceId} />

        {/* SECTION: TRUSTPILOT REVIEW BANNER */}
        <section className="relative overflow-hidden border-t border-yellow-400">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">
            {/* Left: team photo */}
            <div className="relative h-64 lg:h-auto">
              <img
                src={teamPhoto}
                alt="Team Lavorincorda"
                className="w-full h-full object-cover object-center"
              />
            </div>
            {/* Right: dark navy content */}
            <div className="bg-[#2E5090] flex flex-col items-center justify-center px-6 py-12 sm:px-10 sm:py-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight mb-6">
                La tua opinione per noi è<br />fondamentale!
              </h2>
              <p className="text-blue-200 text-base leading-relaxed max-w-md mb-4">
                Ascoltare il tuo parere sui nostri lavori ci aiuta a migliorarci e a far sì che il nostro servizio centri perfettamente le tue esigenze.
              </p>
              <p className="text-blue-100 font-semibold text-base leading-relaxed max-w-md mb-10">
                Condividi la tua esperienza scrivendo la tua recensione direttamente qui!
              </p>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-slate-800 font-semibold text-sm px-8 py-4 border border-gray-200 shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                Scrivi una recensione su di noi
                <span className="flex items-center justify-center">
                  <svg width="26" height="30" viewBox="0 0 42 48" fill="none">
                    <rect x="2" y="14" width="15" height="32" stroke="#D4A017" strokeWidth="1.8"/>
                    <rect x="17" y="4" width="17" height="42" stroke="#D4A017" strokeWidth="1.8"/>
                    <line x1="5.5" y1="21" x2="13.5" y2="21" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="5.5" y1="28" x2="13.5" y2="28" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="5.5" y1="35" x2="13.5" y2="35" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="21" y1="12" x2="30" y2="12" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="21" y1="20" x2="30" y2="20" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="21" y1="28" x2="30" y2="28" stroke="#D4A017" strokeWidth="1.3"/>
                    <line x1="21" y1="36" x2="30" y2="36" stroke="#D4A017" strokeWidth="1.3"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION: DICONO DI NOI — TESTIMONIALS */}
        <section className="py-24 bg-white border-t border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 text-center mb-16">
              Dicono di noi
            </h2>
            <div className="relative">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {[
                { name: 'Stefano Raguso', date: '17 Giugno 2026', initials: 'S', color: '#7C3AED', review: "Apprezzo sinceramente l'impegno e la professionalità dimostrata dal personale dell'edilizia acrobatica. Ho notato come avete lavorato in squadra seguendo tutte le procedure di sicurezza." },
                { name: 'Enrico Qwerty', date: '16 Giugno 2026', initials: 'E', color: '#059669', avatar: true, review: 'Contattati per la posa di dissuasori per volatili. Cortesia e disponibilità nel sopralluogo, i lavori effettuati in tempi rapidi con professionalità. Prezzi accettabili.' },
                { name: 'Marco Gambini', date: '14 Giugno 2026', initials: 'MG', color: '#1D4ED8', review: 'Competenza, disponibilità e rapidità di intervento.' },
                { name: 'Marilisa Serena', date: '14 Giugno 2026', initials: 'M', color: '#374151', review: 'Ho avuto recentemente l\'occasione di conoscere Acrobatica di Desenzano del Garda per un intervento e sono rimasta molto soddisfatta. In futuro mi rivolgerò sempre a loro.' },
              ].map((r, rIdx) => (
                <div key={r.name} className={`${rIdx !== testimonialsIdx ? 'hidden sm:flex' : 'flex'} shrink-0 w-full sm:w-auto flex-col bg-white rounded-2xl p-6 shadow-sm border border-slate-100 gap-4`}>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: r.color }}>
                        {r.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm leading-tight">{r.name}</p>
                        <p className="text-slate-400 text-xs">{r.date}</p>
                      </div>
                    </div>
                    {/* Google G */}
                    <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                  </div>
                  {/* Stars + verified */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  {/* Review text */}
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">{r.review}</p>
                </div>
              ))}
            </div>
              {/* Mobile carousel nav buttons */}
              <div className="flex sm:hidden justify-center items-center gap-4 mt-5">
                <button
                  onClick={() => setTestimonialsIdx(i => Math.max(0, i - 1))}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTestimonialsIdx(i => Math.min(3, i + 1))}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* FOOTER COHESION HEADER */}
      <footer className="bg-[#2E5090] border-t border-yellow-400 text-slate-300 py-10 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
            
            {/* Logo description */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="flex items-center justify-center w-8 h-8">
                  <svg width="36" height="42" viewBox="0 0 42 48" fill="none">
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
                  <span className="block font-display font-extrabold text-sm tracking-tight text-white leading-none">LAVORINCORDA</span>
                  <span className="block font-mono text-[7px] text-white uppercase font-bold tracking-widest mt-1">Riggers & Acrobatica s.r.l.</span>
                </div>
              </div>
              <p className="text-xs text-white leading-relaxed font-sans font-light">
                Il ponteggio appartiene al passato. La nostra organizzazione gestisce cantieri acrobatici ad alta quota fornendo ripristino di calcestruzzo, lavaggi vetri e progettazione di sistemi di ancoraggio normati in tutta Italia.
              </p>
            </div>

            {/* Quick sections link */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                Sezioni Principali
              </h4>
              <ul className="space-y-2.5 text-xs text-white">
                <li><button onClick={() => handleNavigation("servizi")} className="hover:text-[#eab308] transition-colors cursor-pointer text-left">• Servizi edili su fune</button></li>
                <li><button onClick={() => handleNavigation("calcolatore")} className="hover:text-[#eab308] transition-colors cursor-pointer text-left">• Preventivo Rappelling</button></li>
                <li><button onClick={() => handleNavigation("progetti")} className="hover:text-[#eab308] transition-colors cursor-pointer text-left">• Gallery Masonry</button></li>
                <li><button onClick={() => handleNavigation("sicurezza")} className="hover:text-[#eab308] transition-colors cursor-pointer text-left">• DPI e D.Lgs 81/08</button></li>
              </ul>
            </div>

            {/* Technical support / compliance */}
            <div className="md:col-span-5 space-y-4 font-mono text-xs text-white h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  Dati Societari & Recapiti
                </h4>
                <div className="space-y-1.5 font-sans font-light text-xs text-white">
                  <p>Lavorincorda s.r.l. - Sede Amministrativa: Via Sempione 120, Milano</p>
                  <p>Filiale Operativa: Via XX Settembre, Genova</p>
                  <p>Partita IVA: IT09825410928 - Registrata alla C.C.I.A.A. di Milano</p>
                </div>
              </div>
              
              {/* Emergency Callout details */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block text-[8px] font-mono text-slate-400 font-bold uppercase leading-none">Preposto per Emergenze:</span>
                  <span className="text-slate-900 font-sans font-semibold text-xs mt-1 block hover:underline cursor-pointer">+39 347 1234567</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block leading-none">Sede Ingressi:</span>
                  <span className="text-slate-800 font-sans font-semibold text-xs mt-1 block">H24 Disponibile</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright policy detail */}
          <div className="pt-8 border-t border-slate-700 text-center font-mono text-[10px] text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© {new Date().getFullYear()} Lavorincorda s.r.l. Tutti i diritti riservati. Manutenzioni Acrobatiche Certificates.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:underline">Cookie Settings</a>
              <span>•</span>
              <a href="#" className="hover:underline">Codice Etico</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setReviewModalOpen(false);
                setReviewSubmitted(false);
                setReviewStars(0);
                setReviewName('');
                setReviewText('');
              }
            }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
            >
              {/* Handle bar mobile */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              <div className="px-6 sm:px-8 pt-4 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <svg width="32" height="36" viewBox="0 0 42 48" fill="none">
                      <rect x="2" y="14" width="15" height="32" stroke="#D4A017" strokeWidth="1.8"/>
                      <rect x="17" y="4" width="17" height="42" stroke="#D4A017" strokeWidth="1.8"/>
                      <line x1="5.5" y1="21" x2="13.5" y2="21" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="5.5" y1="28" x2="13.5" y2="28" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="5.5" y1="35" x2="13.5" y2="35" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="21" y1="12" x2="30" y2="12" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="21" y1="20" x2="30" y2="20" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="21" y1="28" x2="30" y2="28" stroke="#D4A017" strokeWidth="1.3"/>
                      <line x1="21" y1="36" x2="30" y2="36" stroke="#D4A017" strokeWidth="1.3"/>
                    </svg>
                    <div>
                      <p className="font-black text-sm tracking-wider text-slate-900 uppercase leading-none">LAVORINCORDA</p>
                      <p className="font-mono text-[9px] text-[#ca8a04] font-bold tracking-widest uppercase mt-0.5">Edilizia Acrobatica</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setReviewModalOpen(false);
                      setReviewSubmitted(false);
                      setReviewStars(0);
                      setReviewName('');
                      setReviewText('');
                    }}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {reviewSubmitted ? (
                  /* Thank you state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Grazie per la tua recensione!</h3>
                    <p className="text-slate-500 text-sm">Il tuo feedback è molto importante per noi. Lo pubblicheremo al più presto.</p>
                    <button
                      onClick={() => {
                        setReviewModalOpen(false);
                        setReviewSubmitted(false);
                        setReviewStars(0);
                        setReviewName('');
                        setReviewText('');
                      }}
                      className="mt-6 px-6 py-2.5 bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Chiudi
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900">La tua opinione conta!</h3>
                      <p className="text-slate-500 text-sm mt-1">Condividi la tua esperienza con Lavorincorda.</p>
                    </div>

                    {/* Star rating */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-2">Valutazione *</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewStars(star)}
                            onMouseEnter={() => setReviewHoverStars(star)}
                            onMouseLeave={() => setReviewHoverStars(0)}
                            className="p-1 transition-transform hover:scale-110 cursor-pointer"
                          >
                            <svg className="w-8 h-8" viewBox="0 0 20 20" fill={(reviewHoverStars || reviewStars) >= star ? '#eab308' : '#e2e8f0'}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          </button>
                        ))}
                      </div>
                      {reviewStars > 0 && (
                        <p className="text-[#ca8a04] font-mono text-xs mt-1">
                          {['', 'Scarso', 'Sufficiente', 'Buono', 'Ottimo', 'Eccellente'][reviewStars]}
                        </p>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Nome e Cognome *</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="Es. Mario Rossi"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#eab308] focus:ring-2 focus:ring-[#eab308]/20 transition-all"
                      />
                    </div>

                    {/* Review text */}
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">La tua recensione *</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Descrivi la tua esperienza con Lavorincorda..."
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#eab308] focus:ring-2 focus:ring-[#eab308]/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="button"
                      disabled={!reviewStars || !reviewName.trim() || !reviewText.trim()}
                      onClick={() => setReviewSubmitted(true)}
                      className="w-full py-3.5 bg-[#eab308] hover:bg-[#ca8a04] disabled:bg-slate-200 disabled:text-slate-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      Invia Recensione
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-mono">I campi contrassegnati con * sono obbligatori</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
