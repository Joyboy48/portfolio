import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight, GitFork } from "lucide-react";

interface ContributionCardProps {
  value: {
    title: string;
    description: string;
    tags: string[];
    link: string;
  };
  num: number;
}

const ContributionCard: React.FC<ContributionCardProps> = ({ value, num }) => {
  return (
    <FramerWrapper 
      className="max-w-[48%] max-lg:max-w-full flex-grow" 
      y={0} 
      scale={0.8} 
      delay={num/4} 
      duration={0.15}
    >
      <Card className="w-full h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-primary flex items-start gap-2">
            <GitFork className="h-5 w-5 text-sky-400 mt-1 flex-shrink-0" />
            <span>{value.title}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {value.tags.map((tag: string, index: number) => {
              const tagStyles = {
                'Go/Cobra CLI': 'bg-cyan-950 text-cyan-400 border border-cyan-800/50',
                'Kubernetes API': 'bg-blue-950 text-blue-400 border border-blue-800/50',
                'Docker': 'bg-sky-950 text-sky-400 border border-sky-800/50',
                'OpenTelemetry': 'bg-orange-950 text-orange-400 border border-orange-800/50',
                'Java': 'bg-red-950 text-red-400 border border-red-800/50',
                'OpenAPI': 'bg-emerald-950 text-emerald-400 border border-emerald-800/50',
                'Documentation': 'bg-purple-950 text-purple-400 border border-purple-800/50',
              }[tag] || 'bg-neutral-800 text-neutral-400 border border-neutral-700/50';

              return (
                <span 
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${tagStyles}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Link
            href={value.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ 
                variant: "outline", 
                size: "sm" 
              }),
              "w-full sm:w-fit transition-all hover:bg-sky-950/30 hover:border-sky-800 hover:text-sky-400 gap-1.5 group"
            )}
          >
            View Pull Request
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </CardFooter>
      </Card>
    </FramerWrapper>
  );
};

export default ContributionCard;
