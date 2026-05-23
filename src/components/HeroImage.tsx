"use client";
import React, { useRef } from "react";
import logo from "../../public/portfolioLogo.png";
import Image from "next/image";

const HeroImage = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient background blobs */}
      <div className="absolute w-64 h-64 bg-sky-500/6 rounded-full blur-[100px] -top-10 -right-10" />
      <div className="absolute w-48 h-48 bg-purple-500/5 rounded-full blur-[80px] -bottom-10 -left-10" />

      {/* 3D tilt card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[80%] transition-transform duration-200 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-sky-500/40 via-purple-500/20 to-emerald-500/30 animate-pulse opacity-50" style={{ animationDuration: "4s" }} />

        {/* Card body */}
        <div className="relative bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/5">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={logo}
              alt="Astitva Arya"
              loading="eager"
              priority
              fill
              className="object-cover"
            />

            {/* Gradient overlay from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            {/* Name + Status at bottom */}
            <div className="absolute bottom-0 inset-x-0 p-5 z-10" style={{ transform: "translateZ(30px)" }}>
              <h3 className="text-xl font-rubik font-bold text-white leading-tight">Astitva Arya</h3>
              <p className="text-zinc-400 text-xs font-mono mt-1">Full-Stack & Backend Developer</p>

              {/* Status + Tech */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-mono">Available for hire</span>
                </div>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Node.js", "Python", "Docker", "Kafka", "K8s"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono text-zinc-500 px-2 py-0.5 rounded-md bg-zinc-900/80 border border-zinc-800/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;