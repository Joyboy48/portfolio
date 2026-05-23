import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const educationPage = () => {
  return (
    // ABOUT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <Briefcase className="h-4 w-4" />
        Education & Experience
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Education & Experience</Heading>
      </div>
      
      {/* Education Section */}
      <div className="w-full h-fit flex flex-col mb-8 mt-2">
        <h2 className="text-xl font-poppins text-primary-sky font-semibold mb-6 flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          Education
        </h2>
        
        <div className="space-y-6 w-full">
          {portfolioConfig.education.map((edu, index) => (
            <div className="w-full h-fit flex relative" key={`edu-${index}`}>
              {/* Period Column */}
              <FramerWrapper
                y={0}
                x={-50}
                delay={0.25 + index * 0.1}
                className="w-1/4 font-rubik flex items-start pt-2 justify-end pr-6 text-zinc-400 text-sm md:text-base max-sm:text-xs text-right"
              >
                {edu.period}
              </FramerWrapper>
              
              {/* Timeline Track & Details Card */}
              <div className="relative w-3/4 border-l-2 border-zinc-800 pl-8 pb-4">
                {/* Interactive Node Icon */}
                <FramerWrapper
                  y={0}
                  scale={0.5}
                  delay={0.3 + index * 0.1}
                  className="absolute -left-[18px] top-1.5 z-10 w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-800 hover:border-primary-sky flex items-center justify-center text-primary-sky transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  <GraduationCap className="h-4 w-4" />
                </FramerWrapper>

                <FramerWrapper
                  y={30}
                  x={0}
                  delay={0.3 + index * 0.1}
                  className="bg-accent/10 border-2 hover:border-zinc-800 hover:bg-accent/20 transition-all duration-300 p-5 rounded-xl flex flex-col gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="text-xl font-rubik text-primary max-sm:text-base font-bold leading-snug">
                    {edu.degree}
                  </div>
                  <div className="text-sm font-poppins text-sky-400 font-semibold">
                    {edu.institution}
                  </div>
                  <p className="font-poppins text-sm w-full text-zinc-400 max-sm:text-xs leading-relaxed mt-1">
                    {edu.description}
                  </p>
                  {edu.cgpa && (
                    <div className="mt-2">
                      <span className="font-mono text-xs bg-sky-950/40 border border-sky-800/40 text-sky-400 px-2 py-0.5 rounded-full">
                        CGPA: {edu.cgpa}
                      </span>
                    </div>
                  )}
                </FramerWrapper>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="w-full h-fit flex flex-col mt-4">
        <h2 className="text-xl font-poppins text-primary-sky font-semibold mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Experience
        </h2>
        
        <div className="space-y-6 w-full">
          {portfolioConfig.experience.map((exp, index) => (
            <div className="w-full h-fit flex relative" key={`exp-${index}`}>
              {/* Period Column */}
              <FramerWrapper
                y={0}
                x={-50}
                delay={0.25 + index * 0.1}
                className="w-1/4 font-rubik flex items-start pt-2 justify-end pr-6 text-zinc-400 text-sm md:text-base max-sm:text-xs text-right"
              >
                {exp.period}
              </FramerWrapper>
              
              {/* Timeline Track & Details Card */}
              <div className="relative w-3/4 border-l-2 border-zinc-800 pl-8 pb-4">
                {/* Interactive Node Icon */}
                <FramerWrapper
                  y={0}
                  scale={0.5}
                  delay={0.3 + index * 0.1}
                  className="absolute -left-[18px] top-1.5 z-10 w-8 h-8 rounded-full bg-zinc-950 border-2 border-zinc-800 hover:border-primary-sky flex items-center justify-center text-primary-sky transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)] cursor-pointer"
                >
                  <Briefcase className="h-4 w-4" />
                </FramerWrapper>

                <FramerWrapper
                  y={30}
                  x={0}
                  delay={0.3 + index * 0.1}
                  className="bg-accent/10 border-2 hover:border-zinc-800 hover:bg-accent/20 transition-all duration-300 p-5 rounded-xl flex flex-col gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="text-xl font-rubik text-primary max-sm:text-base font-bold leading-snug">
                    {exp.title}
                  </div>
                  <div className="text-sm font-poppins text-sky-400 font-semibold">
                    {exp.company}
                  </div>
                  <div className="text-xs font-mono text-zinc-500 mb-1">
                    {exp.location}
                  </div>
                  <p className="font-poppins text-sm w-full text-zinc-400 max-sm:text-xs leading-relaxed">
                    {exp.description}
                  </p>
                  {exp.achievements && (
                    <div className="mt-3 border-t border-zinc-800/40 pt-3">
                      <h4 className="font-poppins text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside font-poppins text-xs text-zinc-400 space-y-1.5 pl-1 leading-relaxed">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-balance">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </FramerWrapper>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default educationPage;
