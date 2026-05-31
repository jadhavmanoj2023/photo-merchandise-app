import { useRef } from 'react';
import { BabyFrameDetails, BabyFrameTheme } from '../../data/babyFrames';
import EditableField from './EditableField';

interface Props {
  details: BabyFrameDetails;
  onChange: (details: BabyFrameDetails) => void;
  theme: BabyFrameTheme;
  compact?: boolean;
  className?: string;
}

function PhotoSlot({
  photo,
  label,
  onSelect,
  frameColor,
  accent,
  variant,
  compact,
}: {
  photo: string;
  label: string;
  onSelect: () => void;
  frameColor: string;
  accent: string;
  variant: 'heptagon' | 'rect';
  compact?: boolean;
}) {
  const isHeptagon = variant === 'heptagon';
  const width = compact ? (isHeptagon ? 48 : 40) : isHeptagon ? 84 : 68;
  const height = isHeptagon ? width : compact ? 54 : 92;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative shrink-0 overflow-hidden mx-auto block"
      style={{
        width,
        height,
        background: frameColor,
        borderRadius: isHeptagon ? 0 : compact ? 5 : 8,
        clipPath: isHeptagon
          ? 'polygon(50% 0%, 92% 12%, 100% 50%, 92% 88%, 50% 100%, 8% 88%, 0% 50%, 8% 12%)'
          : undefined,
      }}
    >
      {photo ? (
        <img src={photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: frameColor }}
        >
          <span
            className="font-bold text-white leading-tight text-center rounded-sm"
            style={{
              background: accent,
              fontSize: compact ? 6 : 9,
              padding: compact ? '3px 4px' : '5px 8px',
            }}
          >
            SELECT
            <br />
            PHOTO
          </span>
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function SideItem({
  children,
  compact,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center leading-none"
      style={{ minHeight: compact ? 28 : 44 }}
    >
      {children}
    </div>
  );
}

export default function BabyFrameCanvas({
  details,
  onChange,
  theme,
  compact,
  className = '',
}: Props) {
  const topInputRef = useRef<HTMLInputElement>(null);
  const bottomInputRef = useRef<HTMLInputElement>(null);

  const set = (patch: Partial<BabyFrameDetails>) => onChange({ ...details, ...patch });

  const handlePhoto = (slot: 'photoTop' | 'photoBottom', file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => set({ [slot]: e.target?.result as string });
    reader.readAsDataURL(file);
  };

  const icon = compact ? 'text-sm leading-none' : 'text-lg leading-none';
  const label = compact ? 'text-[7px]' : 'text-[10px]';
  const stat = compact ? 'text-[7px]' : 'text-[11px]';
  const nameCls = compact
    ? 'text-[11px] font-serif italic font-bold'
    : 'text-xl sm:text-2xl font-serif italic font-bold';
  const parentCls = compact
    ? 'text-[10px] font-serif italic font-bold'
    : 'text-lg sm:text-xl font-serif italic font-bold';

  return (
    <div
      className={`relative mx-auto rounded-2xl shadow-md border border-black/5 overflow-hidden flex flex-col ${
        compact ? 'w-full h-full' : 'w-full max-w-[300px] aspect-[2/3]'
      } ${className}`}
      style={{ background: theme.background, color: theme.text }}
    >
      <input
        ref={topInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handlePhoto('photoTop', f);
          e.target.value = '';
        }}
      />
      <input
        ref={bottomInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handlePhoto('photoBottom', f);
          e.target.value = '';
        }}
      />

      {/* Baby name */}
      <div
        className="shrink-0 text-center border-b border-black/[0.04]"
        style={{ padding: compact ? '6px 8px 4px' : '14px 12px 10px' }}
      >
        <EditableField
          value={details.babyName}
          onChange={(v) => set({ babyName: v })}
          placeholder="Baby name"
          className={`${nameCls} block text-center w-full`}
          style={{ color: theme.text }}
        />
      </div>

      {/* Body — 3 equal columns, side columns space items evenly */}
      <div
        className="flex-1 grid grid-cols-3 min-h-0"
        style={{ padding: compact ? '4px 6px' : '8px 10px' }}
      >
        {/* Left column */}
        <div className="flex flex-col justify-between h-full">
          <SideItem compact={compact}>
            <span className={icon}>🧸</span>
          </SideItem>
          <SideItem compact={compact}>
            <span className={icon}>📅</span>
            <EditableField
              value={details.birthDay}
              onChange={(v) => set({ birthDay: v })}
              placeholder="21"
              className={`${stat} font-bold block mt-0.5`}
            />
            <EditableField
              value={details.birthMonthYear}
              onChange={(v) => set({ birthMonthYear: v })}
              placeholder="Aug 2024"
              className={`${label} italic block mt-0.5 opacity-90`}
            />
          </SideItem>
          <SideItem compact={compact}>
            <EditableField
              value={details.weight}
              onChange={(v) => set({ weight: v })}
              placeholder="2.9 Kg"
              className={`${stat} font-semibold block`}
            />
            <span className={`${icon} mt-0.5`}>⚖️</span>
          </SideItem>
          <SideItem compact={compact}>
            <div
              className="rounded-full flex items-center justify-center font-bold text-white"
              style={{
                background: theme.accent,
                width: compact ? 22 : 32,
                height: compact ? 22 : 32,
                fontSize: compact ? 8 : 11,
              }}
            >
              <EditableField
                value={details.bloodGroup}
                onChange={(v) => set({ bloodGroup: v })}
                placeholder="B+"
                className="text-white font-bold text-center"
                style={{ fontSize: compact ? 8 : 11, color: '#fff' }}
              />
            </div>
          </SideItem>
          <SideItem compact={compact}>
            <span className={icon}>🌸</span>
          </SideItem>
        </div>

        {/* Center — photos */}
        <div className="flex flex-col items-center justify-center h-full gap-1 px-0.5">
          <PhotoSlot
            photo={details.photoTop}
            label="Top photo"
            onSelect={() => topInputRef.current?.click()}
            frameColor={theme.photoFrame}
            accent={theme.accent}
            variant="heptagon"
            compact={compact}
          />
          <span
            className="text-amber-400 tracking-widest shrink-0 leading-none"
            style={{ fontSize: compact ? 6 : 10 }}
          >
            ✦ ✦ ✦ ✦
          </span>
          <PhotoSlot
            photo={details.photoBottom}
            label="Bottom photo"
            onSelect={() => bottomInputRef.current?.click()}
            frameColor={theme.photoFrame}
            accent={theme.accent}
            variant="rect"
            compact={compact}
          />
        </div>

        {/* Right column — mirrors left row heights */}
        <div className="flex flex-col justify-between h-full">
          <SideItem compact={compact}>
            <span className={icon}>🐰</span>
          </SideItem>
          <SideItem compact={compact}>
            <span className={compact ? 'text-base leading-none' : 'text-2xl leading-none'}>👶</span>
          </SideItem>
          <SideItem compact={compact}>
            <span className={icon}>⏰</span>
            <EditableField
              value={details.birthTime}
              onChange={(v) => set({ birthTime: v })}
              placeholder="9:45 AM"
              className={`${stat} font-semibold block mt-0.5`}
            />
          </SideItem>
          <SideItem compact={compact}>
            <span className={icon}>🏥</span>
            <EditableField
              value={details.hospital}
              onChange={(v) => set({ hospital: v })}
              placeholder="Hospital"
              className={`${label} italic block mt-0.5 max-w-full px-0.5`}
              multiline
            />
          </SideItem>
          <SideItem compact={compact}>
            <span className={icon}>🍼</span>
          </SideItem>
        </div>
      </div>

      {/* Parents footer */}
      <div
        className="shrink-0 text-center border-t border-black/[0.04]"
        style={{ padding: compact ? '4px 8px 6px' : '10px 12px 14px' }}
      >
        <p className={`${label} italic text-gray-500 mb-0.5`}>Proud Parents</p>
        <EditableField
          value={details.parentNames}
          onChange={(v) => set({ parentNames: v })}
          placeholder="Parent names"
          className={`${parentCls} block text-center w-full`}
          style={{ color: theme.text }}
        />
      </div>
    </div>
  );
}
