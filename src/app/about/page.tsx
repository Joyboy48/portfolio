"use client";
import React, { useState, useEffect } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  User2,
  Heart,
  Code2,
  Globe,
  MapPin,
  Calendar,
  Languages,
  Briefcase,
  Gamepad2,
  Music,
  Dumbbell,
  MonitorPlay,
  Sparkles,
  Coffee,
} from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const hobbyIcons: Record<string, React.ReactNode> = {
  Coding: <Code2 className="h-4 w-4" />,
  "Playing Games": <Gamepad2 className="h-4 w-4" />,
  "Watching Anime": <MonitorPlay className="h-4 w-4" />,
  "Playing Guitar": <Music className="h-4 w-4" />,
  "Creating Cool Projects": <Sparkles className="h-4 w-4" />,
  Gym: <Dumbbell className="h-4 w-4" />,
};

const stats = [
  { label: "Years Coding", value: "4+", icon: Code2 },
  { label: "Projects Built", value: `${portfolioConfig.projects?.length || 8}+`, icon: Briefcase },
  { label: "Coffee Cups", value: "∞", icon: Coffee },
  { label: "Open Source PRs", value: `${(portfolioConfig.contributions?.merged?.length || 0) + (portfolioConfig.contributions?.active?.length || 0)}+`, icon: Globe },
];

const AboutPage = () => {
  const [activeHobby, setActiveHobby] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHobby((prev) => (prev + 1) % portfolioConfig.about.hobbies.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <User2 className="h-4 w-4" /> About Me
      </Badge>

      <div className="flex flex-col gap-2">
        <Heading>
          {portfolioConfig.title}
        </Heading>
        <p className="text-zinc-500 text-sm font-mono flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {portfolioConfig.location}
        </p>
      </div>

      {/* Stats Grid */}
      <FramerWrapper y={30} delay={0.1} className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="bg-zinc-900/20 border-zinc-800/60 hover:border-zinc-700 transition-all group cursor-default"
            >
              <CardContent className="p-4 flex flex-col items-center gap-1.5 text-center">
                <stat.icon className="h-5 w-5 text-zinc-600 group-hover:text-primary-sky transition-colors" />
                <span className="text-2xl font-rubik font-bold text-primary">{stat.value}</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{stat.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </FramerWrapper>

      {/* Bio Section */}
      <FramerWrapper y={30} delay={0.2} className="w-full">
        <div className="relative w-full bg-zinc-900/10 border border-zinc-800/40 rounded-xl p-5 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-sky/40 to-transparent" />
          <p className="font-poppins text-base text-zinc-400 leading-relaxed text-balance">
            {portfolioConfig.about.bio}
          </p>
        </div>
      </FramerWrapper>

      {/* Two Column: Info + Hobbies */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Info Card */}
        <FramerWrapper y={30} delay={0.3} className="w-full">
          <Card className="bg-zinc-900/10 border-zinc-800/60 h-full">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary-sky" />
                Personal Info
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Location", value: portfolioConfig.location },
                  { icon: Languages, label: "Language", value: portfolioConfig.about.personalInfo.language },
                  { icon: Globe, label: "Nationality", value: portfolioConfig.about.personalInfo.nationality },
                  { icon: Calendar, label: "Status", value: "Open to Work" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-zinc-700 transition-colors">
                      <item.icon className="h-3.5 w-3.5 text-zinc-500 group-hover:text-primary-sky transition-colors" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm font-poppins text-zinc-300">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FramerWrapper>

        {/* Hobbies Card */}
        <FramerWrapper y={30} delay={0.4} className="w-full">
          <Card className="bg-zinc-900/10 border-zinc-800/60 h-full">
            <CardContent className="p-5 space-y-4">
              <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                Hobbies & Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {portfolioConfig.about.hobbies.map((hobby, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveHobby(i)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-300 cursor-default select-none ${
                      activeHobby === i
                        ? "border-primary-sky/40 bg-primary-sky/5 text-zinc-200 shadow-md shadow-primary-sky/5 scale-105"
                        : "border-zinc-800/60 bg-zinc-900/20 text-zinc-400 hover:border-zinc-700"
                    }`}
                  >
                    <span className={`transition-colors duration-300 ${activeHobby === i ? "text-primary-sky" : "text-zinc-600"}`}>
                      {hobbyIcons[hobby] || <Sparkles className="h-4 w-4" />}
                    </span>
                    <span className="text-sm font-mono">{hobby}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FramerWrapper>
      </div>
    </div>
  );
};

export default AboutPage;
