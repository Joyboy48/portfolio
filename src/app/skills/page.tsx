import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import { SkillsHexGrid } from "@/components/SkillsHexGrid";

const SkillPage = () => {
  return (
    // SKILLS PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <LightbulbIcon className="w-4 h-4" />
        My Skills
      </Badge>
      
      <div className="flex flex-col gap-3 w-full">
        <Heading>My Technical Experience & Skills</Heading>
        <FramerWrapper y={0} x={100}>
          <p className="font-poppins text-sm w-full text-zinc-400 max-w-3xl leading-relaxed">
            I specialize in building scalable backend services, event-driven microservices, database schemas, and developer-friendly scripts. Click or hover on any hexagon node to inspect proficiency, experience, and project usage.
          </p>
        </FramerWrapper>
      </div>

      {/* Honeycomb Hex Grid Section */}
      <FramerWrapper y={50} delay={0.2} className="w-full">
        <SkillsHexGrid />
      </FramerWrapper>
    </div>
  );
};

export default SkillPage;
