import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getProductsByCategory } from '../data/catalog';
import FrameTypeCard from '../components/FrameTypeCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const products = slug ? getProductsByCategory(slug) : [];

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Category not found</h2>
        <Link to="/" className="mt-4 inline-block text-[#e11d48] hover:underline text-sm">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: category.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#e11d48]">
            {category.brand}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{category.name}</h1>
          <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">{category.description}</p>
          <p className="text-xs text-gray-400 mt-3">
            {products.length} frame {products.length === 1 ? 'style' : 'styles'} available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No frames in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <FrameTypeCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
