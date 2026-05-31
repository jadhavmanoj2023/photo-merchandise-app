import { getCategoryBySlug } from '../data/catalog';
import { photoPrintPacks } from '../data/photoPrints';
import PhotoPrintCard from '../components/photo-print/PhotoPrintCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function PhotoPrintCategory() {
  const category = getCategoryBySlug('photo-print');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: category?.name ?? 'Photo Prints' },
          ]}
        />

        <div className="mt-6 mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Photo Prints</h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Enjoy high quality professional photo prints.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {photoPrintPacks.map((pack) => (
            <PhotoPrintCard key={pack.id} pack={pack} />
          ))}
        </div>
      </div>
    </div>
  );
}
