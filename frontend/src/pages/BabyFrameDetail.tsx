import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Breadcrumbs from '../components/Breadcrumbs';
import BabyFrameCanvas from '../components/baby/BabyFrameCanvas';
import {
  babyFrameSizes,
  babyThicknesses,
  babyFrameProducts,
  defaultBabyDetails,
  detailsSummary,
  getBabyFrame,
  BabyFrameDetails,
} from '../data/babyFrames';

export default function BabyFrameDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = id ? getBabyFrame(id) : undefined;
  const [details, setDetails] = useState<BabyFrameDetails>({ ...defaultBabyDetails });
  const [selectedSize, setSelectedSize] = useState(babyFrameSizes.find((s) => s.available)?.label ?? '12×9');
  const [selectedThickness, setSelectedThickness] = useState(babyThicknesses[0]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-800">Frame not found</h2>
        <Link to="/category/baby-birth" className="mt-4 inline-block text-[#e11d48] text-sm hover:underline">
          ← Back to baby frames
        </Link>
      </div>
    );
  }

  const sizeOption = babyFrameSizes.find((s) => s.label === selectedSize);
  const unitPrice = sizeOption?.price ?? product.price;

  const handleAddToCart = () => {
    if (!details.photoTop || !details.photoBottom) {
      alert('Please upload both photos on the frame.');
      return;
    }
    if (!details.babyName.trim()) {
      alert('Please enter the baby name.');
      return;
    }
    dispatch(
      addToCart({
        productId: product.id,
        productName: `${product.name} · ${detailsSummary(details)} · ${selectedSize} · ${selectedThickness}`,
        price: unitPrice,
        quantity: 1,
        uploadedImageUrl: details.photoTop,
      })
    );
    navigate('/cart');
  };

  const related = babyFrameProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f4f2]">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Baby Birth Frames', to: '/category/baby-birth' },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left — editable frame preview */}
          <div>
            <div className="bg-[#eceae6] rounded-2xl p-6 sm:p-8 flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-4 text-center">
                Click any text or photo area on the frame to edit
              </p>
              <div className="w-full flex justify-center">
                <BabyFrameCanvas
                  details={details}
                  onChange={setDetails}
                  theme={product.theme}
                  className="shadow-xl"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <span>📦</span> Show 3D Preview
            </button>
          </div>

          {/* Right — options */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f]">{product.name}</h1>
              <div className="flex items-baseline gap-3 mt-2">
                <p className="text-2xl font-bold text-[#e11d48]">₹{unitPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</p>
              </div>
              {product.stockLeft != null && (
                <p className="text-xs font-semibold text-amber-600 mt-2">Only {product.stockLeft} left!</p>
              )}
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-600 space-y-2">
              <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Your details</p>
              <p><span className="text-gray-400">Baby:</span> {details.babyName || '—'}</p>
              <p><span className="text-gray-400">Born:</span> {details.birthDay} {details.birthMonthYear}</p>
              <p><span className="text-gray-400">Parents:</span> {details.parentNames || '—'}</p>
              <p>
                <span className="text-gray-400">Photos:</span>{' '}
                {(details.photoTop ? 1 : 0) + (details.photoBottom ? 1 : 0)}/2 uploaded
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Size (Inch)</h3>
              <div className="flex flex-wrap gap-2">
                {babyFrameSizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    disabled={!size.available}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                      !size.available
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : selectedSize === size.label
                        ? 'border-[#e11d48] bg-red-50 text-[#e11d48]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {size.label.replace('×', 'x')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Thickness (mm)</h3>
              <div className="flex flex-wrap gap-2">
                {babyThicknesses.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedThickness(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                      selectedThickness === t
                        ? 'border-[#e11d48] bg-red-50 text-[#e11d48]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
              <span className="text-lg">⚡</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-green-800 uppercase tracking-wide">Easy mount included</p>
                <p className="text-xs text-green-700">Adhesive hooks — no drilling</p>
              </div>
              <span className="text-green-600">✓</span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl text-base font-bold bg-[#e11d48] hover:bg-[#be123c] text-white shadow-lg shadow-red-200 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5h12" />
              </svg>
              Add to Cart — ₹{unitPrice.toLocaleString()}
            </button>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🚚', title: 'Free Shipping', sub: 'Across India' },
                { icon: '↩️', title: '30-Day Returns', sub: 'Hassle-free' },
                { icon: '🔒', title: '100% Secure', sub: 'Encrypted' },
              ].map((b) => (
                <div key={b.title} className="bg-white rounded-xl p-3 text-center border border-gray-100">
                  <div className="text-lg mb-1">{b.icon}</div>
                  <p className="text-[10px] font-bold text-gray-800">{b.title}</p>
                  <p className="text-[9px] text-gray-500">{b.sub}</p>
                </div>
              ))}
            </div>

            {related.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  More baby frames
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {related.map((rp) => (
                    <button
                      key={rp.id}
                      type="button"
                      onClick={() => navigate(`/baby-frame/${rp.id}`)}
                      className="flex-shrink-0 w-[5.5rem] bg-[#f5f4f2] rounded-xl p-1.5 shadow-sm hover:shadow-md border border-gray-100"
                    >
                      <div className="aspect-[2/3] pointer-events-none">
                        <BabyFrameCanvas
                          details={defaultBabyDetails}
                          onChange={() => {}}
                          theme={rp.theme}
                          compact
                        />
                      </div>
                      <p className="text-[9px] text-gray-600 mt-1 text-center leading-tight line-clamp-2">
                        {rp.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
