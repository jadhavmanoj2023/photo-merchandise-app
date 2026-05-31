export type PrintFinish = 'glossy' | 'matte' | 'pearl';

export interface PhotoPrintPack {
  id: string;
  name: string;
  dimensions: string;
  photoCount: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  galleryImages: string[];
  unitsSold: number;
  description: string;
  specifications: string[];
}

export const printFinishes: { id: PrintFinish; label: string; image: string }[] = [
  {
    id: 'glossy',
    label: 'Glossy',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200',
  },
  {
    id: 'matte',
    label: 'Matte',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=200',
  },
  {
    id: 'pearl',
    label: 'Pearl',
    image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=200',
  },
];

export const photoPrintPacks: PhotoPrintPack[] = [
  {
    id: 'print-4x6-24',
    name: '4×6 Photo Prints (24 Prints)',
    dimensions: '4×6',
    photoCount: 24,
    price: 174,
    originalPrice: 349,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    ],
    unitsSold: 27210,
    description:
      'High-quality professional photo prints on premium paper. Choose from Glossy, Matte, or Pearl finish for the perfect look.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 24 prints per order',
      'Ideal for albums, gifts, and everyday memories',
    ],
  },
  {
    id: 'print-5x7-24',
    name: '5×7 Photo Prints (24 Prints)',
    dimensions: '5×7',
    photoCount: 24,
    price: 200,
    originalPrice: 399,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800',
    ],
    unitsSold: 18450,
    description:
      'Classic 5×7 prints with rich colour reproduction. Perfect for framing or sharing with family.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 24 prints per order',
    ],
  },
  {
    id: 'print-6x8-15',
    name: '6×8 Photo Prints (15 Prints)',
    dimensions: '6×8',
    photoCount: 15,
    price: 200,
    originalPrice: 399,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800',
    ],
    unitsSold: 9210,
    description: 'Larger format prints for standout desk and shelf displays.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 15 prints per order',
    ],
  },
  {
    id: 'print-8x8-5',
    name: '8×8 Photo Prints (5 Prints)',
    dimensions: '8×8',
    photoCount: 5,
    price: 144,
    originalPrice: 289,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=800',
      'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800',
    ],
    unitsSold: 5630,
    description: 'Square format prints ideal for Instagram-style photos and modern galleries.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 5 prints per order',
    ],
  },
  {
    id: 'print-8x10-2',
    name: '8×10 Photo Prints (2 Prints)',
    dimensions: '8×10',
    photoCount: 2,
    price: 114,
    originalPrice: 229,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    unitsSold: 11200,
    description: 'Premium large-format prints — perfect for framing your favourite shots.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 2 prints per order',
    ],
  },
  {
    id: 'print-12x18-1',
    name: '12×18 Photo Print',
    dimensions: '12×18',
    photoCount: 1,
    price: 144,
    originalPrice: 289,
    discountPercent: 50,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800',
    ],
    unitsSold: 4380,
    description: 'Statement-size print for walls, posters, and special occasions.',
    specifications: [
      'Material: High-quality professional photo paper',
      'Finish available: Glossy, Matte, Pearl finish',
      'Pack size: 1 print per order',
    ],
  },
];

export function getPhotoPrintPack(id: string): PhotoPrintPack | undefined {
  return photoPrintPacks.find((p) => p.id === id);
}

export function formatFinishLabel(finish: PrintFinish): string {
  return finish.charAt(0).toUpperCase() + finish.slice(1);
}

export function getPrintSubtitle(pack: PhotoPrintPack, finish: PrintFinish): string {
  return `PHOTO PRINTS ${pack.dimensions.toUpperCase().replace('×', 'X')} ${finish.toUpperCase()}`;
}
