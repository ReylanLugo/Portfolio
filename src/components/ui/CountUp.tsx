import { useCountUp } from '@/hooks/useCountUp';

type Props = {
  value: number;
  suffix?: string;
};

export function CountUp({ value, suffix = '' }: Props) {
  const { value: n, ref } = useCountUp(value);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
