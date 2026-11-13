import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Building, Anchor, ArrowDown, Users, 
  Clock, AlertTriangle, PenTool, CheckCircle2 
} from "lucide-react";
import { SERVICES_DATA } from "../data";
import { QuoteInput, QuoteResult } from "../types";

export default function RappellingCalculator() {
  const [inputs, setInputs] = useState<QuoteInput>({
    buildingHeight: 30,
    facadeArea: 150,
    serviceId: "restauro",
    anchorsAvailable: "yes",
    hasUrgency: false,
  });

  const [results, setResults] = useState<QuoteResult>({
    estimatedCost: 0,
    ropeLengthRequired: 0,
    teamSizeRequired: 2,
    durationDaysEstimate: 3,
    safetyTier: "Standard A",
  });

  const activeService = SERVICES_DATA.find((s) => s.id === inputs.serviceId) || SERVICES_DATA[0];

  // Perform estimation math on input changes
  useEffect(() => {
    // 1. Base cost calculation
    let cost = activeService.baseCostPerMeter * inputs.buildingHeight * (inputs.facadeArea / 100);

    // 2. Multipliers
    let difficultyMult = activeService.difficultyFactor;
    
    // Height additions
    let heightMult = 1.0;
    if (inputs.buildingHeight > 80) {
      heightMult = 1.35; // wind risk & long calate
    } else if (inputs.buildingHeight > 45) {
      heightMult = 1.15;
    }

    // Anchor charges: If no structural hooks on roof, we must deploy a heavy mobile ballasting weight rig
    let anchorCharge = 0;
    if (inputs.anchorsAvailable === "no") {
      anchorCharge = 850; // extra cost for ballast weights
    } else if (inputs.anchorsAvailable === "partial") {
      anchorCharge = 400; // temporary anchor plates install
    }

    // Urgency fee
    let urgencyMult = inputs.hasUrgency ? 1.25 : 1.0;

    // Compile cost
    let finalCost = (cost * difficultyMult * heightMult * urgencyMult) + anchorCharge;
    finalCost = Math.round(finalCost);

    // 3. Crew sizing (Italian legal limits - mandate minimum 2 rope rigger experts)
    let teamSize = 2;
    if (inputs.buildingHeight > 85) {
      teamSize = 4; // requires extra emergency rescuer
    } else if (inputs.buildingHeight > 45) {
      teamSize = 3; 
    }

    // 4. Rope Length details (2 ropes per climber: 1 work line + 1 backup line + 15% knot waste)
    let singleClimberRopes = inputs.buildingHeight * 2; // dual lines
    let ropeReq = Math.round(singleClimberRopes * teamSize * 1.15);

    // 5. Build Days
    let duration = Math.ceil((inputs.facadeArea / 60) * difficultyMult * (inputs.hasUrgency ? 0.7 : 1.0));
    duration = Math.max(duration, inputs.buildingHeight > 70 ? 4 : 2);

    // 6. Safety Category based on rules
    let safety = "BASE - Classe 1";
    if (inputs.buildingHeight > 80) {
      safety = "CRITICAL - Classe 3 Spl.";
    } else if (inputs.buildingHeight > 40 || inputs.anchorsAvailable === "no") {
      safety = "MEDIO - Classe 2 Rig";
    }

    setResults({
      estimatedCost: finalCost,
      ropeLengthRequired: ropeReq,
      teamSizeRequired: teamSize,
      durationDaysEstimate: duration,
      safetyTier: safety,
    });
  }, [inputs, activeService]);

  const handleHeightSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      buildingHeight: parseInt(e.target.value, 10),
    }));
  };

  const handleAreaSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      facadeArea: parseInt(e.target.value, 10),
    }));
  };

  // Convert height directly to average building floors
  const getFloors = (meters: number) => {
    return Math.max(Math.round(meters / 3.2), 1);
  };

  return (
    <section id="calcolatore" className="py-24 bg-white border-t border-yellow-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="px-3 py-1 bg-yellow-100 border border-yellow-200 text-[#ca8a04] font-mono text-[10px] font-bold uppercase tracking-widest rounded-full inline-block animate-pulse">
            #InteractiveSimulator
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
            Preventivo Rapido & Simulatore di Discesa
          </h2>
          <p className="text-slate-600 mt-4 text-base leading-relaxed font-light">
            Seleziona il tipo di intervento e regola l'altezza dell'edificio. Trascina l'altezza o fai scorrere il cursore per osservare il comportamento dinamico delle funi e le specifiche di sicurezza richieste.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch font-sans">
          
          {/* Column A: Controls (Left) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/85 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            
            {/* Control Step 1: Services list */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-3 font-semibold">
                1. Seleziona Servizio Richiesto
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_DATA.map((srv) => (
                  <button
                    id={`calc-service-${srv.id}`}
                    key={srv.id}
                    onClick={() => setInputs((prev) => ({ ...prev, serviceId: srv.id }))}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                      inputs.serviceId === srv.id 
                        ? "bg-yellow-50/75 border-yellow-400 text-yellow-900 font-bold shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-350 hover:bg-slate-100/50"
                    }`}
                  >
                    <span className="font-display font-bold text-sm tracking-tight">{srv.title}</span>
                    <span className="text-[10px] uppercase font-mono text-slate-500 font-medium block truncate mt-1">
                      K: {srv.difficultyFactor}x • €{srv.baseCostPerMeter}/m
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control Step 2: Sliders Height / Area */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    2. Altezza dell'Edificio
                  </span>
                  <span className="text-sm font-display font-extrabold text-[#ca8a04]">
                    {inputs.buildingHeight}m <span className="text-slate-550 text-[11px] font-normal font-sans">({getFloors(inputs.buildingHeight)} Piani)</span>
                  </span>
                </div>
                <input
                  id="calc-height-slider"
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={inputs.buildingHeight}
                  onChange={handleHeightSlider}
                  className="w-full accent-[#eab308] bg-slate-100 h-2 rounded-lg cursor-pointer border border-slate-200 focus:outline-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                  <span>Edifici Bassi (10m)</span>
                  <span>Torre (60m)</span>
                  <span>Grattacielo (120m)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
                    3. Superficie Facciata/Intervento
                  </span>
                  <span className="text-sm font-display font-extrabold text-[#ca8a04]">
                    {inputs.facadeArea} mq <span className="text-slate-555 text-[11px] font-normal font-sans">(Metri Quadri Totali)</span>
                  </span>
                </div>
                <input
                  id="calc-area-slider"
                  type="range"
                  min="10"
                  max="600"
                  step="20"
                  value={inputs.facadeArea}
                  onChange={handleAreaSlider}
                  className="w-full accent-[#eab308] bg-slate-100 h-2 rounded-lg cursor-pointer border border-slate-200 focus:outline-none"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                  <span>Balcone Singolo (10mq)</span>
                  <span>Condominio (250mq)</span>
                  <span>Facciata Complessa (600mq)</span>
                </div>
              </div>
            </div>

            {/* Control Step 3: Fast Checkboxes Anchor/Urgent */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                  4. Ancoraggi Strutturali (Tetto)
                </span>
                <select
                  id="calc-anchors-select"
                  value={inputs.anchorsAvailable}
                  onChange={(e: any) => setInputs((prev) => ({ ...prev, anchorsAvailable: e.target.value }))}
                  className="w-full bg-white text-slate-800 border border-slate-200 p-3 rounded-xl font-sans text-xs focus:ring-1 focus:ring-yellow-405 focus:outline-none focus:border-[#eab308] font-medium shadow-sm"
                >
                  <option value="yes">Disponibili (Anelli certified EN 795)</option>
                  <option value="partial">Parziali (Travi idonee/camini stabili)</option>
                  <option value="no">Assenti (Necessita zavorre mobili)</option>
                </select>
              </div>

              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                  5. Urgenza Intervento
                </span>
                <button
                  id="calc-urgency-toggle"
                  onClick={() => setInputs((prev) => ({ ...prev, hasUrgency: !prev.hasUrgency }))}
                  className={`w-full p-3 rounded-xl border font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2.5 cursor-pointer transition-all ${
                    inputs.hasUrgency
                      ? "bg-[#eab308] hover:bg-[#ca8a04] border-yellow-450 text-slate-950 shadow-md shadow-yellow-500/10"
                      : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 ${inputs.hasUrgency ? 'text-slate-950 animate-bounce' : 'text-slate-500'}`} />
                  <span>{inputs.hasUrgency ? "PRONTO INTERVENTO ATTIVO" : "PROGRAMMAZIONE ORDINARIA"}</span>
                </button>
              </div>
            </div>

            {/* Diagnostics Stats Summary Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap gap-4 items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3 text-slate-800">
                <div className="p-2.5 bg-white border border-slate-150 rounded-xl text-[#ca8a04]">
                  <PenTool className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 leading-none">Rigor Sicurezza</span>
                  <span className="font-mono text-xs font-bold text-slate-800">{results.safetyTier}</span>
                </div>
              </div>
              <div className="font-mono text-[10px] text-slate-600 leading-relaxed text-right max-w-xs">
                In ottemperanza al <span className="text-yellow-700 font-bold">D.Lgs. 81/08 Allegato XXI</span>, ogni cantiere ospita un minimo di 2 addetti muniti di attestato fune.
              </div>
            </div>

          </div>

          {/* Column B: Dynamic Rappelling Visualizer (Right) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between items-stretch min-h-[500px] shadow-sm">
            
            {/* Visualizer header metrics */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="font-mono text-xs uppercase text-slate-700 font-bold tracking-wider flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span>Simulatore Calata Doppia</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-50 font-mono text-[9px] text-slate-500 border border-slate-200">
                VOB-RIG v4.2
              </span>
            </div>

            {/* Dynamic Interactive Climber and Building Grid */}
            <div className="flex-1 my-8 flex items-stretch justify-center gap-10 relative">
              
              {/* Vertical Height scale indicators */}
              <div className="flex flex-col justify-between font-mono text-[9px] text-slate-505 py-2 border-r border-slate-100 pr-3 relative">
                <span className="font-bold text-slate-700">120m</span>
                <span>100m</span>
                <span>80m</span>
                <span>60m</span>
                <span>40m</span>
                <span>20m</span>
                <span className="font-bold text-slate-700">0m - Suolo</span>
                
                {/* Horizontal line marker at current climber height */}
                <div 
                  className="absolute left-0 right-0 h-px bg-[#eab308]/60"
                  style={{ bottom: `${(inputs.buildingHeight / 120) * 100}%` }}
                />
              </div>

              {/* Building Grid container with Climber */}
              <div className="flex-1 max-w-[170px] bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden flex justify-end shadow-inner">
                
                {/* Windows architectural facade grid */}
                <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2 opacity-35">
                  {[...Array(36)].map((_, i) => (
                    <span key={i} className="bg-white rounded border border-slate-150 h-6 block shadow-xs" />
                  ))}
                </div>

                {/* Vertical Steel Cable / Braided Rope Guide */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-250 z-0 flex justify-center">
                  {/* Tension Rope with braided stripe */}
                  <div className="w-0.5 h-full bg-[#eab308] scale-x-125 opacity-80" />
                </div>

                {/* Interactive Climber Node with Dynamic Placement */}
                <motion.div
                  id="simulator-climber-avatar"
                  animate={{ bottom: `${Math.max((inputs.buildingHeight / 120) * 100 - 10, 5)}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="absolute left-3 w-7 h-11 flex flex-col items-center justify-center z-10 select-none cursor-ns-resize"
                  title="Il tuo rinvio d'alta quota"
                >
                  {/* Vertical Sway connection wire */}
                  <div className="absolute -top-32 w-px h-32 bg-yellow-500/30 stroke-dasharray-2" />

                  {/* High Quality Minimal Climber Vector Silhouette */}
                  <svg className="w-7 h-7 text-[#ca8a04] drop-shadow-[0_2px_8px_rgba(234,179,8,0.3)] fill-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="4" r="2" fill="#fff" />
                    {/* Harness climber posture */}
                    <path d="M12 7c-1.1 0-2 .9-2 2v6l-3.5 2.5c-.3.2-.5.5-.5.8v2.2c0 .6.4 1 1 1h1.5c.4 0 .8-.2 1-.5l1.5-1.5h2l1.5 1.5c.2.3.6.5 1 .5H18c.6 0 1-.4 1-1v-2.2c0-.3-.2-.6-.5-.8L14 15V9c0-1.1-.9-2-2-2z" />
                  </svg>

                  {/* Safety Rappelling Carabiner Link Indicator */}
                  <div className="w-1.5 h-1.5 bg-[#eab308] rounded-full animate-ping z-20 mt-1" />
                  <span className="bg-[#eab308] text-slate-950 text-[8px] font-mono font-bold leading-none px-1 py-0.5 rounded mt-0.5 whitespace-nowrap shadow-md">
                    {inputs.buildingHeight}m
                  </span>
                </motion.div>

                {/* Ground Grassland indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-slate-200 border-t border-slate-300" />
              </div>

            </div>

            {/* Price Quote and Crew Spec Delivery Area */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              
              {/* Output Cost metrics */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase leading-none mb-1">
                    Stima Indicativa Intervento
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                      €{results.estimatedCost.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-mono font-medium">+ IVA</span>
                  </div>
                </div>
                
                {/* Crew indicators */}
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-slate-500 block leading-none mb-1">
                    Equipaggio Richiesto
                  </span>
                  <div className="flex items-center space-x-1.5 text-slate-800 font-display font-bold justify-end text-sm">
                    <Users className="w-4 h-4 text-[#ca8a04]" />
                    <span>{results.teamSizeRequired} Operatori</span>
                  </div>
                </div>
              </div>

              {/* Grid of details: Rope length, days, anchors */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px] p-3 bg-slate-50 rounded-2xl border border-slate-205 shadow-sm">
                <div className="space-y-1">
                  <span className="text-slate-500 uppercase block font-semibold">Metratura Corde</span>
                  <span className="text-slate-800 font-bold font-display text-xs block">
                    {results.ropeLengthRequired}m Corde Statiche
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 uppercase block font-semibold">Tempi Previsti</span>
                  <span className="text-slate-800 font-bold font-display text-xs block flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#ca8a04] mr-1" />
                    <span>~{results.durationDaysEstimate} Giorni</span>
                  </span>
                </div>
              </div>

              {/* Informative legal warning warning banner */}
              <div className="bg-yellow-50/75 border border-yellow-250 p-3 rounded-xl flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <span className="text-[10px] text-slate-600 leading-relaxed font-sans font-light">
                  *I calcoli si basano su tariffe standard di riggeraggio e lavori su fune. Compilando il modulo contatti sottostante un nostro preposto eseguirà un rilievo tecnico di ancoraggio definitivo.
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
