export type FrameShape =
  | 'portrait'
  | 'landscape'
  | 'square'
  | 'circle'
  | 'rounded-square'
  | 'rounded-rect-portrait'
  | 'rounded-rect-landscape'
  | 'balloon'
  | 'extra-rounded'
  | 'collage-2'
  | 'collage-3h'
  | 'collage-3v'
  | 'collage-4'
  | 'dual-border-portrait'
  | 'dual-border-landscape'
  | 'dual-border-square'
  | 'dual-border-circle'
  | 'heart'
  | 'hexagon'
  | 'arch';

export type FrameCategory =
  | 'All'
  | 'Portrait'
  | 'Landscape'
  | 'Square'
  | 'Circle'
  | 'Collage'
  | 'Dual Border'
  | 'Creative';

export interface FrameTemplate {
  id: string;
  name: string;
  category: FrameCategory;
  shape: FrameShape;
  borderColor: string;
  borderWidth: number;    // outer frame px (in preview scale)
  matColor?: string;
  matWidth?: number;
  innerBorderColor?: string;  // for dual border
  innerBorderWidth?: number;
  aspectRatio: number;        // width/height
  borderRadius: string;       // CSS border-radius
  photoSlots: number;         // 1 or multi for collage
  tags?: string[];
}

export const frameTemplates: FrameTemplate[] = [
  // ── Portrait ──────────────────────────────────────────────
  {
    id: 'portrait-black',
    name: 'Portrait Acrylic',
    category: 'Portrait',
    shape: 'portrait',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#f5f0eb',
    matWidth: 12,
    aspectRatio: 3 / 4,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'portrait-gold',
    name: 'Portrait Gold',
    category: 'Portrait',
    shape: 'portrait',
    borderColor: '#c9a84c',
    borderWidth: 16,
    matColor: '#fdf8ee',
    matWidth: 14,
    aspectRatio: 3 / 4,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'portrait-white',
    name: 'Portrait White',
    category: 'Portrait',
    shape: 'portrait',
    borderColor: '#e0dbd5',
    borderWidth: 18,
    matColor: '#ffffff',
    matWidth: 16,
    aspectRatio: 3 / 4,
    borderRadius: '2px',
    photoSlots: 1,
  },
  {
    id: 'arch-portrait',
    name: 'Arch Portrait',
    category: 'Portrait',
    shape: 'arch',
    borderColor: '#2d2d2d',
    borderWidth: 0,
    aspectRatio: 3 / 4,
    borderRadius: '100px 100px 4px 4px',
    photoSlots: 1,
  },

  // ── Landscape ─────────────────────────────────────────────
  {
    id: 'landscape-black',
    name: 'Landscape Acrylic',
    category: 'Landscape',
    shape: 'landscape',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#f5f0eb',
    matWidth: 12,
    aspectRatio: 4 / 3,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'landscape-walnut',
    name: 'Landscape Walnut',
    category: 'Landscape',
    shape: 'landscape',
    borderColor: '#5c3d2e',
    borderWidth: 18,
    matColor: '#f9f4ef',
    matWidth: 16,
    aspectRatio: 4 / 3,
    borderRadius: '3px',
    photoSlots: 1,
    tags: ['wood'],
  },
  {
    id: 'landscape-silver',
    name: 'Landscape Silver',
    category: 'Landscape',
    shape: 'landscape',
    borderColor: '#a8a9ad',
    borderWidth: 10,
    matColor: '#ffffff',
    matWidth: 12,
    aspectRatio: 4 / 3,
    borderRadius: '2px',
    photoSlots: 1,
  },
  {
    id: 'landscape-wide',
    name: 'Panoramic',
    category: 'Landscape',
    shape: 'landscape',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#f5f0eb',
    matWidth: 10,
    aspectRatio: 16 / 9,
    borderRadius: '2px',
    photoSlots: 1,
  },

  // ── Square ────────────────────────────────────────────────
  {
    id: 'square-black',
    name: 'Acrylic Square',
    category: 'Square',
    shape: 'square',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#f5f0eb',
    matWidth: 12,
    aspectRatio: 1,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'rounded-square-black',
    name: 'Rounded Square',
    category: 'Square',
    shape: 'rounded-square',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#f5f0eb',
    matWidth: 12,
    aspectRatio: 1,
    borderRadius: '28px',
    photoSlots: 1,
  },
  {
    id: 'square-white-mat',
    name: 'White Mat Square',
    category: 'Square',
    shape: 'square',
    borderColor: '#d9d5cf',
    borderWidth: 16,
    matColor: '#ffffff',
    matWidth: 24,
    aspectRatio: 1,
    borderRadius: '2px',
    photoSlots: 1,
  },
  {
    id: 'square-gold',
    name: 'Gold Square',
    category: 'Square',
    shape: 'square',
    borderColor: '#c9a84c',
    borderWidth: 16,
    matColor: '#fdf8ee',
    matWidth: 14,
    aspectRatio: 1,
    borderRadius: '3px',
    photoSlots: 1,
  },

  // ── Circle ────────────────────────────────────────────────
  {
    id: 'circle-classic',
    name: 'Circle Acrylic',
    category: 'Circle',
    shape: 'circle',
    borderColor: '#d4d4d4',
    borderWidth: 12,
    aspectRatio: 1,
    borderRadius: '50%',
    photoSlots: 1,
  },
  {
    id: 'circle-black',
    name: 'Circle Black Border',
    category: 'Circle',
    shape: 'circle',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    aspectRatio: 1,
    borderRadius: '50%',
    photoSlots: 1,
  },
  {
    id: 'circle-gold',
    name: 'Circle Gold',
    category: 'Circle',
    shape: 'circle',
    borderColor: '#c9a84c',
    borderWidth: 14,
    matColor: '#fdf8ee',
    matWidth: 10,
    aspectRatio: 1,
    borderRadius: '50%',
    photoSlots: 1,
  },

  // ── Dual Border ───────────────────────────────────────────
  {
    id: 'dual-portrait',
    name: 'Portrait Dual Border',
    category: 'Dual Border',
    shape: 'dual-border-portrait',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#ffffff',
    matWidth: 10,
    innerBorderColor: '#1a1a1a',
    innerBorderWidth: 3,
    aspectRatio: 3 / 4,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'dual-square',
    name: 'Square Dual Border',
    category: 'Dual Border',
    shape: 'dual-border-square',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#ffffff',
    matWidth: 10,
    innerBorderColor: '#1a1a1a',
    innerBorderWidth: 3,
    aspectRatio: 1,
    borderRadius: '3px',
    photoSlots: 1,
  },
  {
    id: 'dual-rounded-square',
    name: 'Round Dual Border',
    category: 'Dual Border',
    shape: 'dual-border-square',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#ffffff',
    matWidth: 10,
    innerBorderColor: '#1a1a1a',
    innerBorderWidth: 3,
    aspectRatio: 1,
    borderRadius: '24px',
    photoSlots: 1,
  },
  {
    id: 'dual-circle',
    name: 'Circle Dual Border',
    category: 'Dual Border',
    shape: 'dual-border-circle',
    borderColor: '#1a1a1a',
    borderWidth: 10,
    matColor: '#ffffff',
    matWidth: 8,
    innerBorderColor: '#1a1a1a',
    innerBorderWidth: 3,
    aspectRatio: 1,
    borderRadius: '50%',
    photoSlots: 1,
  },
  {
    id: 'dual-balloon',
    name: 'Balloon Dual Border',
    category: 'Dual Border',
    shape: 'balloon',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#ffffff',
    matWidth: 8,
    innerBorderColor: '#1a1a1a',
    innerBorderWidth: 3,
    aspectRatio: 1,
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    photoSlots: 1,
  },

  // ── Collage ───────────────────────────────────────────────
  {
    id: 'collage-2v',
    name: 'Two Photo Portrait',
    category: 'Collage',
    shape: 'collage-2',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#f5f0eb',
    matWidth: 10,
    aspectRatio: 3 / 4,
    borderRadius: '3px',
    photoSlots: 2,
  },
  {
    id: 'collage-3h',
    name: 'Three Photo Strip',
    category: 'Collage',
    shape: 'collage-3h',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#f5f0eb',
    matWidth: 8,
    aspectRatio: 4 / 3,
    borderRadius: '3px',
    photoSlots: 3,
  },
  {
    id: 'collage-3v',
    name: 'Three Photo Column',
    category: 'Collage',
    shape: 'collage-3v',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#f5f0eb',
    matWidth: 8,
    aspectRatio: 3 / 4,
    borderRadius: '3px',
    photoSlots: 3,
  },
  {
    id: 'collage-4',
    name: 'Four Photo Grid',
    category: 'Collage',
    shape: 'collage-4',
    borderColor: '#1a1a1a',
    borderWidth: 12,
    matColor: '#f5f0eb',
    matWidth: 8,
    aspectRatio: 1,
    borderRadius: '3px',
    photoSlots: 4,
  },

  // ── Creative ──────────────────────────────────────────────
  {
    id: 'extra-rounded',
    name: 'Extra Rounded',
    category: 'Creative',
    shape: 'extra-rounded',
    borderColor: '#d4d4d4',
    borderWidth: 12,
    aspectRatio: 3 / 4,
    borderRadius: '60px',
    photoSlots: 1,
  },
  {
    id: 'rounded-rect-landscape',
    name: 'Rounded Landscape',
    category: 'Creative',
    shape: 'rounded-rect-landscape',
    borderColor: '#1a1a1a',
    borderWidth: 14,
    matColor: '#f5f0eb',
    matWidth: 10,
    aspectRatio: 4 / 3,
    borderRadius: '32px',
    photoSlots: 1,
  },
  {
    id: 'heart-frame',
    name: 'Heart Frame',
    category: 'Creative',
    shape: 'heart',
    borderColor: '#e8a0a0',
    borderWidth: 0,
    aspectRatio: 1,
    borderRadius: '0',
    photoSlots: 1,
    tags: ['love', 'couple'],
  },
];

export const frameCategories: FrameCategory[] = [
  'All',
  'Portrait',
  'Landscape',
  'Square',
  'Circle',
  'Collage',
  'Dual Border',
  'Creative',
];