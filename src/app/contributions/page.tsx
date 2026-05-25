import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import ContributionCard from "@/components/ContributionCard";
import { Badge } from "@/components/ui/badge";
import { GitPullRequest, Award, Star } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GitHubContribution {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const getGithubContributions = async (): Promise<{
  merged: GitHubContribution[];
  active: GitHubContribution[];
  live: boolean;
}> => {
  const githubUrl = portfolioConfig.socialLinks.github;
  const username = githubUrl.split("/").pop() || "Joyboy48";

  const headers: HeadersInit = {};
  if (process.env.GITHUB_PAT) {
    headers["Authorization"] = `token ${process.env.GITHUB_PAT}`;
  }

  try {
    // Fetch merged PRs (Cache for 1 hour)
    const mergedRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged&per_page=20`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    // Fetch open PRs (Cache for 1 hour)
    const openRes = await fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:open&per_page=20`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!mergedRes.ok || !openRes.ok) {
      throw new Error(`GitHub API returned error. Merged: ${mergedRes.status}, Open: ${openRes.status}`);
    }

    const mergedData = await mergedRes.json();
    const openData = await openRes.json();

    const mapPrs = (items: any[]): GitHubContribution[] => {
      return items.map((item: any) => {
        const repo = item.repository_url.replace("https://api.github.com/repos/", "");
        const title = item.title;
        let description = item.body || "No description provided.";
        
        // Clean markdown tags and long spacing
        description = description.replace(/[\r\n]+/g, " ").trim();
        if (description.length > 160) {
          description = description.slice(0, 160) + "...";
        }
        
        const tags: string[] = [];
        const repoNameOnly = repo.split("/")[1] || "repo";
        tags.push(repoNameOnly);
        
        const lowerRepo = repo.toLowerCase();
        const lowerTitle = title.toLowerCase();

        if (lowerRepo.includes("meshery")) {
          if (lowerTitle.includes("doc") || lowerTitle.includes("readme")) {
            tags.push("Documentation");
          } else if (lowerTitle.includes("k8s") || lowerTitle.includes("kubernetes")) {
            tags.push("Kubernetes API");
          } else if (lowerTitle.includes("docker")) {
            tags.push("Docker");
          } else {
            tags.push("Go/Cobra CLI");
          }
        } else if (lowerRepo.includes("opentelemetry")) {
          if (lowerTitle.includes("doc") || lowerTitle.includes("readme")) {
            tags.push("Documentation");
          } else {
            tags.push("OpenTelemetry");
          }
        }

        if (item.labels) {
          item.labels.forEach((label: any) => {
            const name = label.name.toLowerCase();
            if (name.includes("doc") && !tags.includes("Documentation")) {
              tags.push("Documentation");
            }
            if ((name.includes("go") || name.includes("cobra")) && !tags.includes("Go/Cobra CLI")) {
              tags.push("Go/Cobra CLI");
            }
          });
        }
        
        return {
          title: `${title} (PR #${item.number})`,
          description,
          tags: tags.slice(0, 3),
          link: item.html_url,
        };
      });
    };

    return {
      merged: mapPrs(mergedData.items || []),
      active: mapPrs(openData.items || []),
      live: true,
    };
  } catch (error) {
    console.error("Error fetching live github contributions:", error);
    return {
      merged: portfolioConfig.contributions.merged,
      active: portfolioConfig.contributions.active,
      live: false,
    };
  }
};

const ContributionsPage = async () => {
  const { contributions } = portfolioConfig;
  const contributionsData = await getGithubContributions();

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <GitPullRequest className="h-4 w-4" />
        Contributions
      </Badge>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <Heading>Open Source Contributions</Heading>
          {contributionsData.live && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-950/30 border border-emerald-900/40 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
          )}
        </div>
        
        {/* CNCF Summary & GSSoC Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-2">
          {/* Meshery CNCF Card */}
          <FramerWrapper y={0} x={-100} delay={0.2} className="w-full">
            <Card className="h-full border-2 bg-accent/10 border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold font-rubik text-primary flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  CNCF Meshery Contributor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                  {contributions.summary}
                </p>
              </CardContent>
            </Card>
          </FramerWrapper>

          {/* GirlScript Summer of Code Card */}
          <FramerWrapper y={0} x={100} delay={0.25} className="w-full">
            <Card className="h-full border-2 bg-accent/10 border-accent/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold font-rubik text-primary flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  {contributions.gssoc.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs font-semibold text-sky-400 mb-2 uppercase tracking-wider">
                  Role: {contributions.gssoc.role}
                </div>
                <p className="font-poppins text-sm text-muted-foreground leading-relaxed">
                  {contributions.gssoc.description}
                </p>
              </CardContent>
            </Card>
          </FramerWrapper>
        </div>
      </div>

      {/* Merged Contributions Section */}
      <div className="flex flex-col gap-3 w-full mt-4">
        <h2 className="text-xl font-poppins text-emerald-400 font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
          Merged Contributions ({contributionsData.merged.length})
        </h2>
        {contributionsData.merged.length > 0 ? (
          <div className="w-full flex flex-row flex-wrap gap-4">
            {contributionsData.merged.map((val, indx) => (
              <ContributionCard key={`merged-${indx}`} value={val} num={indx} />
            ))}
          </div>
        ) : (
          <p className="text-sm font-poppins text-zinc-500 italic pl-1">No merged contributions found.</p>
        )}
      </div>

      {/* Active / In-Review Contributions Section */}
      <div className="flex flex-col gap-3 w-full mt-6">
        <h2 className="text-xl font-poppins text-yellow-500 font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block animate-pulse"></span>
          Active / In-Review Contributions ({contributionsData.active.length})
        </h2>
        {contributionsData.active.length > 0 ? (
          <div className="w-full flex flex-row flex-wrap gap-4">
            {contributionsData.active.map((val, indx) => (
              <ContributionCard key={`active-${indx}`} value={val} num={indx + contributionsData.merged.length} />
            ))}
          </div>
        ) : (
          <p className="text-sm font-poppins text-zinc-500 italic pl-1">No open pull requests found.</p>
        )}
      </div>
    </div>
  );
};

export default ContributionsPage;
