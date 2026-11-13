export interface ServiceType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDetails: string[];
  icon: string; // lucide icon name
  baseCostPerMeter: number; // For rappelling calculator estimation
  difficultyFactor: number; // multiplier
}

export interface ProjectType {
  id: string;
  title: string;
  category: string;
  location: string;
  height: number; // in meters
  ropeHookups: number; // number of anchors required
  year: string;
  completionDays: number;
  imageUrl: string;
  description: string;
  aspectRatio: "portrait" | "landscape" | "square";
  featured?: boolean;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: "harness" | "rope" | "carabiner" | "descender" | "backup";
  brand: string;
  certification: string; // E.g. EN 361, EN 12841
  strength: string; // E.g. 22kN, 40kN
  description: string;
  image: string; // Vector/lucide description
}

export interface CertificationItem {
  id: string;
  name: string;
  authority: string;
  description: string;
  lawReference: string; // Italian safety laws reference (e.g. DLgs 81/08)
}

export interface QuoteInput {
  buildingHeight: number;
  facadeArea: number;
  serviceId: string;
  anchorsAvailable: "yes" | "no" | "partial";
  hasUrgency: boolean;
}

export interface QuoteResult {
  estimatedCost: number;
  ropeLengthRequired: number;
  teamSizeRequired: number;
  durationDaysEstimate: number;
  safetyTier: string;
}
