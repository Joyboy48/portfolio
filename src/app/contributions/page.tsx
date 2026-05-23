import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import ContributionCard from "@/components/ContributionCard";
import { Badge } from "@/components/ui/badge";
import { GitPullRequest, Award, Star } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContributionsPage = () => {
  const { contributions } = portfolioConfig;

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <GitPullRequest className="h-4 w-4" />
        Contributions
      </Badge>

      <div className="flex flex-col gap-3 w-full">
        <Heading>Open Source Contributions</Heading>
        
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
          Merged Contributions
        </h2>
        <div className="w-full flex flex-row flex-wrap gap-4">
          {contributions.merged.map((val, indx) => (
            <ContributionCard key={`merged-${indx}`} value={val} num={indx} />
          ))}
        </div>
      </div>

      {/* Active / In-Review Contributions Section */}
      <div className="flex flex-col gap-3 w-full mt-6">
        <h2 className="text-xl font-poppins text-yellow-500 font-semibold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block animate-pulse"></span>
          Active / In-Review Contributions
        </h2>
        <div className="w-full flex flex-row flex-wrap gap-4">
          {contributions.active.map((val, indx) => (
            <ContributionCard key={`active-${indx}`} value={val} num={indx + contributions.merged.length} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionsPage;
