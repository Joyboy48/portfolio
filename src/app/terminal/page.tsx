"use client";
import React, { useState, useEffect, useRef } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Terminal, CornerDownLeft } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import Link from "next/link";

interface TerminalLine {
  id: string;
  type: "input" | "output";
  command?: string;
  content: React.ReactNode;
}

// Matrix rain effect component
const MatrixRain = () => {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01アBCDEF";
  return (
    <div className="font-mono text-xs text-emerald-400 leading-none select-none">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="overflow-hidden whitespace-nowrap animate-pulse">
          {Array.from({ length: 60 }).map((_, j) => (
            <span key={j} style={{ opacity: Math.random() > 0.5 ? 1 : 0.3 }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const TerminalPage = () => {
  const [input, setInput] = useState("");
  const [hireMode, setHireMode] = useState(false);
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "welcome-1",
      type: "output",
      content: (
        <div className="text-zinc-400 space-y-1 font-mono">
          <p className="text-emerald-400 font-bold">Astitva Arya Portfolio Shell [Version 1.0.0]</p>
          <p className="text-zinc-500">(c) 2026 Astitva Arya. All rights reserved.</p>
          <p className="mt-2">Type <span className="text-sky-400 font-semibold">help</span> to list all available commands.</p>
          <p className="text-zinc-600 text-xs mt-1 italic">Psst... there are hidden commands. Try to find them. 👀</p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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

    setCommandHistory((prev) => [cmdStr, ...prev.filter((c) => c !== cmdStr)]);
    setHistoryIndex(-1);

    let outputContent: React.ReactNode = null;

    switch (trimmed) {
      // ── STANDARD COMMANDS ──────────────────────────────────────────────
      case "help":
        outputContent = (
          <div className="font-mono text-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {[
                ["about", "Learn about me & bio"],
                ["skills", "Technical skills categorized"],
                ["projects", "Show personal projects"],
                ["contributions", "Open source contributions"],
                ["contact", "Get contact details"],
                ["clear", "Clear the screen"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-2">
                  <span className="text-sky-400 w-28 flex-shrink-0">{cmd}</span>
                  <span className="text-zinc-400">- {desc}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-xs italic">💡 Tip: Some commands are hidden. Explore to discover them...</p>
          </div>
        );
        break;

      case "about":
        outputContent = (
          <div className="space-y-2 font-mono text-sm leading-relaxed text-zinc-300">
            <p className="text-sky-400 font-bold text-base">{portfolioConfig.title}</p>
            <p className="text-zinc-400">{portfolioConfig.about.bio}</p>
            <div className="mt-2 text-zinc-500">Location: {portfolioConfig.location}</div>
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="space-y-3 font-mono text-sm text-zinc-300">
            <div><span className="text-emerald-400 font-semibold">[Languages]: </span><span>{portfolioConfig.skills.programmingLanguages.map((l) => l.name).join(", ")}</span></div>
            <div><span className="text-emerald-400 font-semibold">[Frameworks]: </span><span>{portfolioConfig.skills.frameworks.map((f) => f.name).join(", ")}</span></div>
            <div><span className="text-emerald-400 font-semibold">[Tools & DevOps]: </span><span>{portfolioConfig.skills.tools.map((t) => t.name).join(", ")}</span></div>
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
                  <Link href={proj.link} target="_blank" className="text-xs text-zinc-500 hover:text-sky-400 underline">Source Code</Link>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {proj.tags.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 rounded">{t}</span>
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
            <div>
              <span className="text-sky-400 font-semibold">[Recent PRs]:</span>
              <div className="space-y-2 mt-2">
                {[...portfolioConfig.contributions.merged, ...portfolioConfig.contributions.active].map((pr, idx) => (
                  <div key={idx} className="text-xs pl-3 flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-zinc-300">- {pr.title}</span>
                    <Link href={pr.link} target="_blank" className="text-zinc-500 hover:text-sky-400 underline">PR Link</Link>
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
            <div><span className="text-sky-400 w-24 inline-block">Email:</span><span className="text-zinc-400">{portfolioConfig.email}</span></div>
            <div><span className="text-sky-400 w-24 inline-block">Phone:</span><span className="text-zinc-400">{portfolioConfig.phone}</span></div>
            <div className="pt-2">
              <span className="text-emerald-400 font-semibold block mb-1">[Social Links]:</span>
              <div className="grid grid-cols-2 gap-1 pl-3 text-xs">
                {Object.entries(portfolioConfig.socialLinks).map(([name, url]) => (
                  <div key={name}>
                    <span className="text-zinc-500 capitalize w-16 inline-block">{name}:</span>
                    <Link href={url} target="_blank" className="text-zinc-400 hover:text-sky-400 underline">{name}</Link>
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

      // ── 🥚 EASTER EGG COMMANDS ──────────────────────────────────────────
      case "sudo hire astitva":
      case "hire astitva":
        setHireMode(true);
        setTimeout(() => setHireMode(false), 5000);
        outputContent = (
          <div className="font-mono text-sm space-y-1 text-emerald-400">
            <p className="animate-pulse">🔐 Verifying credentials...</p>
            <p>✅ Background check: <span className="text-white">PASSED</span></p>
            <p>✅ Skill assessment: <span className="text-white">EXCEPTIONAL</span></p>
            <p>✅ Vibe check: <span className="text-white">IMMACULATE</span></p>
            <p className="text-2xl mt-2 animate-bounce">🎉 ACCESS GRANTED</p>
            <p className="text-yellow-400 font-bold">OFFER LETTER IS BEING PREPARED...</p>
            <p className="text-zinc-400 text-xs mt-1">Redirecting to <span className="text-sky-400 underline"><Link href={portfolioConfig.socialLinks.linkedin} target="_blank">LinkedIn</Link></span> for formal contact.</p>
          </div>
        );
        break;

      case "rm -rf /":
      case "rm -rf /*":
        outputContent = (
          <div className="font-mono text-sm space-y-1">
            <p className="text-red-500 font-bold animate-pulse">⚠️  CRITICAL: DELETION IN PROGRESS</p>
            {["Deleting /system32...", "Deleting /home/astitva/projects...", "Deleting /usr/bin...", "Deleting /etc/sanity..."].map((line, i) => (
              <p key={i} className="text-rose-400 text-xs">{line} <span className="text-emerald-400">done</span></p>
            ))}
            <p className="text-zinc-500 text-xs mt-1 italic">...just kidding. I have backups. And you have no permissions. 😎</p>
            <p className="text-emerald-400">System integrity: <span className="text-white font-bold">100% intact</span></p>
          </div>
        );
        break;

      case "hack":
      case "hack the planet":
        outputContent = (
          <div className="font-mono text-sm space-y-2">
            <p className="text-emerald-400 animate-pulse">💻 Initiating breach protocol...</p>
            <MatrixRain />
            <p className="text-emerald-400 mt-2">Scanning target: <span className="text-white">portfolio.astitva.dev</span></p>
            <p className="text-emerald-400">Vulnerabilities found: <span className="text-white font-bold">0</span></p>
            <p className="text-yellow-400">Plot twist: this IS the hacker&apos;s portfolio. 😂</p>
          </div>
        );
        break;

      case "matrix":
        outputContent = (
          <div className="font-mono text-sm space-y-2">
            <p className="text-emerald-400 text-xs mb-1">{"// Entering the Matrix..."}</p>
            <MatrixRain />
            <p className="text-red-400 mt-2">Wake up, Neo... <span className="text-zinc-500">the portfolio has you.</span></p>
          </div>
        );
        break;

      case "coffee":
      case "make me coffee":
        outputContent = (
          <div className="font-mono text-sm text-amber-400 space-y-0.5">
            <p>     ( (</p>
            <p>      ) )</p>
            <p>   ........</p>
            <p>   |      |]</p>
            <p>   \      /</p>
            <p>    `----&apos;</p>
            <p className="text-zinc-400 mt-2 text-xs">☕ One fresh coffee compiled successfully.</p>
            <p className="text-zinc-500 text-xs">Pro tip: Coffee.exe is 80% of why code works.</p>
          </div>
        );
        break;

      case "git blame":
        outputContent = (
          <div className="font-mono text-xs text-zinc-300 space-y-1">
            <p className="text-yellow-400 mb-1">$ git blame src/everything.ts</p>
            <p><span className="text-zinc-500">a3f2c1d (</span><span className="text-sky-400">Stack Overflow</span><span className="text-zinc-500">{")"}  line 1: {"// this totally works idk why"}</span></p>
            <p><span className="text-zinc-500">b7e9d2a (</span><span className="text-red-400">3 AM Astitva</span><span className="text-zinc-500">{")"}  line 2: {"// don't touch this"}</span></p>
            <p><span className="text-zinc-500">c1f8a3e (</span><span className="text-emerald-400">ChatGPT</span><span className="text-zinc-500">      {")"}  line 3: {"// trust me bro"}</span></p>
            <p><span className="text-zinc-500">d2e7b4f (</span><span className="text-purple-400">The PM</span><span className="text-zinc-500">        {")"}  line 4: {"// \"just a small change\""}</span></p>
            <p><span className="text-zinc-500">e8c3a5b (</span><span className="text-amber-400">Coffee</span><span className="text-zinc-500">        {")"}  line 5: return true; {"// works on my machine"}</span></p>
          </div>
        );
        break;

      case "whoami":
        outputContent = (
          <div className="font-mono text-sm space-y-2">
            <div className="text-emerald-400 text-xs leading-none">
              <p> ___  ___  _________  ___  _________  ___      ___  ________     </p>
              <p>|\  \|\  \|\   ___  \|\  \|\___   ___\\  \    /  /|\   __  \    </p>
              <p>\ \  \\\  \ \  \\ \  \ \  \|___ \  \_\ \  \  /  / | \  \|\  \   </p>
              <p> \ \   __  \ \  \\ \  \ \  \   \ \  \ \ \  \/  / / \ \   __  \  </p>
              <p>  \ \  \ \  \ \  \\ \  \ \  \   \ \  \ \ \    / /   \ \  \ \  \ </p>
              <p>   \ \__\ \__\ \__\\ \__\ \__\   \ \__\ \ \__/ /     \ \__\ \__\</p>
              <p>    \|__|\|__|\|__| \|__|\|__|    \|__|  \|__|/       \|__|\|__|</p>
            </div>
            <div className="text-zinc-300 space-y-1 text-xs pt-1 border-t border-zinc-800">
              <p>User: <span className="text-sky-400">Astitva Arya</span></p>
              <p>Role: <span className="text-emerald-400">Full-Stack & Backend Developer</span></p>
              <p>OS: <span className="text-yellow-400">Ubuntu 22.04 LTS (also Windows reluctantly)</span></p>
              <p>Shell: <span className="text-purple-400">zsh + oh-my-zsh</span></p>
              <p>Status: <span className="text-green-400 animate-pulse">● Open to opportunities</span></p>
            </div>
          </div>
        );
        break;

      case "sudo make me a sandwich":
        outputContent = (
          <div className="font-mono text-sm space-y-1">
            <p className="text-zinc-400">Okay.</p>
            <p className="text-zinc-500 text-xs italic">— xkcd #149</p>
          </div>
        );
        break;

      case "ls":
      case "ls -la":
        outputContent = (
          <div className="font-mono text-xs text-zinc-300 space-y-0.5">
            <p className="text-zinc-500">total 42</p>
            {[
              ["drwxr-xr-x", "projects/", "text-sky-400"],
              ["drwxr-xr-x", "skills/", "text-emerald-400"],
              ["drwxr-xr-x", "contributions/", "text-purple-400"],
              ["-rw-r--r--", "resume.pdf", "text-yellow-400"],
              ["-rw-r--r--", "coffee.sh", "text-amber-400"],
              ["-rwxr-xr-x", "hire_me.exe", "text-green-400"],
              ["-rw-------", "secrets.txt", "text-red-400"],
            ].map(([perm, name, color]) => (
              <p key={name}><span className="text-zinc-600">{perm} astitva staff &nbsp;</span><span className={color}>{name}</span></p>
            ))}
          </div>
        );
        break;

      case "cat secrets.txt":
        outputContent = (
          <div className="font-mono text-sm space-y-1 text-zinc-400">
            <p className="text-red-400">Permission denied. 🔐</p>
            <p className="text-zinc-600 text-xs">Nice try though. Some files require level 99 clearance.</p>
          </div>
        );
        break;

      case "exit":
      case "quit":
        outputContent = (
          <div className="font-mono text-sm text-zinc-400">
            <p>logout</p>
            <p className="text-zinc-600 text-xs mt-1">There is no escape from the portfolio. 😄</p>
          </div>
        );
        break;

      case "pwd":
        outputContent = <p className="font-mono text-sm text-zinc-300">/home/astitva/portfolio</p>;
        break;

      case "date":
        outputContent = <p className="font-mono text-sm text-zinc-300">{new Date().toDateString()} — still building cool stuff</p>;
        break;

      case "uname -a":
        outputContent = <p className="font-mono text-xs text-zinc-300">PortfolioOS 1.0.0 #1 SMP PREEMPT Next.js 15.5.14 aarch64 GNU/Linux</p>;
        break;

      case "uptime":
        outputContent = <p className="font-mono text-sm text-zinc-300">up 2+ years, load average: learning, building, shipping</p>;
        break;

      default:
        outputContent = (
          <div className="font-mono text-rose-500 text-sm">
            shell: command not found: <span className="text-zinc-400">{cmdStr}</span>. Type <span className="underline font-bold text-zinc-300">help</span> for assistance.
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
      {/* "Hire Mode" full-screen overlay */}
      {hireMode && (
        <div className="fixed inset-0 z-[999999] bg-emerald-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-in fade-in duration-300">
          <div className="text-center space-y-4">
            <p className="text-8xl animate-bounce">🎉</p>
            <h1 className="text-5xl font-bold text-emerald-400 font-rubik">ACCESS GRANTED</h1>
            <p className="text-2xl text-white font-mono">OFFER LETTER INCOMING</p>
            <div className="space-y-2 mt-4 font-mono text-emerald-300">
              <p>✅ Skill Set: <span className="text-white font-bold">EXCEPTIONAL</span></p>
              <p>✅ Open Source: <span className="text-white font-bold">CNCF CONTRIBUTOR</span></p>
              <p>✅ Backend Chops: <span className="text-white font-bold">KAFKA + REDIS + K8s</span></p>
              <p>✅ Vibe Check: <span className="text-white font-bold">IMMACULATE</span></p>
            </div>
            <p className="text-zinc-400 text-sm mt-6 font-mono animate-pulse">Closing in 5 seconds...</p>
          </div>
        </div>
      )}

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
            <div className="w-12" />
          </div>

          {/* Terminal Screen */}
          <div className="flex-grow p-4 overflow-y-auto font-mono text-sm leading-relaxed space-y-3 no-scrollbar">
            {history.map((line) => (
              <div key={line.id}>{line.content}</div>
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
