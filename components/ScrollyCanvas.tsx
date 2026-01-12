'use client';

import { useMotionValueEvent, MotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function ScrollyCanvas({
    numFrames = 75,
    scrollYProgress
}: {
    numFrames?: number;
    scrollYProgress: MotionValue<number>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Add spring physics to the scroll progress for smoother playback
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 40,
        restDelta: 0.0001
    });

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < numFrames; i++) {
            const img = new Image();
            img.src = `/sequence/${i.toString().padStart(3, '0')}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === numFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [numFrames]);

    // Render Frame
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const image = images[index];

        if (!context || !canvas || !image) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const imgRatio = image.width / image.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    }, [images]);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Initial render after resize
                if (images.length > 0) {
                    const progress = scrollYProgress.get();
                    const frameIndex = Math.min(
                        numFrames - 1,
                        Math.floor(progress * (numFrames - 1))
                    );
                    renderFrame(frameIndex);
                }
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [images, scrollYProgress, numFrames, renderFrame]);

    // Scroll Listener
    useMotionValueEvent(smoothProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        const frameIndex = Math.min(
            numFrames - 1,
            Math.floor(latest * (numFrames - 1))
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial Render once loaded
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            const progress = smoothProgress.get();
            const frameIndex = Math.min(
                numFrames - 1,
                Math.floor(progress * (numFrames - 1))
            );
            renderFrame(frameIndex);
        }
    }, [isLoaded, images, smoothProgress, numFrames, renderFrame]);

    return (
        <div className="absolute inset-0 w-full h-full">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm tracking-widest uppercase">
                    Loading Assets...
                </div>
            )}
        </div>
    );
}
