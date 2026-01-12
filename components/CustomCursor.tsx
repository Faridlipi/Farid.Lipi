'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detect touch device
        const checkTouchDevice = () => {
            const hasTouchScreen = 'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches;
            setIsTouchDevice(hasTouchScreen);
        };

        checkTouchDevice();

        // Don't add mouse listeners on touch devices
        if (isTouchDevice) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateMousePosition);

        // Add listeners to specific interactive elements
        const clickables = document.querySelectorAll('a, button, blockquote, .cursor-none');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            clickables.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [isTouchDevice]);

    // Don't render cursor on touch devices
    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-50 flex items-center justify-center overflow-hidden backdrop-blur-sm"
            style={{ opacity: 0.8 }}
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isHovering ? 5 : 1,
            }}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 250,
                mass: 0.5
            }}
        />
    );
}
