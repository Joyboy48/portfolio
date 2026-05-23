"use client";
import React, { useState, useEffect } from "react";
import { Palette, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemePreset {
  name: string;
  color: string; // Tailwind hex representation for preview
  hsl: string;   // HSL variable value
}

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Sky Blue");

  const presets: ThemePreset[] = [
    { name: "Sky Blue", color: "#3b82f6", hsl: "216.24deg 89.95% 57.06%" },
    { name: "Matrix Green", color: "#10b981", hsl: "142.06deg 76.22% 45.29%" },
    { name: "Dracula Purple", color: "#a855f7", hsl: "282.86deg 72.41% 54.31%" },
    { name: "CNCF Orange", color: "#f97316", hsl: "24.32deg 95.04% 52.55%" },
    { name: "Crimson Red", color: "#ef4444", hsl: "0deg 84.2% 60.2%" },
  ];

  useEffect(() => {
    const savedHsl = localStorage.getItem("selected-accent-hsl");
    const savedName = localStorage.getItem("selected-accent-name");
    if (savedHsl && savedName) {
      document.documentElement.style.setProperty("--primary-sky", savedHsl);
      setCurrentTheme(savedName);
    }
  }, []);

  const handleThemeChange = (preset: ThemePreset) => {
    document.documentElement.style.setProperty("--primary-sky", preset.hsl);
    localStorage.setItem("selected-accent-hsl", preset.hsl);
    localStorage.setItem("selected-accent-name", preset.name);
    setCurrentTheme(preset.name);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99999] font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-zinc-950/95 border-2 border-zinc-800 p-4 rounded-xl shadow-2xl flex flex-col gap-3.5 min-w-[200px] backdrop-blur-md"
          >
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-bold uppercase tracking-wider">
              <span>Accent Theme</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-zinc-200">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleThemeChange(preset)}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs transition-all text-left ${
                    currentTheme === preset.name
                      ? "bg-zinc-900 border border-zinc-700 text-zinc-200"
                      : "hover:bg-zinc-900/60 border border-transparent text-zinc-400"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/40 flex-shrink-0"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-zinc-800 hover:border-primary-sky hover:text-primary-sky text-zinc-300 flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 duration-200 bg-opacity-90 backdrop-blur-sm"
      >
        <Palette className="w-5 h-5 animate-pulse" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
