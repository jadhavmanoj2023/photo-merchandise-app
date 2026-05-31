import { FrameShape } from '../data/frameTemplates';
import type { CSSProperties } from 'react';

export interface CollageGridConfig {
  columns: string;
  rows: string;
  areas: string[];
  slotAreas: string[];
}

const COLLAGE_GRIDS: Partial<Record<FrameShape, CollageGridConfig>> = {
  'collage-2': {
    columns: '1fr',
    rows: '1fr 1fr',
    areas: ['s0', 's1'],
    slotAreas: ['s0', 's1'],
  },
  'collage-3h': {
    columns: '1fr 1fr 1fr',
    rows: '1fr',
    areas: ['s0 s1 s2'],
    slotAreas: ['s0', 's1', 's2'],
  },
  'collage-3v': {
    columns: '1fr',
    rows: '1fr 1fr 1fr',
    areas: ['s0', 's1', 's2'],
    slotAreas: ['s0', 's1', 's2'],
  },
  'collage-4': {
    columns: '1fr 1fr',
    rows: '1fr 1fr',
    areas: ['s0 s1', 's2 s3'],
    slotAreas: ['s0', 's1', 's2', 's3'],
  },
  'collage-5': {
    columns: '1fr 1fr 1fr 1fr',
    rows: '1fr 1fr',
    areas: ['big big s1 s2', 'big big s3 s4'],
    slotAreas: ['big', 's1', 's2', 's3', 's4'],
  },
};

export function getCollageGridConfig(shape: FrameShape): CollageGridConfig | null {
  return COLLAGE_GRIDS[shape] ?? null;
}

export function getCollageGridStyle(shape: FrameShape, inset: number): CSSProperties | null {
  const config = getCollageGridConfig(shape);
  if (!config) return null;

  return {
    position: 'absolute',
    inset,
    display: 'grid',
    gap: 4,
    gridTemplateColumns: config.columns,
    gridTemplateRows: config.rows,
    gridTemplateAreas: config.areas.map((row) => `"${row}"`).join(' '),
    zIndex: 10,
  };
}

export function getCollageSlotArea(shape: FrameShape, index: number): string | undefined {
  const config = getCollageGridConfig(shape);
  return config?.slotAreas[index];
}

/** Pixel-based slot rects for SVG thumbnails */
export function getCollageSlotRects(
  shape: FrameShape,
  inset: number,
  innerW: number,
  innerH: number
): { x: number; y: number; w: number; h: number }[] {
  const gap = 4;
  const x0 = inset;
  const y0 = inset;
  const slots: { x: number; y: number; w: number; h: number }[] = [];

  switch (shape) {
    case 'collage-2': {
      const slotH = (innerH - gap) / 2;
      slots.push({ x: x0, y: y0, w: innerW, h: slotH });
      slots.push({ x: x0, y: y0 + slotH + gap, w: innerW, h: slotH });
      break;
    }
    case 'collage-3h': {
      const slotW = (innerW - gap * 2) / 3;
      for (let i = 0; i < 3; i++) {
        slots.push({ x: x0 + i * (slotW + gap), y: y0, w: slotW, h: innerH });
      }
      break;
    }
    case 'collage-3v': {
      const slotH = (innerH - gap * 2) / 3;
      for (let i = 0; i < 3; i++) {
        slots.push({ x: x0, y: y0 + i * (slotH + gap), w: innerW, h: slotH });
      }
      break;
    }
    case 'collage-4': {
      const slotW = (innerW - gap) / 2;
      const slotH = (innerH - gap) / 2;
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 2; c++) {
          slots.push({
            x: x0 + c * (slotW + gap),
            y: y0 + r * (slotH + gap),
            w: slotW,
            h: slotH,
          });
        }
      }
      break;
    }
    case 'collage-5': {
      const leftW = (innerW - gap) / 2;
      const smallW = (leftW - gap) / 2;
      const smallH = (innerH - gap) / 2;
      const rightX = x0 + leftW + gap;
      slots.push({ x: x0, y: y0, w: leftW, h: innerH });
      slots.push({ x: rightX, y: y0, w: smallW, h: smallH });
      slots.push({ x: rightX + smallW + gap, y: y0, w: smallW, h: smallH });
      slots.push({ x: rightX, y: y0 + smallH + gap, w: smallW, h: smallH });
      slots.push({ x: rightX + smallW + gap, y: y0 + smallH + gap, w: smallW, h: smallH });
      break;
    }
  }

  return slots;
}
