import { lazy, Suspense } from 'react';
import { Nav } from './components/nav';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Stack } from './components/sections/Stack';
import { Experience } from './components/sections/Experience';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';

const ParticlesBg = lazy(() =>
  import('./components/effects/ParticlesBg').then((m) => ({ default: m.ParticlesBg })),
);
const CursorGlow = lazy(() =>
  import('./components/effects/CursorGlow').then((m) => ({ default: m.CursorGlow })),
);

export default function App() {
  useLenis();
  const reduced = useReducedMotion();

  return (
    <>
      {!reduced && (
        <Suspense fallback={null}>
          <ParticlesBg />
          <CursorGlow />
        </Suspense>
      )}

      <Nav />

      <main className="relative z-10">
        <Hero />
        <div className="space-y-32 sm:space-y-40 lg:space-y-56 py-32 sm:py-40">
          <Projects />
          <Stack />
          <Experience />
          <About />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}
