'use client';

import { motion } from 'framer-motion';
import TypewriterText from '@/components/TypewriterText';
import SectionWrapper from '@/components/SectionWrapper';
import { useState, useRef, MouseEvent } from 'react';

const quotes = [
    {
        name: "Albert Einstein",
        role: "Theoretical Physicist",
        positive: "Imagination is more important than knowledge.",
        truth: "Genius is 1% inspiration and 99% perspiration.",
        image_pos: "/images-of-greatminds/alberteinstein.jpg",
        image_truth: "/images-truth/Einstein.webp"
    },
    {
        name: "Bill Gates",
        role: "Technologist",
        positive: "Patience is a key element of success.",
        truth: "Life is not fair; get used to it.",
        image_pos: "/images-of-greatminds/billgates.jpg",
        image_truth: "/images-truth/billgates.jpeg"
    },
    {
        name: "Steve Jobs",
        role: "Visionary",
        positive: "The only way to do great work is to love what you do.",
        truth: "I'm convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.",
        image_pos: "/images-of-greatminds/stevejobs.jpg",
        image_truth: "/images-truth/steve-jobs-working.webp"
    },
    {
        name: "Nikola Tesla",
        role: "Inventor",
        positive: "The present is theirs; the future, for which I really worked, is mine.",
        truth: "I don't care that they stole my idea . . I care that they don't have any of their own.",
        image_pos: "/images-of-greatminds/nikolatesla.jpg",
        image_truth: "/images-truth/Nikola-Tesla-4-1400x875.webp"
    },
    {
        name: "Maya Angelou",
        role: "Poet",
        positive: "We may encounter many defeats but we must not be defeated.",
        truth: "Nothing will work unless you do.",
        image_pos: "/images-of-greatminds/maya-angelou.jpg",
        image_truth: "/images-truth/maya-angelou-7.webp"
    },
    {
        name: "Leonardo da Vinci",
        role: "Polymath",
        positive: "Learning never exhausts the mind.",
        truth: "Iron rusts from disuse; water loses its purity from stagnation... even so does inaction sap the vigor of the mind.",
        image_pos: "/images-of-greatminds/leonardodavinci.jpg",
        image_truth: "/images-truth/leonardodavinchi.webp"
    },
    {
        name: "Nelson Mandela",
        role: "Revolutionary",
        positive: "It always seems impossible until it's done.",
        truth: "Do not judge me by my successes, judge me by how many times I fell down and got back up again.",
        image_pos: "/images-of-greatminds/Yousuf-Karsh-Nelson-Mandela-1990.jpg",
        image_truth: "/images-truth/nelsonmandela.webp"
    },
    {
        name: "Mahatma Gandhi",
        role: "Leader",
        positive: "Be the change that you wish to see in the world.",
        truth: "Strength does not come from physical capacity. It comes from an indomitable will.",
        image_pos: "/images-of-greatminds/Mahatma-Gandhi.jpg",
        image_truth: "/images-truth/mahatama-gandi.webp"
    }
];

function QuoteItem({ item, index }: { item: typeof quotes[0], index: number }) {
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [maskPosition, setMaskPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!textContainerRef.current) return;
        const rect = textContainerRef.current.getBoundingClientRect();
        setMaskPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <SectionWrapper className="w-full">
            <div className={`relative w-full py-12 flex flex-col md:flex-row items-center gap-12 md:gap-24 cursor-none ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                {/* ---------------- IMAGE COLUMN (Static Positive) ---------------- */}
                <div className="w-full md:w-1/2 flex justify-center z-10 relative">
                    <div className="relative w-full max-w-md aspect-square rounded-full shadow-2xl overflow-hidden border border-white/10">
                        <img
                            src={item.image_pos}
                            alt={item.name}
                            className="w-full h-full object-cover grayscale transition-all duration-500"
                        />
                        {/* Name Tag Overlay on Image */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs bg-black/80 backdrop-blur-md px-4 py-2 text-white border border-white/20 rounded-full whitespace-nowrap">
                            {item.name} // {item.role}
                        </div>
                    </div>
                </div>

                {/* ---------------- TEXT COLUMN (Masked Lens) ---------------- */}
                {/* Uses CSS Grid to stack Positive and Truth layers perfectly on top of each other */}
                <div
                    ref={textContainerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="w-full md:w-1/2 z-10 grid grid-cols-1"
                >
                    {/* Layer 1: Positive (Base) - Hidden under lens */}
                    <div
                        className="col-start-1 row-start-1 space-y-6"
                        style={{
                            maskImage: isHovering
                                ? `radial-gradient(circle 120px at ${maskPosition.x}px ${maskPosition.y}px, transparent 100%, black 100%)`
                                : 'none',
                            WebkitMaskImage: isHovering
                                ? `radial-gradient(circle 120px at ${maskPosition.x}px ${maskPosition.y}px, transparent 100%, black 100%)`
                                : 'none',
                        }}
                    >
                        <div className="font-mono text-blue-400 text-sm tracking-widest uppercase mb-2">
                            <TypewriterText text="<PositivePerspective />" delay={0} />
                        </div>
                        {/* Added minimal min-height to prevent jarring layout shifts if truth is wildly larger, though Grid handles max height */}
                        <blockquote className="text-2xl md:text-3xl font-mono font-light leading-snug text-white/80">
                            <span className="text-white/30 mr-2">"</span>{item.positive}<span className="text-white/30 ml-2">"</span>
                        </blockquote>
                        <div className="h-px w-20 bg-white/20 mt-8" />
                    </div>

                    {/* Layer 2: Truth (Reveal) - Visible under lens */}
                    <div
                        className="col-start-1 row-start-1 space-y-6 pointer-events-none"
                        style={{
                            maskImage: isHovering
                                ? `radial-gradient(circle 120px at ${maskPosition.x}px ${maskPosition.y}px, black 100%, transparent 100%)`
                                : 'none',
                            WebkitMaskImage: isHovering
                                ? `radial-gradient(circle 120px at ${maskPosition.x}px ${maskPosition.y}px, black 100%, transparent 100%)`
                                : 'none',
                            opacity: isHovering ? 1 : 0,
                            zIndex: 20
                        }}
                    >
                        <div className="font-mono text-red-500 text-sm tracking-widest uppercase mb-2">
                            <span className="font-bold bg-red-950/80 px-2 py-1">REALITY_CHECK</span>
                        </div>
                        <blockquote className="text-2xl md:text-3xl font-mono font-bold leading-snug text-white drop-shadow-lg">
                            <span className="text-red-500 mr-2">"</span>{item.truth}<span className="text-red-500 ml-2">"</span>
                        </blockquote>
                        <div className="h-px w-32 bg-red-500 mt-8 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

export default function QuotesSection() {
    return (
        <section className="relative z-10 py-32 px-6 md:px-20 max-w-7xl mx-auto text-white space-y-32">
            <SectionWrapper>
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter font-mono border-b border-white/10 pb-4 inline-block">
                        The_Truth_Lens_
                    </h2>
                    <p className="mt-4 font-mono text-white/40 text-sm">
                    // Hover text to reveal the hidden variables.
                    </p>
                </div>
            </SectionWrapper>

            {quotes.map((item, index) => (
                <QuoteItem key={index} item={item} index={index} />
            ))}
        </section>
    );
}
