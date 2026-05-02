import { useParams } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { products } from '../data/products';

// ─── Frame Definitions ────────────────────────────────────────────────────────

interface Frame {
  id: string;
  name: string;
  borderStyle: string;   // Tailwind / inline CSS description handled in render
  borderColor: string;   // CSS color
  borderWidth: number;   // px
  borderRadius: number;  // px
  shadowColor: string;
  matColor?: string;     // optional inner mat
  matWidth?: number;
  label: string;
  aspectRatio: string;   // e.g. "1/1", "4/3", "3/4"
}

const frames: Frame[] = [
  {
    id: 'classic-black',
    name: 'Classic Black',
    label: 'Timeless',
    borderColor: '#1a1a1a',
    borderWidth: 18,
    borderRadius: 4,
    shadowColor: 'rgba(0,0,0,0.55)',
    matColor: '#f5f0eb',
    matWidth: 16,
    borderStyle: '',
    aspectRatio: '4/3',
  },
  {
    id: 'golden-luxe',
    name: 'Golden Luxe',
    label: 'Premium',
    borderColor: '#b8860b',
    borderWidth: 20,
    borderRadius: 2,
    shadowColor: 'rgba(184,134,11,0.4)',
    matColor: '#fdf8ee',
    matWidth: 20,
    borderStyle: '',
    aspectRatio: '4/3',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    label: 'Elegant',
    borderColor: '#c4855a',
    borderWidth: 16,
    borderRadius: 8,
    shadowColor: 'rgba(196,133,90,0.4)',
    matColor: '#fff5f2',
    matWidth: 14,
    borderStyle: '',
    aspectRatio: '4/3',
  },
  {
    id: 'walnut-wood',
    name: 'Walnut Wood',
    label: 'Natural',
    borderColor: '#5c3d2e',
    borderWidth: 22,
    borderRadius: 3,
    shadowColor: 'rgba(92,61,46,0.45)',
    matColor: '#f9f4ef',
    matWidth: 18,
    borderStyle: '',
    aspectRatio: '4/3',
  },
  {
    id: 'silver-slim',
    name: 'Silver Slim',
    label: 'Modern',
    borderColor: '#a8a9ad',
    borderWidth: 10,
    borderRadius: 2,
    shadowColor: 'rgba(100,100,120,0.35)',
    matColor: '#ffffff',
    matWidth: 12,
    borderStyle: '',
    aspectRatio: '4/3',
  },
  {
    id: 'portrait-black',
    name: 'Portrait',
    label: 'Vertical',
    borderColor: '#2d2d2d',
    borderWidth: 18,
    borderRadius: 4,
    shadowColor: 'rgba(0,0,0,0.55)',
    matColor: '#f5f0eb',
    matWidth: 16,
    borderStyle: '',
    aspectRatio: '3/4',
  },
  {
    id: 'square-white',
    name: 'White Mat',
    label: 'Square',
    borderColor: '#e8e4df',
    borderWidth: 20,
    borderRadius: 0,
    shadowColor: 'rgba(0,0,0,0.2)',
    matColor: '#ffffff',
    matWidth: 28,
    borderStyle: '',
    aspectRatio: '1/1',
  },
  {
    id: 'acrylic-clear',
    name: 'Acrylic Clear',
    label: 'Floating',
    borderColor: 'rgba(200,220,255,0.6)',
    borderWidth: 12,
    borderRadius: 6,
    shadowColor: 'rgba(80,140,255,0.25)',
    borderStyle: '',
    aspectRatio: '4/3',
  },
];

// ─── Photo Frame Preview Component ───────────────────────────────────────────

interface PhotoFrameProps {
  frame: Frame;
  uploadedImage: string;
  zoom: number;
  offsetX: number;
  offsetY: number;
  onDrag: (dx: number, dy: number) => void;
}

function PhotoFramePreview({ frame, uploadedImage, zoom, offsetX, offsetY, onDrag }: PhotoFrameProps) {
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    onDrag(dx, dy);
  }, [onDrag]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!uploadedImage) return;
    isDragging.current = true;
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - lastPos.current.x;
    const dy = e.touches[0].clientY - lastPos.current.y;
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    onDrag(dx, dy);
  }, [onDrag]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const outerBorder = frame.borderWidth;
  const matWidth = frame.matWidth ?? 0;
  const totalBorder = outerBorder + matWidth;

  const frameShadow = `0 8px 40px ${frame.shadowColor}, 0 2px 8px rgba(0,0,0,0.15)`;
  const isAcrylic = frame.id === 'acrylic-clear';

  return (
    <div
      className="relative select-none"
      style={{
        padding: `${outerBorder}px`,
        backgroundColor: frame.borderColor,
        borderRadius: `${frame.borderRadius + 2}px`,
        boxShadow: frameShadow,
        background: isAcrylic
          ? `linear-gradient(135deg, rgba(200,220,255,0.5), rgba(180,200,255,0.3))`
          : frame.borderColor,
        backdropFilter: isAcrylic ? 'blur(2px)' : undefined,
      }}
    >
      {/* Wood grain texture for walnut */}
      {frame.id === 'walnut-wood' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: `${frame.borderRadius + 2}px`,
            backgroundImage: `repeating-linear-gradient(
              92deg,
              transparent 0px, transparent 3px,
              rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px
            ), repeating-linear-gradient(
              180deg,
              transparent 0px, transparent 8px,
              rgba(255,255,255,0.04) 8px, rgba(255,255,255,0.04) 9px
            )`,
          }}
        />
      )}

      {/* Gold shimmer for golden luxe */}
      {frame.id === 'golden-luxe' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: `${frame.borderRadius + 2}px`,
            background: `linear-gradient(
              135deg,
              rgba(255,255,255,0.15) 0%,
              transparent 40%,
              rgba(255,255,255,0.08) 60%,
              transparent 100%
            )`,
          }}
        />
      )}

      {/* Mat layer */}
      {frame.matColor && (
        <div
          style={{
            padding: `${matWidth}px`,
            backgroundColor: frame.matColor,
            borderRadius: `${frame.borderRadius}px`,
          }}
        >
          {/* Inner shadow on mat */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: frame.aspectRatio,
              borderRadius: `${Math.max(0, frame.borderRadius - 2)}px`,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.12)',
              cursor: uploadedImage ? 'grab' : 'default',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <ImageArea
              uploadedImage={uploadedImage}
              zoom={zoom}
              offsetX={offsetX}
              offsetY={offsetY}
              frame={frame}
            />
          </div>
        </div>
      )}

      {/* No mat variant */}
      {!frame.matColor && (
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: frame.aspectRatio,
            borderRadius: `${Math.max(0, frame.borderRadius - 2)}px`,
            cursor: uploadedImage ? 'grab' : 'default',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ImageArea
            uploadedImage={uploadedImage}
            zoom={zoom}
            offsetX={offsetX}
            offsetY={offsetY}
            frame={frame}
          />
        </div>
      )}
    </div>
  );
}

function ImageArea({ uploadedImage, zoom, offsetX, offsetY, frame }: {
  uploadedImage: string;
  zoom: number;
  offsetX: number;
  offsetY: number;
  frame: Frame;
}) {
  if (uploadedImage) {
    return (
      <img
        src={uploadedImage}
        alt="Your photo"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom}) translate(${offsetX / zoom}px, ${offsetY / zoom}px)`,
          transformOrigin: 'center',
          transition: 'transform 0.05s ease-out',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    );
  }

  // Placeholder
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: 'linear-gradient(135deg, #f0ece8 0%, #e8e4df 100%)' }}
    >
      <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-xs text-gray-500 font-medium tracking-wide">Upload your photo</p>
    </div>
  );
}

// ─── Main ProductDetail Component ─────────────────────────────────────────────

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedFrame, setSelectedFrame] = useState<Frame>(frames[0]);
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = products.find((p) => p.id === id);

  const handleDrag = useCallback((dx: number, dy: number) => {
    setOffsetX(prev => prev + dx);
    setOffsetY(prev => prev + dy);
  }, []);

  const handleFrameChange = (frame: Frame) => {
    setSelectedFrame(frame);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleFileRead = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileRead(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileRead(file);
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  const sizes = ['Small (4×6")', 'Medium (5×7")', 'Large (8×10")', 'XL (11×14")'];

  const handleAddToCart = () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }
    dispatch(
      addToCart({
        productId: product.id,
        productName: `${product.name} — ${selectedFrame.name} (${selectedSize})`,
        price: product.price,
        quantity,
        uploadedImageUrl: uploadedImage,
      })
    );
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-14">

        {/* ── LEFT: Frame Preview ── */}
        <div className="flex flex-col gap-6">
          
          {/* Main Preview */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 flex items-center justify-center min-h-[360px]">
            <div className="w-full max-w-sm">
              <PhotoFramePreview
                frame={selectedFrame}
                uploadedImage={uploadedImage}
                zoom={zoom}
                offsetX={offsetX}
                offsetY={offsetY}
                onDrag={handleDrag}
              />
            </div>
          </div>

          {/* Image Controls — only shown after upload */}
          {uploadedImage && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700 mb-1">Adjust Your Photo</p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(1)))}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 transition"
                  title="Zoom out"
                >
                  −
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min={50}
                    max={300}
                    value={Math.round(zoom * 100)}
                    onChange={e => {
                      setZoom(parseInt(e.target.value) / 100);
                    }}
                    className="w-full accent-blue-700"
                  />
                </div>
                <button
                  onClick={() => setZoom(z => Math.min(3, +(z + 0.1).toFixed(1)))}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 transition"
                  title="Zoom in"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 w-10 text-right">{Math.round(zoom * 100)}%</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500">🖱 Drag photo to reposition</span>
                <button
                  onClick={() => { setZoom(1); setOffsetX(0); setOffsetY(0); }}
                  className="ml-auto text-xs text-blue-700 hover:underline"
                >
                  Reset position
                </button>
              </div>
            </div>
          )}

          {/* Frame Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Choose Frame Style</h3>
            <div className="grid grid-cols-4 gap-2">
              {frames.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => handleFrameChange(frame)}
                  title={frame.name}
                  className={`relative rounded-xl overflow-hidden transition-all border-2 ${
                    selectedFrame.id === frame.id
                      ? 'border-blue-600 shadow-md shadow-blue-200 scale-105'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {/* Mini frame thumbnail */}
                  <div
                    className="aspect-square flex items-center justify-center p-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #f8f8f8, #efefef)',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        padding: `${Math.round(frame.borderWidth * 0.35)}px`,
                        backgroundColor: frame.borderColor,
                        borderRadius: `${frame.borderRadius}px`,
                        boxShadow: `0 2px 6px ${frame.shadowColor}`,
                        background: frame.id === 'acrylic-clear'
                          ? 'linear-gradient(135deg, rgba(200,220,255,0.7), rgba(180,200,255,0.4))'
                          : frame.borderColor,
                      }}
                    >
                      {frame.matColor && (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            padding: `${Math.round((frame.matWidth ?? 0) * 0.3)}px`,
                            backgroundColor: frame.matColor,
                            borderRadius: `${Math.max(0, frame.borderRadius - 1)}px`,
                          }}
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              background: 'linear-gradient(135deg, #ddd, #eee)',
                              borderRadius: `${Math.max(0, frame.borderRadius - 2)}px`,
                            }}
                          />
                        </div>
                      )}
                      {!frame.matColor && (
                        <div
                          className="w-full h-full"
                          style={{
                            background: 'linear-gradient(135deg, #ddd, #eee)',
                            borderRadius: `${Math.max(0, frame.borderRadius - 2)}px`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="py-1 px-1 bg-white text-center">
                    <p className="text-[10px] font-semibold text-gray-700 leading-tight">{frame.name}</p>
                    <p className="text-[9px] text-blue-500">{frame.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Product Info + Upload ── */}
        <div className="flex flex-col gap-6">
          
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-blue-700">₹{product.price.toLocaleString()}</p>
            <p className="text-gray-500 mt-3 leading-relaxed">{product.description}</p>
          </div>

          {/* Upload Area */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Upload Your Photo</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : uploadedImage
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              {uploadedImage ? (
                <div className="flex items-center gap-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-14 h-14 object-cover rounded-lg shadow"
                  />
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-green-700">Photo uploaded!</p>
                    <p className="text-xs text-gray-500 mt-0.5">Click to change photo</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedImage('');
                      setZoom(1);
                      setOffsetX(0);
                      setOffsetY(0);
                    }}
                    className="text-red-400 hover:text-red-600 transition text-lg"
                    title="Remove photo"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Drop your photo here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse · JPG, PNG, WEBP</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Select Size</h3>
            <div className="grid grid-cols-2 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? 'border-blue-700 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-lg font-bold text-gray-700"
              >
                −
              </button>
              <span className="text-xl font-bold text-gray-800 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-lg font-bold text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Frame</span>
              <span className="font-medium text-gray-800">{selectedFrame.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Size</span>
              <span className="font-medium text-gray-800">{selectedSize}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span className="font-medium text-gray-800">{quantity}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-base font-bold text-gray-900">
              <span>Total</span>
              <span>₹{(product.price * quantity).toLocaleString()}</span>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-2xl text-base font-bold transition-all ${
              uploadedImage
                ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {uploadedImage ? 'Add to Cart' : 'Upload a photo to continue'}
          </button>
        </div>
      </div>
    </div>
  );
}