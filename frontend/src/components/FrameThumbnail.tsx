import { FrameTemplate } from '../data/frameTemplates';

interface Props {
  frame: FrameTemplate;
  /** Target width in px (used when fitBox is not set) */
  size?: number;
  /** Fit entire frame inside a square box without stretching */
  fitBox?: number;
  uploadedImage?: string;
}

function getDimensions(frame: FrameTemplate, size: number, fitBox?: number) {
  const ar = frame.aspectRatio; // width / height
  if (fitBox) {
    if (ar >= 1) {
      return { w: fitBox, h: Math.round(fitBox / ar) };
    }
    return { w: Math.round(fitBox * ar), h: fitBox };
  }
  const w = size;
  return { w, h: Math.round(w / ar) };
}

export default function FrameThumbnail({
  frame,
  size = 180,
  fitBox,
  uploadedImage,
}: Props) {
  const { w, h } = getDimensions(frame, size, fitBox);

  const bw = frame.borderWidth;
  const mw = frame.matWidth ?? 0;
  const totalInset = bw + mw;

  const innerW = w - totalInset * 2;
  const innerH = h - totalInset * 2;

  const isCircle = frame.borderRadius === '50%';
  const isHeart = frame.shape === 'heart';
  const isBalloon = frame.shape === 'balloon';
  const isDualBorder = frame.shape.startsWith('dual-border') || (frame.innerBorderColor != null);
  const isCollage = frame.photoSlots > 1;

  const clipId = `clip-${frame.id}`;
  const imageId = `img-${frame.id}`;

  // Parse border-radius to a single number for SVG rx/ry
  const parseRadius = (r: string): number => {
    if (r === '50%') return Math.min(w, h) / 2;
    const n = parseFloat(r);
    return isNaN(n) ? 0 : n;
  };

  const rx = parseRadius(frame.borderRadius);

  // Collage slot helper
  const getCollageSlots = () => {
    const gap = 4;
    const slots: { x: number; y: number; w: number; h: number }[] = [];
    if (frame.shape === 'collage-2') {
      const slotH = (innerH - gap) / 2;
      slots.push({ x: totalInset, y: totalInset, w: innerW, h: slotH });
      slots.push({ x: totalInset, y: totalInset + slotH + gap, w: innerW, h: slotH });
    } else if (frame.shape === 'collage-3h') {
      const slotW = (innerW - gap * 2) / 3;
      for (let i = 0; i < 3; i++) {
        slots.push({ x: totalInset + i * (slotW + gap), y: totalInset, w: slotW, h: innerH });
      }
    } else if (frame.shape === 'collage-3v') {
      const slotH = (innerH - gap * 2) / 3;
      for (let i = 0; i < 3; i++) {
        slots.push({ x: totalInset, y: totalInset + i * (slotH + gap), w: innerW, h: slotH });
      }
    } else if (frame.shape === 'collage-4') {
      const slotW = (innerW - gap) / 2;
      const slotH = (innerH - gap) / 2;
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          slots.push({
            x: totalInset + c * (slotW + gap),
            y: totalInset + r * (slotH + gap),
            w: slotW,
            h: slotH,
          });
        }
      }
    }
    return slots;
  };

  const heartPath = (cx: number, cy: number, sz: number) => {
    const s = sz / 2;
    return `M ${cx},${cy + s * 0.35}
      C ${cx},${cy} ${cx - s},${cy} ${cx - s},${cy - s * 0.4}
      C ${cx - s},${cy - s} ${cx},${cy - s} ${cx},${cy - s * 0.4}
      C ${cx},${cy - s} ${cx + s},${cy - s} ${cx + s},${cy - s * 0.4}
      C ${cx + s},${cy} ${cx},${cy} ${cx},${cy + s * 0.35} Z`;
  };

  const balloonD = (x: number, y: number, bw: number, bh: number, r: number) =>
    `M ${x + bw / 2},${y}
     C ${x + bw * 0.85},${y} ${x + bw},${y + bh * 0.25} ${x + bw},${y + bh * 0.45}
     C ${x + bw},${y + bh * 0.75} ${x + bw * 0.7},${y + bh} ${x + bw / 2},${y + bh}
     C ${x + bw * 0.3},${y + bh} ${x},${y + bh * 0.75} ${x},${y + bh * 0.45}
     C ${x},${y + bh * 0.25} ${x + bw * 0.15},${y} ${x + bw / 2},${y} Z`;

  const archRadius = Math.min(w / 2, 60);
  const archD = `M ${bw},${bw + archRadius}
    C ${bw},${bw} ${bw + archRadius},${bw} ${w / 2},${bw}
    C ${w - bw - archRadius},${bw} ${w - bw},${bw} ${w - bw},${bw + archRadius}
    L ${w - bw},${h - bw}
    L ${bw},${h - bw} Z`;

  const svg = (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden
    >
      <defs>
        {uploadedImage && (
          <pattern id={imageId} patternUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
            <image href={uploadedImage} x="0" y="0" width={w} height={h} preserveAspectRatio="xMidYMid slice" />
          </pattern>
        )}
      </defs>

      {/* ── Heart shape ── */}
      {isHeart && (
        <>
          <path
            d={heartPath(w / 2, h / 2, Math.min(w, h) * 0.82)}
            fill={uploadedImage ? `url(#${imageId})` : '#f3d4d4'}
            stroke={frame.borderColor}
            strokeWidth="3"
          />
          {!uploadedImage && (
            <text x={w / 2} y={h / 2 + 6} textAnchor="middle" fill="#b08080" fontSize="10" fontFamily="sans-serif">
              Upload Photo
            </text>
          )}
        </>
      )}

      {/* ── Balloon shape ── */}
      {isBalloon && !isHeart && (
        <>
          {/* Outer balloon border */}
          {bw > 0 && (
            <path
              d={balloonD(0, 0, w, h, 0)}
              fill={frame.borderColor}
            />
          )}
          {/* Mat */}
          {mw > 0 && (
            <path
              d={balloonD(bw, bw, w - bw * 2, h - bw * 2, 0)}
              fill={frame.matColor ?? '#fff'}
            />
          )}
          {/* Inner dual border line */}
          {isDualBorder && frame.innerBorderColor && (
            <path
              d={balloonD(totalInset - frame.innerBorderWidth!, totalInset - frame.innerBorderWidth!, w - (totalInset - frame.innerBorderWidth!) * 2, h - (totalInset - frame.innerBorderWidth!) * 2, 0)}
              fill="none"
              stroke={frame.innerBorderColor}
              strokeWidth={frame.innerBorderWidth}
            />
          )}
          {/* Photo area */}
          <path
            d={balloonD(totalInset, totalInset, w - totalInset * 2, h - totalInset * 2, 0)}
            fill={uploadedImage ? `url(#${imageId})` : '#e8e4df'}
          />
          {!uploadedImage && (
            <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="sans-serif">
              Upload Photo
            </text>
          )}
        </>
      )}

      {/* ── Arch shape ── */}
      {frame.shape === 'arch' && (
        <>
          <path d={archD} fill={frame.borderColor} />
          <path
            d={`M ${totalInset},${totalInset + archRadius}
              C ${totalInset},${totalInset} ${totalInset + archRadius},${totalInset} ${w / 2},${totalInset}
              C ${w - totalInset - archRadius},${totalInset} ${w - totalInset},${totalInset} ${w - totalInset},${totalInset + archRadius}
              L ${w - totalInset},${h - totalInset}
              L ${totalInset},${h - totalInset} Z`}
            fill={uploadedImage ? `url(#${imageId})` : '#e8e4df'}
          />
          {!uploadedImage && (
            <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fill="#aaa" fontSize="9" fontFamily="sans-serif">
              Upload Photo
            </text>
          )}
        </>
      )}

      {/* ── Collage ── */}
      {isCollage && !isHeart && !isBalloon && frame.shape !== 'arch' && (
        <>
          {/* Outer frame */}
          {bw > 0 && (
            <rect
              x={0} y={0} width={w} height={h}
              rx={rx} ry={rx}
              fill={frame.borderColor}
            />
          )}
          {/* Mat */}
          {mw > 0 && (
            <rect
              x={bw} y={bw} width={w - bw * 2} height={h - bw * 2}
              rx={Math.max(0, rx - bw)} ry={Math.max(0, rx - bw)}
              fill={frame.matColor ?? '#fff'}
            />
          )}
          {/* Photo slots */}
          {getCollageSlots().map((slot, i) => (
            <g key={i}>
              <rect
                x={slot.x} y={slot.y} width={slot.w} height={slot.h}
                rx={2} ry={2}
                fill={uploadedImage && i === 0 ? `url(#${imageId})` : '#d5d0ca'}
              />
              <text
                x={slot.x + slot.w / 2}
                y={slot.y + slot.h / 2 + 4}
                textAnchor="middle"
                fill="#aaa"
                fontSize="8"
                fontFamily="sans-serif"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </>
      )}

      {/* ── Standard (portrait / landscape / square / circle / rounded) ── */}
      {!isHeart && !isBalloon && frame.shape !== 'arch' && !isCollage && (
        <>
          {/* Outer frame border */}
          {bw > 0 && (
            <rect
              x={0} y={0} width={w} height={h}
              rx={isCircle ? Math.min(w, h) / 2 : Math.min(rx, Math.min(w, h) / 2)}
              ry={isCircle ? Math.min(w, h) / 2 : Math.min(rx, Math.min(w, h) / 2)}
              fill={frame.shape === 'circle' ? 'transparent' : frame.borderColor}
              stroke={frame.shape === 'circle' ? frame.borderColor : 'none'}
              strokeWidth={frame.shape === 'circle' ? bw : 0}
            />
          )}

          {/* Mat layer */}
          {mw > 0 && (
            <rect
              x={bw} y={bw} width={w - bw * 2} height={h - bw * 2}
              rx={isCircle ? (Math.min(w, h) / 2 - bw) : Math.max(0, rx - bw)}
              ry={isCircle ? (Math.min(w, h) / 2 - bw) : Math.max(0, rx - bw)}
              fill={frame.matColor ?? '#fff'}
            />
          )}

          {/* Inner dual-border line */}
          {isDualBorder && frame.innerBorderColor && (
            <rect
              x={totalInset - (frame.innerBorderWidth ?? 3) / 2}
              y={totalInset - (frame.innerBorderWidth ?? 3) / 2}
              width={w - (totalInset - (frame.innerBorderWidth ?? 3) / 2) * 2}
              height={h - (totalInset - (frame.innerBorderWidth ?? 3) / 2) * 2}
              rx={isCircle ? (Math.min(w, h) / 2 - totalInset) : Math.max(0, rx - totalInset + (frame.innerBorderWidth ?? 3))}
              ry={isCircle ? (Math.min(w, h) / 2 - totalInset) : Math.max(0, rx - totalInset + (frame.innerBorderWidth ?? 3))}
              fill="none"
              stroke={frame.innerBorderColor}
              strokeWidth={frame.innerBorderWidth ?? 3}
            />
          )}

          {/* Photo area */}
          <rect
            x={totalInset} y={totalInset}
            width={Math.max(0, w - totalInset * 2)}
            height={Math.max(0, h - totalInset * 2)}
            rx={isCircle ? Math.max(0, Math.min(w, h) / 2 - totalInset) : Math.max(0, rx - totalInset)}
            ry={isCircle ? Math.max(0, Math.min(w, h) / 2 - totalInset) : Math.max(0, rx - totalInset)}
            fill={uploadedImage ? `url(#${imageId})` : '#e0dbd5'}
          />

          {/* Upload placeholder text */}
          {!uploadedImage && (
            <>
              <text
                x={w / 2} y={h / 2 - 4}
                textAnchor="middle" fill="#b0aa9f" fontSize="9" fontFamily="sans-serif" fontWeight="600"
              >
                Upload
              </text>
              <text
                x={w / 2} y={h / 2 + 8}
                textAnchor="middle" fill="#b0aa9f" fontSize="9" fontFamily="sans-serif"
              >
                Your Photo
              </text>
            </>
          )}
        </>
      )}
    </svg>
  );

  if (fitBox) {
    return (
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: fitBox, height: fitBox }}
      >
        {svg}
      </div>
    );
  }

  return svg;
}