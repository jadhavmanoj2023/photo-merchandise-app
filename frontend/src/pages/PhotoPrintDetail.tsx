import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  getPhotoPrintPack,
  printFinishes,
  PrintFinish,
  formatFinishLabel,
  getPrintSubtitle,
} from '../data/photoPrints';

export default function PhotoPrintDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pack = id ? getPhotoPrintPack(id) : undefined;

  const [selectedFinish, setSelectedFinish] = useState<PrintFinish>('glossy');
  const [activeImage, setActiveImage] = useState(0);

  if (!pack) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Print pack not found</h2>
        <Link to="/category/photo-print" className="mt-4 inline-block text-[#e11d48] hover:underline text-sm">
          ← Back to photo prints
        </Link>
      </div>
    );
  }

  const images = pack.galleryImages.length > 0 ? pack.galleryImages : [pack.image];

  const handleCreate = () => {
    navigate(`/photo-print/${pack.id}/studio`, { state: { finish: selectedFinish } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Photo Prints', to: '/category/photo-print' },
            { label: pack.name },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-8">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden mb-3">
              <img
                src={images[activeImage]}
                alt={pack.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition ${
                      activeImage === i ? 'border-[#e11d48]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{pack.name}</h1>
            <p className="text-xs font-semibold text-gray-500 tracking-widest mt-2 uppercase">
              {getPrintSubtitle(pack, selectedFinish)}
            </p>
            <p className="text-sm text-gray-400 mt-1">{pack.unitsSold.toLocaleString()} units sold</p>

            <div className="mt-8">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Select Finish</h2>
              <div className="flex gap-3">
                {printFinishes.map((finish) => (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setSelectedFinish(finish.id)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition ${
                      selectedFinish === finish.id
                        ? 'border-[#e11d48] bg-red-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden bg-gray-100">
                      <img src={finish.image} alt={finish.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{finish.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-baseline gap-2">
              <span className="text-sm text-gray-500">From</span>
              <span className="text-2xl font-bold text-gray-900">₹{pack.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{pack.originalPrice}</span>
              <span className="text-sm font-bold text-[#e11d48]">{pack.discountPercent}% OFF</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">(Inclusive of all taxes)</p>

            <div className="mt-6 p-4 bg-[#f5f4f2] rounded-lg border border-gray-100">
              <p className="text-sm font-bold text-gray-900">Use code: <span className="text-[#e11d48]">FIRST</span></p>
              <p className="text-xs text-gray-500 mt-1">Offer valid only on your first order.</p>
            </div>

            <button
              type="button"
              onClick={handleCreate}
              className="mt-8 w-full md:w-auto md:min-w-[200px] py-3.5 px-8 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-lg transition shadow-md shadow-red-100"
            >
              CREATE NOW
            </button>

            <div className="mt-10 space-y-6 border-t border-gray-100 pt-8">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Product Details</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pack.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">Product Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-1.5 list-disc pl-5">
                  {pack.specifications.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
