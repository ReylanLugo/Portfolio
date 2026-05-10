import { CountUp } from '@/components/ui';

type Props = {
  label: string;
  value: number;
  suffix?: string;
};

export function MetricStat({ label, value, suffix }: Props) {
  return (
    <div>
      <p className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-bone">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-mute">
        {label}
      </p>
    </div>
  );
}
