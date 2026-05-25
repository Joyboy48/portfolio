"use client";
import React, { useState, useEffect } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Github,
  Star,
  GitFork,
  BookOpen,
  Users,
  FolderDot,
  Link2,
  Trophy,
  Activity,
  Clock,
  Search,
  RotateCcw,
  GitCommit,
  GitPullRequest,
  FolderPlus,
  Flame,
  Code2,
} from "lucide-react";
import Link from "next/link";

interface GithubProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    action?: string;
    commits?: { message: string }[];
    pull_request?: { title: string };
  };
  created_at: string;
}

const GithubStatsPage = () => {
  const [username, setUsername] = useState("Joyboy48");
  const [searchInput, setSearchInput] = useState("Joyboy48");
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [languages, setLanguages] = useState<{ name: string; count: number; percentage: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) {
          if (profileRes.status === 404) {
            throw new Error(`GitHub user "${username}" not found.`);
          }
          throw new Error("Failed to fetch GitHub profile. Rate limit might be exceeded.");
        }
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch Repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!reposRes.ok) {
          throw new Error("Failed to fetch GitHub repositories.");
        }
        const reposData: GithubRepo[] = await reposRes.json();

        // Sort repos by stars
        const sortedRepos = [...reposData].sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);

        // Calculate language counts
        const languageCounts: { [key: string]: number } = {};
        let totalValidRepos = 0;

        reposData.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            totalValidRepos++;
          }
        });

        const languageList = Object.entries(languageCounts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: totalValidRepos > 0 ? Math.round((count / totalValidRepos) * 100) : 0,
          }))
          .sort((a, b) => b.count - a.count);

        setLanguages(languageList);

        // Fetch Events for activity feed
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=6`);
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData);
        } else {
          setEvents([]);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setUsername(searchInput.trim());
    }
  };

  const handleReset = () => {
    setUsername("Joyboy48");
    setSearchInput("Joyboy48");
  };

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: "bg-[#3178c6]",
      JavaScript: "bg-[#f1e05a]",
      Go: "bg-[#00add8]",
      Python: "bg-[#3572a5]",
      "C++": "bg-[#f34b7d]",
      Java: "bg-[#b07219]",
      HTML: "bg-[#e34c26]",
      CSS: "bg-[#563d7c]",
      Dart: "bg-[#00b4ab]",
      C: "bg-[#555555]",
      Shell: "bg-[#89e051]",
    };
    return colors[lang] || "bg-zinc-500";
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="h-4 w-4 text-emerald-400" />;
      case "PullRequestEvent":
        return <GitPullRequest className="h-4 w-4 text-sky-400" />;
      case "CreateEvent":
        return <FolderPlus className="h-4 w-4 text-purple-400" />;
      case "WatchEvent":
        return <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-zinc-400" />;
    }
  };

  const formatEvent = (event: GithubEvent) => {
    const repoName = event.repo.name;
    const type = event.type;

    switch (type) {
      case "PushEvent":
        const commitMsg = event.payload.commits?.[0]?.message || "Commited changes";
        return (
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-300">
              Pushed commits to <span className="text-sky-400 font-mono font-semibold">{repoName}</span>
            </span>
            <span className="text-zinc-500 text-xs italic truncate max-w-[90%]">&quot;{commitMsg}&quot;</span>
          </div>
        );
      case "PullRequestEvent":
        const prAction = event.payload.action || "interacted with";
        const prTitle = event.payload.pull_request?.title || "pull request";
        return (
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-300">
              <span className="capitalize">{prAction}</span> pull request in <span className="text-sky-400 font-mono font-semibold">{repoName}</span>
            </span>
            <span className="text-zinc-500 text-xs italic truncate max-w-[90%]">&quot;{prTitle}&quot;</span>
          </div>
        );
      case "CreateEvent":
        return (
          <span className="text-zinc-300">
            Created repository/branch at <span className="text-sky-400 font-mono font-semibold">{repoName}</span>
          </span>
        );
      case "WatchEvent":
        return (
          <span className="text-zinc-300">
            Starred repository <span className="text-sky-400 font-mono font-semibold">{repoName}</span>
          </span>
        );
      default:
        return (
          <span className="text-zinc-300">
            Active session in <span className="text-sky-400 font-mono font-semibold">{repoName}</span>
          </span>
        );
    }
  };

  // Build custom typing lines for the search username
  const getTypingLines = () => {
    if (username.toLowerCase() === "joyboy48") {
      return "Full-Stack+%26+Backend+Developer;CNCF+Contributor+(Meshery+%7C+OTel);DevOps+%26+Distributed+Systems;Docker+%7C+Kafka+%7C+Kubernetes+%7C+Prometheus";
    }
    return `GitHub+Profile:+${username};Stats+%26+Activity+Tracker;Open+Source+Contributions`;
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <div className="w-full flex justify-between items-center flex-wrap gap-4">
        <Badge variant="secondary" className="gap-1.5 py-1">
          <Github className="h-4 w-4" />
          Live GitHub Dashboard
        </Badge>

        {/* Search Console */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-sm">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search GitHub Username..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 h-9 font-mono text-xs bg-zinc-950/60 border-zinc-800 text-zinc-200 outline-none focus-visible:ring-sky-500"
            />
          </div>
          <Button type="submit" size="sm" className="h-9 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-mono">
            Search
          </Button>
          {username.toLowerCase() !== "joyboy48" && (
            <Button
              type="button"
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="h-9 px-2.5 border-zinc-800 hover:bg-zinc-900/50"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Heading>GitHub Profile & Statistics</Heading>
      </div>

      {loading ? (
        <div className="w-full flex flex-col gap-6 py-10 items-center justify-center font-mono text-zinc-400">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-sky-400 border-zinc-700" />
          <p>Fetching active GitHub status for &quot;{username}&quot;...</p>
        </div>
      ) : error ? (
        <FramerWrapper y={0} x={100} className="w-full">
          <Card className="border-rose-950/40 bg-rose-950/10 border-2">
            <CardContent className="pt-6 font-mono text-rose-500 text-sm text-center">
              <p className="font-bold mb-2">API Fetch Error</p>
              <p className="text-zinc-400">{error}</p>
              <p className="mt-4 text-xs text-zinc-500">
                You can try again, or reset to my stats by clicking the reset button.
              </p>
              <Button onClick={handleReset} size="sm" className="mt-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs border border-zinc-800">
                Reset to Astitva
              </Button>
            </CardContent>
          </Card>
        </FramerWrapper>
      ) : (
        <div className="w-full flex flex-col gap-6">
          
          {/* Header Wave Visualizer */}
          <FramerWrapper y={-30} x={0} delay={0.05} className="w-full relative overflow-hidden rounded-xl border border-zinc-800/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:0e75b6,100:00B4D8&height=100&section=header&animation=fadeIn`} 
              alt="Header Wave" 
              className="w-full h-24 object-cover" 
            />
            {/* Typing SVG Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&duration=2500&pause=800&color=00B4D8&center=true&vCenter=true&width=600&lines=${getTypingLines()}`}
                alt="Typing Stats"
                className="max-w-[90%]"
              />
            </div>
          </FramerWrapper>

          {/* Profile overview widgets */}
          <FramerWrapper y={30} x={0} delay={0.1} className="w-full flex justify-center flex-wrap gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`https://komarev.com/ghpvc/?username=${username}&label=Profile+Views&color=0e75b6&style=flat-square`}
              alt="Views" 
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white"
              alt="LinkedIn Badge" 
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://img.shields.io/badge/Medium-Articles-12100E?style=flat-square&logo=medium&logoColor=white"
              alt="Medium Badge" 
            />
          </FramerWrapper>

          {/* Top Panel: Profile Card, Languages breakdown & Recent Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            {/* Profile Overview Card */}
            <FramerWrapper y={0} x={-50} delay={0.1} className="lg:col-span-1">
              <Card className="h-full border-2 hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile?.avatar_url}
                    alt="GitHub Avatar"
                    className="w-24 h-24 rounded-full border-2 border-zinc-700"
                  />
                  <div>
                    <h3 className="text-xl font-bold font-rubik text-primary">{profile?.name || profile?.login}</h3>
                    <p className="text-sm font-mono text-sky-400">@{profile?.login}</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-poppins px-2">{profile?.bio || "No biography provided."}</p>
                  
                  <div className="flex gap-4 items-center justify-center mt-2 border-t border-zinc-800/80 pt-4 w-full text-zinc-300">
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold font-mono">{profile?.followers}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Followers</span>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold font-mono">{profile?.public_repos}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Repos</span>
                    </div>
                  </div>

                  <Link
                    href={profile?.html_url || `https://github.com/${username}`}
                    target="_blank"
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-300 flex items-center justify-center gap-1.5 transition-all mt-2"
                  >
                    <Github className="h-3.5 w-3.5" />
                    View GitHub Profile
                  </Link>
                </CardContent>
              </Card>
            </FramerWrapper>

            {/* Languages breakdown card */}
            <FramerWrapper y={0} x={0} delay={0.15} className="lg:col-span-1">
              <Card className="h-full border-2 hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold font-rubik text-primary flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    Languages Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 font-mono">
                  {languages.length === 0 ? (
                    <div className="text-xs text-zinc-500 py-6 text-center italic">No language data found.</div>
                  ) : (
                    <div className="space-y-3">
                      {languages.slice(0, 5).map((lang) => (
                        <div key={lang.name} className="space-y-1">
                          <div className="flex justify-between text-xs text-zinc-300">
                            <span>{lang.name}</span>
                            <span className="text-zinc-500">{lang.percentage}%</span>
                          </div>
                          <div className="w-full bg-zinc-800/50 rounded-full h-2 overflow-hidden border border-zinc-800/30">
                            <div
                              className={`h-full rounded-full ${getLanguageColor(lang.name)}`}
                              style={{ width: `${lang.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2.5 mt-2 border-t border-zinc-800/80 pt-4 text-[10px] text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Followers active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FolderDot className="h-3.5 w-3.5" />
                      <span>{profile?.public_repos} total repositories</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FramerWrapper>

            {/* Git Activity Log with Visual Graph Line */}
            <FramerWrapper y={0} x={50} delay={0.2} className="lg:col-span-1">
              <Card className="h-full border-2 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold font-rubik text-primary flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-sky-400" />
                    Git Activity Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-start gap-4 overflow-hidden relative pl-6">
                  {/* Vertical Connector Line */}
                  <div className="absolute left-3.5 top-6 bottom-6 w-0.5 bg-zinc-800" />
                  
                  {events.length === 0 ? (
                    <div className="text-zinc-500 font-mono text-xs italic py-4">No recent events tracked.</div>
                  ) : (
                    <div className="space-y-4">
                      {events.slice(0, 4).map((evt) => (
                        <div key={evt.id} className="relative flex gap-3.5 items-start text-xs font-mono">
                          {/* Dot connector node */}
                          <div className="absolute -left-[27px] top-0.5 z-10 bg-[#0d0d0f] rounded-full p-0.5 border border-zinc-700">
                            {getEventIcon(evt.type)}
                          </div>
                          
                          <div className="flex flex-col overflow-hidden w-full">
                            {formatEvent(evt)}
                            <span className="text-[10px] text-zinc-600 mt-0.5 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(evt.created_at).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </FramerWrapper>
          </div>

          {/* GitHub Readme Activity Graph */}
          <FramerWrapper y={30} x={0} delay={0.22} className="w-full">
            <Card className="border-2 p-4 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&bg_color=0d1117&color=00B4D8&line=0e75b6&point=ffffff&area=true&hide_border=true&custom_title=Contribution+Activity`}
                alt="GitHub Contribution Activity Graph"
                className="w-full max-h-[300px] object-contain"
              />
            </Card>
          </FramerWrapper>

          {/* LeetCode Heatmap Card & GitHub Streaks */}
          <FramerWrapper y={30} x={0} delay={0.25} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {/* LeetCode stats card - Only loaded for Joyboy48 (Astitva) */}
              {username.toLowerCase() === "joyboy48" && (
                <Card className="border-2 p-5 bg-[#0d1117] flex flex-col gap-3 hover:shadow-md transition-all duration-300 justify-center items-center">
                  <div className="text-sm font-mono text-zinc-400 flex items-center gap-1.5 font-bold self-start w-full border-b border-zinc-900 pb-2">
                    <Flame className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
                    LeetCode Knight Activity & Heatmap
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://leetcard.jacoblin.cool/joyboy048?theme=dark&font=JetBrains+Mono&ext=heatmap"
                    alt="LeetCode Stats Heatmap"
                    className="max-w-full h-auto object-contain"
                  />
                </Card>
              )}

              {/* GitHub Streak Card */}
              <Card className="border-2 p-5 bg-[#0d1117] flex flex-col gap-3 hover:shadow-md transition-all duration-300 justify-center items-center lg:col-span-1">
                <div className="text-sm font-mono text-zinc-400 flex items-center gap-1.5 font-bold self-start w-full border-b border-zinc-900 pb-2">
                  <Flame className="h-4 w-4 text-emerald-400" />
                  GitHub Commits Streak
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true`}
                  alt="GitHub Streak"
                  className="max-w-full h-auto object-contain"
                />
              </Card>
            </div>
          </FramerWrapper>

          {/* GitHub Profile Summary Cards Grid */}
          <FramerWrapper y={30} x={0} delay={0.28} className="w-full">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-mono text-zinc-400 flex items-center gap-1.5 font-bold">
                <Code2 className="h-4 w-4 text-sky-400" />
                GitHub Language & Commit Summary
              </div>
              
              {/* Profile Details (Width 100%) */}
              <Card className="border-2 p-4 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${username}&theme=tokyonight`}
                  alt="GitHub Profile Details"
                  className="w-full max-h-[300px] object-contain"
                />
              </Card>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <Card className="border-2 p-2 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=tokyonight`}
                    alt="Repos Per Language"
                    className="max-w-full object-contain"
                  />
                </Card>
                <Card className="border-2 p-2 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${username}&theme=tokyonight`}
                    alt="Most Commit Language"
                    className="max-w-full object-contain"
                  />
                </Card>
                <Card className="border-2 p-2 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=tokyonight`}
                    alt="Stats Summary"
                    className="max-w-full object-contain"
                  />
                </Card>
                <Card className="border-2 p-2 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=tokyonight&utcOffset=5.5`}
                    alt="Productive Time Summary"
                    className="max-w-full object-contain"
                  />
                </Card>
              </div>
            </div>
          </FramerWrapper>

          {/* GitHub Contribution Calendar Grid & Snake Game Animation */}
          <FramerWrapper y={30} x={0} delay={0.32} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {/* Contribution Grid */}
              <Card className="border-2 p-5 bg-[#0d1117] hover:shadow-md transition-all duration-300 flex flex-col gap-2 justify-center">
                <div className="text-sm font-mono text-zinc-400 flex items-center gap-1.5 font-bold mb-2">
                  <Github className="h-4 w-4 text-emerald-400" />
                  GitHub Contribution Grid
                </div>
                <div className="w-full overflow-x-auto no-scrollbar flex justify-center py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://ghchart.rshah.org/40c463/${username}`}
                    alt={`${username}'s GitHub Contributions Calendar`}
                    className="min-w-[400px] max-w-full h-auto object-contain"
                  />
                </div>
              </Card>

              {/* Snake Eating Grid Game */}
              <Card className="border-2 p-5 bg-[#0d1117] hover:shadow-md transition-all duration-300 flex flex-col gap-2 justify-center items-center">
                <div className="text-sm font-mono text-zinc-400 flex items-center gap-1.5 font-bold mb-2 self-start">
                  <Activity className="h-4 w-4 text-sky-400 animate-spin" style={{ animationDuration: "3s" }} />
                  Contribution Snake Animation
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg`}
                  alt="GitHub Contribution Grid Snake"
                  className="max-w-full h-auto object-contain"
                  onError={(e) => {
                    // Hide the card if the snake SVG does not exist in the searched repo
                    e.currentTarget.parentElement?.classList.add("hidden");
                  }}
                />
              </Card>
            </div>
          </FramerWrapper>

          {/* GitHub Trophies Widget */}
          <FramerWrapper y={30} x={0} delay={0.34} className="w-full">
            <Card className="border-2 p-4 bg-[#0d1117] flex justify-center items-center overflow-hidden hover:shadow-md transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=onedark&column=7&margin-w=10&margin-h=10`}
                alt="GitHub Trophies"
                className="max-w-full"
              />
            </Card>
          </FramerWrapper>

          {/* Top Repositories Grid */}
          <div className="flex flex-col gap-3 w-full mt-4">
            <h2 className="text-xl font-poppins text-primary font-semibold flex items-center gap-1.5">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Featured Public Repositories
            </h2>
            {repos.length === 0 ? (
              <div className="text-sm font-mono text-zinc-500 italic py-6 pl-3">No repositories available for this user.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {repos.slice(0, 4).map((repo, idx) => (
                  <FramerWrapper key={repo.name} y={0} x={0} delay={0.36 + idx * 0.05} className="w-full">
                    <Card className="h-full border-2 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                      <CardHeader className="pb-1">
                        <CardTitle className="text-base font-bold text-primary font-mono flex items-center justify-between gap-2">
                          <span className="truncate">{repo.name}</span>
                          <Link
                            href={repo.html_url}
                            target="_blank"
                            className="text-zinc-500 hover:text-sky-400 transition-colors flex-shrink-0"
                          >
                            <Link2 className="h-4 w-4" />
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between gap-4 pt-1">
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {repo.description || "No description provided."}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-800/40">
                          <div className="flex items-center gap-1">
                            <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span className="text-zinc-400">{repo.language || "Unknown"}</span>
                          </div>
                          <div className="flex gap-3 text-zinc-500">
                            <span className="flex items-center gap-0.5">
                              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <GitFork className="h-3.5 w-3.5" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FramerWrapper>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubStatsPage;
