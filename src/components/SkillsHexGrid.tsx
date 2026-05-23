"use client";
import React, { useState, useEffect } from "react";
import FramerWrapper from "./animation/FramerWrapper";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Award, Briefcase, ChevronRight, Code2, Cpu, Database, Info, Network, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio.config";

interface SkillItem {
  name: string;
  icon: string;
  category: string;
}

// Complete rich descriptions for skills
const skillDetails: Record<string, { desc: string; level: string; xp: string }> = {
  // Programming Languages
  "Python": { desc: "Backend development, data processing, systems automation, and machine learning structures.", level: "Expert", xp: "3+ Years" },
  "C++": { desc: "High-performance systems engineering, memory-managed routines, and concurrency controllers.", level: "Advanced", xp: "2+ Years" },
  "JavaScript": { desc: "Full-stack client-side and server-side web scripting, dynamic UI logic, and event loops.", level: "Expert", xp: "4+ Years" },
  "TypeScript": { desc: "Typed superset of JavaScript, structured compile-safe models, clean code architecture.", level: "Expert", xp: "3+ Years" },
  "Java": { desc: "Object-oriented program design, backend controllers, and OpenTelemetry metrics instrumentation.", level: "Intermediate", xp: "1.5 Years" },
  "C": { desc: "Low-level structures, operating system commands, memory registers, and hardware wrappers.", level: "Advanced", xp: "2.5 Years" },
  "SQL": { desc: "Relational database querying, indexes, normalization, joins, and database design.", level: "Expert", xp: "3+ Years" },
  "Dart": { desc: "Typed client language for Flutter mobile development, UI components, and state streams.", level: "Advanced", xp: "2 Years" },
  "Bash/Shell": { desc: "Command-line scripting, CI/CD pipeline automation, shell utilities, and server admin.", level: "Advanced", xp: "3 Years" },

  // Frameworks
  "Node.js": { desc: "Asynchronous backend runtimes, high-concurrency request execution, microservice layers.", level: "Expert", xp: "3+ Years" },
  "Express.js": { desc: "RESTful HTTP server routing, JSON handling, CORS management, and middleware flows.", level: "Expert", xp: "3+ Years" },
  "Flask": { desc: "Micro Python web framework for server routing, REST API controllers, and ML models.", level: "Advanced", xp: "2 Years" },
  "Flutter": { desc: "Cross-platform mobile apps, reactive state interfaces, custom animations, Android/iOS.", level: "Advanced", xp: "2 Years" },
  "React": { desc: "Component-based web UI views, React hook states, dynamic hydration, virtual DOM rendering.", level: "Advanced", xp: "2+ Years" },
  "TensorFlow": { desc: "Deep learning models, neural networks training, prediction classifiers, machine learning.", level: "Intermediate", xp: "1 Year" },
  "Scikit-learn": { desc: "Traditional machine learning algorithms, model fitting, scaling, and hyperparameter tuning.", level: "Advanced", xp: "1.5 Years" },

  // Tools & Tech
  "MongoDB": { desc: "Document database storage, JSON collections, Mongoose ODM aggregations, scale designs.", level: "Advanced", xp: "3 Years" },
  "PostgreSQL": { desc: "Acid-compliant relational storage, indexing, JSONB data types, complex queries.", level: "Advanced", xp: "2 Years" },
  "MySQL": { desc: "Relational database schemas, server queries, triggers, stored procedures, joins.", level: "Advanced", xp: "3 Years" },
  "Redis": { desc: "In-memory database cache, cache-aside systems, session storage, pub/sub communication.", level: "Advanced", xp: "1.5 Years" },
  "Mongoose ODM": { desc: "Object data modeling for MongoDB, validation checks, population refs, middlewares.", level: "Advanced", xp: "3 Years" },
  "Firebase": { desc: "Cloud auth, firestore listeners, cloud messaging push notifications, web hosting.", level: "Advanced", xp: "2 Years" },
  "Docker": { desc: "Container configurations, Dockerfile images, Docker Compose orchestrations.", level: "Advanced", xp: "2 Years" },
  "Kubernetes": { desc: "Container cluster setups, deployments, replica states, health checks, namespace management.", level: "Intermediate", xp: "1 Year" },
  "Apache Kafka": { desc: "Event streams, schema registries, Avro publishers, consumer subscription flows.", level: "Advanced", xp: "1.5 Years" },
  "Prometheus": { desc: "Infrastructure metrics scraping, time-series querying, alerting, host resource checks.", level: "Advanced", xp: "1 Year" },
  "Grafana": { desc: "Metrics dashboard graphs, queries, real-time alerting indicators, visual metrics.", level: "Advanced", xp: "1 Year" },
  "AWS": { desc: "Cloud compute nodes (EC2), file buckets (S3), relational DBs (RDS), network interfaces.", level: "Intermediate", xp: "1 Year" },
  "Nginx": { desc: "Reverse proxy setups, SSL routing certs, static caching assets, load balancers.", level: "Intermediate", xp: "1 Year" },
  "Linux": { desc: "Kernel operations, system administration, process control, file pipelines, SSH networks.", level: "Expert", xp: "4+ Years" },
  "Git": { desc: "Distributed version control, merge resolutions, rebase workflows, feature branches.", level: "Expert", xp: "4+ Years" },
  "Postman": { desc: "API response assertions, testing request models, mocking servers, environments configuration.", level: "Expert", xp: "3 Years" },

  // Data Science
  "NumPy": { desc: "High-dimensional array structures, mathematical operations, linear algebra algorithms.", level: "Advanced", xp: "2 Years" },
  "Pandas": { desc: "Dataframe structures, file sanitizers, datasets merging, parsing, analysis queries.", level: "Advanced", xp: "2 Years" },
  "Matplotlib": { desc: "Data visualization plots, custom charts, figures saving, analysis dashboards.", level: "Advanced", xp: "2 Years" },
  "Jupyter": { desc: "Interactive python scripting notebooks, research documents, data charts running.", level: "Expert", xp: "3 Years" },
  "Power BI": { desc: "Corporate analytics reports, interactive metrics maps, data connection setups.", level: "Intermediate", xp: "1 Year" },
};

// SVG Hexagon Component for outlines and layouts
const Hexagon = ({
  icon,
  name,
  active,
  onClick,
  onMouseEnter,
}: {
  icon: string;
  name: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="relative cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 group select-none flex-shrink-0"
      style={{
        width: "100px",
        height: "115px",
        filter: active ? "drop-shadow(0 0 8px var(--primary-sky))" : "none",
      }}
    >
      {/* Outer Hex Border Mask */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          active ? "bg-primary-sky" : "bg-zinc-800 group-hover:bg-zinc-600"
        }`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />

      {/* Inner Hex Body Content */}
      <div
        className={`absolute inset-[2px] transition-colors duration-300 flex flex-col items-center justify-center p-2.5 ${
          active ? "bg-zinc-900" : "bg-[#0d0d0f]/95 group-hover:bg-zinc-900/90"
        }`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt={name}
          className="w-10 h-10 object-contain mb-1 transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-[9px] font-mono text-center font-bold tracking-tight text-zinc-400 group-hover:text-zinc-200 line-clamp-1">
          {name}
        </span>
      </div>
    </div>
  );
};

export const SkillsHexGrid = () => {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<string>("TypeScript");
  const [skills, setSkills] = useState<SkillItem[]>([]);

  // Consolidate all skills into a single flat array
  useEffect(() => {
    const list: SkillItem[] = [];

    portfolioConfig.skills.programmingLanguages.forEach((s) =>
      list.push({ ...s, category: "Languages" })
    );
    portfolioConfig.skills.frameworks.forEach((s) =>
      list.push({ ...s, category: "Frameworks" })
    );
    portfolioConfig.skills.tools.forEach((s) =>
      list.push({ ...s, category: "Tools" })
    );
    portfolioConfig.skills.dataScience.forEach((s) =>
      list.push({ ...s, category: "Data Science" })
    );
    if ((portfolioConfig.skills as any).libraries) {
      (portfolioConfig.skills as any).libraries.forEach((s: any) =>
        list.push({ ...s, category: "Data Science" })
      );
    }

    setSkills(list);
  }, []);

  const filteredSkills = skills.filter(
    (s) => activeTab === "All" || s.category === activeTab
  );

  // Group items into rows for staggered honeycomb structure
  // alternating row size 5 and 4
  const chunkedRows = (() => {
    const rows: SkillItem[][] = [];
    let temp = [...filteredSkills];
    let isFive = true;

    while (temp.length > 0) {
      const size = isFive ? 5 : 4;
      rows.push(temp.slice(0, size));
      temp = temp.slice(size);
      isFive = !isFive;
    }
    return rows;
  })();

  const currentSkillData = skillDetails[selectedSkill] || {
    desc: "Core technical utility used to build high-performance systems and full-stack capabilities.",
    level: "Advanced",
    xp: "2 Years",
  };

  // Find projects using selected skill
  const relatedProjects = portfolioConfig.projects.filter((p) =>
    p.tags.some(
      (tag) =>
        tag.toLowerCase() === selectedSkill.toLowerCase() ||
        (selectedSkill === "Node.js" && tag.toLowerCase().includes("node")) ||
        (selectedSkill === "Express.js" && tag.toLowerCase().includes("express")) ||
        (selectedSkill === "TypeScript" && tag.toLowerCase().includes("typescript")) ||
        (selectedSkill === "JavaScript" && tag.toLowerCase().includes("javascript")) ||
        (selectedSkill === "PostgreSQL" && tag.toLowerCase().includes("postgres"))
    )
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return <Code2 className="h-4 w-4 text-sky-400" />;
      case "Frameworks":
        return <Cpu className="h-4 w-4 text-emerald-400" />;
      case "Tools":
        return <Database className="h-4 w-4 text-purple-400" />;
      default:
        return <Network className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 mt-4 items-start">
      {/* Grid Left Section: Tab controls & Honeycomb grid */}
      <div className="w-full lg:w-3/5 flex flex-col gap-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full">
          {["All", "Languages", "Frameworks", "Tools", "Data Science"].map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => {
                setActiveTab(tab);
                const list = skills.filter((s) => tab === "All" || s.category === tab);
                if (list.length > 0) {
                  setSelectedSkill(list[0].name);
                }
              }}
              className={`h-7 px-3 text-[10px] font-mono rounded-full ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "border-zinc-800 hover:bg-zinc-900/50 text-zinc-400"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Honeycomb Grid Wrapper */}
        <div className="w-full flex flex-col items-center py-6 px-2 border-2 border-zinc-900/50 rounded-xl bg-zinc-900/5 min-h-[380px] overflow-hidden justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
          
          {/* Desktop Honeycomb Stagger */}
          <div className="hidden sm:flex flex-col items-center select-none z-10 w-full">
            {chunkedRows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="flex justify-center gap-4 -mt-7 first:mt-0"
              >
                {row.map((item) => (
                  <Hexagon
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    active={selectedSkill === item.name}
                    onClick={() => setSelectedSkill(item.name)}
                    onMouseEnter={() => setSelectedSkill(item.name)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Mobile flat list to prevent tiny elements */}
          <div className="sm:hidden grid grid-cols-3 gap-3 z-10 w-full max-h-[340px] overflow-y-auto no-scrollbar p-1">
            {filteredSkills.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedSkill(item.name)}
                className={`p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                  selectedSkill === item.name
                    ? "border-primary-sky bg-primary-sky/5 shadow-md shadow-primary-sky/5"
                    : "border-zinc-900 bg-zinc-950/40"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
                <span className="text-[10px] font-mono text-zinc-400 font-bold truncate max-w-full">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Right Section: Floating details inspector */}
      <FramerWrapper y={0} x={50} className="w-full lg:w-2/5 flex flex-col gap-4 self-stretch">
        <Card className="h-full border-2 bg-zinc-900/10 border-zinc-800/80 overflow-hidden relative flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary-sky to-transparent" />
          
          <CardContent className="pt-6 flex flex-col gap-5 h-full justify-between">
            {/* Upper Details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {/* Dynamic icon box */}
                <div className="w-12 h-12 bg-zinc-950/90 border border-zinc-800 rounded-xl flex items-center justify-center p-2.5 flex-shrink-0 shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      skills.find((s) => s.name === selectedSkill)?.icon ||
                      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                    }
                    alt={selectedSkill}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-rubik text-primary flex items-center gap-1.5 leading-none">
                    {selectedSkill}
                    <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 flex items-center gap-1">
                    {getCategoryIcon(
                      skills.find((s) => s.name === selectedSkill)?.category || "Tools"
                    )}
                    {skills.find((s) => s.name === selectedSkill)?.category || "Tools"}
                  </span>
                </div>
              </div>

              {/* Levels & Metrics */}
              <div className="grid grid-cols-2 gap-2 border-y border-zinc-900 py-3 mt-1 text-xs font-mono">
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Proficiency</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-yellow-500" />
                    {currentSkillData.level}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Experience</span>
                  <span className="text-sky-400 font-bold flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {currentSkillData.xp}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider flex items-center gap-1">
                  <Info className="h-3 w-3" /> Description
                </span>
                <p className="text-xs font-poppins text-zinc-400 leading-relaxed bg-zinc-950/40 p-3 rounded-lg border border-zinc-900/30">
                  {currentSkillData.desc}
                </p>
              </div>
            </div>

            {/* Lower Details: Projects Linking */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-zinc-900">
              <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> Usage in Projects ({relatedProjects.length})
              </span>
              
              {relatedProjects.length === 0 ? (
                <div className="text-[10px] font-mono text-zinc-600 italic py-2">
                  No projects tagging this skill explicitly. Used in structural code routines.
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {relatedProjects.map((p) => (
                    <Link
                      href={p.link}
                      key={p.title}
                      target="_blank"
                      className="group/item flex items-center justify-between p-2 rounded bg-zinc-950/30 hover:bg-zinc-950/80 border border-zinc-900/30 hover:border-zinc-800 transition-all"
                    >
                      <span className="text-[11px] font-mono text-zinc-400 group-hover/item:text-primary-sky transition-colors truncate max-w-[85%] font-medium">
                        {p.title.split(" — ")[0]}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-zinc-600 group-hover/item:text-primary-sky group-hover/item:translate-x-0.5 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </FramerWrapper>
    </div>
  );
};
