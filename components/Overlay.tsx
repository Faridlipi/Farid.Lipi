'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';
import TypewriterText from './TypewriterText';

const MaskedText = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
    const y = useTransform(progress, range, ['100%', '0%']);
    const opacity = useTransform(progress, range, [0, 1]);

    return (
        <div className="overflow-hidden relative inline-block">
            <motion.div style={{ y, opacity }} className="origin-top-left">
                {children}
            </motion.div>
        </div>
    );
}

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

    const section1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);
    const section1Y = useTransform(scrollYProgress, [0.1, 0.25], [0, -50]);

    const section2Opacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.45, 0.6], [0, -50]);

    const section3Opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

    return (
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
            {/* Section 1 - Hero */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }} // Wait for preloader
                style={{ opacity: section1Opacity, y: section1Y }}
                className="absolute top-1/2 left-[10%] -translate-y-1/2 text-left mix-blend-difference text-white"
            >
                <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4 flex flex-col items-start leading-[0.8]">
                    <MaskedText progress={scrollYProgress} range={[0, 0.1]}>Farid</MaskedText>
                    <MaskedText progress={scrollYProgress} range={[0.05, 0.15]}>Lipi</MaskedText>
                </h1>
                <div className="text-xl md:text-3xl font-mono text-blue-400 tracking-tight mt-4">
                    <TypewriterText text="<CreativeDeveloper />" delay={1.5} />
                </div>
            </motion.div>

        </div>
    );
}
