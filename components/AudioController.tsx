'use client';

import { useState, useEffect, useRef } from 'react';

export default function AudioController() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Try to start muted on load (best effort)
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }

        const handleInteraction = () => {
            if (audioRef.current && !isPlaying) {
                // Try to unmute and play on first interaction
                //  audioRef.current.muted = false;
                //  audioRef.current.play()
                //     .then(() => setIsPlaying(true))
                //     .catch(() => {}); // If it fails, user has the button

                // Remove listeners
                removeGlobalListeners();
            }
        };

        const removeGlobalListeners = () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);

        return () => {
            removeGlobalListeners();
        };
    }, [isPlaying]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.muted = false; // Ensure unmuted
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-10 right-10 z-50">
            <audio
                ref={audioRef}
                src="/audio/intersteller.mp4"
                loop
                preload="auto"
            />

            <button
                onClick={toggleAudio}
                className="text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all hover:bg-white/10"
            >
                {isPlaying ? 'Sound: On' : 'Sound: Off'}
            </button>
        </div>
    );
}
