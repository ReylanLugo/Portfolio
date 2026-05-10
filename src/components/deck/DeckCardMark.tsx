type Props = {
  accentRgb: string;
  glow: boolean;
};

export function DeckCardMark({ accentRgb, glow }: Props) {
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-md border"
      style={{
        borderColor: `rgba(${accentRgb}, 0.45)`,
        background: `rgba(${accentRgb}, 0.08)`,
      }}
      aria-hidden="true"
    >
      <span
        className="h-1.5 w-1.5 rotate-45"
        style={{
          background: `rgb(${accentRgb})`,
          boxShadow: glow ? `0 0 8px rgba(${accentRgb}, 0.9)` : 'none',
        }}
      />
    </span>
  );
}
