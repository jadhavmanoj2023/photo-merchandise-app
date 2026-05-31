export interface MainCategory {
  slug: string;
  name: string;
  brand: string;
  description: string;
  image: string;
}

export interface SizeOption {
  label: string;
  price: number;
  available: boolean;
}

export interface CatalogProduct {
  id: string;
  categorySlug: string;
  name: string;
  frameTemplateId: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription?: string;
  image: string;
  sizes: SizeOption[];
  thicknesses: string[];
  stockLeft?: number;
  tags?: string[];
}

export const mainCategories: MainCategory[] = [
  {
    slug: 'classic-frames',
    name: 'Classic Frames',
    brand: 'Framly',
    description: 'Timeless wooden and metal frames for home and office.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600',
  },
  {
    slug: 'photo-print',
    name: 'Photo Print',
    brand: 'Zoomin',
    description: 'Premium matte, glossy, and canvas prints in every size.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600',
  },
  {
    slug: 'bulk-order',
    name: 'Bulk Order',
    brand: 'Corporate',
    description: 'Volume pricing for events, weddings, and corporate gifting.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
  },
  {
    slug: 'collage',
    name: 'Collage',
    brand: 'PhotoMerch',
    description: 'Multi-photo layouts to tell your story on one wall.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600',
  },
  {
    slug: 'acrylic-prints',
    name: 'Acrylic Wall Photos',
    brand: 'PhotoMerch',
    description: 'Acrylic wall photos with crystal-clear finish and easy mount.',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600',
  },
  {
    slug: 'baby-birth',
    name: 'Baby Birth Frames',
    brand: 'PhotoMerch',
    description: 'Keepsake frames for new arrivals and milestone moments.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600',
  },
];

const portraitSizes: SizeOption[] = [
  { label: '12×9', price: 699, available: true },
  { label: '16×12', price: 899, available: true },
  { label: '18×12', price: 999, available: true },
  { label: '21×15', price: 1199, available: true },
  { label: '30×20', price: 1699, available: true },
  { label: '35×23', price: 1999, available: true },
  { label: '48×36', price: 2499, available: false },
];

const landscapeSizes: SizeOption[] = [
  { label: '9×12', price: 699, available: true },
  { label: '12×16', price: 899, available: true },
  { label: '12×18', price: 999, available: true },
  { label: '15×21', price: 1199, available: true },
  { label: '20×30', price: 1699, available: true },
];

const squareSizes: SizeOption[] = [
  { label: '8×8', price: 599, available: true },
  { label: '10×10', price: 749, available: true },
  { label: '12×12', price: 899, available: true },
  { label: '16×16', price: 1299, available: true },
];

export const catalogProducts: CatalogProduct[] = [
  // Classic Frames (Framly)
  {
    id: 'cf-portrait-black',
    categorySlug: 'classic-frames',
    name: 'Classic Black Portrait Frame',
    frameTemplateId: 'portrait-black',
    price: 899,
    originalPrice: 1299,
    description: 'A timeless black frame with ivory mat — perfect for portraits and family photos.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500',
    sizes: portraitSizes,
    thicknesses: ['Standard', 'Premium'],
    stockLeft: 12,
  },
  {
    id: 'cf-portrait-gold',
    categorySlug: 'classic-frames',
    name: 'Golden Luxe Portrait Frame',
    frameTemplateId: 'portrait-gold',
    price: 1199,
    originalPrice: 1699,
    description: 'Premium gold-finish frame with cream mat for an elegant display.',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=500',
    sizes: portraitSizes,
    thicknesses: ['Standard', 'Premium'],
    stockLeft: 8,
  },
  {
    id: 'cf-landscape-walnut',
    categorySlug: 'classic-frames',
    name: 'Walnut Wood Landscape Frame',
    frameTemplateId: 'landscape-walnut',
    price: 1099,
    originalPrice: 1499,
    description: 'Natural walnut texture with warm tones — ideal for landscapes and travel shots.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    sizes: landscapeSizes,
    thicknesses: ['Standard', 'Premium'],
  },
  {
    id: 'cf-square-white',
    categorySlug: 'classic-frames',
    name: 'White Mat Square Frame',
    frameTemplateId: 'square-white-mat',
    price: 799,
    originalPrice: 1099,
    description: 'Clean white mat square frame for modern minimalist interiors.',
    image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500',
    sizes: squareSizes,
    thicknesses: ['Standard'],
  },
  {
    id: 'cf-landscape-silver',
    categorySlug: 'classic-frames',
    name: 'Silver Slim Landscape Frame',
    frameTemplateId: 'landscape-silver',
    price: 949,
    description: 'Sleek silver slim profile for contemporary wall galleries.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    sizes: landscapeSizes,
    thicknesses: ['Standard', 'Premium'],
  },

  // Bulk Order
  {
    id: 'bo-wedding-100',
    categorySlug: 'bulk-order',
    name: 'Wedding Favour Pack (100 pcs)',
    frameTemplateId: 'portrait-black',
    price: 49999,
    originalPrice: 69999,
    description: '100 identical custom prints — ideal for wedding favours. Upload one design, we print all.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
    sizes: [{ label: '4×6', price: 49999, available: true }, { label: '5×7', price: 54999, available: true }],
    thicknesses: ['Standard'],
  },
  {
    id: 'bo-corporate-50',
    categorySlug: 'bulk-order',
    name: 'Corporate Gift Pack (50 pcs)',
    frameTemplateId: 'landscape-black',
    price: 24999,
    description: 'Branded corporate gifting with logo placement support. Minimum 50 units.',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
    sizes: [{ label: '8×10', price: 24999, available: true }, { label: '11×14', price: 29999, available: true }],
    thicknesses: ['Standard', 'Premium'],
  },
  {
    id: 'bo-event-25',
    categorySlug: 'bulk-order',
    name: 'Event Pack (25 pcs)',
    frameTemplateId: 'square-black',
    price: 8999,
    description: 'Small-batch bulk orders for birthdays, reunions, and team events.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500',
    sizes: [{ label: '6×6', price: 8999, available: true }, { label: '8×8', price: 10999, available: true }],
    thicknesses: ['Standard'],
  },

  // Collage
  {
    id: 'col-2v',
    categorySlug: 'collage',
    name: '2-Photo Vertical Collage',
    frameTemplateId: 'collage-2v',
    price: 1299,
    originalPrice: 1899,
    description: 'Stack two favourite moments in one elegant vertical frame.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
    stockLeft: 6,
  },
  {
    id: 'col-3h',
    categorySlug: 'collage',
    name: '3-Photo Horizontal Collage',
    frameTemplateId: 'collage-3h',
    price: 1499,
    originalPrice: 2199,
    description: 'Three photos side by side — perfect for siblings or travel series.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500',
    sizes: landscapeSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },
  {
    id: 'col-4',
    categorySlug: 'collage',
    name: '4-Photo Grid Collage',
    frameTemplateId: 'collage-4',
    price: 1699,
    originalPrice: 2399,
    description: 'Classic 2×2 grid layout for your best four memories.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
    sizes: squareSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },
  {
    id: 'col-3v',
    categorySlug: 'collage',
    name: '3-Photo Vertical Collage',
    frameTemplateId: 'collage-3v',
    price: 1399,
    description: 'Three stacked photos in a tall portrait layout.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe51f0?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm'],
  },

  // Acrylic wall photos
  {
    id: 'acrylic-portrait',
    categorySlug: 'acrylic-prints',
    name: 'Portrait Acrylic Wall Photo',
    frameTemplateId: 'portrait-black',
    price: 699,
    originalPrice: 1299,
    description: 'Crystal-clear acrylic with vivid colours. Includes easy-mount adhesive hooks.',
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
    stockLeft: 8,
  },
  {
    id: 'acrylic-landscape',
    categorySlug: 'acrylic-prints',
    name: 'Landscape Acrylic Wall Photo',
    frameTemplateId: 'landscape-black',
    price: 699,
    originalPrice: 1299,
    description: 'Borderless acrylic landscape print — floats off the wall for a premium look.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    sizes: landscapeSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },
  {
    id: 'acrylic-square',
    categorySlug: 'acrylic-prints',
    name: 'Acrylic Square Wall Photo Frame',
    frameTemplateId: 'square-black',
    price: 599,
    originalPrice: 999,
    description: 'Modern square acrylic display for desks or gallery walls.',
    image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500',
    sizes: squareSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },
  {
    id: 'acrylic-dual-portrait',
    categorySlug: 'acrylic-prints',
    name: 'Portrait Acrylic Dual Border',
    frameTemplateId: 'dual-portrait',
    price: 799,
    originalPrice: 1399,
    description: 'Striking dual-border acrylic with depth and dimension.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
    stockLeft: 5,
  },
  {
    id: 'acrylic-circle',
    categorySlug: 'acrylic-prints',
    name: 'Circle Acrylic Wall Photo',
    frameTemplateId: 'circle-classic',
    price: 749,
    originalPrice: 1199,
    description: 'Unique circular acrylic print for standout wall décor.',
    image: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?w=500',
    sizes: squareSizes,
    thicknesses: ['3mm', '5mm'],
  },
  {
    id: 'acrylic-rounded-square',
    categorySlug: 'acrylic-prints',
    name: 'Rounded Square Acrylic Photo',
    frameTemplateId: 'rounded-square-black',
    price: 649,
    description: 'Soft rounded corners on premium acrylic — trendy and durable.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500',
    sizes: squareSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },

  // Baby birth frames
  {
    id: 'baby-arch-portrait',
    categorySlug: 'baby-birth',
    name: 'Arch Baby Portrait Frame',
    frameTemplateId: 'arch-portrait',
    price: 899,
    originalPrice: 1299,
    description: 'Gentle arch shape — a sweet nursery centrepiece for your little one.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm'],
    stockLeft: 10,
  },
  {
    id: 'baby-heart-frame',
    categorySlug: 'baby-birth',
    name: 'Heart Keepsake Baby Frame',
    frameTemplateId: 'heart-frame',
    price: 799,
    originalPrice: 1199,
    description: 'Heart-shaped frame for ultrasound photos and first snapshots.',
    image: 'https://images.unsplash.com/photo-1555252337-9f8e92e65df9?w=500',
    sizes: squareSizes,
    thicknesses: ['3mm', '5mm'],
  },
  {
    id: 'baby-balloon',
    categorySlug: 'baby-birth',
    name: 'Balloon Birth Announcement Frame',
    frameTemplateId: 'dual-balloon',
    price: 949,
    description: 'Playful balloon shape — perfect for birth announcement photos.',
    image: 'https://images.unsplash.com/photo-1584515934247-14f42fbb9b8b?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm'],
  },
  {
    id: 'baby-portrait-gold',
    categorySlug: 'baby-birth',
    name: 'Golden Baby Portrait Frame',
    frameTemplateId: 'portrait-gold',
    price: 999,
    originalPrice: 1499,
    description: 'Soft gold frame for milestone photos — first smile, first steps, and more.',
    image: 'https://images.unsplash.com/photo-1555252337-9f8e92e65df9?w=500',
    sizes: portraitSizes,
    thicknesses: ['3mm', '5mm', '8mm'],
  },
];

export function getCategoryBySlug(slug: string): MainCategory | undefined {
  return mainCategories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string): CatalogProduct[] {
  return catalogProducts.filter((p) => p.categorySlug === slug);
}

export function getCatalogProduct(id: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.id === id);
}
