'use client';

import TypewriterText from '@/components/TypewriterText';

const jobs = [
    {
        year: "2024 - Present",
        company: "Freelance",
        role: "Creative Developer",
        description: "// Building immersive web experiences for global brands."
    },
    {
        year: "2021 - 2023",
        company: "Tech Studio",
        role: "Frontend Engineer",
        description: "// Led development of award-winning marketing sites."
    },
    {
        year: "2019 - 2021",
        company: "Digital Agency",
        role: "Junior Developer",
        description: "// Crafted pixel-perfect UI components and animations."
    }
];

export default function Experience() {
    return (
        <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto bg-[#050505] text-white">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 font-mono border-b border-white/10 pb-4 inline-block">
                Experience_
            </h2>

            <div className="space-y-16">
                {jobs.map((job, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-8 group">
                        <div className="md:col-span-1 text-white/40 font-mono text-sm pt-2">
                            {job.year}
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                                <TypewriterText text={`${job.role} @ ${job.company}`} delay={index * 0.2} />
                            </h3>
                            <p className="text-blue-200/80 font-mono text-sm leading-relaxed">
                                {job.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
