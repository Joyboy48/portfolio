"use client";
import React, { useState, useEffect } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Newspaper, Search, RotateCcw, Clock, ArrowUpRight, BookOpen, Tag, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio.config";

interface MediumItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  categories: string[];
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<MediumItem[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<MediumItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract medium handle or fallback to default
  const mediumUrl = portfolioConfig.socialLinks.medium || "https://medium.com/@astitvaarya9589";
  const mediumUsername = mediumUrl.split("/").pop() || "@astitvaarya9589";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check SessionStorage first to avoid frequent external API calls
        const cachedData = sessionStorage.getItem("medium_blogs_cache");
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setBlogs(parsed.items);
          setFilteredBlogs(parsed.items);
          extractCategories(parsed.items);
          setLoading(false);
          return;
        }

        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumUsername}`);
        if (!res.ok) {
          throw new Error("Failed to fetch RSS feed from Medium.");
        }
        const data = await res.json();
        
        if (data.status !== "ok") {
          throw new Error(data.message || "Could not parse Medium feed.");
        }

        setBlogs(data.items);
        setFilteredBlogs(data.items);
        extractCategories(data.items);
        
        // Cache data for current session
        sessionStorage.setItem("medium_blogs_cache", JSON.stringify(data));
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while loading blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [mediumUsername]);

  const extractCategories = (items: MediumItem[]) => {
    const allCats: string[] = [];
    items.forEach((item) => {
      if (item.categories) {
        item.categories.forEach((cat) => {
          // Format categories to title case for cleaner badge UI
          const formattedCat = cat
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          if (!allCats.includes(formattedCat)) {
            allCats.push(formattedCat);
          }
        });
      }
    });
    setCategories(allCats);
  };

  // Filter logic based on search query and category
  useEffect(() => {
    let result = blogs;

    if (selectedCategory !== "All") {
      result = result.filter((blog) => 
        blog.categories?.some((cat) => {
          const formattedCat = cat
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          return formattedCat === selectedCategory;
        })
      );
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(q) ||
          blog.description.toLowerCase().includes(q)
      );
    }

    setFilteredBlogs(result);
  }, [searchQuery, selectedCategory, blogs]);

  // Parsing Helpers
  const extractThumbnail = (descriptionHtml: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = descriptionHtml.match(imgRegex);
    return match ? match[1] : null;
  };

  const cleanSnippet = (descriptionHtml: string, maxLength = 140) => {
    // Strip figures and images
    let textOnly = descriptionHtml.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, "");
    // Strip other html tags
    textOnly = textOnly.replace(/<[^>]*>/g, " ");
    // Unescape HTML entities
    textOnly = textOnly
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&ndash;/g, "-")
      .replace(/&mdash;/g, "—")
      .replace(/&amp;/g, "&")
      .replace(/&hellip;/g, "...")
      .replace(/&nbsp;/g, " ");
      
    const cleaned = textOnly.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength) + "...";
  };

  const estimateReadingTime = (descriptionHtml: string) => {
    const textOnly = descriptionHtml.replace(/<[^>]*>/g, " ");
    const words = textOnly.trim().split(/\s+/).length;
    const wpm = 225; // average words read per minute
    return Math.max(1, Math.ceil(words / wpm));
  };

  const formatDate = (dateStr: string) => {
    try {
      // Input date format: "YYYY-MM-DD HH:MM:SS" or standard ISO
      const normalizedDate = dateStr.replace(/-/g, "/");
      const date = new Date(normalizedDate);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8 animate-in fade-in duration-300">
      <div className="w-full flex justify-between items-center flex-wrap gap-4">
        <Badge variant="secondary" className="gap-1.5 py-1">
          <Newspaper className="h-4 w-4" />
          Technical Blogs
        </Badge>

        {/* Search Console */}
        <div className="flex gap-2 w-full max-w-sm">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 font-mono text-xs bg-zinc-950/60 border-zinc-800 text-zinc-200 outline-none focus-visible:ring-sky-500 focus-visible:ring-1"
            />
          </div>
          {(searchQuery || selectedCategory !== "All") && (
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
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Heading>Medium Articles & System Design Notes</Heading>
        <p className="text-zinc-400 font-poppins text-sm -mt-2">
          Sharing deep dives on caching, system architecture, API design, DevOps pipelines, and backend software engineering.
        </p>
      </div>

      {/* Category Filter Section */}
      {!loading && !error && categories.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 py-1">
          <Button
            size="sm"
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
            className={`h-7 px-3 text-xs font-mono rounded-full ${
              selectedCategory === "All" 
                ? "bg-primary text-primary-foreground" 
                : "border-zinc-800 hover:bg-zinc-900/50 text-zinc-400"
            }`}
          >
            All Posts ({blogs.length})
          </Button>
          {categories.map((cat) => {
            const count = blogs.filter((b) =>
              b.categories?.some((c) => {
                const formatted = c
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ");
                return formatted === cat;
              })
            ).length;
            return (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className={`h-7 px-3 text-xs font-mono rounded-full ${
                  selectedCategory === cat 
                    ? "bg-primary text-primary-foreground" 
                    : "border-zinc-800 hover:bg-zinc-900/50 text-zinc-400"
                }`}
              >
                {cat} ({count})
              </Button>
            );
          })}
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-2">
          {[1, 2, 4, 6].map((i) => (
            <div key={i} className="border-2 border-zinc-800/60 bg-zinc-900/10 rounded-xl p-5 h-64 flex flex-col justify-between animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-zinc-800/80 rounded w-1/4" />
                <div className="h-6 bg-zinc-800/80 rounded w-3/4" />
                <div className="h-10 bg-zinc-800/80 rounded w-full" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-zinc-800/80 rounded w-1/3" />
                <div className="h-4 bg-zinc-800/80 rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <FramerWrapper y={0} x={100} className="w-full">
          <Card className="border-rose-950/40 bg-rose-950/10 border-2">
            <CardContent className="pt-6 font-mono text-rose-500 text-sm text-center">
              <p className="font-bold mb-2">RSS Feed Error</p>
              <p className="text-zinc-400 mb-4">{error}</p>
              <p className="text-xs text-zinc-500 mb-4">
                We couldn&apos;t load the Medium feed dynamically. You can visit my Medium profile directly to read all articles.
              </p>
              <div className="flex justify-center gap-3">
                <Link href={mediumUrl} target="_blank">
                  <Button size="sm" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs border border-zinc-800 gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Visit Medium Profile
                  </Button>
                </Link>
                <Button onClick={handleReset} size="sm" variant="outline" className="text-xs font-mono border-zinc-800">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </FramerWrapper>
      ) : filteredBlogs.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/5 text-center font-mono">
          <Newspaper className="h-8 w-8 text-zinc-600 mb-2" />
          <p className="text-zinc-400 text-sm">No articles matched your search filter.</p>
          <Button onClick={handleReset} size="sm" variant="link" className="text-xs text-sky-400 mt-1">
            Clear Filters & Reset
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-2">
          {filteredBlogs.map((blog, idx) => {
            const thumbnail = extractThumbnail(blog.description);
            const readTime = estimateReadingTime(blog.description);
            const snippet = cleanSnippet(blog.description);
            
            return (
              <FramerWrapper key={blog.guid} y={30} x={0} delay={idx * 0.05} className="w-full">
                <Card className="h-full border-2 border-zinc-800/80 bg-zinc-900/10 hover:border-primary-sky hover:shadow-md hover:shadow-primary-sky/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                  {/* Thumbnail / Header Banner */}
                  <div className="w-full h-40 relative bg-zinc-950 overflow-hidden border-b border-zinc-800/80 flex-shrink-0">
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={thumbnail} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85" 
                      />
                    ) : (
                      // Fallback premium code-styled gradient
                      <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-950 flex flex-col items-center justify-center p-4 relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                        <BookOpen className="h-8 w-8 text-sky-500/40 mb-1" />
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Astitva Arya // Publications</span>
                      </div>
                    )}
                    
                    {/* Read Time Overlay */}
                    <div className="absolute bottom-3 right-3 bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800/50 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-sky-400" />
                      {readTime} min read
                    </div>
                  </div>

                  <CardHeader className="pb-2 pt-4">
                    {/* Date and Tags */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1.5 flex-wrap gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.pubDate)}
                      </span>
                      {blog.categories && blog.categories.length > 0 && (
                        <span className="flex items-center gap-1 text-sky-400/80 bg-sky-950/10 px-2 py-0.5 rounded border border-sky-900/30 capitalize">
                          <Tag className="h-2.5 w-2.5" />
                          {blog.categories[0].replace(/-/g, " ")}
                        </span>
                      )}
                    </div>
                    
                    <CardTitle className="text-base font-bold font-rubik leading-snug tracking-tight text-primary line-clamp-2 group-hover:text-primary-sky transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow flex flex-col justify-between gap-4 pt-0">
                    <p className="text-xs font-poppins text-muted-foreground line-clamp-3 leading-relaxed">
                      {snippet}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/40 mt-auto">
                      <Link 
                        href={blog.link} 
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-primary-sky transition-colors font-semibold"
                      >
                        Read Article 
                        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </FramerWrapper>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
