type Props = {
  total: number;
  active: number;
  label: string;
};

export function DeckIndicator({ total, active, label }: Props) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === active;
          return (
            <span
              key={i}
              className="block h-1 rounded-full transition-all duration-300"
              style={{
                width: isActive ? 18 : 6,
                background: isActive ? '#f97316' : 'rgba(232,230,223,0.25)',
              }}
            />
          );
        })}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
        {label}
      </span>
    </div>
  );
}
