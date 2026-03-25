export type PlantShape =
  | "round"
  | "sunflower"
  | "cup"
  | "spike"
  | "cactus"
  | "succulent"
  | "bamboo"
  | "fern";

export interface PlantColors {
  petal: string;
  petal2: string;
  center: string;
  center2: string;
  stem: string;
  leaf: string;
  leaf2: string;
}

export interface Plant {
  id: string;
  name: string;
  emoji: string;
  description: string;
  shape: PlantShape;
  colors: PlantColors;
}

export const plants: Plant[] = [
  {
    id: "roos",
    name: "Roos",
    emoji: "🌹",
    description: "Klassiek & tijdloos",
    shape: "round",
    colors: { petal: "#e83060", petal2: "#f580a0", center: "#f5c842", center2: "#c89618", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "zonnebloem",
    name: "Zonnebloem",
    emoji: "🌻",
    description: "Vol zon & energie",
    shape: "sunflower",
    colors: { petal: "#f0c020", petal2: "#e8a810", center: "#5a2c0a", center2: "#3a1c04", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "tulp",
    name: "Tulp",
    emoji: "🌷",
    description: "Echt Nederlands!",
    shape: "cup",
    colors: { petal: "#e82858", petal2: "#c01840", center: "#f8e840", center2: "#d8b818", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "madelief",
    name: "Madelief",
    emoji: "🌼",
    description: "Vrolijk & lief",
    shape: "round",
    colors: { petal: "#ffffff", petal2: "#f0eed8", center: "#f0c020", center2: "#d8a010", stem: "#5a9a30", leaf: "#6aaa40", leaf2: "#70ba48" },
  },
  {
    id: "lavendel",
    name: "Lavendel",
    emoji: "💜",
    description: "Rustgevend & geurig",
    shape: "spike",
    colors: { petal: "#9868d8", petal2: "#b888f0", center: "#7848c0", center2: "#6038a8", stem: "#5a8038", leaf: "#6a9040", leaf2: "#78a048" },
  },
  {
    id: "pioenroos",
    name: "Pioenroos",
    emoji: "🌸",
    description: "Weelderig & zacht",
    shape: "round",
    colors: { petal: "#f068a0", petal2: "#f898c0", center: "#ffd880", center2: "#f0b060", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "orchidee",
    name: "Orchidee",
    emoji: "🪷",
    description: "Exotisch & bijzonder",
    shape: "cup",
    colors: { petal: "#c060d0", petal2: "#e080f0", center: "#fff0ff", center2: "#f8d8ff", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "lelie",
    name: "Lelie",
    emoji: "⚪",
    description: "Elegant & puur",
    shape: "cup",
    colors: { petal: "#fff5e0", petal2: "#ffe8c8", center: "#f5a830", center2: "#e09020", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "klaproos",
    name: "Klaproos",
    emoji: "🌺",
    description: "Vuurrood & wild",
    shape: "round",
    colors: { petal: "#e02820", petal2: "#f05040", center: "#282018", center2: "#383828", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" },
  },
  {
    id: "viooltje",
    name: "Viooltje",
    emoji: "💜",
    description: "Klein maar krachtig",
    shape: "round",
    colors: { petal: "#7850d0", petal2: "#9870e8", center: "#f0e840", center2: "#d8c818", stem: "#508030", leaf: "#60a040", leaf2: "#70b048" },
  },
  {
    id: "kersenbloesem",
    name: "Kersenbloesem",
    emoji: "🌸",
    description: "Vergankelijk & prachtig",
    shape: "round",
    colors: { petal: "#ffc8d8", petal2: "#ffe0ea", center: "#f8d040", center2: "#e0b020", stem: "#8a6038", leaf: "#6a9840", leaf2: "#78a850" },
  },
  {
    id: "hortensia",
    name: "Hortensia",
    emoji: "💙",
    description: "Weelderig & blauw",
    shape: "round",
    colors: { petal: "#6888e0", petal2: "#90b0f8", center: "#ffffff", center2: "#e0e8ff", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "bamboe",
    name: "Bamboe",
    emoji: "🎋",
    description: "Sterk & flexibel",
    shape: "bamboo",
    colors: { petal: "#98d840", petal2: "#b0e860", center: "#78b820", center2: "#90d030", stem: "#5a8828", leaf: "#70a838", leaf2: "#88c048" },
  },
  {
    id: "varen",
    name: "Varen",
    emoji: "🌿",
    description: "Rustiek & groen",
    shape: "fern",
    colors: { petal: "#50b840", petal2: "#70d060", center: "#40a030", center2: "#60c050", stem: "#488830", leaf: "#5a9838", leaf2: "#70b048" },
  },
  {
    id: "cactus",
    name: "Cactus",
    emoji: "🌵",
    description: "Sterk & weerbaar",
    shape: "cactus",
    colors: { petal: "#f06090", petal2: "#f888a8", center: "#f03070", center2: "#f85090", stem: "#5a9a30", leaf: "#488030", leaf2: "#60a040" },
  },
  {
    id: "vetplant",
    name: "Vetplant",
    emoji: "🪴",
    description: "Lief & low-maintenance",
    shape: "succulent",
    colors: { petal: "#80c878", petal2: "#a0e898", center: "#60a858", center2: "#80c878", stem: "#508050", leaf: "#688060", leaf2: "#78a070" },
  },
  {
    id: "rozemarijn",
    name: "Rozemarijn",
    emoji: "🌿",
    description: "Krachtig & aromatisch",
    shape: "spike",
    colors: { petal: "#8090e0", petal2: "#a0b0f0", center: "#6070c8", center2: "#7080d8", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9840" },
  },
  {
    id: "munt",
    name: "Munt",
    emoji: "🌿",
    description: "Fris & verfrissend",
    shape: "spike",
    colors: { petal: "#c0e8a0", petal2: "#d8f0b8", center: "#90c870", center2: "#a8d880", stem: "#488030", leaf: "#60a040", leaf2: "#78b850" },
  },
  {
    id: "dahlia",
    name: "Dahlia",
    emoji: "🌺",
    description: "Spectaculair & groot",
    shape: "round",
    colors: { petal: "#e85820", petal2: "#f08050", center: "#f0c020", center2: "#d8a010", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "magnolia",
    name: "Magnolia",
    emoji: "🤍",
    description: "Majestueus & groots",
    shape: "cup",
    colors: { petal: "#f8f0ff", petal2: "#e8d8f8", center: "#f8d870", center2: "#e0b840", stem: "#8a7058", leaf: "#6a9840", leaf2: "#78a850" },
  },
];
