import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { frameTemplates, FrameTemplate } from '../data/frameTemplates';
import FrameThumbnail from '../components/FrameThumbnail';

// ─── Size options by aspect ratio group ──────────────────────────────────────

const getSizes = (ar: number) => {
  if (ar < 0.85) {
    // Portrait
    return ['5×7"', '8×10"', '11×14"', '12×16"', '16×20"'];
  } else if (ar > 1.15) {
    // Landscape
    return ['7×5"', '10×8"', '14×11"', '16×12"', '20×15"'];
  } else {
    // Square / circle
    return ['6×6"', '8×8"', '10×10"', '12×12"', '16×16"'];
  }
};

const thicknesses = ['3mm', '5mm', '8mm'];

// ─── Live frame canvas ────────────────────────────────────────────────────────

interface CanvasProps {
  frame: FrameTemplate;
  slots: string[];                     // one URL per photo slot
  activeSlot: number;
  zooms: number[];
  offsets: { x: number; y: number }[];
  onDrag: (slotIndex: number, dx: number, dy: number) => void;
  onSlotClick: (slotIndex: number) => void;
}

function FrameCanvas({
  frame, slots, activeSlot, zooms, offsets, onDrag, onSlotClick,
}: CanvasProps) {
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const activeSlotRef = useRef(activeSlot);
  useEffect(() => { activeSlotRef.current = activeSlot; }, [activeSlot]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleMove = useCallback((cx: number, cy: number) => {
    if (!isDragging.current) return;
    const dx = cx - lastPos.current.x;
    const dy = cy - lastPos.current.y;
    lastPos.current = { x: cx, y: cy };
    onDrag(activeSlotRef.current, dx, dy);
  }, [onDrag]);

  useEffect(() => {
    const onMM = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTM = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTM);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTM);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleMove]);

  const bw = frame.borderWidth;
  const mw = frame.matWidth ?? 0;
  const ibw = frame.innerBorderWidth ?? 0;
  const totalInset = bw + mw;
  const isCircle = frame.borderRadius === '50%';
  const isDualBorder = !!frame.innerBorderColor;
  const isHeart = frame.shape === 'heart';
  const isBalloon = frame.shape === 'balloon';
  const isArch = frame.shape === 'arch';
  const isCollage = frame.photoSlots > 1;

  const containerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: `${frame.aspectRatio}`,
    position: 'relative',
    userSelect: 'none',
  };

  // Get the clip-path for shapes
  const getClipPath = () => {
    if (isCircle) return 'circle(50%)';
    if (isHeart) return undefined; // handled with custom
    return undefined;
  };

  const outerRadius = isCircle ? '50%' : frame.borderRadius;

  // Collage slot layout
  const getSlotLayouts = () => {
    // Returns relative % positions (left, top, width, height) for each photo slot
    const gap = 1.5; // percent
    const layouts: { left: string; top: string; width: string; height: string }[] = [];
    const photoAreaTop = `${totalInset}px`;
    const photoAreaLeft = `${totalInset}px`;

    if (frame.shape === 'collage-2') {
      layouts.push(
        { left: photoAreaLeft, top: photoAreaTop, width: `calc(100% - ${totalInset * 2}px)`, height: `calc(50% - ${totalInset}px - ${gap / 2}%)` },
        { left: photoAreaLeft, top: `calc(50% + ${gap / 2}%)`, width: `calc(100% - ${totalInset * 2}px)`, height: `calc(50% - ${totalInset}px - ${gap / 2}%)` }
      );
    } else if (frame.shape === 'collage-3h') {
      for (let i = 0; i < 3; i++) {
        const w = `calc(33.33% - ${totalInset * 2 / 3}px - ${gap * 2 / 3}%)`;
        layouts.push({ left: `calc(${totalInset}px + ${i * (33.33 + gap / 3)}%)`, top: photoAreaTop, width: w, height: `calc(100% - ${totalInset * 2}px)` });
      }
    } else if (frame.shape === 'collage-3v') {
      for (let i = 0; i < 3; i++) {
        const h = `calc(33.33% - ${totalInset * 2 / 3}px - ${gap * 2 / 3}%)`;
        layouts.push({ left: photoAreaLeft, top: `calc(${totalInset}px + ${i * (33.33 + gap / 3)}%)`, width: `calc(100% - ${totalInset * 2}px)`, height: h });
      }
    } else if (frame.shape === 'collage-4') {
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          layouts.push({
            left: `calc(${totalInset}px + ${c * (50 + gap / 2)}%)`,
            top: `calc(${totalInset}px + ${r * (50 + gap / 2)}%)`,
            width: `calc(50% - ${totalInset}px - ${gap / 2}%)`,
            height: `calc(50% - ${totalInset}px - ${gap / 2}%)`,
          });
        }
      }
    }
    return layouts;
  };

  // ── Heart shape (CSS clip-path) ──
  const heartClip = `polygon(50% 0%, 100% 25%, 100% 62%, 50% 100%, 0% 62%, 0% 25%)`;

  return (
    <div
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* ── Heart ── */}
      {isHeart && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <clipPath id="heart-clip">
                <path d="M50 85 C50 85 5 55 5 30 C5 15 17 5 30 5 C38 5 46 10 50 17 C54 10 62 5 70 5 C83 5 95 15 95 30 C95 55 50 85 50 85Z" />
              </clipPath>
            </defs>
            {slots[0] ? (
              <image
                href={slots[0]}
                x={0} y={0} width={100} height={100}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#heart-clip)"
              />
            ) : (
              <>
                <path d="M50 85 C50 85 5 55 5 30 C5 15 17 5 30 5 C38 5 46 10 50 17 C54 10 62 5 70 5 C83 5 95 15 95 30 C95 55 50 85 50 85Z"
                  fill="#f3d4d4" />
                <text x="50" y="50" textAnchor="middle" fill="#b08080" fontSize="8" fontFamily="sans-serif">Upload Photo</text>
              </>
            )}
            <path d="M50 85 C50 85 5 55 5 30 C5 15 17 5 30 5 C38 5 46 10 50 17 C54 10 62 5 70 5 C83 5 95 15 95 30 C95 55 50 85 50 85Z"
              fill="none" stroke={frame.borderColor} strokeWidth="3" />
          </svg>
        </div>
      )}

      {/* ── Arch ── */}
      {isArch && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            borderRadius: `${Math.min(50, (100 / frame.aspectRatio) * 0.35)}% ${Math.min(50, (100 / frame.aspectRatio) * 0.35)}% 0 0`,
          }}
        >
          {slots[0] ? (
            <img src={slots[0]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zooms[0]}) translate(${offsets[0].x / zooms[0]}px,${offsets[0].y / zooms[0]}px)`, pointerEvents: 'none' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#e8e4df', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13, color: '#aaa', fontFamily: 'sans-serif' }}>Upload Photo</span>
            </div>
          )}
        </div>
      )}

      {/* ── All other standard frames ── */}
      {!isHeart && !isArch && (
        <>
          {/* Outer frame */}
          {bw > 0 && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundColor: frame.shape === 'circle' ? 'transparent' : frame.borderColor,
              borderRadius: outerRadius,
              border: frame.shape === 'circle' ? `${bw}px solid ${frame.borderColor}` : 'none',
              boxShadow: `0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.1)`,
              // Wood grain for walnut
              backgroundImage: frame.borderColor === '#5c3d2e'
                ? `repeating-linear-gradient(92deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)`
                : undefined,
            }} />
          )}

          {/* Gold shimmer */}
          {frame.borderColor === '#c9a84c' && bw > 0 && (
            <div style={{
              position: 'absolute', inset: 0, borderRadius: outerRadius, pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.1) 70%, transparent 100%)',
            }} />
          )}

          {/* Mat layer */}
          {mw > 0 && (
            <div style={{
              position: 'absolute',
              inset: bw,
              backgroundColor: frame.matColor ?? '#fff',
              borderRadius: `calc(${outerRadius} - ${bw}px)`,
            }} />
          )}

          {/* Inner dual border */}
          {isDualBorder && (
            <div style={{
              position: 'absolute',
              inset: totalInset - ibw,
              border: `${ibw}px solid ${frame.innerBorderColor}`,
              borderRadius: `calc(${outerRadius} - ${totalInset - ibw}px)`,
              pointerEvents: 'none',
              zIndex: 5,
            }} />
          )}

          {/* ── Photo slots (collage) ── */}
          {isCollage && getSlotLayouts().map((layout, i) => (
            <div
              key={i}
              onClick={() => onSlotClick(i)}
              style={{
                position: 'absolute',
                left: layout.left, top: layout.top,
                width: layout.width, height: layout.height,
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                border: activeSlot === i ? '2px solid #2563eb' : '2px solid transparent',
                zIndex: 10,
              }}
            >
              {slots[i] ? (
                <img
                  src={slots[i]} alt=""
                  draggable={false}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: `scale(${zooms[i]}) translate(${offsets[i].x / zooms[i]}px,${offsets[i].y / zooms[i]}px)`,
                    transformOrigin: 'center', pointerEvents: 'none',
                  }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#ddd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span style={{ fontSize: 10, color: '#999' }}>Photo {i + 1}</span>
                </div>
              )}
            </div>
          ))}

          {/* ── Single photo slot ── */}
          {!isCollage && (
            <div
              style={{
                position: 'absolute',
                inset: totalInset,
                overflow: 'hidden',
                borderRadius: `calc(${outerRadius} - ${totalInset}px)`,
                cursor: slots[0] ? 'grab' : 'default',
                zIndex: 2,
              }}
            >
              {slots[0] ? (
                <img
                  src={slots[0]} alt="Your photo"
                  draggable={false}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    transform: `scale(${zooms[0]}) translate(${offsets[0].x / zooms[0]}px,${offsets[0].y / zooms[0]}px)`,
                    transformOrigin: 'center',
                    transition: 'transform 0.04s linear',
                    pointerEvents: 'none',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #ededeb 0%, #e0dbd5 100%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 12, color: '#b0a89f', fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
                    Upload Your Photo
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Main FrameCustomizer Page ────────────────────────────────────────────────

export default function FrameCustomizer() {
  const { frameId } = useParams<{ frameId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const frame = frameTemplates.find((f) => f.id === frameId);

  const [slots, setSlots] = useState<string[]>(Array(frame?.photoSlots ?? 1).fill(''));
  const [activeSlot, setActiveSlot] = useState(0);
  const [zooms, setZooms] = useState<number[]>(Array(frame?.photoSlots ?? 1).fill(1));
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>(
    Array(frame?.photoSlots ?? 1).fill({ x: 0, y: 0 })
  );
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('3mm');
  const [quantity, setQuantity] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Related frames (same category)
  const relatedFrames = frame
    ? frameTemplates.filter((f) => f.category === frame.category && f.id !== frame.id).slice(0, 6)
    : [];

  useEffect(() => {
    if (frame) setSelectedSize(getSizes(frame.aspectRatio)[0]);
  }, [frame]);

  const handleDrag = useCallback((slotIndex: number, dx: number, dy: number) => {
    setOffsets((prev) => {
      const next = [...prev];
      next[slotIndex] = { x: prev[slotIndex].x + dx, y: prev[slotIndex].y + dy };
      return next;
    });
  }, []);

  const handleFileRead = (file: File, slotIndex: number) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setSlots((prev) => { const n = [...prev]; n[slotIndex] = url; return n; });
      setZooms((prev) => { const n = [...prev]; n[slotIndex] = 1; return n; });
      setOffsets((prev) => { const n = [...prev]; n[slotIndex] = { x: 0, y: 0 }; return n; });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileRead(file, activeSlot);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileRead(file, activeSlot);
  };

  const handleAddToCart = () => {
    if (!frame) return;
    const missingSlot = slots.findIndex((s) => !s);
    if (missingSlot >= 0) {
      alert(`Please upload a photo for slot ${missingSlot + 1}`);
      return;
    }
    dispatch(
      addToCart({
        productId: frame.id,
        productName: `${frame.name} · ${selectedSize} · ${selectedThickness}`,
        price: 999,
        quantity,
        uploadedImageUrl: slots[0],
      })
    );
    alert('Added to cart!');
  };

  if (!frame) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Frame not found.</p>
        <button onClick={() => navigate('/frames')} className="mt-4 text-blue-600 hover:underline">
          ← Back to frames
        </button>
      </div>
    );
  }

  const sizes = getSizes(frame.aspectRatio);
  const allSlotsUploaded = slots.every((s) => !!s);
  const currentZoom = zooms[activeSlot];

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate('/frames')} className="hover:text-gray-900 transition">
            ← All Frames
          </button>
          <span>/</span>
          <span className="text-gray-400">{frame.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{frame.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── LEFT: Live Preview ── */}
          <div className="flex flex-col gap-5">
            {/* Canvas */}
            <div className="bg-white rounded-3xl shadow-md p-8 flex items-center justify-center"
              style={{ minHeight: 360 }}>
              <div style={{ width: '100%', maxWidth: 380 }}>
                <FrameCanvas
                  frame={frame}
                  slots={slots}
                  activeSlot={activeSlot}
                  zooms={zooms}
                  offsets={offsets}
                  onDrag={handleDrag}
                  onSlotClick={setActiveSlot}
                />
              </div>
            </div>

            {/* Zoom controls — show when active slot has an image */}
            {slots[activeSlot] && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {frame.photoSlots > 1 ? `Photo ${activeSlot + 1} — ` : ''}Adjust
                  </p>
                  <button
                    onClick={() => {
                      setZooms((p) => { const n = [...p]; n[activeSlot] = 1; return n; });
                      setOffsets((p) => { const n = [...p]; n[activeSlot] = { x: 0, y: 0 }; return n; });
                    }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZooms((p) => { const n = [...p]; n[activeSlot] = Math.max(0.5, +(p[activeSlot] - 0.1).toFixed(1)); return n; })}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-bold text-gray-600 transition flex items-center justify-center"
                  >−</button>
                  <input
                    type="range" min={50} max={300}
                    value={Math.round(currentZoom * 100)}
                    onChange={(e) => setZooms((p) => { const n = [...p]; n[activeSlot] = parseInt(e.target.value) / 100; return n; })}
                    className="flex-1 accent-blue-700"
                  />
                  <button
                    onClick={() => setZooms((p) => { const n = [...p]; n[activeSlot] = Math.min(3, +(p[activeSlot] + 0.1).toFixed(1)); return n; })}
                    className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-lg font-bold text-gray-600 transition flex items-center justify-center"
                  >+</button>
                  <span className="text-sm text-gray-400 w-10 text-right">{Math.round(currentZoom * 100)}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">🖱 Drag the photo to reposition it</p>
              </div>
            )}

            {/* Collage slot selector */}
            {frame.photoSlots > 1 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-3">Photo Slots</p>
                <div className="flex gap-2 flex-wrap">
                  {slots.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setActiveSlot(i); fileInputRef.current?.click(); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition border-2 ${
                        activeSlot === i
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {s ? (
                        <img src={s} className="w-6 h-6 object-cover rounded" alt="" />
                      ) : (
                        <span className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">+</span>
                      )}
                      Photo {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Related frames */}
            {relatedFrames.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  More {frame.category} Styles
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {relatedFrames.map((rf) => (
                    <button
                      key={rf.id}
                      onClick={() => navigate(`/frame-customizer/${rf.id}`)}
                      className="flex-shrink-0 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition border border-transparent hover:border-gray-200 flex flex-col items-center gap-2"
                    >
                      <FrameThumbnail frame={rf} size={70} />
                      <span className="text-[10px] text-gray-500 font-medium text-center leading-tight max-w-[70px]">
                        {rf.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Controls ── */}
          <div className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full">
                {frame.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">{frame.name}</h1>
              <p className="text-2xl font-bold text-gray-800 mt-1">₹999 <span className="text-sm text-gray-400 line-through font-normal">₹1,999</span></p>
              <p className="text-xs text-green-600 font-semibold mt-1">✓ Free Shipping · 30-Day Returns · 100% Secure</p>
            </div>

            {/* Upload */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                {frame.photoSlots > 1 ? `Upload Photos (${slots.filter(Boolean).length}/${frame.photoSlots} done)` : 'Upload Your Photo'}
              </h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50'
                    : slots[activeSlot]
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                {slots[activeSlot] ? (
                  <div className="flex items-center gap-4">
                    <img src={slots[activeSlot]} className="w-14 h-14 object-cover rounded-xl shadow" alt="" />
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-green-700">Photo {frame.photoSlots > 1 ? `${activeSlot + 1} ` : ''}uploaded!</p>
                      <p className="text-xs text-gray-400 mt-0.5">Click to change</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSlots((p) => { const n = [...p]; n[activeSlot] = ''; return n; });
                      }}
                      className="text-red-400 hover:text-red-600 text-2xl leading-none"
                    >×</button>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {frame.photoSlots > 1 ? `Drop Photo ${activeSlot + 1}` : 'Drop your photo here'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">or click to browse · JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            {/* Size */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Size (Inch)</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition ${
                      selectedSize === size
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Thickness */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Thickness</h3>
              <div className="flex gap-2">
                {thicknesses.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedThickness(t)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition ${
                      selectedThickness === t
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Mounting notice */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Easy Mount Included</p>
                <p className="text-xs text-green-600">Adhesive hooks — no drilling needed</p>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >−</button>
                <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-lg font-bold"
                >+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl text-base font-bold transition-all flex items-center justify-center gap-2 ${
                allSlotsUploaded
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 5h12" />
              </svg>
              {allSlotsUploaded ? `Add to Cart — ₹${(999 * quantity).toLocaleString()}` : `Upload ${frame.photoSlots > 1 ? 'all photos' : 'a photo'} to continue`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}