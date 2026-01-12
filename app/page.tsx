'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Preloader from '@/components/Preloader';
import StarField from '@/components/StarField';
import HorizontalGallery from '@/components/HorizontalGallery';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import AudioController from '@/components/AudioController';
import TypewriterText from '@/components/TypewriterText';
import QuotesSection from '@/components/QuotesSection';
import SectionWrapper from '@/components/SectionWrapper';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#050505] min-h-screen text-white relative">
      <Preloader />
      <StarField />
      <AudioController />

      {/* Scroll Sequence Container */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />

          {/* Gradient Fade to blend the bottom of the 3D sequence into the black background */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050505] z-20 pointer-events-none" />
        </div>
      </div>

      {/* Philosophy / About Section */}
      <section className="relative z-10 py-32 px-6 md:px-20 max-w-7xl mx-auto mix-blend-difference font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SectionWrapper className="w-full">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-white/90 font-sans">
              Beyond<br />The Horizon.
            </h2>
            <div className="h-1 w-20 bg-white/20 mb-8" />
          </SectionWrapper>

          <div className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-relaxed">
            <SectionWrapper>
              <div className="text-blue-300">
                <TypewriterText text="// We assume that time is linear." delay={0.2} />
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div>
                <TypewriterText
                  text={[
                    "But in the digital realm, we control the flow.",
                    "I craft interfaces that defy standard navigation,",
                    "creating gravitational pulls that guide users",
                    "through a narrative."
                  ]}
                  delay={0.8}
                />
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div className="text-purple-300">
                <TypewriterText text="/* My work is not just about code; it's about the feeling of discovery. */" delay={3.5} />
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <SectionWrapper>
        <Experience />
      </SectionWrapper>

      {/* Horizontal Parallax Gallery */}
      <SectionWrapper>
        <HorizontalGallery />
      </SectionWrapper>

      {/* Great Minds Quotes */}
      <QuotesSection />

      {/* Contact Section */}
      <SectionWrapper>
        <Contact />
      </SectionWrapper>

      <footer className="py-12 text-center text-white/30 text-sm uppercase tracking-widest relative z-10 border-t border-white/5">
        &copy; {new Date().getFullYear()} Farid Lipi. All systems nominal.
      </footer>
    </main>
  );
}
