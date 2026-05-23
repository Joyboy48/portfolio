"use client";
import React from "react";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  PackagePlus,
  ExternalLink,
  Coffee,
  Github,
  Newspaper,
  Terminal,
  Code2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import FramerWrapper from "@/components/animation/FramerWrapper";
import { portfolioConfig } from "@/config/portfolio.config";

// Extended quick links with icons and colors
const quickLinks = [
  {
    title: "GitHub Profile",
    description: "Check out my repositories, contributions, and open-source work.",
    href: portfolioConfig.socialLinks.github,
    icon: Github,
    color: "text-zinc-300",
    borderColor: "hover:border-zinc-600",
    bgGlow: "group-hover:shadow-zinc-500/5",
  },
  {
    title: "Read My Blogs",
    description: "Tech articles, tutorials, and engineering insights on Medium.",
    href: portfolioConfig.socialLinks.medium,
    icon: Newspaper,
    color: "text-emerald-400",
    borderColor: "hover:border-emerald-900/40",
    bgGlow: "group-hover:shadow-emerald-500/5",
  },
  {
    title: "LeetCode Profile",
    description: "Problem solving, contest ratings, and algorithmic challenges.",
    href: portfolioConfig.socialLinks.leetcode,
    icon: Code2,
    color: "text-amber-400",
    borderColor: "hover:border-amber-900/40",
    bgGlow: "group-hover:shadow-amber-500/5",
  },
  {
    title: "Interactive Terminal",
    description: "Try the built-in developer terminal with hidden easter eggs.",
    href: "/terminal",
    icon: Terminal,
    color: "text-sky-400",
    borderColor: "hover:border-sky-900/40",
    bgGlow: "group-hover:shadow-sky-500/5",
    internal: true,
  },
];

const MorePage = () => {
  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <PackagePlus className="h-4 w-4" />
        More
      </Badge>

      <div className="flex flex-col gap-2">
        <Heading>More Links & Resources</Heading>
        <p className="text-zinc-500 text-sm font-poppins">Quick access to all my profiles, tools, and external resources.</p>
      </div>

      {/* Support Card (Buy Me a Coffee) */}
      {portfolioConfig.moreLinks.map((item, i) => (
        <FramerWrapper key={i} y={30} delay={0.1} className="w-full">
          <Link href={item.link} target="_blank">
            <Card className="bg-gradient-to-br from-amber-950/20 via-zinc-900/10 to-zinc-950 border-amber-900/30 hover:border-amber-700/40 transition-all group cursor-pointer shadow-lg hover:shadow-amber-500/5">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-800/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Coffee className="h-7 w-7 text-amber-400" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-rubik font-bold text-primary flex items-center gap-2">
                    {item.title}
                    <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
                  </h3>
                  <p className="text-sm text-zinc-400 font-poppins mt-0.5">{item.description}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </CardContent>
            </Card>
          </Link>
        </FramerWrapper>
      ))}

      {/* Quick Links Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickLinks.map((item, i) => (
          <FramerWrapper key={i} y={30} delay={0.15 + i * 0.08} className="w-full">
            <Link
              href={item.href}
              target={item.internal ? undefined : "_blank"}
              className="block h-full"
            >
              <Card
                className={`bg-zinc-900/10 border-zinc-800/60 ${item.borderColor} transition-all group cursor-pointer h-full shadow-md ${item.bgGlow} hover:-translate-y-0.5`}
              >
                <CardContent className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <ExternalLink className="h-4 w-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-rubik font-bold text-primary group-hover:text-primary-sky transition-colors">{item.title}</h3>
                    <p className="text-xs text-zinc-500 font-poppins mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </FramerWrapper>
        ))}
      </div>

      {/* Fun footer */}
      <div className="w-full text-center pt-4 border-t border-zinc-900/40">
        <p className="text-zinc-700 text-[10px] font-mono tracking-wider">
          {"// built with Next.js, TypeScript, and an unhealthy amount of coffee ☕"}
        </p>
      </div>
    </div>
  );
};

export default MorePage;
