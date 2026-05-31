import { useCallback, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import {
  getPhotoPrintPack,
  getPrintSubtitle,
  PrintFinish,
  formatFinishLabel,
} from '../data/photoPrints';

type StudioStep = 1 | 2 | 3;

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
  size: number;
  rotation: number;
  hasBorder: boolean;
}

const STEPS = [
  { num: 1, label: 'Add Photos' },
  { num: 2, label: 'Edit Photos & Layout' },
  { num: 3, label: 'Order' },
] as const;

export default function PhotoPrintStudio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pack = id ? getPhotoPrintPack(id) : undefined;
  const finish = (location.state as { finish?: PrintFinish } | null)?.finish ?? 'glossy';

  const [step, setStep] = useState<StudioStep>(1);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const requiredCount = pack?.photoCount ?? 0;
  const isComplete = photos.length >= requiredCount;
  const activePhoto = photos[activeIndex];

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      if (!pack) return;
      const fileArray = Array.from(files).filter((f) => f.type.startsWith('image/'));
      const slotsLeft = requiredCount - photos.length;
      if (slotsLeft <= 0 || fileArray.length === 0) return;

      setUploading(true);
      setUploadProgress(0);

      const toAdd = fileArray.slice(0, slotsLeft);
      let loaded = 0;

      toAdd.forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          setPhotos((prev) => {
            if (prev.length >= requiredCount) return prev;
            return [
              ...prev,
              {
                id: `${Date.now()}-${i}-${file.name}`,
                url,
                name: file.name,
                size: file.size,
                rotation: 0,
                hasBorder: false,
              },
            ];
          });
          loaded += 1;
          setUploadProgress(Math.round((loaded / toAdd.length) * 100));
          if (loaded === toAdd.length) {
            setTimeout(() => {
              setUploading(false);
              setUploadProgress(0);
            }, 400);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [pack, photos.length, requiredCount]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = '';
  };

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    setActiveIndex(0);
  };

  const updateActivePhoto = (patch: Partial<UploadedPhoto>) => {
    if (!activePhoto) return;
    setPhotos((prev) =>
      prev.map((p) => (p.id === activePhoto.id ? { ...p, ...patch } : p))
    );
  };

  const rotatePhoto = () => {
    updateActivePhoto({ rotation: ((activePhoto?.rotation ?? 0) + 90) % 360 });
  };

  const toggleBorder = () => {
    updateActivePhoto({ hasBorder: !activePhoto?.hasBorder });
  };

  const handleAddToCart = () => {
    if (!pack || photos.length < requiredCount) return;
    dispatch(
      addToCart({
        productId: pack.id,
        productName: `${pack.name} · ${formatFinishLabel(finish)} · ${photos.length} photos`,
        price: pack.price,
        quantity: 1,
        uploadedImageUrl: photos[0].url,
      })
    );
    navigate('/cart');
  };

  if (!pack) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Print pack not found.</p>
        <Link to="/category/photo-print" className="mt-4 inline-block text-[#e11d48] text-sm hover:underline">
          ← Back to photo prints
        </Link>
      </div>
    );
  }

  const subtitle = getPrintSubtitle(pack, finish);

  return (
    <div className="min-h-screen bg-[#f5f4f2] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => (step === 1 ? navigate(`/photo-print/${pack.id}`) : setStep((s) => (s - 1) as StudioStep))}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            ← BACK
          </button>
          <h1 className="text-xs sm:text-sm font-bold text-[#1e3a5f] tracking-wide uppercase text-center flex-1 px-4 truncate">
            {subtitle}
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Step sidebar */}
        <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-white border-r border-gray-200 py-8 px-6 shrink-0">
          <nav className="relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-200" />
            <ul className="space-y-8 relative">
              {STEPS.map(({ num, label }) => {
                const isActive = step === num;
                const isDone = step > num || (num === 1 && isComplete && step > 1);
                return (
                  <li key={num} className="flex items-start gap-4">
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isActive
                          ? 'bg-[#e11d48] text-white'
                          : isDone
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      {isDone && !isActive ? '✓' : num}
                    </div>
                    <span
                      className={`text-sm pt-1 leading-snug ${
                        isActive ? 'font-bold text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile step indicator */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-30 flex justify-between text-xs">
          {STEPS.map(({ num, label }) => (
            <button
              key={num}
              type="button"
              onClick={() => num <= step && setStep(num as StudioStep)}
              className={`flex flex-col items-center gap-1 ${step === num ? 'text-[#e11d48] font-bold' : 'text-gray-400'}`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${
                step === num ? 'bg-[#e11d48] text-white' : 'bg-gray-100'
              }`}>
                {num}
              </span>
              <span className="hidden xs:block max-w-[4.5rem] text-center leading-tight">{label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-24 md:pb-10 min-w-0">
          {/* Step 1: Upload */}
          {step === 1 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] mb-2">Upload your photos</h2>
              <p className="text-sm text-gray-500 mb-8 max-w-xl">
                Please pick {requiredCount} photo{requiredCount !== 1 ? 's' : ''}. The first{' '}
                {requiredCount} photo{requiredCount !== 1 ? 's' : ''} that you select will be uploaded.
                You can edit your creation further on the next screen.
              </p>

              <div className="flex flex-wrap items-start gap-4 mb-8">
                {photos.length < requiredCount && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-28 h-28 sm:w-32 sm:h-32 border-2 border-dashed border-[#e11d48]/60 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-red-50/50 transition disabled:opacity-50"
                  >
                    <span className="text-3xl text-[#e11d48] font-light">+</span>
                    <span className="text-[10px] font-bold text-[#1e3a5f] tracking-wider">ADD PHOTOS</span>
                  </button>
                )}

                {photos.map((photo) => (
                  <div key={photo.id} className="relative group w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-sm bg-white">
                    <img src={photo.url} alt="" className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-green-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      ✓
                    </span>
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute bottom-1 right-1 w-5 h-5 bg-black/50 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-4">
                {photos.length} / {requiredCount} photos selected
              </p>

              {uploading && (
                <div className="max-w-md mb-6">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e11d48] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Uploading: {uploadProgress}%</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              {isComplete && (
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-2.5 border-2 border-[#e11d48] text-[#e11d48] font-bold rounded-lg hover:bg-red-50 transition text-sm"
                  >
                    Preview →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Edit */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto">
              {activePhoto ? (
                <>
                  <div className="relative flex items-center justify-center gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                      disabled={activeIndex === 0}
                      className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30"
                    >
                      ‹
                    </button>
                    <div
                      className={`flex-1 max-w-sm aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center ${
                        activePhoto.hasBorder ? 'p-4 border-8 border-white shadow-inner ring-1 ring-gray-200' : ''
                      }`}
                    >
                      <img
                        src={activePhoto.url}
                        alt=""
                        className="max-w-full max-h-full object-contain transition-transform duration-300"
                        style={{ transform: `rotate(${activePhoto.rotation}deg)` }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.min(photos.length - 1, i + 1))}
                      disabled={activeIndex === photos.length - 1}
                      className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30"
                    >
                      ›
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-500 mb-6">
                    Photo {activeIndex + 1} of {photos.length} · Enhance with borders for just ₹29
                  </p>

                  <div className="flex justify-center gap-6 sm:gap-10 mb-10">
                    {[
                      { label: 'Orientation', icon: '↻', action: rotatePhoto },
                      { label: 'Borders', icon: '▢', action: toggleBorder },
                    ].map((tool) => (
                      <button
                        key={tool.label}
                        type="button"
                        onClick={tool.action}
                        className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#e11d48] transition"
                      >
                        <span className="w-12 h-12 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-xl">
                          {tool.icon}
                        </span>
                        <span className="text-xs font-medium">{tool.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-lg transition text-sm"
                    >
                      Done
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center">No photos to edit.</p>
              )}
            </div>
          )}

          {/* Step 3: Order */}
          {step === 3 && (
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-bold text-[#1e3a5f] mb-2">Review your order</h2>
              <p className="text-sm text-gray-500 mb-8">
                {pack.name} · {formatFinishLabel(finish)} finish · {photos.length} photos
              </p>

              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
                <div className="flex flex-wrap justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{pack.price}
                      <span className="text-sm font-normal text-gray-400 line-through ml-2">₹{pack.originalPrice}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Finish</p>
                    <p className="font-semibold text-gray-900">{formatFinishLabel(finish)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {photos.map((photo, i) => (
                    <div key={photo.id} className="aspect-square rounded-md overflow-hidden bg-gray-100 relative">
                      <img
                        src={photo.url}
                        alt={`Print ${i + 1}`}
                        className="w-full h-full object-cover"
                        style={{ transform: `rotate(${photo.rotation}deg)` }}
                      />
                      {photo.hasBorder && (
                        <div className="absolute inset-1 border-2 border-white pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-lg transition shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 5h12" />
                </svg>
                Add to Cart — ₹{pack.price}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
