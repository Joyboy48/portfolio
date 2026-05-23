"use client";
import React, { useState, useEffect } from "react";
import TextRotator from "./TextRotator";
import { portfolioConfig } from "@/config/portfolio.config";
import { MapPin, Sparkles, Terminal, ChevronRight } from "lucide-react";
import Link from "next/link";

const HeroTexts = () => {
  const nameParts = portfolioConfig.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col items-start justify-center text-left gap-2">
      {/* Status Badge */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-emerald-400 text-xs font-mono tracking-wider">Open to Opportunities</span>
      </div>

      {/* Greeting */}
      <p
        className={`font-mono text-sm text-zinc-500 tracking-wider transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        {"// hello world, I'm"}
      </p>

      {/* Name */}
      <h1
        className={`font-rubik text-7xl md:text-8xl font-bold leading-[0.95] text-primary transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <span className="relative">
          {firstName}
          <Sparkles className="absolute -top-2 -right-6 h-5 w-5 text-yellow-500 fill-yellow-500 animate-pulse" />
        </span>
        <br />
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          {lastName}
        </span>
        <span className="text-primary-sky">.</span>
      </h1>

      {/* Role Rotator */}
      <div
        className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <TextRotator />
      </div>

      {/* Location */}
      <div
        className={`flex items-center gap-1.5 text-zinc-500 text-sm font-mono mt-1 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <MapPin className="h-3.5 w-3.5" />
        <span>{portfolioConfig.location}</span>
      </div>

      {/* Quick Nav Pills */}
      <div
        className={`flex flex-wrap gap-2 mt-4 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        {[
          { label: "Terminal", href: "/terminal", icon: Terminal },
          { label: "Projects", href: "/projects", icon: ChevronRight },
          { label: "Blogs", href: "/blogs", icon: ChevronRight },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all"
          >
            <item.icon className="h-3 w-3 group-hover:text-primary-sky transition-colors" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroTexts;
