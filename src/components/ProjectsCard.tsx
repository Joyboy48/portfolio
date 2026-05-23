"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight } from "lucide-react";
import { ProjectDemoModal } from "./ProjectDemoModal";

interface ProjectCardProps {
  value: {
    title: string;
    description: string;
    tags: string[];
    link: string;
    demoLink?: string;
  };
  num: number;
}

const ProjectCards: React.FC<ProjectCardProps> = ({ value, num }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // 3D Tilt Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Max rotation is 12 degrees
    const intensity = 12;
    const rotX = -(y / (box.height / 2)) * intensity;
    const rotY = (x / (box.width / 2)) * intensity;
    
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    // Reset to flat state
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <FramerWrapper
        className="max-w-[32%] max-lg:max-w-full flex"
        y={0}
        scale={0.8}
        delay={num / 5}
        duration={0.2}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full flex transition-all duration-300"
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: rotate.x === 0 && rotate.y === 0 ? "transform 0.5s ease" : "none",
          }}
        >
          <Card className="w-full h-full flex flex-col justify-between hover:shadow-lg hover:shadow-primary-sky/5 hover:border-primary-sky transition-colors duration-300 border-2 bg-zinc-950/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-primary font-rubik leading-snug tracking-tight">
                {value.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col gap-4">
              <p className="text-xs font-poppins text-muted-foreground leading-relaxed">
                {value.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {value.tags.map((tag: string, index: number) => {
                  const tagStyles: Record<string, string> = {
                    Nextjs: "bg-zinc-900 border border-zinc-800 text-zinc-300",
                    Freelancing: "bg-yellow-950/20 border border-yellow-900/30 text-yellow-500",
                    "Shadcn Ui": "bg-sky-950/20 border border-sky-900/30 text-sky-400",
                    Typescript: "bg-rose-950/20 border border-rose-900/30 text-rose-400",
                    MySQL: "bg-orange-950/20 border border-orange-900/30 text-orange-400",
                    Zustand: "bg-purple-950/20 border border-purple-900/30 text-purple-400",
                    Supabase: "bg-emerald-950/20 border border-emerald-900/30 text-emerald-400",
                    Npx: "bg-indigo-950/20 border border-indigo-900/30 text-indigo-400",
                    Library: "bg-pink-950/20 border border-pink-900/30 text-pink-400",
                    Zod: "bg-cyan-950/20 border border-cyan-900/30 text-cyan-400",
                    "React Hook Form": "bg-violet-950/20 border border-violet-900/30 text-violet-400",
                  };

                  const currentStyle =
                    tagStyles[tag] || "bg-zinc-900/50 border border-zinc-800/80 text-zinc-400";

                  return (
                    <span
                      key={index}
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold capitalize",
                        currentStyle
                      )}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </CardContent>

            <CardFooter className="pt-3 border-t border-zinc-900/40 flex gap-2 flex-wrap">
              <Link
                href={value.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "h-8 text-xs font-mono border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all hover:-translate-y-[1px]"
                )}
              >
                Source Code
              </Link>
              {value.demoLink && (
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }),
                    "h-8 text-xs font-mono transition-all hover:-translate-y-[1px] flex items-center gap-1 group bg-primary hover:bg-primary-sky text-primary-foreground font-semibold"
                  )}
                >
                  {value.demoLink.includes("youtube.com") || value.demoLink.includes("youtu.be")
                    ? "Watch Demo"
                    : "Live Demo"}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </CardFooter>
          </Card>
        </div>
      </FramerWrapper>

      {value.demoLink && (
        <ProjectDemoModal
          isOpen={isDemoOpen}
          onClose={() => setIsDemoOpen(false)}
          projectTitle={value.title}
          demoUrl={value.demoLink}
        />
      )}
    </>
  );
};

export default ProjectCards;
