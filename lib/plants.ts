export type PlantShape =
  | "round"
  | "rose"
  | "daisy"
  | "poppy"
  | "pansy"
  | "peony"
  | "dahlia_flower"
  | "hydrangea"
  | "blossom"
  | "sunflower"
  | "cup"
  | "spike"
  | "bell"
  | "trumpet"
  | "iris"
  | "allium"
  | "cone"
  | "umbrella"
  | "cactus"
  | "succulent"
  | "bamboo"
  | "fern"
  | "tree_round"
  | "tree_pine"
  | "tree_willow";

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
  fact: string;
  shape: PlantShape;
  colors: PlantColors;
}

export const plants: Plant[] = [
  {
    id: "roos",
    name: "Roos",
    emoji: "🌹",
    description: "Klassiek & tijdloos",
    fact: "De roos bestaat al 35 miljoen jaar — er vóór dat de dinosauriërs uitstierven!",
    shape: "rose",
    colors: { petal: "#e83060", petal2: "#f580a0", center: "#f5c842", center2: "#c89618", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "zonnebloem",
    name: "Zonnebloem",
    emoji: "🌻",
    description: "Vol zon & energie",
    fact: "Jonge zonnebloemen volgen de zon van oost naar west — dat heet heliotropisme.",
    shape: "sunflower",
    colors: { petal: "#f0c020", petal2: "#e8a810", center: "#5a2c0a", center2: "#3a1c04", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "tulp",
    name: "Tulp",
    emoji: "🌷",
    description: "Echt Nederlands!",
    fact: "In de 17e eeuw was één tulpenbol soms meer waard dan een grachtenpand in Amsterdam.",
    shape: "cup",
    colors: { petal: "#e82858", petal2: "#c01840", center: "#f8e840", center2: "#d8b818", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "madelief",
    name: "Madelief",
    emoji: "🌼",
    description: "Vrolijk & lief",
    fact: "Daisy komt van 'day's eye' — het bloemetje opent zich elke ochtend met de dag.",
    shape: "daisy",
    colors: { petal: "#ffffff", petal2: "#f0eed8", center: "#f0c020", center2: "#d8a010", stem: "#5a9a30", leaf: "#6aaa40", leaf2: "#70ba48" },
  },
  {
    id: "lavendel",
    name: "Lavendel",
    emoji: "💜",
    description: "Rustgevend & geurig",
    fact: "De geur van lavendel verlaagt aantoonbaar je hartslag en bloeddruk.",
    shape: "spike",
    colors: { petal: "#9868d8", petal2: "#b888f0", center: "#7848c0", center2: "#6038a8", stem: "#5a8038", leaf: "#6a9040", leaf2: "#78a048" },
  },
  {
    id: "pioenroos",
    name: "Pioenroos",
    emoji: "🌸",
    description: "Weelderig & zacht",
    fact: "Een pioenroos kan meer dan 100 jaar leven en blijft elk jaar trouw bloeien.",
    shape: "peony",
    colors: { petal: "#f068a0", petal2: "#f898c0", center: "#ffd880", center2: "#f0b060", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "orchidee",
    name: "Orchidee",
    emoji: "🪷",
    description: "Exotisch & bijzonder",
    fact: "Orchideeën zijn de grootste bloemenfamilie: meer dan 25.000 soorten wereldwijd!",
    shape: "iris",
    colors: { petal: "#c060d0", petal2: "#e080f0", center: "#fff0ff", center2: "#f8d8ff", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "lelie",
    name: "Lelie",
    emoji: "⚪",
    description: "Elegant & puur",
    fact: "In het oude Egypte stond de lelie symbool voor vruchtbaarheid en zuiverheid.",
    shape: "cup",
    colors: { petal: "#fff5e0", petal2: "#ffe8c8", center: "#f5a830", center2: "#e09020", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "klaproos",
    name: "Klaproos",
    emoji: "🌺",
    description: "Vuurrood & wild",
    fact: "Klaprozen groeien graag op verstoorde grond — vandaar hun rol als oorlogssymbool.",
    shape: "poppy",
    colors: { petal: "#e02820", petal2: "#f05040", center: "#282018", center2: "#383828", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" },
  },
  {
    id: "viooltje",
    name: "Viooltje",
    emoji: "💜",
    description: "Klein maar krachtig",
    fact: "De naam 'viola' is Latijn voor zowel dit bloemetje als het instrument!",
    shape: "pansy",
    colors: { petal: "#7850d0", petal2: "#9870e8", center: "#f0e840", center2: "#d8c818", stem: "#508030", leaf: "#60a040", leaf2: "#70b048" },
  },
  {
    id: "kersenbloesem",
    name: "Kersenbloesem",
    emoji: "🌸",
    description: "Vergankelijk & prachtig",
    fact: "Japan heeft een nationaal weerbericht dat de bloeifronten van kersenbloesem bijhoudt.",
    shape: "blossom",
    colors: { petal: "#ffc8d8", petal2: "#ffe0ea", center: "#f8d040", center2: "#e0b020", stem: "#8a6038", leaf: "#6a9840", leaf2: "#78a850" },
  },
  {
    id: "hortensia",
    name: "Hortensia",
    emoji: "💙",
    description: "Weelderig & blauw",
    fact: "De kleur van een hortensia hangt af van de grondPH: zuur = blauw, basisch = roze.",
    shape: "hydrangea",
    colors: { petal: "#6888e0", petal2: "#90b0f8", center: "#ffffff", center2: "#e0e8ff", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "bamboe",
    name: "Bamboe",
    emoji: "🎋",
    description: "Sterk & flexibel",
    fact: "Bamboe is het snelst groeiende gewas op aarde — sommige soorten groeien 90 cm per dag!",
    shape: "bamboo",
    colors: { petal: "#98d840", petal2: "#b0e860", center: "#78b820", center2: "#90d030", stem: "#5a8828", leaf: "#70a838", leaf2: "#88c048" },
  },
  {
    id: "varen",
    name: "Varen",
    emoji: "🌿",
    description: "Rustiek & groen",
    fact: "Varens bestaan al 360 miljoen jaar — ze waren er al lang vóór de dinosauriërs.",
    shape: "fern",
    colors: { petal: "#50b840", petal2: "#70d060", center: "#40a030", center2: "#60c050", stem: "#488830", leaf: "#5a9838", leaf2: "#70b048" },
  },
  {
    id: "cactus",
    name: "Cactus",
    emoji: "🌵",
    description: "Sterk & weerbaar",
    fact: "Een cactus slaat water op in zijn stengel en overleeft jaren zonder regen.",
    shape: "cactus",
    colors: { petal: "#f06090", petal2: "#f888a8", center: "#f03070", center2: "#f85090", stem: "#5a9a30", leaf: "#488030", leaf2: "#60a040" },
  },
  {
    id: "vetplant",
    name: "Vetplant",
    emoji: "🪴",
    description: "Lief & low-maintenance",
    fact: "Vetplanten halen vocht uit mist en dauw — perfect voor droge woestijngebieden.",
    shape: "succulent",
    colors: { petal: "#80c878", petal2: "#a0e898", center: "#60a858", center2: "#80c878", stem: "#508050", leaf: "#688060", leaf2: "#78a070" },
  },
  {
    id: "rozemarijn",
    name: "Rozemarijn",
    emoji: "🌿",
    description: "Krachtig & aromatisch",
    fact: "De geur van rozemarijn verbetert aantoonbaar het geheugen, blijkt uit onderzoek.",
    shape: "spike",
    colors: { petal: "#8090e0", petal2: "#a0b0f0", center: "#6070c8", center2: "#7080d8", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9840" },
  },
  {
    id: "munt",
    name: "Munt",
    emoji: "🌿",
    description: "Fris & verfrissend",
    fact: "Er zijn meer dan 600 variëteiten van munt, van chocolademunt tot bananenmunt.",
    shape: "spike",
    colors: { petal: "#c0e8a0", petal2: "#d8f0b8", center: "#90c870", center2: "#a8d880", stem: "#488030", leaf: "#60a040", leaf2: "#78b850" },
  },
  {
    id: "dahlia",
    name: "Dahlia",
    emoji: "🌺",
    description: "Spectaculair & groot",
    fact: "Dahlia's zijn heilig voor de Azteken en komen oorspronkelijk uit Mexico.",
    shape: "dahlia_flower",
    colors: { petal: "#e85820", petal2: "#f08050", center: "#f0c020", center2: "#d8a010", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" },
  },
  {
    id: "magnolia",
    name: "Magnolia",
    emoji: "🤍",
    description: "Majestueus & groots",
    fact: "Magnolia bloeit al 20 miljoen jaar — kevers, niet bijen, waren de eerste bestuivers.",
    shape: "cup",
    colors: { petal: "#f8f0ff", petal2: "#e8d8f8", center: "#f8d870", center2: "#e0b840", stem: "#8a7058", leaf: "#6a9840", leaf2: "#78a850" },
  },
  {
    id: "eik",
    name: "Eik",
    emoji: "🌳",
    description: "Stoer & eeuwenoud",
    fact: "Een eik kan 1000 jaar oud worden en in die tijd een miljoen eikels produceren.",
    shape: "tree_round",
    colors: { petal: "#5a8830", petal2: "#4a7820", center: "#c89838", center2: "#a07028", stem: "#7a5228", leaf: "#5a8830", leaf2: "#6a9838" },
  },
  {
    id: "den",
    name: "Den",
    emoji: "🌲",
    description: "Altijd groen",
    fact: "Dennennaalden bevatten meer vitamine C per gram dan sinaasappels.",
    shape: "tree_pine",
    colors: { petal: "#2a7820", petal2: "#1a6010", center: "#c09030", center2: "#a07820", stem: "#6a4818", leaf: "#2a7820", leaf2: "#3a9030" },
  },
  {
    id: "wilg",
    name: "Wilg",
    emoji: "🌿",
    description: "Zacht & wiegend",
    fact: "Wilgenschors bevat salicine — de grondstof waarvan aspirine is gemaakt.",
    shape: "tree_willow",
    colors: { petal: "#78b048", petal2: "#60a038", center: "#c09838", center2: "#a07828", stem: "#6a4a18", leaf: "#78b048", leaf2: "#98d060" },
  },

  // ── 50 nieuwe planten ──────────────────────────────────────────────────────

  // Daisy-familie
  { id: "gerbera",      name: "Gerbera",       emoji: "🌺", description: "Groot & stralend",       fact: "De gerbera is de vijfde meest verkochte snijbloem ter wereld.",                              shape: "daisy",       colors: { petal: "#f04018", petal2: "#f87040", center: "#f8c820", center2: "#e0a808", stem: "#5a9a30", leaf: "#6aaa40", leaf2: "#78ba48" } },
  { id: "aster",        name: "Aster",          emoji: "🪻", description: "Nazomerbloem",            fact: "In de oudheid verbrandde men asters om slechte geesten te verdrijven.",                     shape: "daisy",       colors: { petal: "#8858d0", petal2: "#a878e8", center: "#f8e040", center2: "#d8b820", stem: "#508030", leaf: "#609040", leaf2: "#70a048" } },
  { id: "cosmos",       name: "Cosmos",         emoji: "🌸", description: "Sierlijk & dun",          fact: "Cosmos bloeit van zomer tot ver in de herfst — hij geeft gewoon niet op.",                  shape: "daisy",       colors: { petal: "#e050a0", petal2: "#f078b8", center: "#f8e040", center2: "#e0c020", stem: "#5a9028", leaf: "#6a9f30", leaf2: "#78af38" } },
  { id: "kamille",      name: "Kamille",        emoji: "🌼", description: "Rustgevend kruidje",      fact: "Kamillethee is al meer dan 5000 jaar in gebruik als geneesmiddel.",                         shape: "daisy",       colors: { petal: "#fff8e0", petal2: "#fff0c0", center: "#f0c020", center2: "#d8a010", stem: "#608838", leaf: "#70a040", leaf2: "#80b048" } },
  { id: "leeuwentand",  name: "Leeuwentand",    emoji: "🌼", description: "Overal & vrij",           fact: "Alle delen van de leeuwentand zijn eetbaar: blad, bloem én wortel.",                        shape: "daisy",       colors: { petal: "#f8d020", petal2: "#e8c010", center: "#f0a818", center2: "#d89010", stem: "#608040", leaf: "#709048", leaf2: "#80a050" } },
  { id: "scabiosa",     name: "Schijfbloem",    emoji: "💜", description: "Speels & luchtig",        fact: "Eén schijfbloem trekt meer dan 20 soorten vlinders en bijen in één zomer.",                 shape: "daisy",       colors: { petal: "#a068c8", petal2: "#c088e0", center: "#f0e0f8", center2: "#d8c8f0", stem: "#508038", leaf: "#609040", leaf2: "#70a048" } },
  { id: "rudbeckia",    name: "Rudbeckia",      emoji: "🌻", description: "Geel met donker hart",    fact: "Rudbeckia wordt ook 'Black-eyed Susan' genoemd, naar een oud Amerikaans volksversje.",      shape: "sunflower",   colors: { petal: "#e8b820", petal2: "#f0c828", center: "#3a2010", center2: "#2a1408", stem: "#508038", leaf: "#5a9040", leaf2: "#68a048" } },

  // Vol & gelaagd
  { id: "zinnia",       name: "Zinnia",         emoji: "🌺", description: "Kleurexplosie",           fact: "Zinnia's waren de eerste bloemen die in de ruimte bloeiden — op de ISS in 2016!",           shape: "peony",       colors: { petal: "#e84020", petal2: "#f06840", center: "#f8d020", center2: "#e0b010", stem: "#4a8828", leaf: "#5a9830", leaf2: "#6aaa38" } },
  { id: "ranonkel",     name: "Ranonkel",       emoji: "🌼", description: "Vol & botergeel",         fact: "Al eeuwenlang houden kinderen een ranonkel onder je kin: geel = je houdt van boter.",       shape: "peony",       colors: { petal: "#f8d840", petal2: "#f8e868", center: "#e8a820", center2: "#d09010", stem: "#4a8a28", leaf: "#5a9a30", leaf2: "#6aaa40" } },

  // Roos-familie
  { id: "kamelia",      name: "Kamelia",        emoji: "🌸", description: "Elegant & Aziatisch",     fact: "Theeblaadjes komen van een kamelia-soort: Camellia sinensis.",                               shape: "rose",        colors: { petal: "#e03870", petal2: "#f06090", center: "#f8e050", center2: "#e0c030", stem: "#4a7a28", leaf: "#5a9830", leaf2: "#70b040" } },
  { id: "rozenbottelaar", name: "Rozenbottelaar", emoji: "🌹", description: "Wild & romantisch",    fact: "Rozenbottels bevatten 20 keer meer vitamine C dan sinaasappels.",                            shape: "rose",        colors: { petal: "#f090b0", petal2: "#f8b8c8", center: "#f8e860", center2: "#e0c840", stem: "#4a6830", leaf: "#587830", leaf2: "#6a9038" } },
  { id: "klimroos",     name: "Klimroos",       emoji: "🌹", description: "Klimt & bloeit",          fact: "De langste klimroos ter wereld staat in Arizona en klimt meer dan 24 meter hoog.",           shape: "rose",        colors: { petal: "#f06840", petal2: "#f89870", center: "#f8e050", center2: "#e0c830", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" } },

  // Cup-familie
  { id: "anemoon",      name: "Anemoon",        emoji: "🌺", description: "Vurig & intens",          fact: "De naam 'anemoon' komt van het Grieks voor wind — vandaar ook: windroosje.",                shape: "poppy",         colors: { petal: "#d82820", petal2: "#f05048", center: "#181008", center2: "#281808", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" } },
  { id: "sleutelbloem", name: "Sleutelbloem",   emoji: "🌼", description: "Eerste lentebode",        fact: "De sleutelbloem is een van de allereerste bloemen van het jaar.",                           shape: "daisy",         colors: { petal: "#f8e040", petal2: "#f0d020", center: "#f0a810", center2: "#d89008", stem: "#508030", leaf: "#609040", leaf2: "#70a048" } },
  { id: "clematis",     name: "Clematis",       emoji: "💜", description: "Klimt & bloeit",          fact: "Clematis kan met de juiste steun meer dan 6 meter hoog klimmen.",                           shape: "daisy",         colors: { petal: "#7048c0", petal2: "#9068d8", center: "#f8f0ff", center2: "#e8d8f8", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" } },
  { id: "waterlelie",   name: "Waterlelie",     emoji: "🤍", description: "Drijvend & dromerig",     fact: "De reuzen-waterlelie Victoria amazonica is zo groot dat een kind erop kan zitten.",         shape: "peony",         colors: { petal: "#f8f0f8", petal2: "#f0e0f0", center: "#f8e850", center2: "#e0c830", stem: "#488038", leaf: "#588840", leaf2: "#68a048" } },
  { id: "narcis",       name: "Narcis",         emoji: "🌼", description: "Vrolijke lentegroet",     fact: "Narcissen zijn giftig voor katten en honden, maar muizen mijden ze vanzelf.",               shape: "trumpet",     colors: { petal: "#f8f040", petal2: "#f0e820", center: "#e87010", center2: "#d06008", stem: "#508030", leaf: "#609040", leaf2: "#70a050" } },
  { id: "strelitzia",   name: "Strelitzia",     emoji: "🌺", description: "Paradijsvogelbloem",      fact: "De strelitzia is vernoemd naar Charlotte van Mecklenburg-Strelitz, koningin van Engeland.", shape: "trumpet",         colors: { petal: "#f07820", petal2: "#f0a840", center: "#2040b0", center2: "#3050c0", stem: "#488030", leaf: "#588840", leaf2: "#68a050" } },

  // Spike-familie & kruiden
  { id: "lupine",       name: "Lupine",         emoji: "💜", description: "Trots & hoog",            fact: "Lupinewortels zijn zo sterk dat ze beton kunnen scheuren — ideaal voor bodembeheer.",       shape: "spike",       colors: { petal: "#6040b8", petal2: "#8060d0", center: "#f8f0ff", center2: "#e8e0f8", stem: "#4a8030", leaf: "#5a9038", leaf2: "#6aa040" } },
  { id: "salie",        name: "Salie",          emoji: "🌿", description: "Krachtig kruid",          fact: "Middeleeuws gezegde: 'Wie salie in zijn tuin heeft, gaat nooit dood'.",                    shape: "spike",       colors: { petal: "#7870c0", petal2: "#9898d8", center: "#a0a8d0", center2: "#8890b8", stem: "#608050", leaf: "#70a060", leaf2: "#80b070" } },
  { id: "ridderspoor",  name: "Ridderspoor",    emoji: "💙", description: "Diepblauw & majestueus", fact: "Ridderspoor is giftig, maar werd vroeger gebruikt om vlooien te verdrijven.",               shape: "spike",       colors: { petal: "#1840a0", petal2: "#3060c0", center: "#f8f8ff", center2: "#d0d8f8", stem: "#4a7828", leaf: "#5a8830", leaf2: "#6a9838" } },
  { id: "tijm",         name: "Tijm",           emoji: "🌿", description: "Klein maar krachtig",     fact: "De oude Grieken namen een tijmbad voor kracht en moed vóór de strijd.",                    shape: "spike",       colors: { petal: "#d870a8", petal2: "#e898c0", center: "#f8e8f8", center2: "#e8d0e8", stem: "#607858", leaf: "#709068", leaf2: "#80a078" } },
  { id: "basilicum",    name: "Basilicum",      emoji: "🌿", description: "Lekker & aromatisch",     fact: "In India is basilicum heilig — 'Tulsi' beschermt het huis tegen kwaad.",                   shape: "spike",       colors: { petal: "#f0f0f0", petal2: "#e8e8e8", center: "#e8f0e0", center2: "#d0e0c8", stem: "#407030", leaf: "#509040", leaf2: "#60a050" } },
  { id: "marjolein",    name: "Marjolein",      emoji: "🌿", description: "Zomers kruid",            fact: "De Grieken noemden marjolein 'vreugde van de bergen' (oros + ganos).",                     shape: "spike",       colors: { petal: "#e070a8", petal2: "#e898c0", center: "#f8e0f0", center2: "#e8c8e0", stem: "#508038", leaf: "#609048", leaf2: "#70a058" } },
  { id: "liatris",      name: "Liatris",        emoji: "💜", description: "Pluimachtig & fuchsia",   fact: "Liatris is uniek: hij bloeit van boven naar beneden, niet van onder naar boven.",           shape: "spike",       colors: { petal: "#c040a0", petal2: "#d860b8", center: "#e060b0", center2: "#c848a0", stem: "#4a7a30", leaf: "#5a8a38", leaf2: "#6a9a40" } },

  // Hydrangea/cluster
  { id: "sering",       name: "Sering",         emoji: "💜", description: "Lentegeur",               fact: "Een sering kan meer dan 150 jaar leven en elk jaar rijker bloeien.",                        shape: "hydrangea",   colors: { petal: "#9060c0", petal2: "#b080d8", center: "#f8f0ff", center2: "#e8d8f8", stem: "#507030", leaf: "#608040", leaf2: "#70a050" } },
  { id: "blauweregen",  name: "Blauweregen",    emoji: "💙", description: "Hangt & bloeit",          fact: "Blauweregen kan zo zwaar worden dat hij een pergola doet instorten.",                       shape: "hydrangea",   colors: { petal: "#5870d0", petal2: "#7890e0", center: "#e8f0ff", center2: "#d0d8f0", stem: "#5a6830", leaf: "#687838", leaf2: "#788840" } },
  { id: "vlinderstruik", name: "Vlinderstruik", emoji: "💜", description: "Vlinders houden ervan",   fact: "Eén vlinderstruik trekt in één zomer meer dan honderd vlinders aan.",                      shape: "hydrangea",   colors: { petal: "#5030a0", petal2: "#7050b8", center: "#f8e8ff", center2: "#e8d0f8", stem: "#4a7030", leaf: "#5a8038", leaf2: "#6a9040" } },
  { id: "verbena",      name: "Verbena",        emoji: "🌸", description: "Klein & kleurrijk",       fact: "Verbena gold in de oudheid als heilige plant bij offers aan de goden.",                     shape: "hydrangea",   colors: { petal: "#d04080", petal2: "#e86098", center: "#f8f0ff", center2: "#f0d8f8", stem: "#5a8030", leaf: "#6a9038", leaf2: "#7aa040" } },

  // Blossom (takjes)
  { id: "jasmijn",      name: "Jasmijn",        emoji: "🤍", description: "Zoete geur",              fact: "Jasmijn geurt 's nachts sterker — om nachtvlinders aan te trekken.",                       shape: "blossom",     colors: { petal: "#fffff0", petal2: "#ffffd8", center: "#f8e840", center2: "#e0d020", stem: "#8a7850", leaf: "#6a9840", leaf2: "#78a850" } },
  { id: "appelbloesem", name: "Appelbloesem",   emoji: "🌸", description: "Lente op z'n best",       fact: "Een volwassen appelboom maakt 40.000 bloemen, maar slechts 2% wordt een appel.",           shape: "blossom",     colors: { petal: "#ffd8e0", petal2: "#ffe8ec", center: "#f8e840", center2: "#e0c820", stem: "#9a7858", leaf: "#6a9840", leaf2: "#78a850" } },
  { id: "mimosa",       name: "Mimosa",         emoji: "💛", description: "Geel & pluizig",          fact: "Mimosa pudica vouwt zijn blaadjes bij aanraking in — een plant die beweegt!",             shape: "allium",     colors: { petal: "#f8e040", petal2: "#f0d828", center: "#e8b818", center2: "#d0a010", stem: "#8a7838", leaf: "#7a9838", leaf2: "#88a840" } },

  // Bell (klokjes)
  { id: "vingerhoedskruid", name: "Vingerhoedskruid", emoji: "🌸", description: "Hoog & gespikkeld", fact: "Vingerhoedskruid is giftig, maar leverde wel het hartmedicijn digitalis op.",             shape: "bell",      colors: { petal: "#c060c8", petal2: "#d880d8", center: "#f8f0ff", center2: "#f0d8f8", stem: "#4a8228", leaf: "#5a9230", leaf2: "#6aa238" } },
  { id: "hyacint",      name: "Hyacint",        emoji: "💜", description: "Lekker ruikend",          fact: "Hyacinten lagen in de 17e eeuw zo in trek dat er bijna een 'hyacintenbubbel' ontstond.",   shape: "bell",        colors: { petal: "#6040b0", petal2: "#8060c8", center: "#f0e8ff", center2: "#e0d0f8", stem: "#508038", leaf: "#608848", leaf2: "#70a050" } },
  { id: "boshyacint",   name: "Boshyacint",     emoji: "💙", description: "Blauwe bosgrond",         fact: "In Engeland is het pluken van boshyacinten in beschermde bossen strafbaar.",               shape: "bell",        colors: { petal: "#3860c8", petal2: "#5080d8", center: "#e8f0ff", center2: "#d0d8f0", stem: "#4a7830", leaf: "#5a8838", leaf2: "#6a9840" } },
  { id: "freesia",      name: "Freesia",        emoji: "🌼", description: "Fris & geurig",           fact: "Freesia is vernoemd naar Friedrich Freese, een arts die ze zelf nooit heeft ontdekt.",     shape: "bell",        colors: { petal: "#f8e040", petal2: "#f8f060", center: "#f0a818", center2: "#e09010", stem: "#508838", leaf: "#609848", leaf2: "#70a850" } },
  { id: "gladiool",     name: "Gladiool",       emoji: "🌸", description: "Trots & opvallend",       fact: "Gladiool komt van het Latijnse 'gladius' (zwaard) — vanwege de bladvorm.",                 shape: "bell",        colors: { petal: "#f04880", petal2: "#f878a8", center: "#f8e8f0", center2: "#f0d0e0", stem: "#4a8030", leaf: "#5a9038", leaf2: "#6aa040" } },
  { id: "leeuwebek",    name: "Leeuwebek",      emoji: "🌸", description: "Grappig & vrolijk",       fact: "Gedroogde zaaddozen van leeuwebek lijken op schedeltjes — geliefd bij Middeleewse kinderen.", shape: "bell",      colors: { petal: "#f05818", petal2: "#f08040", center: "#f8f0d8", center2: "#f0e0b8", stem: "#4a8228", leaf: "#5a9230", leaf2: "#6aa238" } },

  // Trumpet (trechter)
  { id: "winde",        name: "Winde",          emoji: "💙", description: "Ochtendglorie",           fact: "Japanse winde-zaden waren ooit meer waard dan goud in de Edo-periode.",                    shape: "trumpet",     colors: { petal: "#3070d0", petal2: "#5090e0", center: "#f0f8ff", center2: "#d8e8f8", stem: "#488030", leaf: "#589040", leaf2: "#68a048" } },
  { id: "petunia",      name: "Petunia",        emoji: "🌸", description: "Felle kleurenpracht",     fact: "Petunia's zijn oorspronkelijk uit Zuid-Amerika en werden beschreven door Spaanse ontdekkingsreizigers.", shape: "trumpet",     colors: { petal: "#c030a8", petal2: "#d850c0", center: "#f8f0ff", center2: "#f0d8f8", stem: "#4a8030", leaf: "#5a9038", leaf2: "#6aa040" } },

  // Iris
  { id: "iris",         name: "Iris",           emoji: "💜", description: "Elegant & paars",         fact: "De iris is het symbool van het Franse koningshuis — de basis van de fleur-de-lis.",        shape: "iris",        colors: { petal: "#5038b0", petal2: "#7058c8", center: "#f8e840", center2: "#f0d020", stem: "#4a8030", leaf: "#5a9038", leaf2: "#6aa040" } },

  // Allium (bolvormig)
  { id: "sierakker",    name: "Sierakker",      emoji: "💜", description: "Bol van sterretjes",      fact: "Sierakkers zijn familie van ui en knoflook — maar dan met paarse prachtige bollen.",        shape: "allium",      colors: { petal: "#8040c0", petal2: "#a060d8", center: "#f8f0ff", center2: "#e8d8f8", stem: "#4a8030", leaf: "#5a9038", leaf2: "#6aa040" } },
  { id: "bieslook",     name: "Bieslook",       emoji: "🌿", description: "Lekker & paars bolletje", fact: "Bieslook is al meer dan 5000 jaar in gebruik als kruid in China.",                         shape: "allium",      colors: { petal: "#b068c8", petal2: "#c888d8", center: "#f8f0ff", center2: "#e8d8f8", stem: "#408038", leaf: "#509048", leaf2: "#60a058" } },

  // Cone (kegel-hart)
  { id: "zonnehoed",    name: "Zonnehoed",      emoji: "🌸", description: "Geneeskrachtig & mooi",   fact: "Echinacea werd door inheemse Amerikanen gebruikt tegen infecties — en werkt écht.",         shape: "cone",        colors: { petal: "#c84898", petal2: "#e068b0", center: "#d86820", center2: "#c05010", stem: "#5a8030", leaf: "#6a9038", leaf2: "#78a040" } },

  // Umbrella (schermbloeiers)
  { id: "dille",        name: "Dille",          emoji: "🌿", description: "Fris & waaierig",         fact: "Men geloofde vroeger dat dille heksen kon weren als je het boven je deur hing.",           shape: "umbrella",    colors: { petal: "#d8c840", petal2: "#e8d858", center: "#b0a028", center2: "#908018", stem: "#608040", leaf: "#70a050", leaf2: "#80b060" } },
  { id: "venkel",       name: "Venkel",         emoji: "🌿", description: "Anijsachtig kruid",       fact: "Prometheus verborg het heilige vuur voor de mensen in een venkelstengel, zegt de mythe.",  shape: "umbrella",    colors: { petal: "#c8d038", petal2: "#d8e048", center: "#a8b020", center2: "#909010", stem: "#508838", leaf: "#609848", leaf2: "#70a858" } },
  { id: "wilde_peen",   name: "Wilde Peen",     emoji: "🤍", description: "Kant van de natuur",      fact: "Wilde peen is de voorouder van de wortel — maar zijn eigen wortel is wit, niet oranje.",   shape: "umbrella",    colors: { petal: "#f8f8f8", petal2: "#f0f0f0", center: "#f0e0e0", center2: "#e8c8c8", stem: "#608848", leaf: "#70a058", leaf2: "#80b068" } },

  // Bomen extra
  { id: "esdoorn",      name: "Esdoorn",        emoji: "🍁", description: "Herfstvuur",              fact: "Een esdoorn maakt meer dan 200.000 gevleugelde zaadjes (helikoptertjes) per jaar.",        shape: "tree_round",  colors: { petal: "#e06010", petal2: "#d05008", center: "#f0a020", center2: "#d08010", stem: "#7a5028", leaf: "#e06010", leaf2: "#c85010" } },
  { id: "beuk",         name: "Beuk",           emoji: "🌳", description: "Majestueus & oud",        fact: "Beuken delen voedingsstoffen met andere bomen via ondergrondse schimmelnetwerken.",         shape: "tree_round",  colors: { petal: "#508828", petal2: "#408020", center: "#a07828", center2: "#887018", stem: "#6a5020", leaf: "#508828", leaf2: "#609830" } },
  { id: "berk",         name: "Berk",           emoji: "🌿", description: "Licht & tenger",          fact: "In Scandinavië wordt berkensap als lentedrank gedronken — zoet en verfrissend.",           shape: "tree_willow", colors: { petal: "#98c848", petal2: "#80b038", center: "#c0b8a8", center2: "#b0a898", stem: "#d0c8b8", leaf: "#98c848", leaf2: "#b0d860" } },
];
