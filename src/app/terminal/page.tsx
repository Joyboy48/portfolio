"use client";
import React, { useState, useEffect, useRef } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Terminal, ArrowRight, CornerDownLeft } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import Link from "next/link";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  command?: string;
  content: React.ReactNode;
}

const TerminalPage = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "welcome-1",
      type: "output",
      content: (
        <div className="text-zinc-400 space-y-1 font-mono">
          <p className="text-emerald-400 font-bold">Astitva Arya Portfolio Shell [Version 1.0.0]</p>
          <p className="text-zinc-500">(c) 2026 Astitva Arya. All rights reserved.</p>
          <p className="mt-2">Type <span className="text-sky-400 font-semibold">help</span> to list all available commands.</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const newLineId = Math.random().toString(36).substring(7);
    const userCommandLine: TerminalLine = {
      id: newLineId + "-user",
      type: "input",
      command: cmdStr,
      content: (
        <div className="flex items-center gap-2 font-mono text-zinc-300">
          <span className="text-emerald-400">guest@astitva:~$</span>
          <span>{cmdStr}</span>
        </div>
      ),
    };

    if (trimmed === "") {
      setHistory((prev) => [...prev, userCommandLine]);
      return;
    }

    // Save to command history for arrow navigation
    setCommandHistory((prev) => [cmdStr, ...prev.filter((c) => c !== cmdStr)]);
    setHistoryIndex(-1);

    let outputContent: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        outputContent = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-sm">
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">about</span>
              <span className="text-zinc-400">- Learn about me & bio</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">skills</span>
              <span className="text-zinc-400">- Technical skills categorized</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">projects</span>
              <span className="text-zinc-400">- Show personal projects</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">contributions</span>
              <span className="text-zinc-400">- Open source contributions</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">contact</span>
              <span className="text-zinc-400">- Get contact details</span>
            </div>
            <div className="flex gap-2">
              <span className="text-sky-400 w-24 flex-shrink-0">clear</span>
              <span className="text-zinc-400">- Clear the screen</span>
            </div>
          </div>
        );
        break;

      case "about":
        outputContent = (
          <div className="space-y-2 font-mono text-sm leading-relaxed text-zinc-300">
            <p className="text-sky-400 font-bold text-base">{portfolioConfig.title}</p>
            <p className="text-zinc-400">{portfolioConfig.about.bio}</p>
            <div className="mt-2 text-zinc-500">
              Location: {portfolioConfig.location}
            </div>
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="space-y-3 font-mono text-sm text-zinc-300">
            <div>
              <span className="text-emerald-400 font-semibold">[Languages]: </span>
              <span>{portfolioConfig.skills.programmingLanguages.map((l) => l.name).join(", ")}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">[Frameworks]: </span>
              <span>{portfolioConfig.skills.frameworks.map((f) => f.name).join(", ")}</span>
            </div>
            <div>
              <span className="text-emerald-400 font-semibold">[Tools & DevOps]: </span>
              <span>{portfolioConfig.skills.tools.map((t) => t.name).join(", ")}</span>
            </div>
          </div>
        );
        break;

      case "projects":
        outputContent = (
          <div className="space-y-4 font-mono text-sm text-zinc-300">
            {portfolioConfig.projects.map((proj, idx) => (
              <div key={idx} className="border-l-2 border-zinc-700 pl-3">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <span className="text-sky-400 font-bold">{proj.title}</span>
                  <Link
                    href={proj.link}
                    target="_blank"
                    className="text-xs text-zinc-500 hover:text-sky-400 underline"
                  >
                    Source Code
                  </Link>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {proj.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.2 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "contributions":
        outputContent = (
          <div className="space-y-4 font-mono text-sm text-zinc-300">
            <div className="border-l-2 border-zinc-700 pl-3">
              <span className="text-emerald-400 font-bold">Meshery CNCF Contributor</span>
              <p className="text-xs text-zinc-400 mt-1">{portfolioConfig.contributions.summary}</p>
            </div>
            <div className="border-l-2 border-zinc-700 pl-3">
              <span className="text-emerald-400 font-bold">GirlScript Summer of Code</span>
              <p className="text-xs text-zinc-400 mt-1">{portfolioConfig.contributions.gssoc.description}</p>
            </div>
            <div>
              <span className="text-sky-400 font-semibold">[Recent PRs]:</span>
              <div className="space-y-2 mt-2">
                {[...portfolioConfig.contributions.merged, ...portfolioConfig.contributions.active].map((pr, idx) => (
                  <div key={idx} className="text-xs pl-3 flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-zinc-300">- {pr.title}</span>
                    <Link
                      href={pr.link}
                      target="_blank"
                      className="text-zinc-500 hover:text-sky-400 underline"
                    >
                      PR Link
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "contact":
        outputContent = (
          <div className="space-y-2 font-mono text-sm text-zinc-300">
            <div>
              <span className="text-sky-400 w-24 inline-block">Email:</span>
              <span className="text-zinc-400">{portfolioConfig.email}</span>
            </div>
            <div>
              <span className="text-sky-400 w-24 inline-block">Phone:</span>
              <span className="text-zinc-400">{portfolioConfig.phone}</span>
            </div>
            <div className="pt-2">
              <span className="text-emerald-400 font-semibold block mb-1">[Social Links]:</span>
              <div className="grid grid-cols-2 gap-1 pl-3 text-xs">
                {Object.entries(portfolioConfig.socialLinks).map(([name, url]) => (
                  <div key={name}>
                    <span className="text-zinc-500 capitalize w-16 inline-block">{name}:</span>
                    <Link href={url} target="_blank" className="text-zinc-400 hover:text-sky-400 underline">
                      {name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      default:
        outputContent = (
          <div className="font-mono text-rose-500 text-sm">
            shell: command not found: {cmdStr}. Type <span className="underline font-bold text-zinc-300">help</span> for assistance.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      userCommandLine,
      {
        id: newLineId + "-out",
        type: "output",
        content: <div className="pl-4 py-1">{outputContent}</div>,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Terminal className="h-4 w-4" />
        Interactive Shell
      </Badge>

      <div className="flex flex-col gap-3 w-full">
        <Heading>Developer Terminal</Heading>
      </div>

      <FramerWrapper y={0} x={100} className="w-full flex-grow flex items-center justify-center p-1">
        <div
          onClick={handleTerminalClick}
          className="w-full max-w-4xl h-[55vh] max-sm:h-[65vh] bg-[#0c0c0d]/95 rounded-xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden cursor-text"
        >
          {/* Header Controls */}
          <div className="w-full bg-[#16161a] border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
              bash - astitva@portfolio
            </div>
            <div className="w-12" /> {/* spacer */}
          </div>

          {/* Terminal Screen */}
          <div className="flex-grow p-4 overflow-y-auto font-mono text-sm leading-relaxed space-y-3 no-scrollbar">
            {history.map((line) => (
              <div key={line.id}>
                {line.content}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Console */}
          <div className="bg-[#111115] border-t border-zinc-800/60 p-3 flex items-center gap-2 font-mono">
            <span className="text-emerald-400 font-semibold pl-1">guest@astitva:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent outline-none border-none text-zinc-200 font-mono caret-emerald-400"
              placeholder=""
              autoComplete="off"
              autoCapitalize="off"
            />
            <div className="text-zinc-500 text-xs flex items-center gap-1 max-sm:hidden mr-1">
              <span>Send</span>
              <CornerDownLeft className="h-3 w-3" />
            </div>
          </div>
        </div>
      </FramerWrapper>
    </div>
  );
};

export default TerminalPage;
