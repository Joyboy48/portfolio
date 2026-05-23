"use client";
import React from "react";
import logo from "../../public/portfolioLogo.png";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <div className="absolute w-[85%] aspect-square rounded-full bg-gradient-to-br from-sky-500/10 via-purple-500/5 to-transparent blur-3xl animate-pulse" />

      {/* Decorative orbit ring */}
      <div className="absolute w-[75%] aspect-square rounded-full border border-zinc-800/40" />
      <div className="absolute w-[60%] aspect-square rounded-full border border-zinc-800/20" />

      {/* Small orbiting dot */}
      <div className="absolute w-[75%] aspect-square rounded-full animate-spin" style={{ animationDuration: "12s" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-sky shadow-lg shadow-primary-sky/50" />
      </div>

      {/* Image container with glassmorphism border */}
      <div className="relative w-[65%] aspect-square rounded-full overflow-hidden border-2 border-zinc-800/60 shadow-2xl shadow-sky-500/5 group">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        <Image
          src={logo}
          alt="Astitva Arya"
          loading="eager"
          priority
          fill
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Floating tech badges */}
      <div className="absolute top-[10%] right-[5%] px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm text-[10px] font-mono text-emerald-400 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "3s" }}>
        Node.js
      </div>
      <div className="absolute bottom-[15%] left-[5%] px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm text-[10px] font-mono text-sky-400 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }}>
        TypeScript
      </div>
      <div className="absolute bottom-[8%] right-[15%] px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm text-[10px] font-mono text-purple-400 animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "4s" }}>
        Docker
      </div>
    </div>
  );
};

export default HeroImage;