import Aboutfooter from "@/components/Aboutfooter";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Circle, Heart, User2 } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const page = () => {
  const items = portfolioConfig.about.hobbies.map((hobby) => ({ hobby }));

  return (
    // ABOUT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-8 overflow-hidden p-4">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <User2 className="h-4 w-4" /> About Me
      </Badge>
      <Heading>
        {portfolioConfig.title} & Web Developer, {portfolioConfig.about.personalInfo.nationality}
      </Heading>
      <FramerWrapper y={0} x={100}>
        <p className="font-poppins text-lg w-full text-primary text-balance">
          {portfolioConfig.about.bio}
        </p>
      </FramerWrapper>
      <FramerWrapper className="block w-full" y={100} delay={0.31}>
        <h1 className="gap-2 text-2xl font-poppins text-primary font-semibold flex items-center icon_underline relative mb-4">
          <Heart className="h-6 w-6" /> Hobbies
        </h1>
        <div className="w-full flex flex-wrap gap-4">
          {items.map((val, indx) => (
            <div
              key={indx}
              className="flex gap-2 items-center text-lg text-primary bg-accent/30 rounded-md px-4 py-2"
            >
              <Circle className="h-3 w-3" /> {val.hobby}
            </div>
          ))}
        </div>
      </FramerWrapper>
    </div>
  );
};

export default page;
