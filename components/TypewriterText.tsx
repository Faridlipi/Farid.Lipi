'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TypewriterTextProps {
    text: string | string[];
    className?: string;
    delay?: number;
}

export default function TypewriterText({ text, className = "", delay = 0 }: TypewriterTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const textArray = Array.isArray(text) ? text : [text];

    return (
        <div ref={ref} className={`inline-block ${className} font-mono`}>
            {textArray.map((line, lineIndex) => (
                <div key={lineIndex} className="block">
                    {line.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{
                                duration: 0,
                                delay: delay + lineIndex * 0.5 + charIndex * 0.05, // Staggered delay
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {/* Blinking Cursor only at the very end */}
                    {lineIndex === textArray.length - 1 && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="inline-block w-[0.1em] h-[1em] bg-blue-400 ml-1 align-baseline lg:h-[0.8em]"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
