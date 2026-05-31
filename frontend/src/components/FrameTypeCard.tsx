import { Link } from 'react-router-dom';
import { CatalogProduct } from '../data/catalog';
import { frameTemplates } from '../data/frameTemplates';
import FrameThumbnail from './FrameThumbnail';

interface Props {
  product: CatalogProduct;
}

export default function FrameTypeCard({ product }: Props) {
  const template = frameTemplates.find((f) => f.id === product.frameTemplateId);

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="aspect-square bg-[#f0eeeb] flex items-center justify-center p-6">
        {template ? (
          <FrameThumbnail frame={template} size={200} />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 text-center">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug mb-4 min-h-[2.5rem]">
          {product.name}
        </h3>

        <Link
          to={`/product/${product.id}`}
          className="mt-auto inline-flex items-center justify-center gap-2 mx-auto border-2 border-[#e11d48] text-[#e11d48] rounded-full px-6 py-2.5 text-xs font-bold tracking-wider hover:bg-[#e11d48] hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          CUSTOMISE
        </Link>
      </div>
    </article>
  );
}
