import React from "react";
import { portfolioConfig } from "@/config/portfolio.config";

function TextRotator() {
  return (
    <div className="py-4 rounded-md flex flex-col justify-center items-center overflow-hidden">
      <div className="font-poppins text-base sm:text-2xl [text-wrap:balance] text-gray-700">
        I am a {portfolioConfig.title} &
        <span className="inline-flex ml-2 flex-col h-[40px] sm:h-[60px] overflow-hidden">
          <ul className="block text-left font-rubik text-lg sm:text-3xl leading-tight [&_li]:block [&_li]:h-[40px] sm:[&_li]:h-[60px] [&_li]:text-[#2f7df4] animate-text-slide">
            {portfolioConfig.skills.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}

export default TextRotator;


