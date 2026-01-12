'use client';

import MagneticButton from '@/components/MagneticButton';
import TypewriterText from '@/components/TypewriterText';

export default function Contact() {
    return (
        <section className="h-screen flex flex-col items-center justify-center bg-[#050505] text-white relative py-20">
            <div className="text-center space-y-8 z-10">
                <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4">
                    <TypewriterText text="<WaitngForInput />" />
                </p>

                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">
                    Let&apos;s Work<br />Together.
                </h2>

                <div className="pt-10">
                    <a href="mailto:hello@faridlipi.com">
                        <MagneticButton className="inline-block px-10 py-5 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-colors duration-300 font-mono text-lg group">
                            <span className="group-hover:hidden">hello@faridlipi.com</span>
                            <span className="hidden group-hover:inline-block font-bold">Initiate_Contact</span>
                        </MagneticButton>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 font-mono text-xs text-white/20">
                System.Status: <span className="text-green-500">Online</span>
            </div>
        </section>
    );
}
