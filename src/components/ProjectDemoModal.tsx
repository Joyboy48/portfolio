"use client";
import React, { useEffect } from "react";
import { X, ExternalLink, Globe, Play, Info, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  demoUrl: string;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  demoUrl,
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // disable background scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Check if link is a YouTube video
  const isYoutube =
    demoUrl.includes("youtube.com") ||
    demoUrl.includes("youtu.be") ||
    demoUrl.includes("/embed/");

  // Convert normal YouTube links to embed links if necessary
  const getEmbedUrl = (url: string) => {
    if (isYoutube) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(demoUrl);

  return (
    <div className="fixed inset-0 z-[99999999] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop Close Click area */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/60 border-b border-zinc-800/80">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1">
              {isYoutube ? (
                <>
                  <Play className="h-3 w-3 text-red-500 fill-red-500" /> Walkthrough Demo
                </>
              ) : (
                <>
                  <Globe className="h-3 w-3 text-sky-400" /> Web Live Preview
                </>
              )}
            </span>
            <h3 className="text-base font-bold font-rubik text-primary">{projectTitle}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="h-8 text-xs font-mono border-zinc-800 gap-1 hover:bg-zinc-900">
                Open External
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
            <Button
              onClick={onClose}
              size="icon"
              variant="outline"
              className="h-8 w-8 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mock Frame Viewport container */}
        <div className="flex-grow p-6 bg-zinc-950 overflow-y-auto no-scrollbar flex flex-col gap-4">
          {/* Responsive Browser / MacBook Mock Device Frame */}
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
            {/* Header controls bar */}
            <div className="bg-zinc-950/80 border-b border-zinc-800/80 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-zinc-900/60 text-[9px] font-mono text-zinc-400 px-6 py-0.5 rounded border border-zinc-800/60 max-w-sm truncate text-center select-all">
                {demoUrl}
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* Iframe Viewport */}
            <div className="flex-grow bg-zinc-950 relative">
              <iframe
                src={embedUrl}
                className="w-full h-full border-none bg-zinc-950"
                title={`${projectTitle} Demo Viewport`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* IFrame IFrame Embed Warning details */}
          {!isYoutube && (
            <div className="p-3.5 bg-zinc-900/40 border border-zinc-800/60 rounded-xl flex items-start gap-2.5 text-xs font-poppins text-zinc-400">
              <Info className="h-4 w-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Preview Notice:</strong> If the application displays a connection error or blank screen inside the viewport, it is likely due to security headers (e.g. <code>X-Frame-Options</code>) set by the deployment provider. Click the{" "}
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-sky underline font-semibold"
                >
                  Open External
                </a>{" "}
                button in the top right to explore it in a new tab.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
