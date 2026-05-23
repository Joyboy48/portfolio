"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

// Simple CSS confetti particle
const Confetti = () => {
  const colors = ["#2f7df4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
  return (
    <div className="fixed inset-0 pointer-events-none z-[999998] overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-sm animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-10 + Math.random() * 20}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const KonamiProvider = () => {
  const [buffer, setBuffer] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't capture when user is typing in an input/textarea
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    setBuffer((prev) => {
      const next = [...prev, e.key].slice(-KONAMI.length);
      if (next.join(",") === KONAMI.join(",")) {
        setUnlocked(true);
        return [];
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleClose = () => setUnlocked(false);

  if (!unlocked) return null;

  return (
    <>
      <Confetti />

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999999] bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
        onClick={handleClose}
      >
        {/* Modal Card */}
        <div
          className="relative w-full max-w-md bg-zinc-950 border-2 border-yellow-500/60 rounded-2xl shadow-2xl shadow-yellow-500/10 p-8 flex flex-col items-center gap-5 text-center animate-in zoom-in-90 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="text-6xl animate-bounce">🏆</div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-yellow-500 uppercase tracking-widest">Achievement Unlocked</p>
            <h2 className="text-2xl font-bold font-rubik text-white">Secret Dev Mode</h2>
            <p className="text-zinc-400 text-sm font-poppins">You found the Konami Code easter egg. You are clearly a developer of culture.</p>
          </div>

          <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-left font-mono text-xs space-y-1.5">
            <p className="text-zinc-500">{"// unlocked_stats.json"}</p>
            <p><span className="text-purple-400">secret_projects</span>: <span className="text-emerald-400">{"\"many (most unreleased)\""}</span></p>
            <p><span className="text-purple-400">coffee_cups_today</span>: <span className="text-yellow-400">∞</span></p>
            <p><span className="text-purple-400">lines_of_code</span>: <span className="text-sky-400">{"\"enough to fill the moon\""}</span></p>
            <p><span className="text-purple-400">bugs_introduced</span>: <span className="text-red-400">{"\"classified\""}</span></p>
            <p><span className="text-purple-400">bugs_fixed</span>: <span className="text-emerald-400">{"\"all of them eventually\""}</span></p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Link
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "astitvaarya9589@gmail.com"}`}
              className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-bold font-mono text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-yellow-500/30 flex items-center justify-center gap-2"
            >
              🚀 Hire This Developer
            </Link>
            <button
              onClick={handleClose}
              className="w-full py-2 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 font-mono text-xs rounded-lg transition-all"
            >
              Close (Esc)
            </button>
          </div>

          <p className="text-zinc-600 text-[10px] font-mono">
            ↑ ↑ ↓ ↓ ← → ← → B A — classic
          </p>
        </div>
      </div>
    </>
  );
};
