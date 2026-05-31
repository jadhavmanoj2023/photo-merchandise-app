import { Link } from 'react-router-dom';
import { BabyFrameProduct, defaultBabyDetails } from '../../data/babyFrames';
import BabyFrameCanvas from './BabyFrameCanvas';

interface Props {
  product: BabyFrameProduct;
}

export default function BabyFrameCard({ product }: Props) {
  return (
    <Link
      to={`/baby-frame/${product.id}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
    >
      <div className="aspect-[3/4] bg-[#f5f4f2] flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div className="w-[92%] h-[94%] max-h-full">
          <BabyFrameCanvas
            details={defaultBabyDetails}
            onChange={() => {}}
            theme={product.theme}
            compact
            className="shadow-lg"
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#e11d48] transition leading-snug">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <span className="font-bold text-gray-900">₹{product.price}</span>
          <span className="text-gray-400 line-through text-xs">₹{product.originalPrice}</span>
        </div>
        <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-[#e11d48] tracking-wider">
          CUSTOMISE →
        </span>
      </div>
    </Link>
  );
}
