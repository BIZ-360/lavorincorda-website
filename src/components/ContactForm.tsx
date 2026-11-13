import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, Upload, FileCheck, CheckCircle, 
  MapPin, HelpCircle, HardHat, PhoneCall 
} from "lucide-react";
import { SERVICES_DATA } from "../data";

interface ContactFormProps {
  initialServiceId?: string;
}

export default function ContactForm({ initialServiceId = "restauro" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    servizioId: initialServiceId,
    piani: "3-5",
    messaggio: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | { name: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({ name: file.name, size: file.size });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({ name: file.name, size: file.size });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          nome: "",
          email: "",
          telefono: "",
          indirizzo: "",
          servizioId: initialServiceId,
          piani: "3-5",
          messaggio: "",
        });
        setUploadedFile(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contatti" className="py-24 bg-white border-t border-yellow-400 relative animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Double layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Explanatory text, contacts, cert badges */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="px-3.5 py-1.5 rounded-full bg-yellow-105 bg-yellow-100 border border-yellow-250 text-[#ca8a04] font-mono text-[10px] uppercase font-bold tracking-widest inline-block shadow-sm animate-pulse">
                #BookInspection
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 mt-4 tracking-tight">
                Richiedi un Sopralluogo Gratuito
              </h2>
              <p className="text-slate-600 mt-4 text-base leading-relaxed font-sans font-light">
                I nostri ingegneri e preposti d'alta quota eseguono valutazioni di fattibilità strutturale a titolo completamente gratuito. Compila il modulo e allega foto o file DWG del prospetto condominiale o stabilimento industriale.
              </p>
            </div>

            {/* Quick trust metrics */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-[#fffbeb] border border-yellow-250 text-[#ca8a04] rounded-2xl shadow-sm">
                  <MapPin className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-850 text-sm">Operatività Nazionale</h4>
                  <p className="text-slate-500 text-xs mt-0.5 font-light leading-relaxed">Presenti con squadre di pronto intervento a Milano, Torino, Genova, Bologna, Firenze e Roma.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-[#fffbeb] border border-yellow-250 text-[#ca8a04] rounded-2xl shadow-sm">
                  <PhoneCall className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-850 text-sm font-sans">Canale Consulenza</h4>
                  <p className="text-slate-500 text-xs mt-0.5 font-light leading-relaxed">
                    Sempre attivi per valutazioni tecniche urgenti via telefono o e-mail: <span className="text-[#ca8a04] font-semibold">info@lavorincorda.it</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quote of strict compliance */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono text-slate-705 text-slate-700 uppercase tracking-wider block mb-2 font-bold flex items-center animate-fade-in">
                <HardHat className="w-3.5 h-3.5 text-[#ca8a04] mr-1.5" />
                Incarico in Sicurezza (Art. 115)
              </span>
              <p className="text-slate-600 font-sans text-xs font-light leading-relaxed">
                Ogni preventivo Lavorincorda s.r.l. include l'elaborato tecnico di ancoraggio (ETA) e il POS (Piano Operativo di Sicurezza) redatto in conformità all'Allegato XV del Testo Unico Sicurezza.
              </p>
            </div>
          </div>

          {/* Right Column: Advanced Contact Form */}
          <div className="lg:col-span-7 bg-[#f8fafc] border border-slate-205 p-6 sm:p-8 rounded-3xl relative shadow-lg">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  id="inspection-contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-505 text-slate-500 block font-bold">
                        Nome Referente / Amministratore *
                      </label>
                      <input
                        id="form-nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Es. Mario Rossi"
                        className="w-full bg-white text-slate-900 border border-slate-201 border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                        E-mail di Contatto *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Es. mario.rossi@condominio.it"
                        className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                        Recapito Telefonico *
                      </label>
                      <input
                        id="form-telefono"
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        placeholder="Es. +39 347..."
                        className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                        Indirizzo del Cantiere / Citta *
                      </label>
                      <input
                        id="form-indirizzo"
                        type="text"
                        required
                        value={formData.indirizzo}
                        onChange={(e) => setFormData({ ...formData, indirizzo: e.target.value })}
                        placeholder="Es. Corso Sempione 15, Milano"
                        className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                        Intervento Richiesto *
                      </label>
                      <select
                        id="form-servizio"
                        value={formData.servizioId}
                        onChange={(e) => setFormData({ ...formData, servizioId: e.target.value })}
                        className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none font-medium"
                      >
                        {SERVICES_DATA.map((srv) => (
                          <option key={srv.id} value={srv.id} className="text-slate-900 bg-white">{srv.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                        Altezza Edificio (In Piani) *
                      </label>
                      <select
                        id="form-piani"
                        value={formData.piani}
                        onChange={(e) => setFormData({ ...formData, piani: e.target.value })}
                        className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none font-medium"
                      >
                        <option value="1-2" className="text-slate-900 bg-white">Piano Terra / 1-2 Piani (Fino a 7 metri)</option>
                        <option value="3-5" className="text-slate-900 bg-white">Condominio Basso / 3-5 Piani (Fino a 18 metri)</option>
                        <option value="6-10" className="text-slate-900 bg-white text-xs">Condominio Medio / 6-10 Piani (Fino a 32 metri)</option>
                        <option value="10plus" className="text-slate-900 bg-white text-xs">Torre / Oltre 10 Piani (Oltre 32 metri)</option>
                      </select>
                    </div>
                  </div>

                  {/* Flexible File Upload Box supporting Drag & Drop and Manual selection */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                      Prospetto o Foto dello Stato Attuale (Consigliato)
                    </label>
                    <div
                      id="upload-drag-zone"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors flex flex-col items-center justify-center cursor-pointer ${
                        isDragging 
                          ? "border-[#eab308] bg-[#fffbeb]" 
                          : uploadedFile 
                            ? "border-emerald-505 border-emerald-500 bg-emerald-50/50"
                            : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-sm"
                      }`}
                      onClick={triggerFileSelect}
                    >
                      <input
                        id="form-file-hidden-input"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.dwg"
                      />

                      {uploadedFile ? (
                        <>
                          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-650 rounded-2xl mb-2.5">
                            <FileCheck className="w-6 h-6 text-emerald-600" />
                          </div>
                          <span className="text-slate-800 text-xs font-semibold block truncate max-w-xs">{uploadedFile.name}</span>
                          <span className="text-[10px] text-slate-500 mt-1 font-mono">
                            {Math.round(uploadedFile.size / 1024)} KB • Caricato
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="p-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl mb-2.5">
                            <Upload className="w-6 h-6 text-[#ca8a04]" />
                          </div>
                          <span className="text-slate-700 text-xs font-semibold block animate-fade-in">Trascina qui l'immagine o clicca per caricarla</span>
                          <span className="text-[9px] text-slate-505 text-slate-500 mt-1 block font-light">Accetta PNG, JPG, CAD, PDF (Max 10MB)</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block font-bold">
                      Dettagli o Descrizione Problematiche
                    </label>
                    <textarea
                      id="form-messaggio"
                      rows={3}
                      value={formData.messaggio}
                      onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                      placeholder="Es. Presenti crepe vistose sul frontalino del balcone lato strada. Risanamento urgente necessario."
                      className="w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#eab308] focus:border-[#eab308] focus:outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-2">
                    <button
                      id="form-submit-trigger"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-slate-950 text-xs font-mono font-bold uppercase tracking-wider py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-yellow-500/10 cursor-pointer flex items-center justify-center space-x-2.5 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>REGISTRAZIONE IN CORSO...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>REGISTRA RICHIESTA SOPRALLUOGO</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  id="form-success-splash"
                  className="text-center py-16 px-4 space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 180 }}
                >
                  <div className="mx-auto w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Piano di Sicurezza Inizializzato!</h3>
                    <p className="text-slate-600 font-sans text-xs mt-2.5 leading-relaxed max-w-md mx-auto font-light">
                      Grazie, i dati di ancoraggio ed i file caricati sono stati inoltrati con successo. Un nostro tecnico preposto di <span className="text-[#ca8a04] font-semibold">Lavorincorda</span> ti ricontatterà entro 24 ore per confermare la data del sopralluogo sul cantiere.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left font-mono text-[10px] space-y-2.5 max-w-sm mx-auto shadow-sm">
                    <div className="flex justify-between pb-1 border-b border-slate-200">
                      <span className="text-slate-500">Ticket ID:</span>
                      <span className="text-[#ca8a04] font-bold">LVC-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between pb-1 border-b border-slate-200">
                      <span className="text-slate-500">Servizio:</span>
                      <span className="text-slate-700 uppercase truncate max-w-[150px]">
                        {SERVICES_DATA.find(s => s.id === formData.servizioId)?.title || "Lavori su corda"}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Status:</span>
                      <span className="text-emerald-700 font-semibold uppercase animate-pulse">Preposto Assegnato</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
