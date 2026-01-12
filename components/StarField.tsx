'use client';

import { useEffect, useRef } from 'react';

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Increased star count significantly for deep space look
        const stars: { x: number; y: number; size: number; alpha: number; speed: number; static: boolean }[] = [];
        const numStars = 600;

        // Generate Standard Stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5,
                alpha: Math.random(),
                speed: Math.random() * 0.05,
                static: false,
            });
        }

        // Generate Background "Dust" (Static faint stars)
        const dustParticles: { x: number; y: number; alpha: number }[] = [];
        for (let i = 0; i < 200; i++) {
            dustParticles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                alpha: Math.random() * 0.3
            });
        }

        // Nebula/Gas Clouds (Procedural, simple colored gradients)
        const nebulae = [
            { x: width * 0.2, y: height * 0.3, radius: 400, color: 'rgba(70, 20, 100, 0.08)' }, // Purple deep
            { x: width * 0.8, y: height * 0.7, radius: 500, color: 'rgba(20, 50, 120, 0.08)' }, // Blue deep
            { x: width * 0.5, y: height * 0.5, radius: 600, color: 'rgba(100, 50, 80, 0.05)' }  // Pinkish center
        ];

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Nebulae
            nebulae.forEach(neb => {
                const gradient = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
                gradient.addColorStop(0, neb.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(neb.x, neb.y, neb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Draw Static Dust
            ctx.fillStyle = "white";
            dustParticles.forEach(p => {
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 0.5, 0, Math.PI * 2);
                ctx.fill();
            });

            // 3. Draw Moving Stars
            stars.forEach(star => {
                ctx.globalAlpha = star.alpha;
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Subtle movement
                star.y -= star.speed;
                if (star.y < 0) star.y = height;
            });

            ctx.globalAlpha = 1.0;
            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Re-center nebulas roughly on resize
            nebulae[0].x = width * 0.2; nebulae[0].y = height * 0.3;
            nebulae[1].x = width * 0.8; nebulae[1].y = height * 0.7;
            nebulae[2].x = width * 0.5; nebulae[2].y = height * 0.5;
        };

        window.addEventListener('resize', handleResize);
        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
