export interface BabyFrameDetails {
  babyName: string;
  birthDay: string;
  birthMonthYear: string;
  weight: string;
  bloodGroup: string;
  birthTime: string;
  hospital: string;
  parentNames: string;
  photoTop: string;
  photoBottom: string;
}

export interface BabyFrameTheme {
  background: string;
  accent: string;
  photoFrame: string;
  text: string;
}

export interface BabyFrameProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  stockLeft?: number;
  theme: BabyFrameTheme;
  previewImage: string;
}

export const defaultBabyDetails: BabyFrameDetails = {
  babyName: 'Agstya Roy',
  birthDay: '21',
  birthMonthYear: 'Aug 2024',
  weight: '2.9 Kg',
  bloodGroup: 'B+',
  birthTime: '9:45 AM',
  hospital: 'Sadar Hospital',
  parentNames: 'Rahul + Priya',
  photoTop: '',
  photoBottom: '',
};

export const babyFrameSizes = [
  { label: '12×9', price: 699, available: true },
  { label: '16×12', price: 899, available: true },
  { label: '21×15', price: 1099, available: true },
  { label: '48×36', price: 2499, available: false },
];

export const babyThicknesses = ['3mm', '5mm', '8mm'];

export const babyFrameProducts: BabyFrameProduct[] = [
  {
    id: 'newborn-classic',
    name: 'New Born Baby Acrylic Photo',
    price: 699,
    originalPrice: 1299,
    description:
      'A beautiful birth announcement acrylic frame with editable baby details, two photo slots, and charming illustrations.',
    stockLeft: 6,
    theme: {
      background: '#ffffff',
      accent: '#e11d48',
      photoFrame: '#4a4a4a',
      text: '#1a1a1a',
    },
    previewImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
  },
  {
    id: 'newborn-blush',
    name: 'Blush Pink Baby Birth Frame',
    price: 749,
    originalPrice: 1349,
    description:
      'Soft pink themed birth keepsake — same editable layout with a gentle nursery-friendly palette.',
    stockLeft: 8,
    theme: {
      background: '#fff5f7',
      accent: '#db2777',
      photoFrame: '#9d174d',
      text: '#831843',
    },
    previewImage: 'https://images.unsplash.com/photo-1555252337-9f8e92e65df9?w=600',
  },
  {
    id: 'newborn-sky',
    name: 'Sky Blue Baby Birth Frame',
    price: 749,
    originalPrice: 1349,
    description:
      'Cool blue theme for your little one — fully customisable name, stats, photos, and parent details.',
    theme: {
      background: '#f0f7ff',
      accent: '#2563eb',
      photoFrame: '#1e40af',
      text: '#1e3a5f',
    },
    previewImage: 'https://images.unsplash.com/photo-1584515934247-14f42fbb9b8b?w=600',
  },
  {
    id: 'newborn-warm',
    name: 'Warm Cream Baby Keepsake',
    price: 799,
    originalPrice: 1399,
    description:
      'Elegant cream-toned birth frame with gold accents — perfect for gifting to new parents.',
    stockLeft: 5,
    theme: {
      background: '#fffbf5',
      accent: '#b45309',
      photoFrame: '#78350f',
      text: '#451a03',
    },
    previewImage: 'https://images.unsplash.com/photo-1584515934247-14f42fbb9b8b?w=600',
  },
];

export function getBabyFrame(id: string): BabyFrameProduct | undefined {
  return babyFrameProducts.find((p) => p.id === id);
}

export function detailsSummary(details: BabyFrameDetails): string {
  return `${details.babyName} · ${details.birthDay} ${details.birthMonthYear}`;
}
