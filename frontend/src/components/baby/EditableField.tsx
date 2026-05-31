import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}

export default function EditableField({
  value,
  onChange,
  className = '',
  placeholder = 'Click to edit',
  multiline = false,
  style,
}: Props) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) {
      (multiline ? areaRef : inputRef).current?.focus();
    }
  }, [editing, multiline]);

  if (editing) {
    const sharedProps = {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange(e.target.value),
      onBlur: () => setEditing(false),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (!multiline && e.key === 'Enter') setEditing(false);
        if (e.key === 'Escape') setEditing(false);
      },
      className: `bg-white/95 border border-[#e11d48] rounded px-1.5 py-0.5 outline-none text-inherit font-inherit w-full ${className}`,
      style,
    };

    if (multiline) {
      return <textarea ref={areaRef} rows={2} {...sharedProps} />;
    }
    return <input ref={inputRef} type="text" {...sharedProps} />;
  }

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => e.key === 'Enter' && setEditing(true)}
      title="Click to edit"
      className={`cursor-text hover:outline hover:outline-2 hover:outline-[#e11d48]/40 hover:outline-offset-1 rounded transition ${className} ${
        !value ? 'text-gray-400 italic' : ''
      }`}
      style={style}
    >
      {value || placeholder}
    </span>
  );
}
