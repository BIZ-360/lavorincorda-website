import { useState } from "react";
import { 
  ShieldCheck, ShieldAlert, Award, FileText, 
  ChevronRight, Wrench, ChevronDown, CheckCircle2, Lock 
} from "lucide-react";
import { EQUIPMENT_DATA, CERTIFICATIONS_DATA } from "../data";

export default function SafetyShowcase() {
  const [selectedGear, setSelectedGear] = useState<string>(EQUIPMENT_DATA[0].id);
  const [openCertId, setOpenCertId] = useState<string | null>(CERTIFICATIONS_DATA[0].id);

  const activeGearItem = EQUIPMENT_DATA.find(g => g.id === selectedGear) || EQUIPMENT_DATA[0];

  const toggleCert = (id: string) => {
    setOpenCertId(openCertId === id ? null : id);
  };

  return (
    <section id="sicurezza" className="py-24 bg-white border-t border-yellow-400 relative overflow-hidden">
      
      {/* Background warning stripes on top margins (very subtle) */}

      {/* Radial ambient glow */}
      <div className="absolute right-[-20%] bottom-[-20%] w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="px-3.5 py-1.5 rounded-full bg-yellow-105 bg-yellow-100 border border-yellow-250 text-[#ca8a04] font-mono text-[10px] uppercase font-bold tracking-widest inline-block shadow-sm animate-pulse">
            #SafetyFirst
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
            Sicurezza e Certificazioni di Linea
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed font-sans font-light">
            Siamo abilitati per l'esecuzione di lavori temporanei in quota mediante funi, operando nel pieno rispetto di tutti gli adempimenti previsti dai vigenti decreti legislativi. Utilizziamo esclusivamente DPI di terza categoria certificati e costantemente verificati da tecnici interni abilitati.
          </p>
        </div>

        {/* Double-Column Grid of Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column A: Certifications and Law frameworks (Left - 7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-205 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-5.5 h-5.5 text-[#ca8a04]" />
              <h3 className="font-display font-bold text-xl text-slate-850">
                Quadro Normativo & Abilitazioni
              </h3>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
              Ogni nostro operatore frequenta corsi di aggiornamento periodici ed è munito di libretto formativo individuale. Di seguito le nostre principali abilitazioni strutturali e legislative:
            </p>

            {/* Custom Interactive Certifications Accordion */}
            <div className="space-y-3">
              {CERTIFICATIONS_DATA.map((cert) => {
                const isOpen = openCertId === cert.id;
                return (
                  <div
                    id={`cert-block-${cert.id}`}
                    key={cert.id}
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? "bg-[#fffbeb] border-yellow-405 border-yellow-400 shadow-md shadow-yellow-500/5" 
                        : "bg-white border-slate-201 border-slate-200 hover:border-slate-350"
                    }`}
                  >
                    <button
                      id={`cert-toggle-btn-${cert.id}`}
                      onClick={() => toggleCert(cert.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-3.5 pr-4">
                        <div className={`p-2 rounded-lg border transition-colors ${
                          isOpen ? 'bg-yellow-50 border-yellow-250 text-[#ca8a04]' : 'bg-slate-55 bg-slate-50 border-slate-201 border-slate-200 text-slate-400'
                        }`}>
                          <FileText className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-sm text-slate-800 group-hover:text-yellow-650">
                            {cert.name}
                          </h4>
                          <span className="font-mono text-[9px] text-slate-500 font-semibold uppercase leading-none block mt-0.5">
                            {cert.authority}
                          </span>
                        </div>
                      </div>

                      <div className="p-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500">
                        <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#ca8a04]' : ''}`} />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-200 bg-white text-xs text-slate-600 leading-relaxed space-y-3 font-sans font-light">
                        <p className="pt-3">{cert.description}</p>
                        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold session">Riferimento di Legge:</span>
                          <span className="font-mono text-[10px] text-yellow-650 font-bold bg-[#fffbeb] px-2 py-0.5 rounded border border-yellow-205">
                            {cert.lawReference}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column B: Interactive Equipment Showcase (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Selection list header */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4">
                <Wrench className="w-5 h-5 text-[#ca8a04]" />
                <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">
                  Attrezzatura Rigging Certificata
                </h3>
              </div>

              {/* Horizontal list of gears triggers with icons */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 font-sans">
                {EQUIPMENT_DATA.map((gear) => (
                  <button
                    id={`gear-pick-${gear.id}`}
                    key={gear.id}
                    onClick={() => setSelectedGear(gear.id)}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedGear === gear.id 
                        ? "bg-[#fffbeb] border-yellow-455 border-yellow-400 text-[#ca8a04] font-bold" 
                        : "bg-white border-slate-201 border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                    title={gear.name}
                  >
                    <Lock className={`w-4.5 h-4.5 mb-1 ${selectedGear === gear.id ? 'animate-pulse' : ''}`} />
                    <span className="text-[7.5px] font-mono leading-none truncate w-full text-center tracking-wide font-semibold block uppercase">
                      {gear.brand}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Focused Detailed gear specs card */}
            <div className="bg-white border border-slate-202 border-slate-200 p-6 rounded-3xl flex-1 flex flex-col justify-between relative shadow-sm">
              
              {/* Decorative target/carabiner mesh */}
              <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
                <svg className="w-24 h-24 text-slate-200" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="20" strokeWidth="1" />
                </svg>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-[9px] font-mono text-[#ca8a04] uppercase font-bold tracking-wider">
                    {activeGearItem.category} • DPI 3ª Cat.
                  </span>
                  <span className="text-slate-500 font-mono text-[10px] font-medium uppercase">
                    Modello: {activeGearItem.brand}
                  </span>
                </div>

                <h4 className="font-display font-extrabold text-xl text-slate-850">
                  {activeGearItem.name}
                </h4>

                <p className="text-slate-600 text-xs leading-relaxed font-sans font-light">
                  {activeGearItem.description}
                </p>

                {/* Technical specs block */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Carico di Rottura</span>
                    <span className="font-mono text-xs font-bold text-yellow-650 font-display block">
                      {activeGearItem.strength}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-202 border-slate-200 rounded-xl">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Certificazione Tecnica</span>
                    <span className="font-mono text-[9px] font-bold text-slate-700 block truncate" title={activeGearItem.certification}>
                      {activeGearItem.certification}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-201 border-slate-200 flex items-center justify-between text-slate-500 text-[10px] font-mono">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-655 text-[#eab308]" />
                  <span>Ispezione DPI valida H24</span>
                </span>
                <span>ID: LVC-{activeGearItem.id.toUpperCase()}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
