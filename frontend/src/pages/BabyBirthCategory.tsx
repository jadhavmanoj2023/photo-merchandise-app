import { getCategoryBySlug } from '../data/catalog';
import { babyFrameProducts } from '../data/babyFrames';
import BabyFrameCard from '../components/baby/BabyFrameCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function BabyBirthCategory() {
  const category = getCategoryBySlug('baby-birth');

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: category?.name ?? 'Baby Birth Frames' },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#e11d48]">
            {category?.brand}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            {category?.name ?? 'Baby Birth Frames'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-xl">
            Personalised birth announcement frames — click any detail on the frame to edit name, date,
            weight, photos, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {babyFrameProducts.map((product) => (
            <BabyFrameCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
