import { motion, type MotionValue } from 'framer-motion';
import type { Blob } from '@/lib/blob';

type Props = {
  blobs: Blob[];
  accentRgb: string;
  active: boolean;
  reduced: boolean;
  opacity: MotionValue<number> | number;
};

export function BlobLayer({ blobs, accentRgb, active, reduced, opacity }: Props) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: reduced ? 0.6 : opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {(reduced || active) &&
        blobs.map((b, i) => (
          <motion.div
            key={i}
            initial={{ x: b.x[0], y: b.y[0], scale: b.scale[0] }}
            animate={
              reduced ? undefined : { x: b.x, y: b.y, scale: b.scale }
            }
            transition={{
              duration: b.duration,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              delay: b.delay,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              width: `${b.size}%`,
              height: `${b.size}%`,
              background: `radial-gradient(circle, rgba(${accentRgb}, ${b.intensity}), transparent ${b.fade}%)`,
              willChange: 'transform',
            }}
          />
        ))}
    </motion.div>
  );
}
