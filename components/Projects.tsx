'use client';

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Project Alpha",
        category: "Web Development",
        year: "2024",
        description: "A high-performance e-commerce platform built with Next.js and Shopify.",
    },
    {
        title: "Neon Dash",
        category: "Interactive Design",
        year: "2023",
        description: "WebGL powered runner game featuring immersive audio-reactive visuals.",
    },
    {
        title: "Quartz UI",
        category: "Design System",
        year: "2023",
        description: "Comprehensive React component library for enterprise dashboard applications.",
    },
    {
        title: "Vortex",
        category: "3D Experiment",
        year: "2024",
        description: "Three.js particle simulation exploring fluid dynamics in the browser.",
    }
];

export default function Projects() {
    return (
        <section className="relative w-full py-32 px-4 md:px-12 bg-[#0a0a0a] z-20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-24 tracking-tight"
                >
                    Selected Works
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col justify-end hover:bg-white/10 transition-colors duration-500 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />

                            <div className="relative z-10 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                                    <span className="text-sm font-mono text-white/60">{project.year}</span>
                                </div>
                                <p className="text-lg text-white/50 mb-4">{project.category}</p>
                                <p className="text-white/80 max-w-sm line-clamp-2">{project.description}</p>
                            </div>

                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                                    <span className="text-white text-lg">↗</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
