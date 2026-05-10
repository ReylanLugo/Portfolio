import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/data/site';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 md:hidden bg-ink-950/95 backdrop-blur-xl"
        >
          <nav className="flex h-full flex-col items-start justify-center gap-6 px-8">
            {site.nav.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-medium tracking-tight"
              >
                <span className="text-accent mr-3 font-mono text-base align-middle">
                  0{i + 1}
                </span>
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${site.email}`}
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-950 shadow-glow"
            >
              Hire me →
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
