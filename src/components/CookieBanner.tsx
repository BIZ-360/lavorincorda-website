import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "lavorincorda_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6"
          role="dialog"
          aria-label="Cookie consent"
          aria-modal="false"
        >
          <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#eab308] via-[#D4A017] to-[#2E5090]" />

            <div className="px-4 py-4 sm:px-6 sm:py-5">
              {/* Main row */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon + text */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="mt-0.5 shrink-0 w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                    <Cookie size={18} className="text-[#D4A017]" strokeWidth={1.7} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-display font-bold text-slate-900 text-sm leading-tight">
                        Questo sito utilizza i cookie
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                        <ShieldCheck size={10} strokeWidth={2.2} /> GDPR
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mt-1">
                      Usiamo cookie tecnici essenziali e, con il tuo consenso, cookie analitici per migliorare l&apos;esperienza di navigazione.{" "}
                      <button
                        onClick={() => setShowDetails(v => !v)}
                        className="text-[#D4A017] hover:text-[#ca8a04] font-semibold underline-offset-2 hover:underline transition-colors cursor-pointer"
                      >
                        {showDetails ? "Nascondi dettagli" : "Maggiori informazioni"}
                      </button>
                    </p>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              { label: "Tecnici", desc: "Necessari per il funzionamento del sito. Non richiedono consenso.", always: true },
                              { label: "Analitici", desc: "Misurano le visite al sito per migliorare i contenuti.", always: false },
                              { label: "Marketing", desc: "Usati per mostrare annunci pertinenti alle tue preferenze.", always: false },
                            ].map(c => (
                              <div key={c.label} className="flex gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                <div className={`mt-0.5 w-3 h-3 rounded-full shrink-0 border-2 ${c.always ? "bg-[#eab308] border-[#eab308]" : "border-slate-300 bg-white"}`} />
                                <div>
                                  <p className="text-slate-800 font-semibold text-[11px]">{c.label}</p>
                                  <p className="text-slate-500 text-[10px] leading-relaxed mt-0.5">{c.desc}</p>
                                  {c.always && <span className="text-[9px] font-mono text-[#D4A017] font-bold uppercase tracking-wide">Sempre attivi</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col gap-2 shrink-0 sm:items-end">
                  <button
                    onClick={accept}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all border border-yellow-400 cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-px"
                  >
                    Accetta tutti
                  </button>
                  <button
                    onClick={decline}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all border border-slate-200 cursor-pointer whitespace-nowrap"
                  >
                    Solo tecnici
                  </button>
                </div>

                {/* Close / dismiss (same as decline) */}
                <button
                  onClick={decline}
                  aria-label="Chiudi"
                  className="absolute top-3 right-3 sm:static sm:self-start p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
