"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Github, FolderGit2, RotateCcw } from "lucide-react";

// Glitch text effect component
const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block font-mono font-bold">
    <span className="absolute top-0 left-0.5 text-red-500 opacity-70" aria-hidden>{text}</span>
    <span className="absolute top-0 -left-0.5 text-sky-500 opacity-70" aria-hidden>{text}</span>
    <span className="relative">{text}</span>
  </span>
);

const FAKE_TRACE = [
  "  at Portfolio.findPage (/home/astitva/portfolio/src/router.ts:42:11)",
  "  at Router.navigate (/home/astitva/portfolio/src/app/layout.tsx:99:5)",
  "  at Window.handleRequest (node:internal/http:341:12)",
  "  at process.processTicksAndRejections (node:internal/process/task_queues:82:21)",
];

const TYPING_LINES = [
  { text: "Booting portfolio kernel...", delay: 0, color: "text-zinc-400" },
  { text: "Loading modules... [OK]", delay: 600, color: "text-emerald-400" },
  { text: "Mounting filesystem... [OK]", delay: 1000, color: "text-emerald-400" },
  { text: "Resolving route... [FAILED]", delay: 1500, color: "text-red-400" },
  { text: "Kernel panic — page not in memory", delay: 2000, color: "text-red-500" },
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [findRunning, setFindRunning] = useState(false);
  const [findDone, setFindDone] = useState(false);

  useEffect(() => {
    TYPING_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay + 300);
    });
  }, []);

  const runFindCommand = () => {
    setFindRunning(true);
    setFindDone(false);
    setTimeout(() => {
      setFindRunning(false);
      setFindDone(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
        }}
      />

      {/* CRT vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)" }}
      />

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-6">
        {/* Error Code Header */}
        <div className="text-center space-y-2">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em]">PortfolioOS 1.0.0 — kernel panic</p>
          <h1 className="text-[clamp(5rem,20vw,10rem)] font-black leading-none tracking-tighter">
            <GlitchText text="404" />
          </h1>
          <p className="text-red-400 text-lg font-bold uppercase tracking-wider animate-pulse">PAGE_NOT_FOUND</p>
        </div>

        {/* Boot log terminal */}
        <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-xl overflow-hidden">
          {/* Terminal header */}
          <div className="bg-zinc-900/80 border-b border-zinc-800/60 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">system log — boot sequence</span>
            <div className="w-14" />
          </div>

          <div className="p-5 space-y-1.5 text-sm min-h-[160px]">
            {TYPING_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className={`${line.color} ${i === visibleLines - 1 ? "after:content-['_▌'] after:animate-pulse" : ""}`}>
                {line.text}
              </p>
            ))}
          </div>
        </div>

        {/* Error stack trace */}
        <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-4 space-y-2">
          <p className="text-red-400 text-sm font-bold">Error: Cannot find module &apos;./the-page-you-wanted&apos;</p>
          <div className="text-zinc-600 text-xs space-y-0.5">
            {FAKE_TRACE.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* Find command easter egg */}
        <div className="bg-zinc-950/50 border border-zinc-800/40 rounded-xl p-4 space-y-3">
          <p className="text-zinc-500 text-xs uppercase tracking-wider">{"// try searching for it"}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-emerald-400 flex-shrink-0">root@astitva:~#</span>
            <span className="text-zinc-300">sudo find / -name &quot;the-page-you-wanted&quot;</span>
          </div>
          {!findRunning && !findDone && (
            <button
              onClick={runFindCommand}
              className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors border border-sky-900/30 hover:border-sky-700/30 px-3 py-1.5 rounded-lg"
            >
              <RotateCcw className="h-3 w-3" /> Run command
            </button>
          )}
          {findRunning && (
            <div className="text-xs text-zinc-500 space-y-0.5 animate-pulse">
              <p>find: /proc: Permission denied</p>
              <p>find: /sys/kernel: Permission denied</p>
              <p>Searching /home/astitva/portfolio...</p>
            </div>
          )}
          {findDone && (
            <p className="text-red-400 text-xs">find: &apos;the-page-you-wanted&apos;: No such file or directory</p>
          )}
        </div>

        {/* Recovery options */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-sm transition-all hover:-translate-y-0.5"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/github"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-900/40 text-emerald-400 hover:text-emerald-300 rounded-xl text-sm transition-all hover:-translate-y-0.5"
          >
            <Github className="h-4 w-4" />
            GitHub Dashboard
          </Link>
          <Link
            href="/projects"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-sky-950/30 hover:bg-sky-950/60 border border-sky-900/30 text-sky-400 hover:text-sky-300 rounded-xl text-sm transition-all hover:-translate-y-0.5"
          >
            <FolderGit2 className="h-4 w-4" />
            View Projects
          </Link>
        </div>

        <p className="text-center text-zinc-700 text-[10px] tracking-wider">
          exit code 404 — memory address 0x00000000 — segmentation fault (core dumped)
        </p>
      </div>
    </div>
  );
}
