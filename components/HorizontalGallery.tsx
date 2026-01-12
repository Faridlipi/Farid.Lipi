'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const baseProjects = [
    "https://images.unsplash.com/photo-1624106784587-facb5dcfef45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1685094488656-9231107be07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wxMzA1NzU5fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1667475593802-8d4e117a042f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjB8MTMwNTc1OXx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1550853123-b81beb0b1449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1548811504-70378f5e2a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1531857536115-c21178683f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1468322638156-074863f9362e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1555488205-d5e67846cf40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMDYxMjk2MHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
];

// Triplicate for "Infinite" feel
const projects = [...baseProjects, ...baseProjects, ...baseProjects];

export default function HorizontalGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Moves the track left
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // Adjust -80% based on content length

    // Parallax Effect: Moves the image inside the container
    // Mapping 0->1 scroll to 100%->0% objectPosition
    const objectPosition = useTransform(scrollYProgress, [0, 1], ["100% 50%", "0% 50%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <motion.div style={{ x }} className="flex gap-[4vmin] pl-[10vw]">
                    {projects.map((src, index) => (
                        <div key={index} className="relative w-[50vmin] h-[70vmin] flex-shrink-0 group overflow-hidden">
                            <motion.img
                                style={{ objectPosition }}
                                src={src}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                                draggable="false"
                            />
                            <div className="absolute inset-0 border border-white/10 group-hover:border-white/50 transition-colors duration-500 pointer-events-none" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
