import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const educationPage = () => {
  return (
    // ABOUT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-y-auto no-scrollbar">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <Briefcase className="h-4 w-4" />
        Education & Experience
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Education & Experience</Heading>
      </div>
      
      {/* Education Section */}
      <div className="w-full h-fit flex flex-col mb-8">
        <h2 className="text-xl font-poppins text-primary font-semibold mb-4">Education</h2>
        {portfolioConfig.education.map((edu, index) => (
          <div className="w-full h-fit flex" key={`edu-${index}`}>
            <FramerWrapper
              y={0}
              x={-100}
              delay={0.35 + index * 0.1}
              className="w-1/4 font-rubik flex items-center justify-evenly text-lg max-sm:text-base"
            >
              {edu.period}
            </FramerWrapper>
            <FramerWrapper
              y={0}
              x={100}
              delay={0.35 + index * 0.1}
              className="relative w-3/4 border-l-4 border-l-[#3c3c3c] p-4 gap-3 education_point"
            >
              <div className="text-2xl font-rubik max-sm:text-xl">
                {edu.degree}, <br /> {edu.institution}
              </div>
              <p className="font-poppins text-base w-full text-primary max-sm:text-xs">
                {edu.description}
              </p>
              {edu.cgpa && (
                <p className="font-poppins text-sm text-accent mt-2">
                  CGPA: {edu.cgpa}
                </p>
              )}
            </FramerWrapper>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="w-full h-fit flex flex-col">
        <h2 className="text-xl font-poppins text-primary font-semibold mb-4">Experience</h2>
        {portfolioConfig.experience.map((exp, index) => (
          <div className="w-full h-fit flex" key={`exp-${index}`}>
            <FramerWrapper
              y={0}
              x={-100}
              delay={0.35 + index * 0.1}
              className="w-1/4 font-rubik flex items-center justify-evenly text-lg max-sm:text-base"
            >
              {exp.period}
            </FramerWrapper>
            <FramerWrapper
              y={0}
              x={100}
              delay={0.35 + index * 0.1}
              className="relative w-3/4 border-l-4 border-l-[#3c3c3c] p-4 gap-3 education_point"
            >
              <div className="text-2xl font-rubik max-sm:text-xl">
                {exp.title} <br />
                <span className="text-lg text-accent">{exp.company}</span>
                <br />
                <span className="text-sm text-primary">{exp.location}</span>
              </div>
              <p className="font-poppins text-base w-full text-primary max-sm:text-xs mb-3">
                {exp.description}
              </p>
              {exp.achievements && (
                <div className="mt-3">
                  <h4 className="font-poppins text-sm font-semibold text-accent mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside font-poppins text-sm text-primary space-y-1">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </FramerWrapper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default educationPage;
