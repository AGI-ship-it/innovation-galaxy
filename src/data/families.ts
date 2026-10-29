import type { Category, Maturity, TechFamily } from "./types";

export const CATEGORIES: Record<
  Category,
  { name: string; short: string; description: string; groupLabel: string }
> = {
  service: {
    name: "Service technologies",
    short: "Service",
    description: "Technologies delivered to clients as part of the facilities service.",
    groupLabel: "Service group",
  },
  internal: {
    name: "Internal technologies",
    short: "Internal",
    description: "Technologies that run the business: finance, people, bidding and operations.",
    groupLabel: "Function",
  },
};

export const MATURITIES: Record<Maturity, { label: string; orbit: string; index: number }> = {
  established: { label: "Established", orbit: "Inner orbit", index: 0 },
  scaling: { label: "Scaling", orbit: "Middle orbit", index: 1 },
  emerging: { label: "Emerging", orbit: "Outer orbit", index: 2 },
};

export const MATURITY_ORDER: Maturity[] = ["established", "scaling", "emerging"];

/**
 * Technology domains from the Use Case Discovery Pack (D-codes as in the deck).
 * Order here sets the order planets are laid out along each orbit.
 */
export const FAMILIES: TechFamily[] = [
  {
    id: "iot",
    code: "D01",
    name: "IoT Sensors & Smart Building Platforms",
    look: { kind: "plain", tint: "#d2edff", accent: "#c6d2ff", accent2: "#e4f9ff", seed: 11 },
  },
  {
    id: "bms",
    code: "D08",
    name: "BMS/BAS & Autonomous HVAC Optimization",
    look: { kind: "plain", tint: "#dde2fe", accent: "#c8c9fa", accent2: "#f2f3ff", seed: 131 },
  },
  {
    id: "esg",
    code: "D14",
    name: "ESG / Carbon Tracking Platforms",
    look: { kind: "plain", tint: "#dbf6cf", accent: "#bce2ca", accent2: "#f1ffe9", seed: 71 },
  },
  {
    id: "predictive",
    code: "D02",
    name: "AI/ML Predictive Maintenance",
    look: { kind: "plain", tint: "#ffe0c9", accent: "#ffcdd8", accent2: "#fff1df", seed: 23 },
  },
  {
    id: "genai",
    code: "D09",
    name: "Generative AI / AI Copilots",
    look: { kind: "plain", tint: "#ffcfef", accent: "#e5c1ff", accent2: "#ffe9f9", seed: 53 },
  },
  {
    id: "workforce",
    code: "D17",
    name: "Workforce Management / Mobile FM Apps",
    look: { kind: "plain", tint: "#caf9e8", accent: "#b6e5de", accent2: "#e9fff9", seed: 41 },
  },
  {
    id: "frontline",
    code: "D07",
    name: "Frontline Worker Tech / Mobile Workforce",
    look: { kind: "plain", tint: "#d2e2ff", accent: "#bfccfc", accent2: "#ebf2ff", seed: 83 },
  },
  {
    id: "robots",
    code: "D04",
    name: "Autonomous Cleaning Robots",
    look: { kind: "plain", tint: "#ffedc4", accent: "#ffddbd", accent2: "#fff9e2", seed: 67 },
  },
  {
    id: "drones",
    code: "D06",
    name: "Drones for Inspection",
    look: { kind: "plain", tint: "#e2d6ff", accent: "#d0c6ff", accent2: "#f4efff", ring: true, seed: 37 },
  },
  {
    id: "wearables",
    code: "D11",
    name: "Wearables for Lone Worker Safety",
    look: { kind: "plain", tint: "#fedfdf", accent: "#f4b0bf", accent2: "#ffefef", seed: 139 },
  },
  {
    id: "vision",
    code: "D12",
    name: "Computer Vision (Space Utilization & Security)",
    look: { kind: "plain", tint: "#d8f6f1", accent: "#ade6e0", accent2: "#ecfcf9", seed: 149 },
  },
  {
    id: "twin",
    code: "D03",
    name: "Digital Twins",
    look: { kind: "plain", tint: "#caf7fd", accent: "#bad3fc", accent2: "#e9fcff", ring: true, seed: 101 },
  },
  {
    id: "arvr",
    code: "D10",
    name: "AR/VR for Maintenance & Training",
    look: { kind: "plain", tint: "#e9dcff", accent: "#d8cbff", accent2: "#f7f2ff", seed: 97 },
  },
  {
    id: "print3d",
    code: "D15",
    name: "3D Printing for Spare Parts",
    look: { kind: "plain", tint: "#fef4cf", accent: "#fcddaa", accent2: "#fffbe8", seed: 127 },
  },
];

const byId = new Map(FAMILIES.map((f) => [f.id, f]));

export function getFamily(id: string): TechFamily {
  const family = byId.get(id);
  if (!family) throw new Error(`Unknown technology family: ${id}`);
  return family;
}

export function familyOrder(id: string): number {
  return FAMILIES.findIndex((f) => f.id === id);
}
