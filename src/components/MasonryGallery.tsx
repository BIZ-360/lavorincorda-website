import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye, MapPin, X, Calendar,
  ArrowRight, HardHat, ShieldAlert, Zap, LayoutGrid, ChevronLeft, ChevronRight
} from "lucide-react";
import { ProjectType } from "../types";
import { PROJECTS_DATA } from "../data";

interface MasonryGalleryProps {
  onQuoteRequested: (serviceId: string) => void;
}

export default function MasonryGallery({ onQuoteRequested }: MasonryGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (dir: 'prev' | 'next') => {
    if (!galleryCarouselRef.current) return;
    const width = galleryCarouselRef.current.offsetWidth;
    galleryCarouselRef.current.scrollBy({ left: dir === 'next' ? width : -width, behavior: 'smooth' });
  };

  const categories = [
    { id: "all", label: "Tutti i Lavori", icon: LayoutGrid },
    { id: "pulizia", label: "Pulizia Vetrate", icon: Zap },
    { id: "restauro", label: "Restauro & Ripristino", icon: HardHat },
    { id: "linee-vita", label: "Linee Vita & Ispezioni", icon: ShieldAlert },
  ];

  const filteredProjects = activeFilter === "all" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  return (
    <section id="progetti" className="py-24 bg-white border-t border-yellow-400 relative">
      
      {/* Structural safety background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-yellow-105 bg-yellow-100 border border-yellow-200 text-[#ca8a04] font-mono text-[10px] uppercase font-bold tracking-widest inline-block shadow-sm animate-pulse">
            #PortfolioAcrobatico
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
            I Nostri Lavori in Corda
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed font-light">
            Una selezione di interventi ad alta quota documentati sul campo. Diamo forma a soluzioni veloci, invisibili e ad impatto zero su qualsiasi tipo di prospetto architettonico.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                id={`filter-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`${cat.id === 'all' ? 'hidden sm:flex' : 'flex'} ${cat.id === 'linee-vita' ? 'col-span-2 col-start-2' : 'col-span-2'} items-center space-x-2 px-5 py-2.5 rounded-xl font-display text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  isActive 
                    ? "bg-[#eab308] text-slate-950 border-[#eab308] shadow-md shadow-yellow-500/10" 
                    : "bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800 hover:border-slate-350 shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid-based Image Gallery — carousel on mobile, grid on md+ */}
        <div className="relative">
        <div ref={galleryCarouselRef} className="carousel-scroll flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-2 md:pb-0">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 18 }}
                onClick={() => setSelectedProject(project)}
                className="snap-start shrink-0 w-full md:w-auto flex flex-col h-full relative bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden group cursor-pointer hover:border-[#eab308]/70 transition-all shadow-md hover:shadow-xl hover:shadow-yellow-500/5 text-left"
              >
                {/* Visual Image container with uniform height for clean layout */}
                <div className="relative w-full h-64 overflow-hidden shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Dark Radial Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Top-Right Intervention Stats Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800 flex items-center space-x-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
                    <span>H: {project.height}m</span>
                  </div>
                </div>

                {/* Card Information footer - flex-1 pushes hover reveal upwards uniformly */}
                <div className="p-5 flex-1 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[#ca8a04] uppercase mb-1 font-bold">
                      <span>{project.category}</span>
                      <span className="text-slate-350 font-normal">•</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-800 mb-1.5 group-hover:text-yellow-650 transition-colors">
                      {project.title}
                    </h3>

                    {/* Location info */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Invisible Reveal Details text on Hover */}
                  <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-yellow-655 text-yellow-650 font-bold tracking-wide uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Esplora Intervento</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#eab308]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
          {/* Mobile carousel nav buttons */}
          <div className={`${filteredProjects.length <= 1 ? 'hidden' : 'flex'} md:hidden justify-center items-center gap-4 mt-5`}>
            <button
              onClick={() => scrollGallery('prev')}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollGallery('next')}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:border-[#eab308] hover:text-[#ca8a04] transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty state callback */}
        {filteredProjects.length === 0 && (
          <div className="p-16 text-center bg-slate-50 border border-slate-200 rounded-2xl max-w-xl mx-auto animate-fade-in">
            <span className="text-slate-800 text-3xl font-bold font-display block mb-2">Humm... Nessun file trovato</span>
            <p className="text-slate-500 text-sm">Stiamo digitalizzando i restanti archivi storici. Contattaci per referenze di questa specifica area!</p>
          </div>
        )}

      </div>

      {/* Immersive Detail Lightbox Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            id="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              id="lightbox-container"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="bg-white border border-slate-205 rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button on top corner */}
              <button
                id="lightbox-close-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 shadow transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#ca8a04]" />
              </button>

              {/* Graphic Column Left (Image) */}
              <div className="w-full md:w-1/2 relative bg-slate-50 flex items-center justify-center min-h-[300px] md:min-h-full">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover max-h-[450px] md:max-h-full absolute inset-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Specification Content Column Right */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-[#ca8a04] uppercase mb-1 font-bold">
                    <span>{selectedProject.category}</span>
                    <span className="text-slate-350">•</span>
                    <span>Completato nel {selectedProject.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* Technical Meta Deck (Gauges) */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none font-semibold">Quota Operativa</span>
                      <span className="text-lg font-display font-extrabold text-slate-800 mt-1.5 block">H: {selectedProject.height}m</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none font-semibold">Punti Ancoraggio</span>
                      <span className="text-lg font-display font-extrabold text-slate-800 mt-1.5 block">{selectedProject.ropeHookups} Linee fune</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="block text-[9px] font-mono text-slate-505 uppercase tracking-widest leading-none font-semibold">Sito Cantiere</span>
                      <span className="text-slate-700 mt-1 truncate block font-sans text-xs font-semibold">{selectedProject.location}</span>
                    </div>
                    <div className="p-3 bg-[#fffbeb] border border-yellow-20a border-yellow-200 rounded-xl">
                      <span className="block text-[9px] font-mono text-[#ca8a04] uppercase tracking-widest leading-none font-bold">Tempo Esecuzione</span>
                      <span className="text-lg font-display font-extrabold text-slate-800 mt-1.5 block">{selectedProject.completionDays} Giorni</span>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-mono text-[#ca8a04] uppercase tracking-wider font-bold">Relazione Tecnica:</span>
                    <p className="text-slate-600 text-sm leading-relaxed font-sans font-light">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Footer and Interactive Quote Redirection */}
                <div className="pt-4 border-t border-slate-202 border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="text-left font-sans">
                    <span className="block text-[10px] font-mono text-slate-450 uppercase leading-none">Codice Sicurezza</span>
                    <span className="font-mono text-xs font-bold text-slate-700 mt-1 block">UNI EN ISO 9001/45001</span>
                  </div>
                  
                  <button
                    id={`request-similar-cta-${selectedProject.id}`}
                    onClick={() => {
                      onQuoteRequested(selectedProject.category);
                      setSelectedProject(null);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer shadow shadow-yellow-500/10"
                  >
                    <span>Richiedi Analisi</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
