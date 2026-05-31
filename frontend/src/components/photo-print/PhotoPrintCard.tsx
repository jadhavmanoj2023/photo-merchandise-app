import { Link } from 'react-router-dom';
import { PhotoPrintPack } from '../data/photoPrints';

interface Props {
  pack: PhotoPrintPack;
}

export default function PhotoPrintCard({ pack }: Props) {
  return (
    <Link
      to={`/photo-print/${pack.id}`}
      className="group flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={pack.image}
          alt={pack.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 md:p-4 flex flex-col flex-1">
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 leading-snug mb-2 min-h-[2.5rem]">
          {pack.name}
        </h3>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-gray-500">From</span>
          <span className="font-bold text-gray-900">₹{pack.price}</span>
          <span className="text-gray-400 line-through">₹{pack.originalPrice}</span>
          <span className="text-[10px] font-semibold text-[#e11d48] bg-red-50 px-1.5 py-0.5 rounded">
            {pack.discountPercent}%
          </span>
        </div>
      </div>
    </Link>
  );
}
