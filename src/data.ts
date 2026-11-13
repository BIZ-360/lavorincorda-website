import { ServiceType, ProjectType, EquipmentItem, CertificationItem } from "./types";
import {
  imgFacadePulizia,
  imgCopertiManutenzione,
  imgSistemiAccesso,
  imgCityOverlook,
  imgRestauoFune,
  imgSpazioConfinato,
} from "./assets/images/index";

export const SERVICES_DATA: ServiceType[] = [
  {
    id: "restauro",
    title: "Restauro & Ripristino Balconi",
    subtitle: "Risanamento cemento armato e tinteggiatura acrobatica",
    description: "Interveniamo in tempi record per riparare porzioni danneggiate di frontalini, sottobalconi e cornici marcapiano soggette a distacco di intonaco, senza impiantare ingombranti ponteggi a terra.",
    fullDetails: [
      "Demolizione controllata delle parti ammalorate",
      "Spazzolatura dei ferri d'armatura scoperti ed eliminazione della ruggine",
      "Passivazione dei ferri con malte cementizie protettive monocomponenti",
      "Ricostruzione volumetrica con malta antiritiro tixotropica fibrorinforzata",
      "Rasatura finale e tinteggiatura con pittura ai silossanici idrorepellente",
      "Nessun costo di occupazione del suolo pubblico dovuto a ponteggi"
    ],
    icon: "Hammer",
    baseCostPerMeter: 48,
    difficultyFactor: 1.2
  },
  {
    id: "pulizia",
    title: "Pulizia Vetrate Facciate Continue",
    subtitle: "Lavaggio professionale di vetri e Alucobond ad alta quota",
    description: "Servizi di pulizia ordinaria e straordinaria di superfici vetrate e facciate in metallo continuo su grattacieli, hotel e complessi aziendali tramite l'uso di acqua osmotizzata pura.",
    fullDetails: [
      "Lavaggio vetri con spazzole ad acqua osmotizzata purificata al 100%",
      "Eliminazione aloni, residui calcarei e polveri sottili industriali",
      "Trattamento nanotecnologico antistatico per rallentare l'accumulo di sporco",
      "Interventi su facciate continue inclinate, cupole e geodetiche",
      "Pulizia approfondita di infissi in alluminio e guarnizioni di tenuta"
    ],
    icon: "Sparkles",
    baseCostPerMeter: 18,
    difficultyFactor: 0.95
  },
  {
    id: "linee-vita",
    title: "Installazione Linee Vita & Ancoraggi",
    subtitle: "Progettazione e certificazione sistemi anticaduta norma EN 795",
    description: "Installiamo sistemi di ancoraggio flessibili o rigidi (linee vita) indispensabili per i successivi accessi in sicurezza sulle coperture di edifici condominiali e industriali.",
    fullDetails: [
      "Studio di fattibilità tecnica ed elaborato grafico redatto da ingegneri abilitati",
      "Installazione linee vita Tipo C (linee flessibili) e Tipo A (ancoraggi singoli)",
      "Fissaggi effettuati su cemento armato, legno o strutture metalliche mediante ancorante chimico o meccanico certificato",
      "Prove di trazione in situ con estrattore idraulico tarato",
      "Rilascio dell'attestato di corretto montaggio e del libretto di manutenzione"
    ],
    icon: "ShieldAlert",
    baseCostPerMeter: 240,
    difficultyFactor: 1.3
  },
  {
    id: "messa-sicurezza",
    title: "Messa in Sicurezza Urgente",
    subtitle: "Asportazione intonaci instabili e installazione reti di protezione",
    description: "In caso di distacchi imprevisti o pericolo imminente di caduta calcinacci, interveniamo d'urgenza calandoci dall'alto per mettere in sicurezza e avvolgere balconi e cornicioni con reti contenitive.",
    fullDetails: [
      "Pronto intervento entro 24/48 ore con sopralluogo immediato",
      "Disgaggio manuale controllato delle parti instabili (intonaco, tegole, fregi)",
      "Installazione di reti elettrosaldate o in polipropilene ad alta tenacità per contenere cedimenti",
      "Rilascio di relazioni tecniche fotografiche post-intervento",
      "Predisposizione del piano di ripristino definitivo"
    ],
    icon: "TriangleAlert",
    baseCostPerMeter: 28,
    difficultyFactor: 1.15
  },
  {
    id: "allontanamento",
    title: "Allontanamento Volatili & Nidi",
    subtitle: "Installazione barriere antivolatile fisiche ed elettriche",
    description: "Freniamo l'usura provocata dal guano di piccioni ed altri volatili posando aghi in acciaio inox, reti anti-intrusione in nylon o sistemi a filo elettrostatico su cornicioni, nicchie e grondaie.",
    fullDetails: [
      "Pulizia preventiva e disinfezione virucida approfondita delle superfici coperte da guano",
      "Installazione dissuasori meccanici ad aghi in acciaio inox flessibile con base in policarbonato",
      "Montaggio reti anti-intrusione in nylon stabilizzato UV, quasi invisibili ad occhio nudo",
      "Copertura totale di cavedi, chiostrine, nicchie monumentali e canali di gronda"
    ],
    icon: "Egg",
    baseCostPerMeter: 22,
    difficultyFactor: 0.85
  },
  {
    id: "arboricoltura",
    title: "Potatura Alberi ad Alto Fusto",
    subtitle: "Treeclimbing e abbattimenti controllati in spazi confinati",
    description: "Ci arrampichiamo direttamente sulla struttura degli alberi monumentali utilizzando la tecnica del treeclimbing, consentendo tagli mirati anche in parchi storici o cortili interni dove le piattaforme autocarrate non possono entrare.",
    fullDetails: [
      "Potatura di rimonda del secco e diradamento della chioma",
      "Riduzione controllata e bilanciamento statico di grandi branche",
      "Abbattimento controllato frazionato mediante sistemi di carrucole, frizioni e corde di servizio",
      "Consolidamento statico di branche codominanti con tiranti in fibra sintetica elastica",
      "Cura fitosanitaria con operatore certificato ETW (European Tree Worker)"
    ],
    icon: "Trees",
    baseCostPerMeter: 110,
    difficultyFactor: 1.4
  }
];

export const PROJECTS_DATA: ProjectType[] = [
  {
    id: "project-1",
    title: "Pulizia e Manutenzione Facciate",
    category: "pulizia",
    location: "Milano, Vetrate Skype Tower",
    height: 75,
    ropeHookups: 6,
    year: "2025",
    completionDays: 8,
    imageUrl: imgFacadePulizia,
    description: "Operazione ad alta quota per la pulizia idrofobica e manutenzione sigillante delle vetrate continue e dei pannelli in Alucobond di un grattacielo direzionale. Eseguito interamente a doppia corda con acqua osmotizzata calda prodotta sul posto.",
    aspectRatio: "portrait",
    featured: true
  },
  {
    id: "project-2",
    title: "Manutenzione Coperti",
    category: "linee-vita",
    location: "Torino, Stabilimento Industriale",
    height: 28,
    ropeHookups: 14,
    year: "2026",
    completionDays: 6,
    imageUrl: imgCopertiManutenzione,
    description: "Installazione di sistemi di scale in alluminio antiscivolo, passerelle metalliche di transito e linee di vita fisse su coperture industriali piane e inclinate con guaina bituminosa o membrane sintetiche.",
    aspectRatio: "landscape",
    featured: true
  },
  {
    id: "project-3",
    title: "Sistemi di Accesso",
    category: "linee-vita",
    location: "Genova, Coperture Condominiali",
    height: 35,
    ropeHookups: 10,
    year: "2025",
    completionDays: 4,
    imageUrl: imgSistemiAccesso,
    description: "Progettazione e posa in opera chiavi in mano di pali di ancoraggio singoli in acciaio zincato e sistemi anticaduta combinati con piastre di ripartizione del carico per consentire l'accesso sicuro degli operatori.",
    aspectRatio: "square",
    featured: true
  },
  {
    id: "project-4",
    title: "Messa in Sicurezza e Rigging",
    category: "messa-sicurezza",
    location: "Bologna, Torre Direzionale",
    height: 82,
    ropeHookups: 8,
    year: "2026",
    completionDays: 5,
    imageUrl: imgCityOverlook,
    description: "Ispezione acrobatica ed asportazione immediata delle porzioni di muratura e intonaco instabili a rischio caduta su pubblica via. Sospensione programmata con sistemi pesanti di calata e carrucole.",
    aspectRatio: "portrait",
    featured: true
  },
  {
    id: "project-5",
    title: "Restauro Edifici Storici",
    category: "restauro",
    location: "Firenze, Facciata Basilica",
    height: 48,
    ropeHookups: 4,
    year: "2025",
    completionDays: 12,
    imageUrl: imgRestauoFune,
    description: "Restauro conservativo con micropreparazione superficiale delle modanature e passivazione dei ferri d'armatura di balconi storici ed elementi marmorei, condotto salvaguardando l'estetica monumentale senza ponteggi.",
    aspectRatio: "landscape",
    featured: true
  },
  {
    id: "project-6",
    title: "Spazi Confinati e Silos",
    category: "pulizia",
    location: "Marghera, Stabilimento Chimico",
    height: 55,
    ropeHookups: 2,
    year: "2026",
    completionDays: 3,
    imageUrl: imgSpazioConfinato,
    description: "Intervento speciale per la bonifica interna, lavaggio e ispezione strutturale non distruttiva ad ultrasuoni di un silos verticale di stoccaggio con operatore equipaggiato con dispositivi di respirazione autonomi.",
    aspectRatio: "square",
    featured: true
  }
];

export const EQUIPMENT_DATA: EquipmentItem[] = [
  {
    id: "eq-1",
    name: "Petzl Astro Bod Fast",
    category: "harness",
    brand: "Petzl",
    certification: "CE EN 361, EN 358, EN 813",
    strength: "15 kN (Attacchi)",
    description: "Imbracatura completa per l'accesso difficile con bloccante ventrale CROLL L integrato, progettata per favorire l'efficacia e il comfort durante la risalita su corda.",
    image: "Shield"
  },
  {
    id: "eq-2",
    name: "Petzl RIG",
    category: "descender",
    brand: "Petzl",
    certification: "CE EN 12841 tipo C",
    strength: "150 kg Carico Massimo",
    description: "Discensore autofrenante compatto progettato per gli operatori esperti del lavoro su fune. Impugnatura ergonomica che consente di controllare comodamente la discesa.",
    image: "Zap"
  },
  {
    id: "eq-3",
    name: "Corda Static Teufelberger",
    category: "rope",
    brand: "Teufelberger",
    certification: "CE EN 1891 tipo A",
    strength: "32 kN (Senza nodi)",
    description: "Corda semistatica ad alte prestazioni, con anima in polyamide e calza protettiva intrecciata che assicura stabilità strutturale costante sotto carico e massima resistenza all'abrasione dei bordi.",
    image: "Activity"
  },
  {
    id: "eq-4",
    name: "Petzl ASAP LOCK",
    category: "backup",
    brand: "Petzl",
    certification: "CE EN 353-2, EN 12841 tipo A",
    strength: "Blocco dinamico",
    description: "Anticaduta di tipo guidato su corda di sicurezza con funzione di bloccaggio integrata. Arresta la caduta, lo scivolamento o la discesa incontrollata, operando anche su corda verticale inclinata.",
    image: "Lock"
  },
  {
    id: "eq-5",
    name: "Camp Oval XL 3Lock",
    category: "carabiner",
    brand: "C.A.M.P. Safety",
    certification: "CE EN 362",
    strength: "28 kN asse maggiore",
    description: "Moschettone ovale in lega di alluminio con chiusura automatica a triplo movimento. Ideale per l'utilizzo con carrucole, bloccanti e discensori grazie alla forma simmetrica perfetta.",
    image: "Target"
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    name: "Abilitazione Operatore su Fune",
    authority: "Ministero del Lavoro e delle Politiche Sociali",
    description: "Corso teorico-pratico per l'uso di sistemi di accesso e posizionamento mediante funi. Obbligatorio in conformità con la normativa vigente per l'esecuzione di lavori temporanei in quota.",
    lawReference: "Art. 116 e Allegato XXI del D.Lgs. 81/08"
  },
  {
    id: "cert-2",
    name: "Preposto Lavori su Funi",
    authority: "Organismo Paritetico Nazionale",
    description: "Certificazione superiore di supervisione tecnica e soccorso. Il preposto sorveglia la sicurezza delle squadre sul campo e coordina le procedure d'emergenza ed evacuazione di operatori bloccati.",
    lawReference: "Art. 136 del D.Lgs. 81/08"
  },
  {
    id: "cert-3",
    name: "Azienda Certificata ISO 45001",
    authority: "TÜV SÜD Italia / Accredia",
    description: "Sistema di gestione internazionale per la salute e sicurezza sul lavoro. Certifica l'approccio integrato della nostra organizzazione nella prevenzione degli infortuni.",
    lawReference: "Standard Internazionale ISO 45001:2018"
  },
  {
    id: "cert-4",
    name: "Abilitazione IRATA International (L3/L2)",
    authority: "Industrial Rope Access Trade Association",
    description: "Accreditamento internazionale per il lavoro su funi. Riconosciuto globalmente come il massimo standard industriale per l'eccellenza e la sicurezza nei settori industriali offshore e civili.",
    lawReference: "IRATA Rope Access Code of Practice (TACS)"
  }
];
