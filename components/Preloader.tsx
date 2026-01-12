'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prev => {
                const next = prev + Math.floor(Math.random() * 10) + 1;
                if (next >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return next;
            });
        }, 100);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // Simulated load time for drama, coupled with actual asset loading if we connected it

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-[100] bg-[#121212] flex items-center justify-center text-white"
                >
                    <div className="flex flex-col items-center relative w-full overflow-hidden py-10">
                        <h1 className="text-9xl font-bold tracking-tighter relative z-10">
                            {counter}%
                        </h1>
                        <p className="tracking-widest uppercase mt-4 text-white/50 relative z-10">Loading Experience</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
