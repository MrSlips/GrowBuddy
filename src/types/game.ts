export type PlantKey =
  | 'sunflower'
  | 'chili'
  | 'tomato'
  | 'mango'
  | 'strawberry'
  | 'orchid'
  | 'cactus'
  | 'pandan';

export type ScreenTab = 'game' | 'select' | 'collection';

export type CareActionType = 'plant' | 'water' | 'fertilize' | 'sunlight';

export interface PlantSpec {
  key: PlantKey;
  name: string;
  scientificName: string;
  desc: string;
  careNote: string;
  climate: string;
  imageSrc: string;
  accentColor: string;
}

export interface GameState {
  currentPlantKey: PlantKey;
  stage: number; // 1 to 5
  growthProgress: number; // 0 to 100
  water: number; // 0 to 100
  sun: number; // 0 to 100
  health: number; // 0 to 100
  score: number;
  collection: string[];
  harvestCounts?: Record<string, number>;
  badges: string[];
}

export interface FloatingEffect {
  id: number;
  type: CareActionType;
  label: string;
  xPercent: number;
  yPercent: number;
}

export interface BadgeSpec {
  id: string;
  title: string;
  legacyMatches: string[];
  requirement: string;
}

export const STAGE_LABELS: Record<number, { title: string; detail: string }> = {
  1: { title: 'Biji Benih', detail: 'Benih baru disemai di dalam tanah subur.' },
  2: { title: 'Bercambah', detail: 'Tunas hijau mula menembusi permukaan tanah.' },
  3: { title: 'Anak Pokok', detail: 'Batang semakin tegap dengan daun muda mekar.' },
  4: { title: 'Membesar', detail: 'Pucuk bunga dan dahan mula terbentuk aktif.' },
  5: { title: 'Matang Sepenuhnya', detail: 'Pokok telah mekar dan berjaya dituai ke koleksi.' },
};

export const GREENHOUSE_BACKDROP_SRC =
  '/src/assets/images/greenhouse_backdrop_1794839071571.jpg';

export const PLANT_TYPES: Record<PlantKey, PlantSpec> = {
  sunflower: {
    key: 'sunflower',
    name: 'Bunga Matahari',
    scientificName: 'Helianthus annuus',
    desc: 'Cantik dan ceria menghadap matahari sepanjang hari.',
    careNote: 'Suka cahaya terik dan siraman berkala pada pangkal akar.',
    climate: 'Cahaya Penuh · Sederhana Lembap',
    imageSrc: '/src/assets/images/plant_sunflower_hero_1794839072525.jpg',
    accentColor: '#D97706',
  },
  chili: {
    key: 'chili',
    name: 'Pokok Cili',
    scientificName: 'Capsicum annuum',
    desc: 'Pedas dan berbuah lebat dengan penjagaan baja yang konsisten.',
    careNote: 'Baja seimbang membantu pembentukan buah cili yang ranum.',
    climate: 'Tropika Hangat · Tanah Bersaliran Baik',
    imageSrc: '/src/assets/images/plant_chili_hero_1794839073164.jpg',
    accentColor: '#DC2626',
  },
  tomato: {
    key: 'tomato',
    name: 'Pokok Tomato',
    scientificName: 'Solanum lycopersicum',
    desc: 'Buah merah ranum penuh vitamin dan mudah membesar di pasu.',
    careNote: 'Perlukan air konsisten supaya buah kekal segar dan manis.',
    climate: 'Cahaya Pagi · Siraman Tetap',
    imageSrc: '/src/assets/images/plant_tomato_hero_1794839073136.jpg',
    accentColor: '#E11D48',
  },
  mango: {
    key: 'mango',
    name: 'Pokok Mangga',
    scientificName: 'Mangifera indica',
    desc: 'Pokok buah tropika yang rendang dengan hasil buah keemasan.',
    careNote: 'Memerlukan cahaya mencukupi dan baja organik untuk dahan kukuh.',
    climate: 'Tropika Lembap · Cahaya Penuh',
    imageSrc: '/src/assets/images/plant_mango_hero_1794839073834.jpg',
    accentColor: '#CA8A04',
  },
  strawberry: {
    key: 'strawberry',
    name: 'Pokok Strawberi',
    scientificName: 'Fragaria × ananassa',
    desc: 'Buah merah manis berkilau bersama bunga putih yang mekar subur di pasu.',
    careNote: 'Pastikan tanah kekal lembap dengan siraman lembut secara berkala.',
    climate: 'Sederhana Sejuk · Lembap',
    imageSrc: '/src/assets/images/plant_strawberry_hero_1794840001382.jpg',
    accentColor: '#E11D48',
  },
  orchid: {
    key: 'orchid',
    name: 'Bunga Orkid',
    scientificName: 'Phalaenopsis amabilis',
    desc: 'Bunga hiasan tropika anggun berkelopak merah jambu dan krim yang tahan lama.',
    careNote: 'Elakkan tanah terlalu kering dan berikan cahaya pagi yang lembut.',
    climate: 'Tropika Teduh · Kelembapan Tinggi',
    imageSrc: '/src/assets/images/plant_orchid_hero_1794839999907.jpg',
    accentColor: '#C026D3',
  },
  cactus: {
    key: 'cactus',
    name: 'Kaktus Hiasan',
    scientificName: 'Echinocactus grusonii',
    desc: 'Sukulen bulat lasak dengan mahkota bunga kuning keemasan di puncak.',
    careNote: 'Gemarkan cahaya terik matahari dan tidak memerlukan siraman terlalu kerap.',
    climate: 'Kering Cerah · Cahaya Terik',
    imageSrc: '/src/assets/images/plant_cactus_hero_1794840001034.jpg',
    accentColor: '#65A30D',
  },
  pandan: {
    key: 'pandan',
    name: 'Pokok Pandan',
    scientificName: 'Pandanus amaryllifolius',
    desc: 'Tanaman dapur tradisi berdaun hijau wangi yang rimbun dan mudah dijaga.',
    careNote: 'Siram secukupnya dan baja berkala untuk daun yang lebar dan harum.',
    climate: 'Tropika Lembap · Separa Teduh',
    imageSrc: '/src/assets/images/plant_pandan_hero_1794840002021.jpg',
    accentColor: '#15803D',
  },
};

export const BADGE_CATALOG: BadgeSpec[] = [
  {
    id: 'starter',
    title: 'Pemula Taman',
    legacyMatches: ['Pemula Taman'],
    requirement: 'Memulakan perjalanan menanam di GrowBuddy.',
  },
  {
    id: 'master',
    title: 'Master Penanam',
    legacyMatches: ['Master Penanam', 'Master Penanam 🏅'],
    requirement: 'Membesarkan sekurang-kurangnya 1 pokok hingga matang.',
  },
  {
    id: 'guardian',
    title: 'Penjaga Setia',
    legacyMatches: ['Penjaga Setia'],
    requirement: 'Mengumpul 200 mata penjagaan taman.',
  },
  {
    id: 'collector',
    title: 'Kolektor Lengkap',
    legacyMatches: ['Kolektor Lengkap'],
    requirement: 'Menanam kesemua 8 jenis pokok hingga matang.',
  },
];

export const DEFAULT_GAME_STATE: GameState = {
  currentPlantKey: 'sunflower',
  stage: 1,
  growthProgress: 0,
  water: 60,
  sun: 60,
  health: 100,
  score: 0,
  collection: [],
  harvestCounts: {},
  badges: ['Pemula Taman'],
};
